# Butler Documentation Site

Butler documentation site documents [Butler](https://github.com/ptarmiganlabs/butler), an open source tool that adds superpowers to Qlik Sense. The site is currently hosted at butler.ptarmiganlabs.com.

**IMPORTANT**: This repository is in transition from Hugo to VitePress:
- **Current production site**: Hugo-based using the Docsy theme (content in `/content/en`, static assets in `/static`)
- **Future site**: VitePress-based (content in `/vitepress-site`, static assets in `/vitepress-site/docs/public`)
- Both systems may coexist during the migration period

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

**Choose the appropriate system based on your task:**
- **Hugo (current production)**: Use for immediate fixes and content updates that need to go live
- **VitePress (future)**: Use for new development and migration work

### Hugo System (Current Production)

Bootstrap, build, and test the Hugo repository:
- Download and install Hugo 0.146+ extended: `wget https://github.com/gohugoio/hugo/releases/download/v0.146.4/hugo_extended_0.146.4_linux-amd64.tar.gz && tar -xzf hugo_extended_0.146.4_linux-amd64.tar.gz && sudo mv hugo /usr/local/bin/`
- Verify Hugo: `hugo version` (should show v0.146.4+ extended)
- Install npm dependencies: `npm install` -- takes 1 second. Set timeout to 30+ seconds.
- Download Go modules for Docsy theme: `hugo mod get` -- takes 1 second. Set timeout to 30+ seconds.
- Build the site: `hugo build` -- takes 3-5 seconds. NEVER CANCEL. Set timeout to 60+ seconds. 
  - NOTE: Build will show 6-7 KaTeX CDN errors but still completes successfully (exit code 0) and produces working site
- Verify the build: Check that `./docs/index.html` exists and contains Butler content

### VitePress System (Migration Target)

**Note**: VitePress setup commands will be added as the migration progresses. Check for `/vitepress-site` directory to determine if VitePress work has begun in your branch.

## Validation

**Hugo System:**
- ALWAYS manually validate documentation changes by building the site: `hugo build`
- Verify build succeeds (exit code 0) even with 6-7 expected KaTeX CDN errors
- Check that content appears in the built site: `ls ./docs/index.html` and verify size > 25KB
- For new content, verify the proper HTML files are generated in `./docs` directory
- The development server (`hugo server`) will fail due to KaTeX CDN errors - use build validation instead
- No formal tests exist - validation is manual through build verification

**VitePress System:**
- Validation commands will be documented as the VitePress migration progresses

## Build Details

- **CRITICAL**: Hugo 0.146+ extended is required. Earlier versions fail with Docsy theme compatibility errors
- Build time: 3-5 seconds (fast builds, but wait for completion)
- Build output: Static site files go to `./docs` directory for GitHub Pages publishing
- KaTeX CDN errors: Expected and harmless - the theme tries to load math libraries but network restrictions cause 6-7 errors
- Dependencies: Go 1.20+, Hugo 0.146+ extended, npm packages (autoprefixer, postcss)
- Development server does NOT work due to KaTeX CDN errors - use `hugo build` for validation

## Common Tasks

The following are outputs from frequently run commands to save time:

### Repository root structure
```
.
├── README.md
├── hugo.yaml              # Main Hugo configuration
├── package.json           # npm dependencies
├── go.mod                 # Go module dependencies  
├── content/               # Hugo documentation content
│   └── en/               # English content
│       ├── _index.md     # Homepage
│       └── docs/         # Documentation sections
├── docs/                 # Built Hugo site (GitHub Pages output)
├── layouts/              # Hugo layout overrides
├── static/               # Hugo static assets
├── themes/               # Local themes
│   └── hugo-notice/      # Notice shortcode theme
└── vitepress-site/       # VitePress migration (future)
    └── docs/
        └── public/       # VitePress static assets
```

### Key commands

**Hugo System:**
- `hugo build` - Build static site to ./docs (3-5 seconds, expect KaTeX CDN errors)
- `hugo mod get` - Download/update Go module dependencies (1 second)
- `npm install` - Install npm dependencies for CSS processing (1 second)
- `hugo version` - Check Hugo version (need 0.146+ extended)
- Development server not usable due to CDN errors - use build validation instead

**VitePress System:**
- Commands will be documented as VitePress migration progresses

### Configuration files
- `hugo.yaml` - Main site configuration with theme settings
- `package.json` - npm dependencies (autoprefixer, postcss, postcss-cli)
- `go.mod` - Go modules for Docsy theme and extensions

### Content structure

**Hugo System (current production):**
The site uses Hugo's page bundles in `content/en/docs/`:
- `getting started/` - Installation and setup guides  
- `concepts/` - Feature explanations
- `examples/` - Usage examples and tutorials
- `reference/` - API and configuration reference

**VitePress System (migration target):**
Content will be organized in `/vitepress-site` - structure will be documented as migration progresses.

### Common troubleshooting
- If build fails with theme errors: Ensure Hugo 0.146+ extended is installed
- If KaTeX errors appear: These are expected CDN connectivity issues and don't affect the build (exit code 0)
- If CSS changes don't appear: Run `npm install` to ensure PostCSS processors are available
- If modules are missing: Run `hugo mod get` to download theme dependencies
- Development server fails: Expected due to KaTeX CDN errors - use `hugo build` for validation
- Build takes longer than 10 seconds: Normal, wait for completion, do not cancel

## Important Notes

- **Migration Status**: The repository is transitioning from Hugo to VitePress. Check for `/vitepress-site` directory to determine migration progress in your branch
- **Current Production**: Hugo site publishes to GitHub Pages from the `./docs` directory
- **Future Production**: VitePress will use `/vitepress-site/docs/public` for static assets
- No CI/CD workflows exist - building and publishing is manual
- The Docsy theme (Hugo) requires Hugo extended (with SCSS support)
- Content is in Markdown with system-specific shortcodes for enhanced formatting
- The main Butler project repository is separate at github.com/ptarmiganlabs/butler

## Editing Content

**Hugo System (current production):**
- All content files are in `content/en/docs/` with Markdown (.md) extension
- Use Hugo shortcodes for notices, code blocks, and other enhanced elements
- Front matter includes title, description, and navigation weight
- Images go in the same directory as the content or in `/static/`
- Always test content changes with `hugo build` and verify output in `./docs`
- Validation: Check that `./docs/index.html` is generated and contains expected content

**VitePress System (migration target):**
- Content editing guidelines will be documented as VitePress migration progresses
- Static assets will be in `/vitepress-site/docs/public/`

## Theme Customization

- Custom layouts go in `/layouts` to override Docsy defaults
- Site parameters are configured in `hugo.yaml` under `params:`
- Custom CSS and JavaScript can be added via layouts or static files
- The hugo-notice theme provides notice/alert shortcodes