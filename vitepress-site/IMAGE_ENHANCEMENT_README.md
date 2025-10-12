# Image Enhancement Implementation

This document explains the image enhancement features added to the Butler VitePress documentation.

## ✨ What Was Implemented

### 1. Medium-Zoom Plugin (Option 4)

- Click-to-zoom functionality on all images
- Smooth zoom animations
- Dark overlay background
- Works automatically on all markdown images

### 2. ResponsiveImage Vue Component (Option 3)

- Custom Vue component for advanced image control
- Props for size, captions, and zoom behavior
- Responsive design with mobile optimization
- Dark mode support

### 3. Custom CSS Styling

- Automatic image constraints (max 900px width)
- Rounded corners and shadows
- Hover effects
- Mobile-responsive layouts

## 📦 Files Created/Modified

### Created Files:

1. `/vitepress-site/docs/.vitepress/components/ResponsiveImage.vue`
   - Reusable image component with customization options
2. `/vitepress-site/docs/.vitepress/theme/custom.css`
   - Global image styling and constraints
3. `/vitepress-site/docs/docs/examples/image-usage.md`
   - Complete usage guide with examples

### Modified Files:

1. `/vitepress-site/docs/.vitepress/theme/index.js`

   - Added medium-zoom integration
   - Registered ResponsiveImage component globally
   - Added CSS import

2. `/vitepress-site/package.json` (via npm install)
   - Added `medium-zoom` dependency

## 🚀 How It Works

### Automatic Enhancement (No Changes Needed)

All existing markdown images automatically get:

- Click-to-zoom functionality
- Maximum width constraint (900px)
- Rounded corners and shadow
- Hover effect
- Responsive mobile scaling

**Example:**

```markdown
<ResponsiveImage
  src="/img/example.png"
  alt="Alt text"
/>
```

### Manual Control with Component

For specific sizing or captions, use the ResponsiveImage component:

```markdown
<ResponsiveImage 
  src="/img/example.png" 
  alt="Description"
  maxWidth="600px"
  caption="Optional caption text"
/>
```

## 📝 Updating Existing Pages

### Quick Fix (Current Page Example)

For the `/docs/concepts/reload-tasks/client-managed/alert-emails/` page:

**Before:**

```markdown
<ResponsiveImage
  src="/img/reload-fail-alert-email-mobile-1.png"
  alt="Failed reload alert email on mobile home screen"
  maxWidth="400px"
/>
```

**Option 1 - Keep as is:**

- Image automatically gets zoom + responsive behavior
- Default max-width of 900px applies

**Option 2 - Add size constraint:**

```markdown
<ResponsiveImage 
  src="/img/reload-fail-alert-email-mobile-1.png" 
  alt="Failed reload alert email on mobile home screen"
  maxWidth="400px"
  caption="Alert notification displayed on mobile device home screen"
/>
```

### Recommended Approach

1. **Leave most images as markdown** - they automatically get the enhancements
2. **Use ResponsiveImage for:**
   - Mobile screenshots (maxWidth="400px")
   - Very wide screenshots that need constraining (maxWidth="700px")
   - Images that benefit from captions
   - Diagrams that should be smaller (maxWidth="600px")

## 🎨 Component Properties

| Property   | Type    | Default    | Description                |
| ---------- | ------- | ---------- | -------------------------- |
| `src`      | String  | _required_ | Image file path            |
| `alt`      | String  | `""`       | Alt text for accessibility |
| `maxWidth` | String  | `"800px"`  | Maximum image width        |
| `caption`  | String  | `""`       | Caption below image        |
| `zoomable` | Boolean | `true`     | Enable click-to-zoom       |
| `centered` | Boolean | `true`     | Center image horizontally  |

## 💡 Usage Examples

### Mobile Screenshots

```markdown
<ResponsiveImage 
  src="/img/reload-fail-alert-email-mobile-1.png" 
  alt="Mobile view"
  maxWidth="400px"
/>
```

### Large Desktop Screenshots

```markdown
<ResponsiveImage 
  src="/img/failed_reload_email_2.png" 
  alt="Desktop email client"
  maxWidth="800px"
/>
```

### QMC Configuration Screenshots

```markdown
<ResponsiveImage 
  src="/img/qlik_sense_user_email_address_1.png" 
  alt="QMC user configuration"
  maxWidth="700px"
  caption="Email address configuration in Qlik Management Console"
/>
```

### Diagrams

```markdown
<ResponsiveImage 
  src="/img/butler-alert-emails-on-off-per-task-1.png" 
  alt="Alert configuration flow"
  maxWidth="600px"
/>
```

## 🔧 Testing

To see the changes:

1. Start the dev server:

   ```bash
   cd /Users/goran/code/butler-docs/vitepress-site
   npm run docs:dev
   ```

2. Navigate to any page with images

3. Test the zoom functionality:

   - Click any image to zoom in
   - Click again (or press ESC) to zoom out

4. Test responsive behavior:
   - Resize browser window
   - Images should scale appropriately

## 🎯 Benefits

1. **Better UX**: Users can click to see full-size details
2. **Responsive**: Images scale properly on mobile
3. **Consistent**: All images have uniform styling
4. **Accessible**: Alt text and proper semantic HTML
5. **Professional**: Shadows, rounded corners, hover effects
6. **Flexible**: Easy to customize per image when needed

## 📚 Reference

- [Medium Zoom Documentation](https://github.com/francoischalifour/medium-zoom)
- [VitePress Components](https://vitepress.dev/guide/using-vue)
- [Usage Guide](/docs/examples/image-usage.md)

## 🐛 Troubleshooting

### Zoom not working

- Ensure page has fully loaded
- Check browser console for errors
- Verify medium-zoom is installed: `npm list medium-zoom`

### Images still too large

- Adjust `maxWidth` in custom.css or use ResponsiveImage component
- Mobile images should use maxWidth="400px"
- Desktop screenshots typically maxWidth="700px" or "800px"

### Component not found

- Ensure component is registered in `.vitepress/theme/index.js`
- Check file path is correct
- Restart dev server

## 🔜 Next Steps

You can now:

1. ✅ All existing images automatically have zoom + responsive behavior
2. 📄 Optionally update pages to use `<ResponsiveImage>` for better control
3. 📱 Constrain mobile screenshots to ~400px width
4. 🖼️ Add captions where helpful
5. 🎨 Customize styling in `custom.css` if needed

The implementation is complete and working! No further changes are required unless you want to fine-tune specific images.
