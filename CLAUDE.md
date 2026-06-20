# Butler Docs - Agent Guide

VitePress documentation site for [Butler](https://github.com/ptarmiganlabs/butler). Hosted on Cloudflare Pages with auto-deploy on `main` commits.

## Commands

```bash
npm run dev      # Start dev server (runs pre-scripts automatically)
npm run build    # Build production site (runs pre-scripts automatically)
npm run serve    # Preview production build (runs pre-scripts automatically)
```

**Pre-scripts run automatically** before dev/build/serve:
- `pre:version` - Fetches latest Butler release tag from GitHub API
- `pre:latest` - Generates `/docs/latest/` from the latest version folder

## Content Structure

```
docs/
├── v16.0/           # Versioned docs (source - edit here)
├── v17.0/           # Versioned docs (source - edit here)
├── latest/          # Auto-generated (do not edit)
├── public/          # Static assets (images, favicons, openapi specs)
├── index.md         # Root homepage (hero)
└── .vitepress/
    └── config.ts    # Sidebar uses createSidebar() helper
```

## Key Conventions

**Sidebar**: Defined once via `createSidebar(prefix)` in `config.ts`. All versioned sidebars (`/v16.0/`, `/v17.0/`, `/latest/`) call this function with their path prefix. Don't duplicate sidebar structure.

**Images**: Use `<ResponsiveImage>` component for images with captions:
```markdown
<ResponsiveImage src="./image.png" alt="Description" caption="Caption" maxWidth="450px" />
```

**Versioned links**: When editing docs in `v16.0/` or `v17.0/`, use version-specific paths like `/v17.0/about/`. The `/latest/` folder is regenerated on each build with links rewritten automatically.

## Gotchas

- `/docs/latest/` is generated at build time - don't edit directly
- Version is fetched from GitHub releases API - update `docs/.vitepress/version.js` after new Butler releases
- Nav "Guide" link and homepage "Documentation" button both point to `/latest/`
- Dead links fail the build (`ignoreDeadLinks: false` in config)
- Public assets (images, favicons, OpenAPI specs) live in `docs/public/` and are referenced with absolute paths like `/img/...`
