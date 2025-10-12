# Butler Documentation Site

Butler documentation site documents [Butler](https://github.com/ptarmiganlabs/butler), an open source tool that adds superpowers to Qlik Sense. The site is currently hosted at butler.ptarmiganlabs.com.

**IMPORTANT**: This repository uses VitePress for documentation:

- **Production site**: VitePress-based (all content at repository root)
- **Legacy Hugo files**: Archived in `/hugo-archive` directory. No longer maintained.
- **All work**: Must be done in the repository root where VitePress files are located

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

**VitePress Documentation System:**

- All documentation work is done at repository root
- Content files are in `/docs/docs/` organized by topic
- Static assets (images, OpenAPI specs, etc.) are in `/docs/public/`
- Configuration is in `/docs/.vitepress/config.ts`
- Custom components are in `/docs/.vitepress/components/`
- Theme customization is in `/docs/.vitepress/theme/`
- **Source code repository**: The main Butler project is at github.com/ptarmiganlabs/butler, and included in this VS Code workspace. The doc site shall correctly reflect the current state of that project, i.e. create content that describe the current features, configuration options, and behavior of Butler.

### VitePress System

Bootstrap, build, and test the VitePress documentation:

**Prerequisites:**

- Node.js 18+ and npm installed
- Git for version control

**Setup and Development:**

- Navigate to repository root: `cd /Users/goran/code/butler-docs`
- Install dependencies: `npm install` -- takes 10-20 seconds. Set timeout to 60+ seconds.
- Fetch Butler version info: `npm run pre:version` -- fetches current Butler version from GitHub
- Start development server: `npm run dev` -- takes 2-5 seconds, opens at http://localhost:5173
  - Development server includes hot reload for instant preview of changes
  - The pre:version script runs automatically before dev server starts
- Build the site: `npm run build` -- takes 10-30 seconds depending on content size
  - Builds static site to `/docs/.vitepress/dist`
  - Includes automatic version fetching via pre:version script
- Preview production build: `npm run serve` -- serves the built site locally
- Deploy to GitHub Pages: `npm run deploy` -- builds and publishes to gh-pages branch

**Working Directory:**

- All VitePress commands should be run from repository root directory
- Do not run VitePress commands from subdirectories

## Validation

**VitePress System:**

- ALWAYS validate documentation changes by running the development server: `npm run dev` (from repository root)
- Check that content renders correctly at http://localhost:5173
- Verify navigation works and pages are accessible
- For production validation: `npm run build` and check for build errors
- Build output goes to `/docs/.vitepress/dist`
- Verify build succeeds with exit code 0
- Preview production build: `npm run serve` to test the built site
- Check console for any errors or warnings during development
- Validate images and static assets load correctly from `/docs/public/`

## Build Details

**VitePress System:**

- **Node Version**: Requires Node.js 18+
- **Package Manager**: npm (package-lock.json present)
- **Build Time**: 10-30 seconds depending on content size
- **Dev Server**: Hot reload enabled, typically starts in 2-5 seconds
- **Build Output**: Static files in `/docs/.vitepress/dist`
- **Dependencies**:
  - VitePress 1.6.4+ (static site generator)
  - Vue 3.5+ (component framework)
  - Mermaid 11+ (diagram rendering)
  - vitepress-plugin-mermaid 2+ (Mermaid integration)
  - vitepress-openapi (API documentation)
  - swagger-ui-dist and swagger-ui-react (OpenAPI rendering)
- **Version Fetching**: Automatic Butler version fetching from GitHub via pre:version script
- **Caching**: VitePress uses `.vitepress/cache` for faster rebuilds

## Common Tasks

The following are outputs from frequently run commands to save time:

### Repository root structure

```
butler-docs/
├── README.md
├── package.json              # VitePress dependencies and scripts
├── docs/                     # Documentation root
│   ├── index.md             # Homepage
│   ├── .vitepress/          # VitePress configuration
│   │   ├── config.ts        # Main site configuration
│   │   ├── theme/           # Custom theme files
│   │   ├── components/      # Vue components
│   │   ├── cache/           # Build cache
│   │   ├── dist/            # Build output (generated)
│   │   └── version.js       # Butler version info (generated)
│   ├── docs/                # Documentation content
│   │   ├── getting-started/
│   │   ├── concepts/
│   │   ├── examples/
│   │   ├── reference/
│   │   ├── about/
│   │   └── security.md
│   └── public/              # Static assets
│       ├── img/             # Images
│       ├── openapi/         # OpenAPI specifications
│       └── favicons/        # Site icons
├── scripts/                 # Build scripts
│   └── fetch-butler-version.mjs
├── hugo-archive/            # LEGACY Hugo files (archived)
└── vitepress-migration-docs/ # Migration documentation
```

### Key commands

**VitePress System (all commands run from repository root):**

- `npm install` - Install all dependencies (10-20 seconds)
- `npm run pre:version` - Fetch current Butler version from GitHub
- `npm run dev` - Start development server with hot reload at http://localhost:5173 (includes pre:version)
- `npm run build` - Build production static site to `docs/.vitepress/dist` (includes pre:version)
- `npm run serve` - Preview production build locally (includes pre:version)
- `npm run deploy` - Build and deploy to GitHub Pages gh-pages branch

**Important Notes:**

- Development server provides instant feedback with hot module replacement
- All npm scripts automatically fetch Butler version info before running
- Build output is optimized for production with minification and tree-shaking
- Cache directory speeds up subsequent builds

### Configuration files

**VitePress System:**

- `/package.json` - Dependencies and npm scripts
- `/docs/.vitepress/config.ts` - Main site configuration (navigation, theme, plugins)
- `/docs/.vitepress/theme/index.ts` - Custom theme configuration
- `/scripts/fetch-butler-version.mjs` - Butler version fetching script
- `/docs/.vitepress/version.js` - Generated Butler version info (auto-created)

### Content structure

**VitePress System:**

The site uses a nested directory structure in `/docs/docs/`:

- `getting-started/` - Installation and setup guides
- `concepts/` - Feature explanations and architectural concepts
- `examples/` - Usage examples and tutorials
- `reference/` - API documentation, configuration reference, and technical details
- `about/` - Project information, changelog, contributing guidelines
- `security.md` - Security policies and vulnerability reporting
- `legal-stuff.md` - License and legal information

**Content Format:**

- All content is in Markdown (.md) files
- Each directory typically has an `index.md` for the section overview
- Front matter includes title, description, and optional custom layout
- Vue components can be embedded directly in Markdown
- Mermaid diagrams supported via fenced code blocks with `mermaid` language tag
- Use the custom component <ResponsiveImage> for including images with captions and zoom functionality (see `/docs/docs/.vitepress/IMAGE_ENHANCEMENT_SUMMARY.md` for details)

### Common troubleshooting

**VitePress Issues:**

- **Build fails with dependency errors**: Run `npm install` to ensure all dependencies are installed
- **Dev server won't start**: Check that port 5173 is not already in use
- **Changes don't appear**: VitePress has hot reload, but sometimes requires browser refresh
- **Version info missing**: Run `npm run pre:version` manually to fetch Butler version
- **Build output empty**: Check for errors in config.ts or content front matter syntax
- **Images not loading**: Ensure images are in `/docs/public/` and referenced with absolute paths (e.g., `/img/...`)
- **Navigation not working**: Verify sidebar configuration in config.ts matches actual file structure
- **Mermaid diagrams not rendering**: Ensure vitepress-plugin-mermaid is configured in config.ts
- **Build takes too long**: Clear cache directory: `rm -rf /docs/.vitepress/cache`
- **Module not found errors**: Delete node_modules and package-lock.json, then run `npm install`

**General Tips:**

- Always run VitePress commands from repository root
- Check browser console for client-side errors
- Use `npm run build` to catch production-only issues
- Review VitePress documentation at https://vitepress.dev for advanced troubleshooting

## Important Notes

- **Current System**: VitePress is the only active documentation system
- **Legacy Files**: Hugo-related files archived in `/hugo-archive` directory and migration docs in `/vitepress-migration-docs`
- **Production Publishing**: Site builds to `/docs/.vitepress/dist` and deploys via gh-pages branch
- **Version Management**: Butler version is automatically fetched from GitHub before each build/dev/serve command
- **Hot Reload**: Development server provides instant feedback for content and configuration changes
- **Static Assets**: All images, PDFs, and other assets must be in `/docs/public/`
- **Component Support**: Vue components can be created in `.vitepress/components/` and used in Markdown
- **The main Butler project repository** is separate at github.com/ptarmiganlabs/butler

## Editing Content

**VitePress System:**

- All content files are in `/docs/docs/` with Markdown (.md) extension
- Use standard Markdown syntax plus VitePress-specific features
- Front matter includes title, description, and optional layout settings
- Images and assets go in `/docs/public/` directory
- Reference images with absolute paths: `/img/my-image.png`
- Vue components can be embedded directly in Markdown files
- Mermaid diagrams: Use fenced code blocks with `mermaid` language tag
- Always test content changes with `npm run dev` (from repository root)
- Validation: Start dev server and verify content renders correctly at http://localhost:5173

**VitePress Features:**

- **Custom Containers**: Use `:::tip`, `:::warning`, `:::danger`, `:::info` for callouts
- **Code Groups**: Tab between code examples in different languages
- **Front Matter**: Configure page layout, sidebar, outline depth per page
- **Component Import**: Import and use Vue components anywhere in Markdown
- **Emoji Support**: Use standard emoji syntax 😊
- **Table of Contents**: Automatically generated from headings (configurable depth)

**OpenAPI Documentation:**

- OpenAPI specs stored in `/docs/public/openapi/`
- Rendered using vitepress-openapi plugin
- Configure in `.vitepress/config.ts` to integrate API docs

## Theme Customization

**VitePress Theme:**

- Custom theme files in `/docs/.vitepress/theme/`
- Main theme entry: `theme/index.ts` - imports default theme and applies customizations
- Custom CSS: Add styles in theme directory or import global CSS files
- Custom Vue components: Create in `.vitepress/components/` directory
- Layout customization: Override default VitePress layout components
- Site configuration: Modify `config.ts` for navigation, sidebar, theme colors, etc.
- Custom layouts: Define per-page in front matter using `layout:` field

**Theme Configuration in config.ts:**

- Navigation menu (top nav bar)
- Sidebar structure and grouping
- Social links (GitHub, Twitter, etc.)
- Search integration
- Edit link configuration
- Footer content
- Logo and site title
- Dark mode toggle

**Advanced Customization:**

- Override VitePress default components by creating same-named components in theme directory
- Use Vue's composition API for reactive custom components
- Access site configuration and page data via VitePress composables
- Add custom head tags via config.ts `head` property
