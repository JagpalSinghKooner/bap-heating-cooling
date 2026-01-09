# STEP 11A — LOGO INTEGRATION UPDATE
**Project:** B.A.P Heating & Cooling
**Date:** 2026-01-09
**Status:** ✅ Complete

---

## Logo Implementation

### Current Logo
**File:** [src/images/logoipsum-380.svg](../src/images/logoipsum-380.svg)

The logo is now integrated into:
1. **Header navigation** (lines 154-158 in BaseLayout.astro)
2. **Footer** (lines 269-273 in BaseLayout.astro)

### How It Works

The logo is imported as an Astro asset:
```astro
---
import logo from '../images/logoipsum-380.svg';
---

<img src={logo.src} alt={companyName} class="h-10 w-auto sm:h-12" />
```

This allows Astro to:
- Optimize the SVG during build
- Generate proper paths for production
- Provide type safety

### Responsive Sizing

- **Mobile**: `h-10` (40px tall)
- **Desktop**: `sm:h-12` (48px tall)
- **Width**: `w-auto` (maintains aspect ratio)

---

## Replacing the Logo

To replace with your actual brand logo:

### Option 1: Replace Existing File (Recommended)
```bash
# Backup current logo (optional)
mv src/images/logoipsum-380.svg src/images/logoipsum-380.svg.bak

# Copy your logo
cp /path/to/your-logo.svg src/images/logoipsum-380.svg
```

### Option 2: Use Different Filename
```bash
# Copy your logo
cp /path/to/your-logo.svg src/images/bap-logo.svg
```

Then update the import in [BaseLayout.astro](../src/layouts/BaseLayout.astro):
```astro
import logo from '../images/bap-logo.svg';
```

---

## Logo Requirements

### Format
- **Recommended**: SVG (scalable, lightweight)
- **Alternative**: PNG with transparent background

### Dimensions
- **Aspect ratio**: Wider than tall (horizontal layout)
- **Recommended height**: 48-60px
- **Example dimensions**: 180×48px, 200×50px, 240×60px

### File Size
- **SVG**: Optimize to < 5KB
- **PNG**: Keep under 20KB

### Colors
- Should work on white background (header)
- Should work on muted background (footer)
- If your logo requires specific backgrounds, adjust the header/footer `bg-*` classes

---

## Testing After Logo Replacement

1. Start dev server: `npm run dev`
2. Visit homepage: `http://localhost:4321/`
3. Check:
   - [ ] Logo displays in header (not broken)
   - [ ] Logo displays in footer (not broken)
   - [ ] Logo is properly sized (not too large/small)
   - [ ] Logo maintains aspect ratio
   - [ ] Logo is crisp on retina displays
   - [ ] Logo works on mobile (< 768px)
   - [ ] Logo works on desktop (≥ 768px)

---

## Troubleshooting

### Logo Not Displaying
- Check file path is correct in import
- Ensure file exists in `src/images/`
- Check file extension matches (.svg vs .png)

### Logo Too Large/Small
- Adjust height classes: `h-8`, `h-10`, `h-12`, `h-14`, etc.
- Maintain `w-auto` for aspect ratio
- Desktop size should be larger: `sm:h-12` or `sm:h-14`

### Logo Blurry (PNG only)
- Use 2× dimensions for retina (e.g., 360×96 instead of 180×48)
- Or switch to SVG format

### Logo Wrong Color
- For SVG: Edit fill/stroke colors in the SVG file
- Or add CSS filters if needed

---

## Current Implementation

✅ Logo imported from `src/images/logoipsum-380.svg`
✅ Used in header navigation
✅ Used in footer company section
✅ Responsive sizing (mobile/desktop)
✅ Proper alt text from business profile
✅ Astro asset optimization enabled

---

## Next Steps

1. Replace `logoipsum-380.svg` with your actual brand logo
2. Test at all breakpoints (375px, 768px, 1440px)
3. Verify logo clarity and sizing
4. Commit to git when satisfied

**No code changes needed after logo replacement** - just swap the file!
