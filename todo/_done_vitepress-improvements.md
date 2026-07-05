# VitePress Configuration Improvements

Source: butler-sos-docs repo (applied July 2026)
Target: butler-docs repo

---

## 1. Sitemap: Filter to Latest Version Only

**Problem:** Sitemap includes all versions (`/v16.0/`, `/v17.0/`, `/latest/`), creating duplicate content for search engines.

**Solution:** Add `transformItems` to filter sitemap to only `/latest/` and root `/`.

**File:** `docs/.vitepress/config.ts`

**Change:**
```typescript
// FROM (line 349-351):
sitemap: {
  hostname: "https://butler.ptarmiganlabs.com",
},

// TO:
sitemap: {
  hostname: "https://butler.ptarmiganlabs.com",
  transformItems: (items) =>
    items.filter((item) => item.url === '' || item.url.startsWith('latest/')),
},
```

**Verification:**
1. Run `npm run build`
2. Open `docs/.vitepress/dist/sitemap.xml`
3. Verify all URLs start with `https://butler.ptarmiganlabs.com/` or `https://butler.ptarmiganlabs.com/latest/`
4. Verify NO URLs contain `/v16.0/` or `/v17.0/`
5. Count URLs: `grep -c '<loc>' docs/.vitepress/dist/sitemap.xml`

---

## 2. Enable lastUpdated for Sitemap Dates

**Problem:** Sitemap entries lack `<lastmod>` dates because `lastUpdated` is not enabled at the top level.

**Solution:** Add `lastUpdated: true` to the top-level config.

**File:** `docs/.vitepress/config.ts`

**Change:**
```typescript
// Add after line 348 (cleanUrls: true):
lastUpdated: true,
```

**Verification:**
1. Run `npm run build`
2. Open `docs/.vitepress/dist/sitemap.xml`
3. Verify root URL has `<lastmod>` tag: `grep '<lastmod>' docs/.vitepress/dist/sitemap.xml | head -1`
4. Note: `/latest/` pages won't have lastmod (generated at build time, no git history) — this is expected

---

## 3. Dynamic Copyright Year

**Problem:** Copyright year is hardcoded and goes stale.

**Solution:** Use `new Date().getFullYear()` for dynamic year.

**File:** `docs/.vitepress/config.ts`

**Change:**
```typescript
// FROM (line 477):
copyright: 'Copyright © 2018–2025 Ptarmigan Labs AB'

// TO:
copyright: `Copyright © 2018–${new Date().getFullYear()} Ptarmigan Labs AB`
```

**Verification:**
1. Run `npm run build`
2. Open any HTML page in `docs/.vitepress/dist/`
3. Search for "Copyright" in the footer
4. Verify year shows current year (2026)

---

## 4. Cleaner Date Format

**Problem:** Last updated date format is verbose: "Sunday, July 5, 2026 at 3:45:32 PM"

**Solution:** Use shorter format: "July 5, 2026 at 3:45 PM"

**File:** `docs/.vitepress/config.ts`

**Change:**
```typescript
// FROM (lines 486-487):
lastUpdated: {
  text: "Updated at",
  formatOptions: {
    dateStyle: "full",
    timeStyle: "medium",
  },
},

// TO:
lastUpdated: {
  text: "Updated at",
  formatOptions: {
    dateStyle: "long",
    timeStyle: "short",
  },
},
```

**Verification:**
1. Run `npm run build`
2. Open any page in dev mode: `npm run dev`
3. Look for "Updated at" text on a page
4. Verify format is "July 5, 2026 at 3:45 PM" (not "Sunday, July 5, 2026 at 3:45:32 PM")

---

## 5. Add OG Image Meta Tag

**Problem:** Social shares (Twitter, Slack, LinkedIn) show no preview image.

**Solution:** Create OG banner and add meta tag.

**Steps:**

### 5a. Create OG Banner
1. Create image: 1200×630px PNG
2. Use Butler logo + brand colors (red #aa0000)
3. Save as `docs/public/og-banner.png`

### 5b. Add Meta Tag
**File:** `docs/.vitepress/config.ts`

**Change:**
```typescript
// Add to head array (after og:description, around line 384):
[
  "meta",
  {
    property: "og:image",
    content: "https://butler.ptarmiganlabs.com/og-banner.png",
  },
],
```

**Verification:**
1. Run `npm run build`
2. Open any HTML page: `docs/.vitepress/dist/latest/index.html`
3. Search for `og:image`: `grep 'og:image' docs/.vitepress/dist/latest/index.html`
4. Verify meta tag is present with correct URL
5. Test with Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/

---

## 6. Fix Duplicate Favicon Link

**Problem:** Two identical favicon links in head array (lines 372 and 400).

**Solution:** Remove the duplicate.

**File:** `docs/.vitepress/config.ts`

**Change:**
```typescript
// Remove line 372 (the first one):
// ["link", { rel: "icon", href: "/favicon.ico" }],

// Keep line 400 (in the favicon section):
['link', { rel: 'icon', href: '/favicon.ico' }],
```

**Verification:**
1. Run `npm run build`
2. Open any HTML page
3. Search for `rel="icon"`: `grep 'rel="icon"' docs/.vitepress/dist/latest/index.html | grep 'favicon.ico'`
4. Verify only ONE favicon.ico link exists

---

## Summary Checklist

- [ ] 1. Sitemap filtered to `/latest/` only
- [ ] 2. `lastUpdated: true` added
- [ ] 3. Copyright year dynamic
- [ ] 4. Date format shortened
- [ ] 5. OG banner created and meta tag added
- [ ] 6. Duplicate favicon removed

**Final verification:** Run `npm run build` and confirm no errors.
