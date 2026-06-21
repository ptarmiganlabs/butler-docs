/**
 * Copy latest version docs to /latest/ folder and rewrite internal links.
 * Runs before docs:dev and docs:build.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsDir = path.resolve(__dirname, "../docs");
const versionFile = path.resolve(__dirname, "../docs/.vitepress/version.js");

// Extract major version from full version string (e.g., "v15.0.1" -> "v15.0")
function extractMajorVersion(version) {
  const match = version.match(/^(v\d+\.\d+)/);
  return match ? match[1] : null;
}

// Escape regex metacharacters so the version string can be used safely in RegExp.
function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Read version from generated version.js file
async function readVersion() {
  try {
    const content = await fs.readFile(versionFile, "utf8");
    const match = content.match(/export const version = '([^']+)'/);
    return match ? match[1] : null;
  } catch (err) {
    console.warn(`[copy-latest] Warning: Could not read version.js: ${err.message}`);
    return null;
  }
}

// Recursively copy directory
async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

// Recursively rewrite links in markdown files
async function rewriteLinks(dir, oldVersion, newVersion) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await rewriteLinks(fullPath, oldVersion, newVersion);
    } else if (entry.name.endsWith(".md")) {
      let content = await fs.readFile(fullPath, "utf8");
      // Replace version-specific paths in link contexts only:
      // - Markdown links: ](/v17.0/...
      // - HTML href: href="/v17.0/...
      // - Reference links: ]: /v17.0/...
      const regex = new RegExp(`(\\]\\(|href="|\\]:\\s*)/${escapeRegExp(oldVersion)}/`, "g");
      const newContent = content.replace(regex, `$1/${newVersion}/`);

      if (content !== newContent) {
        await fs.writeFile(fullPath, newContent, "utf8");
      }
    }
  }
}

async function main() {
  const version = await readVersion();
  if (!version) {
    console.log("[copy-latest] No version found, skipping");
    return;
  }

  const majorVersion = extractMajorVersion(version);
  if (!majorVersion) {
    console.log(`[copy-latest] Could not extract major version from ${version}, skipping`);
    return;
  }

  const sourceDir = path.join(docsDir, majorVersion);
  const latestDir = path.join(docsDir, "latest");

  // Check if source directory exists
  try {
    await fs.access(sourceDir);
  } catch {
    console.log(`[copy-latest] Source directory ${sourceDir} not found, skipping`);
    return;
  }

  // Remove existing latest directory if it exists
  try {
    await fs.rm(latestDir, { recursive: true, force: true });
  } catch {
    // Ignore if it doesn't exist
  }

  console.log(`[copy-latest] Copying ${majorVersion} to latest`);
  await copyDir(sourceDir, latestDir);

  console.log(`[copy-latest] Rewriting links from /${majorVersion}/ to /latest/`);
  await rewriteLinks(latestDir, majorVersion, "latest");

  // Keep /openapi/butler_latest.json served from public/ for the download
  // link in the markdown files and the standalone swagger-ui.html page.
  // The canonical spec now lives in docs/openapi/butler_latest.json so
  // theme/index.js can import it through Vite's module graph.
  const specSrc = path.join(docsDir, "openapi", "butler_latest.json");
  const specDestDir = path.join(docsDir, "public", "openapi");
  const specDest = path.join(specDestDir, "butler_latest.json");
  try {
    await fs.access(specSrc);
    await fs.mkdir(specDestDir, { recursive: true });
    await fs.copyFile(specSrc, specDest);
    console.log("[copy-latest] Synced openapi/butler_latest.json to public/");
  } catch {
    console.log("[copy-latest] No openapi/butler_latest.json to sync, skipping");
  }

  console.log("[copy-latest] Done");
}

main();
