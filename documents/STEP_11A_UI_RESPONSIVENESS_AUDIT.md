# STEP 11A — FRONTEND UI + RESPONSIVENESS LOCK
**Project:** B.A.P Heating & Cooling
**Date:** 2026-01-09
**Status:** Implementation Ready

---

## Executive Summary

This document provides a comprehensive UI/responsiveness audit and implementation plan for the homepage, service pages, and service+city pages. The goal is to transform these pages into high-converting lead-generation landing pages while maintaining strict governance compliance.

**Scope:** Homepage, Service Page, Service+City Page
**Approach:** Design system first, then component refinement, then template updates
**Constraints:** Zero content creation, zero governance breaks, CTA resolver untouched

---

## Current State Audit

### Pages Analyzed
1. **Homepage** ([index.astro](src/pages/index.astro))
2. **Service Page** ([services/[...slug].astro](src/pages/services/[...slug].astro))
3. **Service+City Page** (same file, service-city branch)

### Components Analyzed
1. **PrimaryCTA** ([PrimaryCTA.astro](src/components/PrimaryCTA.astro))
2. **ReviewsBlock** ([ReviewsBlock.astro](src/components/ReviewsBlock.astro))
3. **BaseLayout** ([BaseLayout.astro](src/layouts/BaseLayout.astro))

### Existing Design System
- **Color tokens:** HSL-based design tokens in `tokens.css`
- **Tailwind config:** Properly extends tokens
- **Typography:** Uses prose utility but no systematic scale
- **Spacing:** Ad-hoc values, no consistent rhythm
- **Components:** Minimal, inline styling

---

## Critical Issues Found

### P0 — Conversion Killers
1. **Homepage Hero Weak** (index.astro:51-62)
   - No trust signals above fold
   - Generic headline with no value prop emphasis
   - CTAs lack visual hierarchy
   - No rating/years/license micro-row

2. **Service+City Emergency Block Looks Like Error Alert** (services/[...slug].astro:305-312)
   - Red border-2 and red background creates alarm/warning appearance
   - Not lead-gen styled, feels like system alert
   - Emergency CTA mixed with regular CTAs without distinction
   - Must be restyled as intentional conversion block

3. **ReviewsBlock Uses Scoped CSS Instead of Design System** (ReviewsBlock.astro:52-106)
   - Disconnected from Tailwind utilities
   - Hardcoded colors (#ddd, #fafafa, etc.)
   - Not responsive-friendly
   - Inconsistent with card patterns elsewhere

### P1 — UI Inconsistencies
4. **No Section Spacing Standard**
   - Homepage sections use mt-16, mt-12 inconsistently
   - Service pages use mt-12, mb-8, mb-12
   - No vertical rhythm system

5. **Card System Fragmented**
   - Basic cards: `rounded-lg border bg-card p-6`
   - CTA cards: `rounded-lg border bg-muted p-8`
   - Service area cards: `rounded-lg border bg-card p-3 text-center`
   - No featured/conversion card variant

6. **Typography Scale Missing**
   - H1 sizes vary: text-5xl (homepage), text-4xl (service-city)
   - No defined H2/H3 hierarchy
   - No eyebrow label style
   - Muted text uses text-muted-foreground without size consistency

7. **Grid Breakpoints Inconsistent**
   - Homepage: md:grid-cols-3
   - Service areas: md:grid-cols-3 lg:grid-cols-4
   - Service+city: lg:grid-cols-2
   - No systematic mobile-first grid pattern

### P2 — Responsiveness Gaps
8. **CTA Stacking Not Defined**
   - CTAs use flex gap-4 but no mobile full-width rules
   - Emergency CTAs on service+city stack awkwardly
   - No sticky CTA on mobile (acceptable, but stacking must work)

9. **Container Max-Width Undefined**
   - Uses `container mx-auto` globally
   - No explicit max-width limit
   - No section-specific container rules

10. **Trust Signals Missing**
    - No component for rating/years/license badges
    - Profile data exists but not rendered above fold
    - No visual trust micro-row pattern

---

## Design System Definition

### Typography Scale

```css
/* Add to src/styles/tokens.css */

@layer base {
  :root {
    /* Typography Scale */
    --text-xs: 0.75rem;      /* 12px */
    --text-sm: 0.875rem;     /* 14px */
    --text-base: 1rem;       /* 16px */
    --text-lg: 1.125rem;     /* 18px */
    --text-xl: 1.25rem;      /* 20px */
    --text-2xl: 1.5rem;      /* 24px */
    --text-3xl: 1.875rem;    /* 30px */
    --text-4xl: 2.25rem;     /* 36px */
    --text-5xl: 3rem;        /* 48px */
    --text-6xl: 3.75rem;     /* 60px */

    /* Line Heights */
    --leading-tight: 1.25;
    --leading-snug: 1.375;
    --leading-normal: 1.5;
    --leading-relaxed: 1.625;
    --leading-loose: 2;

    /* Font Weights */
    --font-normal: 400;
    --font-medium: 500;
    --font-semibold: 600;
    --font-bold: 700;
  }
}
```

### Spacing Scale

```css
/* Add to src/styles/tokens.css */

@layer base {
  :root {
    /* Section Spacing (vertical rhythm) */
    --section-padding-mobile: 3rem;   /* 48px */
    --section-padding-tablet: 4rem;   /* 64px */
    --section-padding-desktop: 5rem;  /* 80px */

    /* Container Spacing */
    --container-padding-x: 1rem;      /* 16px mobile */
    --container-max-width: 80rem;     /* 1280px */

    /* Card Spacing */
    --card-padding-sm: 1rem;          /* 16px */
    --card-padding-md: 1.5rem;        /* 24px */
    --card-padding-lg: 2rem;          /* 32px */

    /* Gap Spacing */
    --gap-xs: 0.5rem;   /* 8px */
    --gap-sm: 0.75rem;  /* 12px */
    --gap-md: 1rem;     /* 16px */
    --gap-lg: 1.5rem;   /* 24px */
    --gap-xl: 2rem;     /* 32px */
  }
}
```

### Card Variants

Define card classes for consistency:

```css
/* Add to src/styles/global.css */

@layer components {
  /* Base Card */
  .card-base {
    @apply rounded-lg border border-border bg-card text-card-foreground;
  }

  /* Standard Card (content/features) */
  .card-standard {
    @apply card-base p-6 shadow-sm transition-shadow hover:shadow-md;
  }

  /* Featured Card (conversion blocks) */
  .card-featured {
    @apply card-base border-2 border-primary/20 bg-primary/5 p-8 shadow-md;
  }

  /* CTA Conversion Card */
  .card-cta {
    @apply card-base bg-muted/50 p-8 shadow-sm;
  }

  /* Compact Card (service area links) */
  .card-compact {
    @apply card-base p-3 text-center transition-colors hover:border-primary hover:shadow-sm;
  }

  /* Emergency/Urgent Card */
  .card-urgent {
    @apply card-base border-orange-200 bg-orange-50 p-6 shadow-md;
  }
}
```

### Button Variants (Style Extensions Only)

PrimaryCTA already handles variants. Add supplementary classes if needed:

```css
/* Add to src/styles/global.css */

@layer components {
  /* CTA Button Base (already in PrimaryCTA, document for reference) */
  .btn-cta-base {
    @apply inline-block rounded-md font-semibold transition-colors;
  }

  /* Full Width Mobile */
  .btn-mobile-full {
    @apply w-full sm:w-auto;
  }

  /* CTA Container: Stack on mobile, row on desktop */
  .cta-group {
    @apply flex flex-col sm:flex-row gap-3 sm:gap-4;
  }

  .cta-group-mobile-full {
    @apply flex flex-col gap-3;
  }

  .cta-group-mobile-full > * {
    @apply w-full sm:w-auto;
  }
}
```

### Badge/Trust Signal Components

```css
/* Add to src/styles/global.css */

@layer components {
  /* Trust Badge Container */
  .trust-badges {
    @apply flex flex-wrap items-center justify-center gap-4 sm:gap-6;
  }

  /* Individual Badge */
  .trust-badge {
    @apply inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm;
  }

  /* Eyebrow Label */
  .eyebrow {
    @apply text-xs font-semibold uppercase tracking-wide text-primary;
  }
}
```

### Section Container Pattern

```css
/* Add to src/styles/global.css */

@layer components {
  /* Section Base */
  .section {
    @apply py-12 sm:py-16 lg:py-20;
  }

  /* Section Compact (between related blocks) */
  .section-compact {
    @apply py-8 sm:py-10 lg:py-12;
  }

  /* Section Container */
  .section-container {
    @apply container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8;
  }

  /* Hero Section */
  .section-hero {
    @apply py-16 sm:py-20 lg:py-24;
  }
}
```

### Responsive Grid Patterns

```css
/* Add to src/styles/global.css */

@layer utilities {
  /* 1-col mobile, 2-col tablet, 3-col desktop */
  .grid-responsive-3 {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
  }

  /* 1-col mobile, 2-col tablet, 4-col desktop */
  .grid-responsive-4 {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4;
  }

  /* 1-col mobile, 2-col desktop (for content blocks) */
  .grid-responsive-2 {
    @apply grid grid-cols-1 lg:grid-cols-2 gap-8;
  }

  /* Feature Grid: always 1 col on mobile, 3 on desktop */
  .grid-features {
    @apply grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8;
  }
}
```

---

## Component Refactoring Plan

### 1. ReviewsBlock Component

**File:** [ReviewsBlock.astro](src/components/ReviewsBlock.astro)

**Changes:**
- Remove scoped `<style>` block entirely
- Replace with Tailwind utility classes
- Use card-standard pattern
- Add responsive grid
- Add review text truncation with consistent height

**Implementation:** See code changes section below.

### 2. PrimaryCTA Component

**File:** [PrimaryCTA.astro](src/components/PrimaryCTA.astro)

**Changes:**
- No functional changes (governance protected)
- Add mobile full-width support via wrapper in templates
- Document existing variants for reference

**Implementation:** No changes needed; templates will use `cta-group-mobile-full` wrapper.

### 3. TrustBadges Component (NEW)

**File:** `src/components/TrustBadges.astro` (create new)

**Purpose:** Render trust signals (rating, years, license) from profile data above fold.

**Implementation:** See code changes section below.

---

## Template Refactoring Plan

### 1. Homepage Template

**File:** [index.astro](src/pages/index.astro)

**Sections to Update:**

#### Hero Section (lines 50-62)
**Current Issues:**
- Generic centered layout
- No trust signals
- Weak value prop
- CTAs lack hierarchy

**Changes:**
- Keep H1 and intro (governance: no content creation)
- Add TrustBadges component below intro
- Add `cta-group-mobile-full` wrapper for CTAs
- Add section spacing classes

#### Services Overview (lines 64-85)
**Current Issues:**
- Basic 3-column grid
- No responsive optimization
- Cards lack visual polish

**Changes:**
- Use `grid-features` class
- Use `card-standard` class
- Consistent padding

#### Reviews Section (line 87)
**Changes:**
- Add section spacing wrapper
- ReviewsBlock will self-style after refactor

#### CTA Footer (lines 89-98)
**Changes:**
- Use `card-cta` class
- Add section spacing
- Use `cta-group` for CTAs

**Implementation:** See code changes section below.

### 2. Service Page Template

**File:** [services/[...slug].astro](src/pages/services/[...slug].astro), service branch (lines 230-278)

**Sections to Update:**

#### Back Link (lines 232-236)
**Changes:**
- Add spacing class
- Style as breadcrumb-style element

#### Above-Fold CTA (lines 238-241)
**Changes:**
- Move CTAs into hero block with heading
- Add TrustBadges (will need to pass service-specific trust if available, or site trust)
- Use `cta-group` wrapper

#### Service Description (lines 243-245)
**Changes:**
- Wrap in section container
- Add spacing classes

#### Service Areas (lines 247-264)
**Changes:**
- Use `grid-responsive-4` for location cards
- Use `card-compact` for location links
- Add section spacing

#### Reviews (line 266)
**Changes:**
- Add section spacing wrapper

#### CTA Footer (lines 268-277)
**Changes:**
- Use `card-cta` class
- Use `cta-group`

**Implementation:** See code changes section below.

### 3. Service+City Page Template

**File:** [services/[...slug].astro](src/pages/services/[...slug].astro), service-city branch (lines 279-372)

**Critical Fix:**

#### Emergency CTA Block (lines 305-312) — P0 ISSUE
**Current:**
```astro
<div class="mb-12 rounded-lg border-2 border-red-200 bg-red-50 p-6">
  <h2 class="mb-4 text-xl font-semibold text-red-900">Need Service Now?</h2>
  ...
</div>
```

**Problem:** Looks like error alert, not conversion block.

**Solution:** Use `card-urgent` (orange tones, intentional) or `card-featured` (primary brand tones).

**Changes:**
- Replace red colors with `card-urgent` (warm, professional urgency) or `card-featured` (brand emphasis)
- Adjust heading color to match
- Add icon or visual treatment if needed (out of scope for now, just fix colors)

#### Other Sections:
- Breadcrumb (lines 281-293): Add spacing, keep structure
- Hero (lines 295-303): Add section spacing, keep structure
- Info Cards (lines 314-340): Use `grid-responsive-2` and `card-standard`
- Related Services (lines 342-354): Use `grid-responsive-4` and `card-compact`
- Reviews (line 356): Add section wrapper
- CTA Footer (lines 358-370): Use `card-cta` and `cta-group-mobile-full`

**Implementation:** See code changes section below.

---

## Responsive Verification Checklist

### Breakpoints to Test
- **375px** (iPhone SE, small mobile)
- **414px** (iPhone Pro, standard mobile)
- **768px** (iPad portrait, tablet)
- **1024px** (iPad landscape, small desktop)
- **1440px** (Desktop standard)

### Pass/Fail Criteria

| Check | 375px | 414px | 768px | 1024px | 1440px |
|-------|-------|-------|-------|--------|--------|
| No horizontal scroll | ☐ | ☐ | ☐ | ☐ | ☐ |
| CTAs stack full-width | ☐ | ☐ | N/A | N/A | N/A |
| CTAs row layout | N/A | N/A | ☐ | ☐ | ☐ |
| All tap targets ≥ 44px | ☐ | ☐ | ☐ | ☐ | ☐ |
| Trust badges wrap properly | ☐ | ☐ | ☐ | ☐ | ☐ |
| Review cards stack/grid | ☐ | ☐ | ☐ | ☐ | ☐ |
| Service area cards grid | ☐ | ☐ | ☐ | ☐ | ☐ |
| Section padding consistent | ☐ | ☐ | ☐ | ☐ | ☐ |
| Conversion blocks clear | ☐ | ☐ | ☐ | ☐ | ☐ |
| Typography legible | ☐ | ☐ | ☐ | ☐ | ☐ |
| No overlapping elements | ☐ | ☐ | ☐ | ☐ | ☐ |

---

## Definition of Done

- [ ] Design system tokens added to `tokens.css`
- [ ] Component utility classes added to `global.css`
- [ ] ReviewsBlock refactored to use Tailwind (no scoped styles)
- [ ] TrustBadges component created
- [ ] Homepage template updated with hero improvements, section spacing, card classes
- [ ] Service page template updated with above-fold CTA block, section spacing
- [ ] Service+City emergency block fixed (no red alert styling)
- [ ] All templates use consistent section spacing
- [ ] All templates use consistent card classes
- [ ] All templates use responsive grid utilities
- [ ] CTA groups use mobile-full wrappers where appropriate
- [ ] No horizontal scroll on any breakpoint
- [ ] All tap targets ≥ 44px
- [ ] Conversion blocks visually distinct from content blocks
- [ ] No content creation or modification
- [ ] No governance violations (section order, CTA resolver, enforcement logic untouched)
- [ ] Responsive verification checklist completed

---

## Implementation Order

1. **Add design system tokens** (typography, spacing to `tokens.css`)
2. **Add component utility classes** (cards, badges, sections, grids to `global.css`)
3. **Create TrustBadges component**
4. **Refactor ReviewsBlock component**
5. **Update homepage template**
6. **Update service page template**
7. **Fix service+city emergency block + update template**
8. **Test responsive breakpoints**
9. **Complete verification checklist**

---

## Next Steps

Proceed to code implementation in the following order:
1. Design system files (`tokens.css`, `global.css`)
2. New TrustBadges component
3. ReviewsBlock refactor
4. Template updates (homepage → service → service+city)
5. Responsive testing

**No content creation. No governance breaks. UI and styling only.**
