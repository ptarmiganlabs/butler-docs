# Migration from Hugo to VitePress

**Date:** October 12, 2025

## Summary

This repository has been restructured to make VitePress the primary documentation platform, while preserving the Hugo site for archival purposes.

## Changes Made

### 1. Repository Structure

**Before:**

```
butler-docs/
├── content/          # Hugo content
├── layouts/          # Hugo layouts
├── static/           # Hugo static files
├── themes/           # Hugo themes
├── docs/             # Hugo build output
├── vitepress-site/   # VitePress site (subdirectory)
│   ├── docs/
│   ├── package.json
│   └── ...
└── ...
```

**After:**

```
butler-docs/
├── docs/             # VitePress site (now at root)
│   ├── .vitepress/
│   ├── docs/
│   └── public/
├── scripts/          # VitePress scripts
├── package.json      # VitePress dependencies
├── hugo-archive/     # Archived Hugo site
│   ├── content/
│   ├── layouts/
│   ├── static/
│   ├── themes/
│   ├── docs/
│   ├── hugo.yaml
│   ├── deploy-hugo.yml
│   └── README.md     # Instructions for running Hugo site
└── vitepress-migration-docs/  # Migration documentation
```

### 2. Files Moved to Archive

All Hugo-related files have been moved to `hugo-archive/`:

- `content/` - Hugo content files
- `layouts/` - Hugo layout templates
- `static/` - Static assets
- `themes/` - Hugo themes (Docsy)
- `assets/` - Additional assets
- `resources/` - Hugo generated resources
- `docs/` - Built Hugo site output (moved to archive)
- Configuration files: `hugo.yaml`, `hugo._toml`, `config_old.toml`
- Go files: `go.mod`, `go.sum`
- `.hugo_build.lock`
- `.gitmodules`
- `featured-background.jpg`
- `deploy-hugo.yml` - Original GitHub Actions workflow

### 3. VitePress Site Promoted to Root

The VitePress site has been moved from `vitepress-site/` to the repository root:

- `vitepress-site/docs/` → `docs/`
- `vitepress-site/scripts/` → `scripts/`
- `vitepress-site/package.json` → `package.json`
- `vitepress-site/package-lock.json` → `package-lock.json`
- `vitepress-site/node_modules/` → `node_modules/`

### 4. GitHub Actions Workflow Updates

**`.github/workflows/deploy-vitepress.yml`:**

- Updated to build from repository root instead of `vitepress-site/` subdirectory
- Removed `working-directory` directives
- Updated artifact path from `vitepress-site/docs/.vitepress/dist` to `docs/.vitepress/dist`
- Updated trigger to ignore `hugo-archive/**` and `vitepress-migration-docs/**`

**`.github/workflows/deploy-hugo.yml`:**

- Moved to `hugo-archive/deploy-hugo.yml` for reference
- No longer active in the GitHub Actions workflow directory

### 5. Documentation Updates

**`README.md`:**

- Updated to reflect VitePress as the primary documentation platform
- Added development instructions (npm run dev, build, serve)
- Added reference to Hugo archive
- Added reference to migration documentation

**`hugo-archive/README.md`:**

- Created comprehensive guide for running the archived Hugo site
- Includes prerequisites (Hugo Extended, Dart Sass)
- Step-by-step instructions for local development
- Build and deployment notes
- Theme information (Docsy)

**`.gitignore`:**

- Updated paths to reflect new structure
- VitePress cache and dist now at `docs/.vitepress/`
- Hugo resources in `hugo-archive/` are ignored

### 6. Migration Documentation Archive

Created `vitepress-migration-docs/` directory containing:

- `ALERT_EMAILS_PAGE_EXAMPLE.md`
- `IMAGE_CONVERSION_SUMMARY.md`
- `IMAGE_ENHANCEMENT_README.md`
- `IMAGE_ENHANCEMENT_SUMMARY.md`
- `RESPONSIVE_IMAGE_REFERENCE.md`

## Verification

The VitePress site has been successfully built from the new root location:

```bash
npm run build
# ✓ building client + server bundles...
# ✓ rendering pages...
# ✓ generating sitemap...
# build complete in 9.73s.
```

## Running the Documentation Sites

### VitePress (Primary)

From the repository root:

```bash
npm install
npm run dev      # Start development server
npm run build    # Build for production
npm run serve    # Preview production build
npm run deploy   # Trigger GitHub Actions deployment (requires GitHub CLI)
```

**Note:** The `npm run deploy` command triggers the GitHub Actions workflow using the GitHub CLI (`gh`), ensuring all deployments use the same method and configuration.

### Hugo (Archived)

See `hugo-archive/README.md` for detailed instructions.

## Deployment

The GitHub Actions workflow automatically deploys the VitePress site to GitHub Pages when changes are pushed to the `main` branch (excluding changes to `hugo-archive/` and `vitepress-migration-docs/`).

**Manual deployment options:**

1. **Using npm command** (requires [GitHub CLI](https://cli.github.com/)): `npm run deploy`
2. **Using GitHub CLI directly**: `gh workflow run deploy-vitepress.yml`
3. **Via GitHub web interface**: Go to Actions → Deploy VitePress site to Pages → Run workflow

All methods trigger the same GitHub Actions workflow, ensuring consistent deployments.

## Rollback Information

If you need to revert to Hugo:

1. Copy `hugo-archive/deploy-hugo.yml` back to `.github/workflows/`
2. Update paths in the workflow to point to `hugo-archive/`
3. Disable the VitePress workflow if needed

## Notes

- All Hugo files remain functional in the archive
- Git submodules for Hugo themes are preserved
- The built Hugo site (docs/) is included in the archive for reference
- No content was lost during the migration
- Both sites can coexist if needed

## Contact

For questions about this migration or the archived Hugo site, please refer to the respective README files or open an issue in the repository.
