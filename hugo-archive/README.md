# Hugo Archive

This directory contains the archived Hugo-based documentation site that was previously the primary documentation for Butler. The site has been migrated to VitePress, but this archive is kept for reference and to ensure that no content was lost during the migration.

## Contents

This archive contains:

- `content/` - Original Hugo content files (Markdown)
- `layouts/` - Hugo layout templates
- `static/` - Static assets (images, CSS, JS)
- `themes/` - Hugo themes (Docsy theme)
- `assets/` - Additional assets
- `resources/` - Hugo generated resources
- `docs/` - Built Hugo site output
- Configuration files: `hugo.yaml`, `hugo._toml`, `config_old.toml`
- `go.mod`, `go.sum` - Go module files for Hugo
- `.hugo_build.lock` - Hugo build lock file
- `.gitmodules` - Git submodules configuration (for themes)
- `deploy-hugo.yml` - Original GitHub Actions workflow for deploying the Hugo site

## Running the Hugo Site Locally

If you need to run the archived Hugo site for reference or to verify migration content:

### Prerequisites

1. Install Hugo Extended (version 0.143.1 or later):

   - macOS: `brew install hugo`
   - Or download from: https://github.com/gohugoio/hugo/releases

2. Install Dart Sass (required for Docsy theme):
   - macOS: `brew install sass/sass/sass`

### Steps to Run

1. Navigate to this directory:

   ```bash
   cd hugo-archive
   ```

2. Initialize and update Git submodules (for themes):

   ```bash
   git submodule update --init --recursive
   ```

3. Install Node.js dependencies (if any):

   ```bash
   npm install
   ```

4. Start the Hugo development server:

   ```bash
   hugo server --config hugo.yaml
   ```

5. Open your browser to the URL shown in the terminal (typically http://localhost:1313)

## Building the Hugo Site

To build the static site:

```bash
hugo --config hugo.yaml --gc --minify
```

The built site will be in the `docs/` directory.

## Deployment

The original deployment workflow (`deploy-hugo.yml`) is included here for reference. To deploy the Hugo site using GitHub Pages:

1. Copy `deploy-hugo.yml` back to `.github/workflows/` in the repository root
2. Modify the workflow as needed for your deployment target
3. Note: You may need to adjust paths since the Hugo files are now in `hugo-archive/`

## Migration Notes

- The site was migrated to VitePress on October 12, 2025
- Migration documentation can be found in the `vitepress-migration-docs/` directory at the repository root
- The VitePress site is now the primary documentation site

## Theme Information

This site uses the [Docsy](https://www.docsy.dev/) theme for Hugo, which is included as a Git submodule in the `themes/` directory.

## Questions or Issues

If you discover content that didn't migrate correctly or need to reference the original Hugo content, this archive preserves the complete working state of the Hugo site as it existed before migration.
