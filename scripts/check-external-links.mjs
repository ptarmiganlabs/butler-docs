#!/usr/bin/env node
/**
 * Checks every outbound link in the built site: each http(s) URL a reader can follow off the
 * site, from every page, is requested and must answer 2xx. Internal links (pages, #anchors,
 * the sidebar, images) are scripts/check-links.mjs's job, inside `npm run build`. This script
 * checks only the links that leave the site.
 *
 * It is deliberately not part of the build. An outbound link breaks when the site it points to
 * changes, not when this repository does. A third party's outage, a rate limit or a bot wall
 * would otherwise fail the required `build` check on a pull request that touched nothing near
 * the link. So .github/workflows/external-links.yaml runs it once a month and keeps one issue
 * open while anything is broken, and runs it on pull requests as a check nobody is required
 * to pass.
 *
 * The checking is lychee's (https://lychee.cli.rs): retries, Retry-After, per-host limits,
 * redirects, GitHub's API for github.com links, and skipping URLs inside code blocks. This
 * script adds the parts that are ours:
 *
 *   - It gets a pinned lychee release itself and verifies the tarball against a SHA-256
 *     written below, on every run. So the same binary runs on a laptop and on every runner,
 *     and nothing is trusted because it happened to be in a cache.
 *   - It runs lychee on the build with the settings that make it an outbound check:
 *     only http and https, root-relative links resolved inside the build (so lychee does not
 *     report them as errors, and the scheme filter then drops them), and the build directory
 *     read although .gitignore names it.
 *   - It refuses to pass vacuously. If lychee checks no link at all, that is a check that no
 *     longer sees the HTML, not a site with nothing broken.
 *   - It reports each broken URL once, with the pages it is on, rather than once per page.
 *
 * Settings live in lychee.toml, shared by every site and copied unchanged. Exclusions live
 * in .lycheeignore, which is the site's own: each entry carries its reason and the date.
 *
 * From plabs-house-rules, templates/external-links/. Copy it unchanged; rules/docs/
 * external-links.md there says why it works this way. A change every site needs is a change
 * to the template first.
 *
 *   npm run check:external                       # against the last build
 *   node scripts/check-external-links.mjs --report report.md
 *   node scripts/check-external-links.mjs --issue-report issue.md   # short, for the issue
 *   node scripts/check-external-links.mjs --dist path/to/dist
 *
 * Exit codes: 0 nothing broken; 2 broken links, listed; 1 the check itself could not run
 * (download, checksum, lychee refused its configuration, or nothing found to check).
 */

import { createHash } from 'node:crypto'
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { homedir, tmpdir } from 'node:os'
import { join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'

// The lychee release this check runs. To move to a newer one: it must be at least seven days
// old (rules/dependencies/release-age.md), and every SHA-256 below comes from that release's
// own .sha256 files, checked against the asset digests GitHub shows — never from a tarball
// you downloaded and hashed yourself. The musl builds are static, so they run on any Linux.
const LYCHEE_VERSION = '0.24.2'
const LYCHEE_ASSETS = {
	'linux-x64': ['lychee-x86_64-unknown-linux-musl.tar.gz', '73657a111819a30c47c08352896796f23d64e4eb2b3ed39b6d32149241566fc5'],
	'linux-arm64': ['lychee-aarch64-unknown-linux-musl.tar.gz', '5d0b0e3aeab240f41920c633a6eaf97599be6eedda034b36e858ede7dba5e535'],
	'darwin-arm64': ['lychee-aarch64-apple-darwin.tar.gz', 'c9d3740ea2d891854d37116c9fba840f37b6e7c89d330e7db84ac333631c4977'],
	'darwin-x64': ['lychee-x86_64-apple-darwin.tar.gz', '887503a9cff667d322b8d0892b40bf49976eb9507af8483220a3706cdad55978']
}

const ROOT = fileURLToPath(new URL('../', import.meta.url))

const { values: args } = parseArgs({
	options: {
		dist: { type: 'string', default: join(ROOT, 'docs/.vitepress/dist') },
		report: { type: 'string' },
		'issue-report': { type: 'string' }
	}
})
const DIST = resolve(args.dist)

/** Stop because the check could not run, as opposed to finding something broken. */
function fail(message) {
	console.error(`\n${message}\n`)
	process.exit(1)
}

if (!existsSync(join(DIST, 'index.html')))
	fail(`No build to check: ${DIST} has no index.html. Run \`npm run build\` first.`)
if (!existsSync(join(ROOT, 'lychee.toml'))) fail('No lychee.toml at the repository root. Copy it from the template.')

// A .lycheeignore still naming the template's <tool> placeholder excludes nothing, so links to
// the site's own hostname are requested, sent to the gateway's sign-in page, and pass with a
// 200 whatever their path. That is the false pass the exclusion exists to prevent.
const ignoreFile = join(ROOT, '.lycheeignore')
if (
	existsSync(ignoreFile) &&
	readFileSync(ignoreFile, 'utf8')
		.split('\n')
		.some((line) => !line.trimStart().startsWith('#') && line.includes('<tool>'))
)
	fail(".lycheeignore still names <tool>. Replace it with this site's hostnames, as the line marked EDIT says.")

/** The pinned lychee, verified and unpacked. Returns the path of the binary. */
async function lychee() {
	const platform = `${process.platform}-${process.arch}`
	const asset = LYCHEE_ASSETS[platform]
	if (!asset) fail(`No lychee ${LYCHEE_VERSION} build is pinned for ${platform}. Add it to LYCHEE_ASSETS.`)
	const [name, sha256] = asset

	// The tarball is cached; the binary is not. Every run hashes the tarball and unpacks it
	// afresh, so a cache another job or another repository wrote is never trusted unchecked.
	const cacheDir = join(process.env.XDG_CACHE_HOME || join(homedir(), '.cache'), 'plabs-lychee', LYCHEE_VERSION)
	const tarball = join(cacheDir, name)
	const hashOf = (bytes) => createHash('sha256').update(bytes).digest('hex')

	if (!existsSync(tarball) || hashOf(readFileSync(tarball)) !== sha256) {
		const url = `https://github.com/lycheeverse/lychee/releases/download/lychee-v${LYCHEE_VERSION}/${name}`
		let response
		try {
			// Two minutes for 7 MB: a stalled transfer fails here, with its reason, rather than
			// holding the job until its timeout and leaving only "cancelled" in the log.
			response = await fetch(url, { signal: AbortSignal.timeout(120_000) })
		} catch (error) {
			fail(`Could not download lychee from ${url}: ${error.message}`)
		}
		if (!response.ok) fail(`Could not download lychee from ${url}: HTTP ${response.status}.`)
		const bytes = Buffer.from(await response.arrayBuffer())
		const actual = hashOf(bytes)
		if (actual !== sha256)
			fail(`The lychee download does not match its pinned SHA-256, so it was not run.\n  ${url}\n  expected ${sha256}\n  got      ${actual}`)
		mkdirSync(cacheDir, { recursive: true })
		// Written beside its final name and renamed: two jobs sharing a runner's cache each
		// write a whole file, and neither reads half of the other's.
		const partial = `${tarball}.${process.pid}`
		writeFileSync(partial, bytes)
		renameSync(partial, tarball)
	}

	// Unpacked afresh from the verified tarball on every run, then renamed onto one fixed path:
	// <cache>/plabs-lychee/<version>/lychee. The bytes are always the verified ones, and the
	// path never changes, so an outbound firewall on a laptop (Little Snitch, LuLu) can allow
	// that one binary once, per version, instead of prompting for a new temporary path each run.
	const unpacked = mkdtempSync(join(cacheDir, 'unpack-'))
	process.on('exit', () => rmSync(unpacked, { recursive: true, force: true }))
	const tar = spawnSync('tar', ['-xzf', tarball, '-C', unpacked, '--strip-components', '1'], { stdio: 'inherit' })
	if (tar.status !== 0) fail(`Could not unpack ${tarball}.`)
	const bin = join(cacheDir, 'lychee')
	renameSync(join(unpacked, 'lychee'), bin)
	return bin
}

const bin = await lychee()
const reportDir = mkdtempSync(join(tmpdir(), 'lychee-report-'))
process.on('exit', () => rmSync(reportDir, { recursive: true, force: true }))
const jsonReport = join(reportDir, 'report.json')

const run = spawnSync(
	bin,
	[
		'--config', 'lychee.toml',
		// What makes this an outbound check. Kept here, not in lychee.toml, so that no
		// change to the shared settings can turn it into something else.
		'--scheme', 'https',
		'--scheme', 'http',
		'--root-dir', DIST,
		'--no-ignore',
		'--no-progress',
		'--format', 'json',
		'--output', jsonReport,
		'--',
		DIST
	],
	// lychee reads .lycheeignore from the directory it runs in: the repository root.
	// GITHUB_TOKEN passes through in the environment, and lychee uses it for github.com.
	{ cwd: ROOT, stdio: ['ignore', 'inherit', 'inherit'] }
)

// 0: nothing broken. 2: something broken. Anything else is lychee refusing to run.
if (run.error) fail(`Could not run lychee: ${run.error.message}`)
if (run.status !== 0 && run.status !== 2) fail(`lychee stopped with exit code ${run.status} before checking. Its message is above.`)
if (!existsSync(jsonReport)) fail('lychee ran but wrote no report.')

const result = JSON.parse(readFileSync(jsonReport, 'utf8'))
// The links lychee actually requested. Not total minus excludes, which also counts links it
// classed as unsupported or unknown and never requested. Redirects are already inside these
// three, as the successes and errors they ended in.
const checked = result.successful + result.errors + result.timeouts

// Refuse to pass on nothing. Every site links out at least once (ptarmiganlabs.com, in
// the footer or on the home page); finding no link means lychee no longer sees the HTML.
if (checked === 0)
	fail(
		`lychee found ${result.total} link(s) in the build and checked none of them.\n` +
			'That is not a site with nothing broken; it is a check that no longer sees the outbound links.\n' +
			'Has the build moved, has VitePress changed its markup, or does .lycheeignore exclude everything?'
	)

/**
 * The page a built file is, as a reader opens it: v0.1/usage/index.html -> /v0.1/usage/. Any
 * other file keeps its name, docs/about.html -> /docs/about.html, which is where a site built
 * without clean URLs serves it.
 */
const routeOf = (file) => '/' + relative(DIST, file).replace(/(^|\/)index\.html$/, '$1')

// URL -> { what, pages }. The nav and the footer repeat on every page, so one bad link would
// otherwise be listed once per page.
const broken = new Map()
for (const [map, kind] of [
	[result.error_map, 'error'],
	[result.timeout_map, 'timeout']
]) {
	for (const [file, entries] of Object.entries(map ?? {})) {
		for (const { url, status } of entries) {
			// "Network error: Connection failed ... (error sending request for url (…))" repeats
			// the URL it is listed under; the first part is the answer.
			const what = kind === 'timeout' ? 'timed out' : (status?.text ?? 'failed').replace(/\s*\(error sending request for url .*$/, '')
			const entry = broken.get(url) ?? { what, pages: new Set() }
			// lychee requests each URL once and answers its later occurrences from memory,
			// as "Error (cached)". Keep the answer the request itself got.
			if (entry.what.includes('(cached)') && !what.includes('(cached)')) entry.what = what
			entry.pages.add(routeOf(file))
			broken.set(url, entry)
		}
	}
}

// lychee said something failed, but nothing it reported is in the maps read above. Passing
// would close the monthly issue while links are broken; say the report could not be read.
if (run.status === 2 && broken.size === 0)
	fail(
		'lychee exited 2, which means something failed, but its report lists no broken link in\n' +
			'error_map or timeout_map. Has a lychee upgrade changed its JSON report?'
	)

// The outbound URLs an exclusion kept from being checked, lychee.toml's or .lycheeignore's.
// Every report lists them by host, so what this check cannot see stays in view instead of
// being forgotten in a file nobody opens -- and a site's own hostname, linked from every
// page, is one line rather than a hundred.
const excluded = new Set(
	Object.values(result.excluded_map ?? {})
		.flat()
		.map(({ url }) => url)
		.filter((url) => /^https?:/.test(url))
)
const excludedHosts = new Map()
for (const url of excluded) {
	const host = new URL(url).host
	excludedHosts.set(host, (excludedHosts.get(host) ?? 0) + 1)
}
const summary = `${checked} outbound link(s) checked; ${excluded.size} outbound URL(s) on ${excludedHosts.size} host(s) excluded by lychee.toml or .lycheeignore`
const excludedList = () =>
	excluded.size === 0
		? []
		: [
				'',
				`<details><summary>Not checked: ${excluded.size} URL(s) on ${excludedHosts.size} host(s), excluded by lychee.toml or .lycheeignore</summary>`,
				'',
				...[...excludedHosts].sort(([a], [b]) => a.localeCompare(b)).map(([host, n]) => `- ${host} — ${n} URL(s)`),
				'',
				'</details>'
			]

if (broken.size === 0) {
	console.log(`external links ok — ${summary}, none broken.`)
	const text = [`No broken outbound links. ${summary}.`, ...excludedList()].join('\n') + '\n'
	if (args.report) writeFileSync(args.report, text)
	if (args['issue-report']) writeFileSync(args['issue-report'], text)
	process.exit(0)
}

// Enough pages to find the link by, not every version of every page that repeats it.
const where = (pages) => {
	const list = [...pages].sort()
	return list.length > 3 ? `${list.slice(0, 2).join(', ')} and ${list.length - 2} more` : list.join(', ')
}
const sorted = [...broken].sort(([a], [b]) => a.localeCompare(b))

console.error(`\n${broken.size} broken outbound link(s) — ${summary}:\n`)
for (const [url, { what, pages }] of sorted) console.error(`  ${url}\n      ${what}\n      on ${where(pages)}`)
console.error(
	'\nFix the link or remove it. If the page is fine for a reader and only refuses a checker,\n' +
		'exclude it in .lycheeignore with the reason and the date, rather than accepting its status.\n'
)

const cell = (text) => String(text).replaceAll('|', '\\|').replaceAll('\n', ' ')
const head = [`${broken.size} broken outbound link(s). ${summary}.`, '', '| URL | What happened | On |', '| --- | --- | --- |']
const rows = sorted.map(([url, { what, pages }]) => `| ${cell(url)} | ${cell(what)} | ${cell(where(pages))} |`)

// The whole report, for the run's summary and for reading.
if (args.report) writeFileSync(args.report, [...head, ...rows, ...excludedList()].join('\n') + '\n')

// The report for the issue, made short enough to get there. The workflow passes it through a
// job output and an environment variable, and Linux will not start a process with one over
// 128 KiB; GitHub refuses an issue body over 65,536 characters. So it keeps the rows that fit
// in 60,000, and says how many it left out. Its first line is a hash of every broken URL,
// truncated or not, which changes only when the set of broken URLs does -- not when the counts
// or the "and N more" pages move, as they do whenever the site gains a page -- so the workflow
// comments on the issue only then.
if (args['issue-report']) {
	const LIMIT = 60000
	const hash = createHash('sha256').update(sorted.map(([url]) => url).join('\n')).digest('hex')
	const lines = [`<!-- external-links: ${hash} -->`, ...head]
	let length = lines.join('\n').length
	let kept = 0
	for (const row of rows) {
		if (length + row.length + 1 > LIMIT) break
		lines.push(row)
		length += row.length + 1
		kept++
	}
	if (kept < rows.length) {
		const run = process.env.GITHUB_RUN_ID
			? `[this run's summary](${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID})`
			: "the run's summary"
		lines.push('', `…and ${rows.length - kept} more broken link(s), listed in ${run}.`)
	} else lines.push(...excludedList())
	writeFileSync(args['issue-report'], lines.join('\n') + '\n')
}
process.exit(2)
