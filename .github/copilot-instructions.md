````instructions
---
applyTo: '**'
---

# Butler Documentation Site

Butler documentation site documents [Butler](https://github.com/ptarmiganlabs/butler), an open source tool that adds superpowers to Qlik Sense. The site is hosted at butler.ptarmiganlabs.com.

**Hosting**: Cloudflare Pages with automatic deployment on commits to `main` branch.

**Source code repository**: The main Butler project is at github.com/ptarmiganlabs/butler. The doc site shall correctly reflect the current state of that project.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

**Setup and Development:**

- Install Node.js 18+ and npm
- Install dependencies: `npm install` -- takes 10-20 seconds. Set timeout to 60+ seconds.
- Start development server: `npm run dev` -- takes 2-5 seconds, opens at http://localhost:5173
  - Development server includes hot reload for instant preview of changes
  - Pre-scripts run automatically: version fetching and /latest/ docs generation
- Build the site: `npm run build` -- takes 10-30 seconds depending on content size
  - Builds static site to `docs/.vitepress/dist`
- Preview production build: `npm run serve` -- serves the built site locally

**Working Directory:**

- All npm commands run from the repository root
- Content files are in `/docs/` directory
- Configuration is in `/docs/.vitepress/`

## Validation

**ALWAYS validate documentation changes by running the development server:**

- Start dev server: `npm run dev`
- Check that content renders correctly at http://localhost:5173
- Verify navigation works and pages are accessible
- For production validation: `npm run build` and check for build errors
- Build output goes to `docs/.vitepress/dist`
- Verify build succeeds with exit code 0
- Preview production build: `npm run serve` to test the built site
- Check console for any errors or warnings during development
- Validate images and static assets load correctly from `docs/public/`
- Always use lower case paths and file names for images and assets

**VitePress images:**

- ALWAYS use the `<ResponsiveImage>` component for including images with captions and zoom functionality, for example:
   ```markdown
   <ResponsiveImage
   src="./my-image.png"
   alt="Description of image"
   caption="Caption text"
   maxWidth="450px"
   />
   ```

**VitePress alerts:**

- VitePress uses `::: info`, `::: tip`, `::: warning`, `::: danger` blocks for callouts.
   For example:
    ```markdown
    ::: info
    This is an informational message.
    :::
    ```
    ```markdown
    :::tip
    This is a tip message.
    :::
    ```
    ```markdown
    ::: warning
    This is a warning message.
    :::
    ```
    ```markdown
    ::: danger
    This is a danger message.
    :::
    ```

## Build Details

- **Node Version**: Requires Node.js 18+
- **Package Manager**: npm (package-lock.json present)
- **Build Time**: 10-30 seconds depending on content size
- **Dev Server**: Hot reload enabled, typically starts in 2-5 seconds
- **Build Output**: Static files in `docs/.vitepress/dist`
- **Dependencies**:
  - VitePress 1.6.4+ (static site generator)
  - Vue 3.5+ (component framework)
  - Mermaid 11+ (diagram rendering)
  - vitepress-plugin-mermaid 2+ (Mermaid integration)
  - vitepress-openapi (API documentation)
  - swagger-ui-dist and swagger-ui-react (OpenAPI rendering)
- **Version Fetching**: Automatic Butler version fetching from GitHub via pre-scripts
- **Latest Docs**: Automatic generation of /latest/ docs from latest version
- **Caching**: VitePress uses `.vitepress/cache` for faster rebuilds

## Repository Structure

```
butler-docs/
├── README.md
├── AGENTS.md                       # Concise agent guide (also at CLAUDE.md)
├── CLAUDE.md                       # Identical to AGENTS.md
├── package.json                    # Dependencies and npm scripts
├── docs/                           # Documentation root
│   ├── index.md                    # Homepage
│   ├── .vitepress/                 # VitePress configuration
│   │   ├── config.ts               # Main site configuration
│   │   ├── theme/                  # Custom theme files
│   │   ├── components/             # Vue components
│   │   ├── cache/                  # Build cache
│   │   ├── dist/                   # Build output (generated)
│   │   └── version.js              # Butler version info (generated)
│   ├── public/                     # Static assets
│   │   ├── img/                    # Images
│   │   ├── openapi/                # OpenAPI specifications
│   │   └── favicons/               # Site icons
│   ├── v16.0/                      # v16.0 documentation
│   ├── v17.0/                      # v17.0 documentation
│   └── latest/                     # Latest docs (generated from latest version)
├── scripts/                        # Build scripts
│   ├── fetch-butler-version.mjs
│   ├── copy-latest-docs.mjs
│   └── convert-images.js
├── hugo-archive/                   # LEGACY Hugo files (archived, do not edit)
└── vitepress-migration-docs/       # Migration documentation (reference only)
```

## Key Commands

**All commands run from repository root:**

- `npm install` - Install all dependencies (10-20 seconds)
- `npm run dev` - Start development server with hot reload at http://localhost:5173
  - Automatically runs pre-scripts: version fetching and /latest/ generation
- `npm run build` - Build production static site to `docs/.vitepress/dist`
  - Automatically runs pre-scripts before building
- `npm run serve` - Preview production build locally
  - Automatically runs pre-scripts before serving

**Important Notes:**

- Development server provides instant feedback with hot module replacement
- All npm scripts automatically fetch Butler version info and generate /latest/ docs before running
- Build output is optimized for production with minification and tree-shaking
- Deployment to Cloudflare Pages happens automatically on commits to `main` branch
- Dead links fail the build (`ignoreDeadLinks: false` in config)

## Configuration Files

- `package.json` - Dependencies and npm scripts
- `docs/.vitepress/config.ts` - Main site configuration (navigation, theme, plugins, sidebar)
- `docs/.vitepress/theme/index.js` - Custom theme configuration
- `scripts/fetch-butler-version.mjs` - Butler version fetching script
- `scripts/copy-latest-docs.mjs` - Generates /latest/ docs from latest version
- `docs/.vitepress/version.js` - Generated Butler version info (auto-created)

## Content Structure

The site uses a versioned directory structure in `/docs/`:

- `v16.0/` - v16.0 documentation
- `v17.0/` - v17.0 documentation
- `latest/` - Latest documentation (auto-generated from latest version, do not edit directly)
- `index.md` - Homepage

Each version directory contains:

- `about/` - Project information, contributing guidelines
- `getting-started/` - Installation and setup guides
- `concepts/` - Feature explanations and architectural concepts
- `examples/` - Usage examples and tutorials
- `reference/` - Configuration reference, technical details
- `security.md` - Security policies
- `legal-stuff.md` - Legal information

**Content Format:**

- All content is in Markdown (.md) files
- Each directory typically has an `index.md` for the section overview
- Front matter includes title, description, and optional custom layout
- Vue components can be embedded directly in Markdown
- Mermaid diagrams supported via fenced code blocks with `mermaid` language tag
- Use the custom component <ResponsiveImage> for including images with captions and zoom functionality

**Version Management:**

- Latest Butler version is fetched from GitHub releases API before each build
- The `/latest/` directory is auto-generated from the latest version (e.g., v17.0)
- When a new version is released, update `docs/.vitepress/version.js` and rebuild
- Internal links in `/latest/` are automatically rewritten from version-specific paths
- Adding a new version: create a new `docs/vX.Y/` folder (copy from the previous major), add a nav dropdown line and a sidebar key in `config.ts`

## Theme Customization

**Theme files in `docs/.vitepress/theme/`:**

- Main theme entry: `theme/index.js` - imports default theme and applies customizations
- Custom CSS: Add styles in theme directory or import global CSS files
- Custom Vue components: Create in `.vitepress/components/` directory
- Layout customization: Override default VitePress layout components

**Site configuration in `config.ts`:**

- Navigation menu (top nav bar) including a Version dropdown
- Sidebar structure and grouping (generated via `createSidebar()` helper function)
- Social links (GitHub, etc.)
- Search integration (local search)
- Footer content
- Logo and site title

**Advanced Customization:**

- Override VitePress default components by creating same-named components in theme directory
- Use Vue's composition API for reactive custom components
- Access site configuration and page data via VitePress composables
- Add custom head tags via config.ts `head` property

## Common Troubleshooting

- **Build fails with dependency errors**: Run `npm install` to ensure all dependencies are installed
- **Dev server won't start**: Check that port 5173 is not already in use
- **Changes don't appear**: VitePress has hot reload, but sometimes requires browser refresh
- **Version info missing**: Run `npm run dev` or `npm run build` to trigger pre-scripts
- **Build output empty**: Check for errors in config.ts or content front matter syntax
- **Images not loading**: Ensure images are in `docs/public/` and referenced with absolute paths (e.g., `/img/...`)
- **Navigation not working**: Verify sidebar configuration in config.ts matches actual file structure
- **Mermaid diagrams not rendering**: Ensure vitepress-plugin-mermaid is configured in config.ts
- **Build takes too long**: Clear cache directory: `rm -rf docs/.vitepress/cache`
- **Module not found errors**: Delete node_modules and package-lock.json, then run `npm install`
- **Latest docs not updating**: Run `npm run dev` or `npm run build` to regenerate /latest/ directory
- **Dead link errors**: The build fails on dead links. Update or fix the link in source files.

**General Tips:**

- Always run npm commands from repository root
- Check browser console for client-side errors
- Use `npm run build` to catch production-only issues
- Review VitePress documentation at https://vitepress.dev for advanced troubleshooting

## Important Notes

- **Production System**: VitePress is the active documentation system
- **Hosting**: Cloudflare Pages with automatic deployment on commits to `main` branch
- **Version Management**: Butler version is automatically fetched from GitHub before each build
- **Latest Docs**: `/latest/` directory is auto-generated from the latest version
- **Hot Reload**: Development server provides instant feedback for content and configuration changes
- **Static Assets**: All images, PDFs, and other assets must be in `docs/public/`
- **Component Support**: Vue components can be created in `.vitepress/components/` and used in Markdown
- **The main Butler project repository** is separate at github.com/ptarmiganlabs/butler
- **Legacy files**: Hugo-related files archived in `/hugo-archive` and migration docs in `/vitepress-migration-docs` are not maintained and should not be edited

## Things to Do Every Time Copilot Works on This Project

- **Update front page**: Update the section on the site's front page where new features in the latest version are highlighted
  - Update the version number if needed
  - Only highlight a few (the most valuable/coolest/important) features, to avoid that section becoming too large
- **Content accuracy**: Ensure documentation accurately reflects the current state of Butler
- **Testing**: Always test changes with `npm run dev` and verify content renders correctly
- **Versioned links**: When editing source content in `v16.0/` or `v17.0/`, use version-specific paths (e.g., `/v17.0/about/`). Do not edit files under `docs/latest/` directly.

## VitePress Features

- **Custom Containers**: Use `:::tip`, `:::warning`, `:::danger`, `:::info` for callouts
- **Code Groups**: Tab between code examples in different languages
- **Front Matter**: Configure page layout, sidebar, outline depth per page
- **Component Import**: Import and use Vue components anywhere in Markdown
- **Emoji Support**: Use standard emoji syntax 😊
- **Table of Contents**: Automatically generated from headings (configurable depth)

## OpenAPI Documentation

- OpenAPI specs stored in `docs/public/openapi/`
- Rendered using vitepress-openapi plugin (and swagger-ui for some pages)
- Configure in `.vitepress/config.ts` to integrate API docs

````
