# Butler Documentation Site

This is a VitePress documentation site for [Butler](https://github.com/ptarmiganlabs/butler), an open source tool that adds superpowers to Qlik Sense.

**For comprehensive guidance**, see `.github/copilot-instructions.md`.

## Active vs Archived Systems

- **VitePress (ACTIVE)**: Content at repository root in `/docs/docs/`
- **Hugo (ARCHIVED)**: Files in `/hugo-archive/` — NOT maintained, do not edit
- **Migration docs**: `/vitepress-migration-docs/` — reference only

All work happens in the VitePress system at the repository root.

## Commands

All commands run from the repository root:

```bash
npm install              # Install dependencies (10-20s)
npm run pre:version     # Fetch Butler version from GitHub
npm run dev             # Dev server at http://localhost:5173 (includes pre:version)
npm run build          # Production build to docs/.vitepress/dist (includes pre:version)
npm run serve         # Preview production build (includes pre:version)
npm run deploy        # Deploy to GitHub Pages via GitHub Actions
```

## Structure

```
docs/
├── docs/              # Documentation content (your work area)
│   ├── getting-started/
│   ├── concepts/
│   ├── examples/
│   └── reference/
├── public/             # Static assets
│   ├── img/           # Images (reference as /img/...)
│   └── openapi/       # OpenAPI specs
└── .vitepress/
    ├── config.ts      # Site configuration
    ├── components/   # Custom Vue components
    └── theme/        # Theme customization
```

## Key Quirks

- **Dead links**: Build FAILS (`ignoreDeadLinks: false` in config)
- **Image paths**: Use absolute paths from `/docs/public/`, e.g., `/img/my-image.png`
- **Version fetching**: Auto-runs before every npm script
- **Custom containers**: `:::tip`, `:::warning`, `:::info`, `:::danger`
- **Mermaid diagrams**: Fenced code blocks with `mermaid` language tag