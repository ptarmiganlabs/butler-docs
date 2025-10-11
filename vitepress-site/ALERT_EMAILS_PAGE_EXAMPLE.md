# Alert Emails Page - Before & After Example

This shows how to optionally update the `/docs/concepts/reload-tasks/client-managed/alert-emails/` page to take full advantage of the new image enhancements.

## Current State (Lines 28-42)

**Before (existing markdown - still works!):**

```markdown
Alert emails viewed on a mobile phone give direct insight into what has happened:

![Failed reload alert email on mobile home screen](/img/reload-fail-alert-email-mobile-1.png)

![Failed reload alert email viewed on mobile](/img/reload-fail-alert-email-mobile-2.png)

### Desktop Email Clients

In a regular email client a reload failed email could look like below.

**Note the end of the script** - the last few lines of the reload log are often very useful when it comes to understanding what caused the reload failure.

![Reload failed alert email](/img/failed_reload_email_2.png)
```

**After (optional improvement with ResponsiveImage component):**

```markdown
Alert emails viewed on a mobile phone give direct insight into what has happened:

<ResponsiveImage 
  src="/img/reload-fail-alert-email-mobile-1.png" 
  alt="Failed reload alert email on mobile home screen"
  maxWidth="400px"
  caption="Alert notification on mobile home screen"
/>

<ResponsiveImage 
  src="/img/reload-fail-alert-email-mobile-2.png" 
  alt="Failed reload alert email viewed on mobile"
  maxWidth="400px"
  caption="Full alert email viewed on mobile device"
/>

### Desktop Email Clients

In a regular email client a reload failed email could look like below.

Note the end of the script - the last few lines of the reload log are often very useful when it comes to understanding what caused the reload failure.

<ResponsiveImage 
  src="/img/failed_reload_email_2.png" 
  alt="Reload failed alert email"
  maxWidth="800px"
  caption="Reload failure alert showing script log excerpt"
/>
```

## Benefits of the Update

### Mobile Screenshots (400px)

- ✅ Properly sized for mobile device screenshots
- ✅ Won't dominate the page
- ✅ Still zoomable for detail viewing
- ✅ Optional captions provide context

### Desktop Screenshots (800px)

- ✅ Large enough to show detail
- ✅ Not overwhelming on the page
- ✅ Responsive on mobile browsers
- ✅ Caption replaces/augments body text

## Other Images on the Page

### Line 64 - QMC Screenshot

**Before:**

```markdown
![Email address available for Qlik Sense user](/img/qlik_sense_user_email_address_1.png)
```

**After (optional):**

```markdown
<ResponsiveImage 
  src="/img/qlik_sense_user_email_address_1.png" 
  alt="Email address available for Qlik Sense user"
  maxWidth="700px"
  caption="Email address field in Qlik Sense QMC user configuration"
/>
```

### Line 76 - Configuration Diagram

**Before:**

```markdown
![Switching alert emails on/off per reload task](/img/butler-alert-emails-on-off-per-task-1.png)
```

**After (optional):**

```markdown
<ResponsiveImage 
  src="/img/butler-alert-emails-on-off-per-task-1.png" 
  alt="Switching alert emails on/off per reload task"
  maxWidth="650px"
  caption="Flow diagram showing selective email alert configuration"
/>
```

### Line 94 - Recipients Diagram

**Before:**

```markdown
![Task specific alert email recipients](/img/butler-different-recipients-alert-emails-1.png)
```

**After (optional):**

```markdown
<ResponsiveImage 
  src="/img/butler-different-recipients-alert-emails-1.png" 
  alt="Task specific alert email recipients"
  maxWidth="650px"
  caption="Conceptual diagram of task-specific email routing"
/>
```

### Line 108 - System Overview

**Before:**

```markdown
![Butler high level system overview](/img/butler-log4net-appenders-1.png)
```

**After (optional):**

```markdown
<ResponsiveImage 
  src="/img/butler-log4net-appenders-1.png" 
  alt="Butler high level system overview"
  maxWidth="900px"
  caption="High-level architecture showing Butler's alert email flow"
/>
```

## Decision Guide

### Keep Markdown (No Changes) If:

- ✅ Current size is fine
- ✅ No caption needed
- ✅ Want simplest markup
- ✅ Image is already reasonably sized

### Switch to ResponsiveImage If:

- 📱 Mobile screenshot (use 400px)
- 📊 Diagram that's too large (use 500-650px)
- 🖥️ Desktop screenshot (use 700-800px)
- 📝 Caption would add value
- 🎯 Want precise size control

## Recommendation

For the Alert Emails page specifically:

1. **Must update**: Mobile screenshots (lines 30, 32) → 400px
2. **Nice to update**: Desktop email (line 40) → 800px with caption
3. **Optional**: Diagrams (lines 76, 94, 108) → 650-900px
4. **Optional**: QMC screenshot (line 64) → 700px

This will give the page a more polished, professional appearance while improving mobile viewing.

## Implementation

If you want to update this page, I can make these changes for you. Just let me know which approach you prefer:

1. **Conservative**: Only update mobile screenshots (400px)
2. **Balanced**: Update mobile + desktop email screenshots
3. **Complete**: Update all images with appropriate sizing + captions
4. **Leave as-is**: All images already work with zoom + responsive behavior
