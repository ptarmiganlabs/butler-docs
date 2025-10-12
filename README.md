# Butler documentation site

This repository contains the [VitePress](https://vitepress.dev/) based documentation for [Butler](https://github.com/ptarmiganlabs/butler), which is an open source add-on tool for [Qlik Sense](https://www.qlik.com/us/products/qlik-sense).

The doc site created from this repository is available at [butler.ptarmiganlabs.com](https://butler.ptarmiganlabs.com).

## Development

To run the documentation site locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run serve

# Trigger deployment via GitHub Actions (requires GitHub CLI)
npm run deploy
```

## Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the `main` branch.

**Manual deployment options:**

1. **Using npm command** (requires [GitHub CLI](https://cli.github.com/)):

   ```bash
   npm run deploy
   ```

   This triggers the GitHub Actions workflow on your current branch.

2. **Using GitHub CLI directly**:

   ```bash
   gh workflow run deploy-vitepress.yml
   ```

3. **Via GitHub web interface**: Go to Actions → Deploy VitePress site to Pages → Run workflow

All methods use the same GitHub Actions workflow, ensuring consistent deployments.

## Hugo Archive

The previous Hugo-based documentation site has been archived in the `hugo-archive/` directory for reference and historical purposes. See the [Hugo Archive README](hugo-archive/README.md) for information on how to run the archived Hugo site if needed.

## Migration Documentation

Documentation about the VitePress migration process can be found in the `vitepress-migration-docs/` directory.
