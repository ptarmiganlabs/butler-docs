# VitePress Migration Plan

This document outlines the migration plan from Hugo (with Docsy theme) to VitePress for the Butler documentation site.

## Migration Overview

### Why VitePress?

- **Modern interactivity**: Vue.js-based components and modern development experience
- **Better performance**: Vite-powered development and build process
- **Improved maintainability**: Simpler configuration and component-based architecture
- **Modern look**: Clean, modern design similar to sites like https://beszel.dev

### Migration Status

✅ **Completed**

- [x] VitePress site scaffolding
- [x] Basic configuration and branding
- [x] GitHub Pages deployment setup
- [x] Proof-of-concept with 3 pages migrated
- [x] Hugo shortcodes → VitePress equivalents mapping
- [x] Build and deployment automation

🚧 **In Progress**

- [ ] Custom Vue components for remaining Hugo shortcodes
- [ ] Batch content migration
- [ ] Theme customization

⏳ **Planned**

- [ ] Complete content migration (140+ pages)
- [ ] Custom CSS styling to match Butler branding
- [ ] Advanced features (print views, advanced search)
- [ ] Performance testing and optimization

## Features Comparison

### Features Maintained in VitePress

| Feature                 | Hugo/Docsy | VitePress  | Status        |
| ----------------------- | ---------- | ---------- | ------------- |
| Responsive design       | ✅         | ✅         | ✅ Maintained |
| Search functionality    | ✅ (Local) | ✅ (Local) | ✅ Maintained |
| Navigation/Sidebar      | ✅         | ✅         | ✅ Maintained |
| Analytics (Plausible)   | ✅         | ✅         | ✅ Maintained |
| GitHub Pages deployment | ✅         | ✅         | ✅ Maintained |
| Markdown support        | ✅         | ✅         | ✅ Maintained |
| Custom domain           | ✅         | ✅         | ✅ Maintained |

### Features Replaced/Improved

| Feature                      | Hugo/Docsy       | VitePress Equivalent                    | Notes                       |
| ---------------------------- | ---------------- | --------------------------------------- | --------------------------- |
| `{{< notice >}}` shortcode   | Custom shortcode | `::: tip/warning/info` or Vue component | Native VitePress containers |
| `{{% pageinfo %}}` shortcode | Custom shortcode | Custom Vue component                    | Need to create              |
| `{{< blocks/feature >}}`     | Docsy shortcode  | Hero feature cards                      | Modern layout               |
| Print views                  | Built-in         | Custom implementation needed            | Lower priority              |
| Multiple output formats      | Hugo feature     | Single format (HTML)                    | Simplified                  |

### Features Lost (Acceptable Trade-offs)

- **Print views**: Complex to implement in VitePress, low usage
- **Multiple language support**: Configured but not used in current site
- **Some Docsy-specific layouts**: Replaced with modern equivalents

### Features Gained

- **Vue.js interactivity**: Rich interactive components
- **Modern development experience**: Hot reload, TypeScript support
- **Better performance**: Faster build times and runtime performance
- **Component reusability**: Vue components can be shared across pages
- **Modern design**: Clean, contemporary look

## Directory Structure

### Current Hugo Structure

```
/
├── content/en/docs/           # Markdown content
├── layouts/                   # Hugo templates
├── themes/                    # Hugo themes
├── static/                    # Static assets
├── hugo.yaml                  # Hugo configuration
└── docs/                      # Build output
```

### New VitePress Structure

```
vitepress-site/
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts          # VitePress configuration
│   │   ├── components/        # Vue components
│   │   └── dist/              # Build output
│   ├── docs/                  # Migrated content
│   ├── public/                # Static assets (CNAME, etc.)
│   └── index.md               # Homepage
└── package.json               # Dependencies
```

## Migration Process

### Phase 1: Foundation (Completed)

1. ✅ Scaffold VitePress site using `npm init vitepress@latest`
2. ✅ Configure basic settings (title, description, base URL)
3. ✅ Set up navigation and sidebar structure
4. ✅ Create homepage with hero layout and feature cards
5. ✅ Migrate 3 proof-of-concept pages

### Phase 2: Infrastructure (Completed)

1. ✅ Set up GitHub Actions workflows for deployment
2. ✅ Configure custom domain (butler.ptarmiganlabs.com)
3. ✅ Add analytics integration (Plausible)
4. ✅ Set up local search functionality

### Phase 3: Content Migration (In Progress)

1. 🚧 Create Vue components for Hugo shortcodes
2. ⏳ Batch migrate content files (priority order):
   - Getting Started section
   - Concepts section
   - Examples section
   - Reference section
3. ⏳ Update internal links and cross-references
4. ⏳ Migrate images and static assets

### Phase 4: Customization (Planned)

1. ⏳ Custom CSS theme to match Butler branding
2. ⏳ Advanced components (if needed)
3. ⏳ Performance optimization
4. ⏳ SEO optimization

### Phase 5: Testing & Launch (Planned)

1. ⏳ Comprehensive link checking
2. ⏳ Performance comparison with Hugo site
3. ⏳ User acceptance testing
4. ⏳ Switch DNS/deployment to VitePress site

## Content Migration Guide

### Hugo Shortcode Mapping

#### Notice Blocks

**Hugo:**

```hugo
{{< notice tip >}}
This is a tip notice.
{{< /notice >}}
```

**VitePress:**

```markdown
::: tip
This is a tip notice.
:::
```

#### Page Info Blocks

**Hugo:**

```hugo
{{% pageinfo %}}
Important page information here.
{{% /pageinfo %}}
```

**VitePress:**

```vue
<Notice type="info" title="Page Info">
Important page information here.
</Notice>
```

### Link Updates

- Hugo: `/docs/section/page/` → VitePress: `/docs/section/page`
- Remove trailing slashes from internal links
- Update relative links as needed

## Deployment Strategy

### GitHub Actions Workflows

1. **VitePress Deployment** (`deploy-vitepress.yml`)

   - Triggers on changes to `vitepress-site/**`
   - Builds and deploys VitePress site to GitHub Pages

2. **Hugo Deployment** (`deploy-hugo.yml`)
   - Maintains current Hugo site as fallback
   - Triggers on changes outside `vitepress-site/`

### Custom Domain

- CNAME file included in VitePress build
- Same domain (butler.ptarmiganlabs.com) maintained

## Build Commands

### Development

```bash
cd vitepress-site
npm install
npm run dev
```

### Production Build

```bash
cd vitepress-site
npm run build
```

### Preview Build

```bash
cd vitepress-site
npm run serve
```

## Performance Benefits

### Expected Improvements

- **Faster build times**: Vite is typically faster than Hugo for complex sites
- **Better development experience**: Hot reload, instant updates
- **Modern JavaScript**: Tree-shaking, efficient bundling
- **Optimized assets**: Automatic optimization and compression

### Benchmarks (To be measured)

- [ ] Build time comparison
- [ ] Page load speed comparison
- [ ] Bundle size comparison
- [ ] Lighthouse scores comparison

## Migration Checklist

### Pre-Migration

- [x] Analyze current Hugo site structure
- [x] Identify all shortcodes and custom features
- [x] Plan VitePress equivalent implementations
- [x] Set up development environment

### Migration Execution

- [x] Scaffold VitePress site
- [x] Configure basic settings and navigation
- [x] Create deployment automation
- [x] Migrate proof-of-concept pages
- [ ] Create custom Vue components for shortcodes
- [ ] Batch migrate all content (140+ pages)
- [ ] Update all internal links
- [ ] Migrate static assets and images

### Post-Migration

- [ ] Comprehensive testing
- [ ] Performance optimization
- [ ] SEO validation
- [ ] User feedback collection
- [ ] Documentation updates

## Risk Assessment

### Low Risk

- ✅ Basic Markdown content migration
- ✅ Static asset handling
- ✅ GitHub Pages deployment
- ✅ Custom domain setup

### Medium Risk

- 🚧 Complex shortcode replacements
- 🚧 Maintaining exact styling/branding
- 🚧 Search functionality equivalency

### High Risk (Mitigated)

- ✅ GitHub Pages compatibility (validated)
- ✅ Build process automation (implemented)
- ✅ Content structure preservation (proven)

## Success Criteria

1. **Functional Parity**: All current features work equivalently
2. **Performance**: Same or better page load speeds
3. **Maintainability**: Easier to update and maintain
4. **Modern Experience**: Improved development workflow
5. **User Experience**: Same or better navigation and usability

## Rollback Plan

If issues arise:

1. Hugo deployment workflow remains active
2. Can switch back by updating GitHub Pages source
3. No data loss - both sites coexist during migration
4. DNS change can be reverted quickly

## Resources

- [VitePress Documentation](https://vitepress.vuejs.org/)
- [VitePress GitHub](https://github.com/vuejs/vitepress)
- [Vue.js Documentation](https://vuejs.org/)
- [GitHub Pages with VitePress](https://vitepress.vuejs.org/guide/deploy#github-pages)
