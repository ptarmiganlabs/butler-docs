# Quick Reference: Using ResponsiveImage Component

## Basic Usage

```vue
<ResponsiveImage src="/img/example.png" alt="Description of the image" />
```

## With Caption

```vue
<ResponsiveImage
  src="/img/example.png"
  alt="Description of the image"
  caption="This caption appears below the image"
/>
```

## Common Size Patterns

### Mobile Screenshots (400px)

```vue
<ResponsiveImage
  src="/img/mobile-screenshot.png"
  alt="Mobile app screenshot"
  maxWidth="400px"
/>
```

### Desktop/QMC Screenshots (900px)

```vue
<ResponsiveImage
  src="/img/qmc-configuration.png"
  alt="Qlik Management Console configuration"
  maxWidth="900px"
/>
```

### General Images (800px - default)

```vue
<ResponsiveImage src="/img/diagram.png" alt="System architecture diagram" />
```

## All Available Props

| Prop       | Type    | Default    | Description                        |
| ---------- | ------- | ---------- | ---------------------------------- |
| `src`      | String  | _required_ | Path to the image file             |
| `alt`      | String  | `""`       | Alt text for accessibility         |
| `maxWidth` | String  | `"800px"`  | Maximum width of the image         |
| `caption`  | String  | `""`       | Caption text displayed below image |
| `zoomable` | Boolean | `true`     | Enable click-to-zoom functionality |
| `centered` | Boolean | `true`     | Center the image horizontally      |

## Features

- ✨ **Click-to-zoom** - Images zoom on click (via medium-zoom)
- 📱 **Responsive** - Automatically scales on mobile devices
- 🎨 **Styled** - Rounded corners, shadows, hover effects
- 🌙 **Dark mode** - Adapts to light/dark themes
- ♿ **Accessible** - Proper alt text support

## When NOT to Use

**Don't use ResponsiveImage for:**

1. **Images in tables** - Use standard markdown syntax:

   ```markdown
   | ![Alt text](/img/example.png) | Description |
   ```

2. **Images that should not zoom** - Set `zoomable="false"`:
   ```vue
   <ResponsiveImage src="/img/icon.png" alt="Small icon" zoomable="false" />
   ```

## Automatic Conversion

Use the conversion script to batch-convert markdown images:

```bash
# Preview changes
node scripts/convert-images.js --dry-run

# Apply changes
node scripts/convert-images.js
```

The script intelligently:

- Converts `![alt](src)` → `<ResponsiveImage />`
- Preserves titles as captions
- Sets appropriate maxWidth based on filename
- Skips images in tables
- Handles malformed markdown syntax
