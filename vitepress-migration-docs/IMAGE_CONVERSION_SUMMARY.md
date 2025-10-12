# Image Conversion Summary

## Overview

All images in the VitePress site have been converted to use the custom `ResponsiveImage` Vue component for scalable and zoomable images.

## Conversion Statistics

- **Total markdown files processed**: 125
- **Files modified**: 24
- **Images converted**: 54 images
- **Images in tables (not converted)**: 8 images

## What Was Done

### 1. Created Conversion Script

A Node.js script (`scripts/convert-images.js`) was created to automatically convert markdown image syntax to the `ResponsiveImage` component.

The script:

- Scans all markdown files in the docs directory
- Converts standard markdown images: `![alt](src)` → `<ResponsiveImage src="..." alt="..." />`
- Handles images with titles: `![alt](src "title")` → adds `caption="title"`
- Handles malformed images: `![alt](src title)` → adds `caption="title"`
- Intelligently sets `maxWidth` based on filename patterns:
  - Mobile screenshots: `400px`
  - QMC/desktop/overview images: `900px`
  - Default: `800px`
- Skips images in tables (Vue components don't work in markdown tables)
- Preserves images already using Vue components

### 2. Converted Images

All 54 standalone images have been converted. The script successfully handled:

#### Standard Images

```markdown
![Butler architecture](/img/butler-system-overview-1.png)
```

Converted to:

```vue
<ResponsiveImage
  src="/img/butler-system-overview-1.png"
  alt="Butler architecture"
  maxWidth="900px"
/>
```

#### Images with Titles

```markdown
![Open the new channel window](/img/butler-teams-create-channel-1.png "Open the new channel window")
```

Converted to:

```vue
<ResponsiveImage
  src="/img/butler-teams-create-channel-1.png"
  alt="Open the new channel window"
  caption="Open the new channel window"
/>
```

#### Mobile Screenshots

```markdown
![Failed reload alert email on mobile](/img/reload-fail-alert-email-mobile-1.png)
```

Converted to:

```vue
<ResponsiveImage
  src="/img/reload-fail-alert-email-mobile-1.png"
  alt="Failed reload alert email on mobile"
  maxWidth="400px"
/>
```

### 3. Files Modified

The following files were updated with ResponsiveImage components:

1. `.vitepress/IMAGE_ENHANCEMENT_README.md` - 2 images
2. `docs/about/butler.md` - 1 image
3. `docs/concepts/teams-messaging.md` - 12 images
4. `docs/examples/image-usage.md` - 2 images
5. `docs/getting-started/operations/index.md` - 2 images
6. `docs/getting-started/setup/data-connections/index.md` - 3 images
7. `docs/getting-started/setup/incident-mgmt-tools/signl4/index.md` - 1 image
8. `docs/getting-started/setup/reload-script-logs/index.md` - 2 images
9. `docs/getting-started/setup/rest-api/index.md` - 1 image
10. `docs/getting-started/setup/task-alerts/client-managed/alert-emails/index.md` - 3 images
11. `docs/getting-started/setup/task-alerts/client-managed/alert-mqtt/index.md` - 2 images
12. `docs/getting-started/setup/task-alerts/client-managed/alert-slack/index.md` - 2 images
13. `docs/getting-started/setup/task-alerts/client-managed/alert-teams/index.md` - 2 images
14. `docs/getting-started/setup/task-alerts/client-managed/index.md` - 2 images
15. `docs/getting-started/setup/task-alerts/cloud/alert-emails/index.md` - 1 image
16. `docs/getting-started/setup/task-alerts/cloud/alert-slack/index.md` - 2 images
17. `docs/getting-started/setup/task-alerts/cloud/alert-teams/index.md` - 2 images
18. `docs/getting-started/setup/task-alerts/cloud/index.md` - 2 images
19. `docs/getting-started/setup/visualise-config-file/index.md` - 2 images
20. `docs/getting-started/setup/windows-service-monitor/mqtt/index.md` - 1 image
21. `docs/getting-started/setup/windows-service-monitor/new-relic/index.md` - 2 images
22. `docs/getting-started/setup/windows-service-monitor/slack/index.md` - 1 image
23. `docs/getting-started/setup/windows-service-monitor/teams/index.md` - 1 image
24. `docs/getting-started/setup/windows-service-monitor/webhook-out/index.md` - 3 images

### 4. Images Not Converted

8 images remain in standard markdown format because they are inside tables. Vue components don't render properly inside markdown tables, so these were intentionally skipped:

**File**: `docs/getting-started/setup/data-connections/index.md`

- 4 images in the Butler_GET data connection table
- 4 images in the Butler_POST data connection table

These images will still benefit from the medium-zoom plugin that's applied to all markdown images automatically.

## Features Provided by ResponsiveImage

All converted images now have:

✅ **Click-to-zoom** - Click any image to see full size via medium-zoom  
✅ **Responsive sizing** - Images scale appropriately on mobile devices  
✅ **Size constraints** - Intelligent max-width based on image type  
✅ **Professional styling** - Rounded corners, shadows, hover effects  
✅ **Dark mode support** - Automatic adaptation to dark theme  
✅ **Captions** - Support for image captions when titles are provided  
✅ **Consistent presentation** - All images follow the same visual style

## How to Use Going Forward

### For New Images

Use the ResponsiveImage component:

```vue
<ResponsiveImage
  src="/img/example.png"
  alt="Description"
  maxWidth="800px"
  caption="Optional caption"
/>
```

### Properties

- `src` (required) - Path to the image
- `alt` (required) - Alt text for accessibility
- `maxWidth` (optional) - Maximum width (default: `800px`)
  - Use `400px` for mobile screenshots
  - Use `900px` for desktop/QMC screenshots
  - Use `800px` for general images
- `caption` (optional) - Text to display below the image
- `zoomable` (optional) - Enable/disable zoom (default: `true`)
- `centered` (optional) - Center the image (default: `true`)

### For Images in Tables

Continue using standard markdown syntax:

```markdown
| ![Alt text](/img/example.png) | Description |
```

These will still get automatic zoom functionality from medium-zoom.

## Script Usage

To convert images in the future:

```bash
# Dry run to preview changes
node scripts/convert-images.js --dry-run

# Verbose output
node scripts/convert-images.js --dry-run --verbose

# Apply changes
node scripts/convert-images.js
```

## Testing

To verify the changes:

1. Start the dev server:

   ```bash
   cd /Users/goran/code/butler-docs/vitepress-site
   npm run docs:dev
   ```

2. Navigate to any page with images
3. Click on images to verify zoom functionality
4. Resize browser to test responsive behavior
5. Toggle dark mode to verify dark mode support

## Notes

- The markdown linter may show warnings about "inline HTML" for the `<ResponsiveImage>` components. This is expected and safe to ignore - VitePress is designed to work with Vue components in markdown.
- All images maintain their original paths and alt text
- The conversion preserves all existing captions and titles as component captions
