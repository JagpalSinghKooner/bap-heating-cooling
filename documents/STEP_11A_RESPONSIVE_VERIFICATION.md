# STEP 11A — RESPONSIVE VERIFICATION CHECKLIST
**Project:** B.A.P Heating & Cooling
**Date:** 2026-01-09
**Status:** Ready for Testing

---

## Testing Breakpoints

Test all pages at the following viewport widths:

| Breakpoint | Width | Device Reference | Tailwind Class |
|------------|-------|------------------|----------------|
| **Mobile Small** | 375px | iPhone SE | `< sm` |
| **Mobile Standard** | 414px | iPhone Pro | `< sm` |
| **Tablet** | 768px | iPad Portrait | `md:` |
| **Desktop Small** | 1024px | iPad Landscape | `lg:` |
| **Desktop Standard** | 1440px | Desktop | `xl:` |

---

## Pages to Test

1. **Homepage** - `/`
2. **Service Page** - `/services/[any-service]/` (e.g., `/services/furnace-repair/`)
3. **Service+City Page** - `/services/[any-service]-[any-city]-on/` (e.g., `/services/furnace-repair-toronto-on/`)

---

## Universal Checks (All Pages, All Breakpoints)

### Layout Integrity
- [ ] No horizontal scroll bar visible
- [ ] No content cut off at viewport edges
- [ ] No overlapping elements
- [ ] Container padding visible on left/right edges

### Typography
- [ ] All headings legible and properly sized
- [ ] Body text minimum 16px (1rem)
- [ ] Line height allows comfortable reading
- [ ] No text overflow or truncation issues

### Interactive Elements
- [ ] All tap targets ≥ 44px × 44px (minimum touch target size)
- [ ] Buttons have adequate padding
- [ ] Links have visible hover states
- [ ] Focus states visible for keyboard navigation

### Images & Media
- [ ] No broken images
- [ ] Images load at appropriate resolution
- [ ] Icons render correctly (not blurry or oversized)

---

## Page-Specific Checks

### HOMEPAGE (`/`)

#### 375px (Mobile Small)
- [ ] Hero H1 readable (should be text-4xl or smaller on mobile)
- [ ] Trust badges wrap to multiple rows if needed
- [ ] CTA buttons stack vertically and full-width
- [ ] Feature cards stack in single column
- [ ] Review cards stack in single column
- [ ] Footer CTA buttons stack vertically and full-width

#### 414px (Mobile Standard)
- [ ] Same as 375px checks
- [ ] Slightly more breathing room in spacing

#### 768px (Tablet)
- [ ] Hero H1 scales up (text-5xl)
- [ ] Trust badges display in single row or wrap gracefully
- [ ] CTA buttons display in horizontal row
- [ ] Feature cards display in 3-column grid
- [ ] Review cards display in 2-column grid
- [ ] Footer CTA buttons display in horizontal row

#### 1024px (Desktop Small)
- [ ] Hero H1 scales to text-5xl or text-6xl
- [ ] All grids display at intended columns
- [ ] Section padding increases (should use lg: padding classes)
- [ ] Review cards display in 3-column grid

#### 1440px (Desktop Standard)
- [ ] Same as 1024px
- [ ] Max-width container constraint visible (content doesn't stretch full width)
- [ ] Optimal line length maintained for paragraphs

---

### SERVICE PAGE (`/services/[slug]/`)

#### 375px (Mobile Small)
- [ ] Breadcrumb wraps gracefully
- [ ] Service content (markdown) readable and properly spaced
- [ ] Trust badges wrap to multiple rows
- [ ] CTA buttons stack full-width
- [ ] Service area cards stack in single column
- [ ] Region headings display correctly
- [ ] Review cards stack in single column
- [ ] Footer CTA buttons stack full-width

#### 414px (Mobile Standard)
- [ ] Same as 375px checks
- [ ] Content remains readable

#### 768px (Tablet)
- [ ] Breadcrumb displays in single line (or wraps cleanly)
- [ ] CTA buttons display in horizontal row
- [ ] Service area cards display in 2-column grid
- [ ] Review cards display in 2-column grid
- [ ] Footer CTA buttons display in horizontal row

#### 1024px (Desktop Small)
- [ ] Service area cards display in 4-column grid
- [ ] Review cards display in 3-column grid
- [ ] Section padding increases
- [ ] Prose content max-width applied for readability

#### 1440px (Desktop Standard)
- [ ] Same as 1024px
- [ ] Container max-width constraint visible
- [ ] Content centered with adequate margins

---

### SERVICE+CITY PAGE (`/services/[slug]-[city]-on/`)

#### 375px (Mobile Small)
- [ ] Breadcrumb wraps gracefully (can be multi-line)
- [ ] H1 displays service + city name without overflow
- [ ] Trust badges wrap to multiple rows
- [ ] **CRITICAL: Emergency CTA block displays as warm orange card, NOT red alert**
- [ ] Emergency CTA block: 3 buttons stack full-width vertically
- [ ] Service info cards stack in single column
- [ ] Related services cards stack in single column
- [ ] Review cards stack in single column
- [ ] Footer CTA buttons stack full-width

#### 414px (Mobile Standard)
- [ ] Same as 375px checks
- [ ] Emergency block readable and visually clear

#### 768px (Tablet)
- [ ] Breadcrumb displays in single line or 2 lines
- [ ] Emergency CTA block: buttons display in horizontal row (or wrap to 2 rows)
- [ ] Service info cards display in 2-column grid
- [ ] Related services cards display in 2-column grid
- [ ] Review cards display in 2-column grid

#### 1024px (Desktop Small)
- [ ] Emergency CTA block: 3 buttons display in horizontal row
- [ ] Service info cards maintain 2-column grid (by design)
- [ ] Related services cards display in 4-column grid
- [ ] Review cards display in 3-column grid
- [ ] Section spacing increases

#### 1440px (Desktop Standard)
- [ ] Same as 1024px
- [ ] Container max-width visible
- [ ] Emergency block centered with max-width constraint

---

## Critical Visual Checks

### Card System Consistency
- [ ] All `.card-standard` elements have consistent shadow and padding
- [ ] All `.card-compact` elements have consistent styling
- [ ] `.card-urgent` (emergency block) uses orange tones, not red
- [ ] `.card-cta` (conversion blocks) have muted background
- [ ] Hover states work on all card elements

### CTA Button Behavior
- [ ] Primary CTA buttons have correct color (blue primary)
- [ ] Emergency CTA buttons have correct color (red-600)
- [ ] Button text is centered and legible
- [ ] Buttons have adequate padding (px-6 py-3 or larger)
- [ ] On mobile: full-width buttons have 44px minimum height

### Trust Badges
- [ ] Badges display icons (⭐, 📅, ✓)
- [ ] Badges wrap to multiple rows on mobile if needed
- [ ] Badges maintain consistent height
- [ ] Badge text is readable at all sizes

### Section Spacing
- [ ] Sections have consistent vertical padding
- [ ] Mobile: py-12 (48px)
- [ ] Tablet: py-16 (64px)
- [ ] Desktop: py-20 (80px)
- [ ] Alternating background colors (white / muted) visible

### Grid Behavior
- [ ] `grid-features`: 1 col mobile → 3 col desktop
- [ ] `grid-responsive-2`: 1 col mobile → 2 col desktop
- [ ] `grid-responsive-3`: 1 col mobile → 2 col tablet → 3 col desktop
- [ ] `grid-responsive-4`: 1 col mobile → 2 col tablet → 4 col desktop
- [ ] Gap spacing consistent within each grid

---

## Conversion Optimization Checks

### Above-the-Fold (First Screen Load)
- [ ] **Homepage**: H1, intro, trust badges, and CTAs visible without scrolling
- [ ] **Service Page**: Service title, intro, trust badges, and CTAs visible
- [ ] **Service+City**: Service+city title, intro, trust badges, emergency block, and CTAs visible

### CTA Visibility
- [ ] Primary CTAs stand out visually from surrounding content
- [ ] Emergency CTAs clearly distinguished from regular CTAs (different color)
- [ ] Footer CTA sections visually distinct (use card-cta styling)

### Trust Signal Placement
- [ ] Trust badges appear above CTAs on all hero sections
- [ ] Badges are easily scannable (not cluttered)
- [ ] Rating, years, and license info all visible (if data exists)

---

## Accessibility Checks

### Keyboard Navigation
- [ ] All interactive elements focusable via Tab key
- [ ] Focus indicator visible on all elements
- [ ] Skip-to-content link works (in BaseLayout)

### Screen Reader
- [ ] Star ratings have aria-label with rating number
- [ ] CTA buttons have meaningful labels
- [ ] Breadcrumbs are navigable
- [ ] Review dates use `<time>` element with datetime attribute

### Color Contrast
- [ ] All text meets WCAG AA contrast ratio (4.5:1 minimum)
- [ ] Emergency CTA block text (orange-900) readable on orange-50 background
- [ ] Muted text (muted-foreground) readable on all backgrounds

---

## Performance Checks

### Load Time
- [ ] Page loads in < 3 seconds on 3G
- [ ] No layout shift on load (trust badges, CTAs stable)
- [ ] Images lazy-load if below fold

### Rendering
- [ ] No flash of unstyled content (FOUC)
- [ ] Tailwind classes applied immediately
- [ ] No JS errors in console

---

## Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## Definition of Done

**All pages must pass ALL checks at ALL breakpoints before Step 11A is complete.**

### Final Validation
- [ ] No horizontal scroll on any page at any breakpoint
- [ ] All CTAs stack full-width on mobile (< 640px)
- [ ] All tap targets ≥ 44px at all breakpoints
- [ ] Emergency CTA block uses orange (card-urgent), not red alert styling
- [ ] Trust badges display above fold on all hero sections
- [ ] Conversion blocks (card-cta, card-featured, card-urgent) visually distinct
- [ ] Review cards use design system (card-standard), not scoped CSS
- [ ] Section spacing consistent across all pages
- [ ] Grid patterns responsive and consistent
- [ ] No content creation or governance violations introduced

---

## Testing Tools

### Browser DevTools
- Open DevTools (F12 or Cmd+Opt+I)
- Toggle Device Toolbar (Cmd+Shift+M or Ctrl+Shift+M)
- Set viewport to each breakpoint width
- Test responsive behavior by dragging viewport

### Manual Testing
```bash
# Start dev server
npm run dev

# Visit test URLs
http://localhost:4321/
http://localhost:4321/services/furnace-repair/
http://localhost:4321/services/furnace-repair-toronto-on/
```

### Lighthouse Audit (Optional)
- Run Lighthouse in Chrome DevTools
- Check Performance, Accessibility, Best Practices scores
- Target: 90+ on all metrics

---

## Issue Tracking Template

If issues found during testing, document as:

```markdown
**Issue:** [Brief description]
**Page:** [URL or page type]
**Breakpoint:** [Width in px]
**Severity:** P0 / P1 / P2
**Expected:** [What should happen]
**Actual:** [What actually happens]
**Screenshot:** [If applicable]
```

---

## Sign-Off

Once all checks pass:
- [ ] QA Engineer sign-off
- [ ] Designer sign-off
- [ ] Product Owner sign-off

**Step 11A complete when all sign-offs received.**
