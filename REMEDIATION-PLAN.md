# B.A.P Heating & Cooling - Comprehensive Website Remediation Plan

> **Status**: NOT STARTED - Ready for proper implementation
> **Total Issues Found**: 70+
> **Last Updated**: 2026-01-16
> **Completed**: 0 of 45 steps

---

## Rules for Execution

1. **One task per step** - Complete each step fully before moving to the next
2. **Use `/frontend-design` skill** - Every step MUST invoke the frontend-design skill
3. **Enter plan mode first** - Discuss the approach with user before implementing
4. **Verify build passes** - Run `pnpm build` after each step
5. **Test functionality** - Verify the fix works as expected
6. **Update todo list** - Mark step complete and update status below
7. **Generate next prompt** - Copy the next step's prompt to continue

---

## AUDIT SUMMARY

| Category | Issues Found | Severity |
|----------|-------------|----------|
| **CRO - Conversion Blockers** | 5 | **REVENUE CRITICAL** |
| URL/Link Bugs (404s) | 4 | CRITICAL |
| Missing Component Integration | 2 | HIGH |
| Exit Intent/Modal Issues | 1 | HIGH |
| Mobile Navigation | 2 | HIGH |
| Blog Filtering | 2 | HIGH |
| Trust Signal Duplication | 1 | MEDIUM |
| Accessibility Issues | 5 | MEDIUM |
| Design System - Hardcoded Colors | 15 | MEDIUM |
| Design System - Hardcoded Font Sizes | 10 | MEDIUM |
| Design System - Hardcoded Font Weights | 7 | LOW |
| Design System - Other Violations | 6 | LOW |
| Component Cleanup | 3 | LOW |
| **TOTAL** | **70+** | - |

---

# PHASE 0: CRITICAL CONVERSION FIXES (Steps 0.1-0.5)

> **REVENUE IMPACT:** These 5 fixes directly affect phone calls and bookings.
> **Estimated improvement:** +15-40% conversion rate when combined.
> **Priority:** Complete BEFORE bug fixes - bugs don't matter if users can't convert.

---

## STEP 0.1: Show Phone Number on ALL Mobile Screens

**Status**: [ ] Not Started
**Severity**: REVENUE CRITICAL
**Estimated Impact**: +8-15% emergency calls

**File**: `src/components/layout/Header.astro`
**Lines**: 545-549
**Issue**: Phone number is HIDDEN on screens <640px. Users see only an icon, no number.

**Current Code (BROKEN):**
```css
.header__phone-number {
  display: none;  /* Hidden by default! */
}
@media (min-width: 640px) {
  .header__phone-number {
    display: inline;
  }
}
```

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Make phone number visible on ALL mobile screen sizes in Header.astro

PROBLEM: The phone number is hidden on screens smaller than 640px (Header.astro lines 545-549). On iPhone SE and similar devices, users see only a phone icon - no actual number. For emergency HVAC calls (70%+ from mobile), this is devastating for conversions.

CURRENT CSS (lines 545-549):
.header__phone-number {
  display: none;
}
@media (min-width: 640px) {
  .header__phone-number {
    display: inline;
  }
}

SOLUTION:
Option A (Recommended): Always show the number with responsive font size:
.header__phone-number {
  display: inline;
  font-size: clamp(0.75rem, 2.5vw, 1rem);
}

Option B: Show abbreviated on very small screens:
.header__phone-number {
  display: inline;
}
@media (max-width: 360px) {
  .header__phone-number {
    font-size: 0.75rem;
  }
}

VERIFICATION:
- Run `pnpm build` to verify no errors
- Test on mobile viewport (320px, 375px, 414px) - phone number must be visible
- Phone number must be tappable (tel: link)

Ask me any questions about this approach before implementing.
```

---

## STEP 0.2: Add Sticky Mobile Footer CTA

**Status**: [ ] Not Started
**Severity**: REVENUE CRITICAL
**Estimated Impact**: +5-10% calls

**Files**: Create new component + update BaseLayout
**Issue**: No persistent CTA when users scroll. They scroll away from header and lose access to phone button.

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Create a sticky mobile footer CTA component for phone calls

PROBLEM: When mobile users scroll past the header, they lose easy access to the phone number. There's no floating or sticky CTA to capture them. For emergency HVAC calls, this loses 5-10% of potential conversions.

SOLUTION:
1. Create new component: src/components/layout/StickyMobileCTA.astro

2. Component requirements:
   - Fixed to bottom of viewport (position: fixed; bottom: 0)
   - Only visible on mobile (<1024px)
   - Shows phone number + "Call Now" button
   - Respects iOS safe area (padding-bottom: env(safe-area-inset-bottom))
   - High z-index (var(--z-fixed) or 30)
   - Uses primary-700 background color
   - Hides when mobile menu is open
   - Optional: Only appears after scrolling past hero

3. Add to BaseLayout.astro after Footer component

DESIGN TOKENS TO USE:
- Background: var(--color-primary-700)
- Text: var(--color-text-inverse)
- Padding: var(--space-3) var(--space-4)
- Shadow: var(--shadow-lg)
- Z-index: var(--z-fixed)

VERIFICATION:
- Run `pnpm build` to verify no errors
- Test on mobile - sticky bar appears at bottom
- Tapping calls the phone number
- Bar disappears when menu opens (to avoid overlap)

Ask me any questions about this approach before implementing.
```

---

## STEP 0.3: Add Hero CTA Button to Service Pages

**Status**: [ ] Not Started
**Severity**: REVENUE CRITICAL
**Estimated Impact**: +10-15% conversions

**File**: `src/components/services/ServiceHero.astro`
**Issue**: Service page heroes have NO call-to-action button. Users must scroll through multiple sections to find a CTA.

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Add CTA buttons to ServiceHero component

PROBLEM: The ServiceHero component on service pages has no CTA button. Users land on a service page (e.g., furnace repair) and see a hero with just a headline - no "Get Quote" or "Call Now" button. They must scroll through 2-3+ sections before finding a conversion point. This loses 10-15% of ready-to-convert visitors.

SOLUTION:
1. Read src/components/services/ServiceHero.astro to understand current structure
2. Add CTA buttons similar to homepage HeroSection:
   - Primary: "Call Now" with phone icon (links to tel:)
   - Secondary: "Get Free Quote" or "Book Online" (links to booking)

3. Position buttons below the hero headline/description
4. Use existing Button primitive for consistency
5. Make buttons responsive (stack on mobile)

REFERENCE: Look at src/components/homepage/HeroSection.astro for button implementation pattern

VERIFICATION:
- Run `pnpm build` to verify no errors
- Check any service page - hero should have visible CTA buttons
- Buttons should be above the fold on desktop AND mobile
- Phone button should initiate call

Ask me any questions about this approach before implementing.
```

---

## STEP 0.4: Move Reviews Carousel Earlier on Homepage

**Status**: [ ] Not Started
**Severity**: HIGH
**Estimated Impact**: +5-10% trust/engagement

**File**: `src/pages/index.astro`
**Issue**: ReviewsCarousel appears at section 8 of 13. Too late - skeptical visitors bounce before seeing social proof.

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Move ReviewsCarousel earlier in the homepage section order

PROBLEM: The ReviewsCarousel component currently appears at position 8 out of 13 sections on the homepage. This is too late in the funnel. Visitors skeptical of claims like "Family-owned since 1992" need to see customer testimonials BEFORE they've scrolled through 7 other sections.

CURRENT ORDER (simplified):
1. Hero
2. ServiceCategories
3. EmergencyCTA
4. WhyChooseBAP
5. BrandLogos
6. ProcessSection
7. GallerySection
8. ReviewsCarousel ← TOO LATE
9. FinancingTeaser
...

RECOMMENDED ORDER:
1. Hero
2. ServiceCategories
3. EmergencyCTA
4. ReviewsCarousel ← MOVE HERE (social proof early)
5. WhyChooseBAP
6. BrandLogos
7. ProcessSection
8. GallerySection
9. FinancingTeaser
...

SOLUTION:
In src/pages/index.astro, move the <ReviewsCarousel /> component from its current position to immediately after EmergencyCTASection (around section 4).

VERIFICATION:
- Run `pnpm build` to verify no errors
- Check homepage - reviews should appear early (within first 4 sections)
- Scroll test: Reviews should be visible within 1-2 scroll actions from hero

Ask me any questions about this approach before implementing.
```

---

## STEP 0.5: Add Micro-CTAs to Service Content Sections

**Status**: [ ] Not Started
**Severity**: HIGH
**Estimated Impact**: +10-15% engagement

**Files**: `src/components/services/ServiceProblemAgitation.astro`, `src/components/services/ServiceSolution.astro`
**Issue**: Content sections have zero inline CTAs. Users read, read, read... then hit final CTA at bottom (if they get there).

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Add micro-CTAs (inline conversion points) to service page content sections

PROBLEM: The ServiceProblemAgitation and ServiceSolution components have long content blocks with NO inline calls-to-action. Users read through problems and solutions but are never prompted to take action until they scroll to the very bottom. This loses 10-15% of engaged visitors who were ready to convert mid-content.

SOLUTION:
1. ServiceProblemAgitation.astro - Add soft CTA at end of problem section:
   - Text link style: "Experiencing these issues? Schedule a free inspection →"
   - Not a big button - just a styled link to reduce visual noise

2. ServiceSolution.astro - Add medium CTA after solution description:
   - Small button or prominent link: "See if you qualify for rebates" or "Get your free quote"
   - Links to contact or financing page

DESIGN PATTERN:
Use subtle but clear CTAs:
- Link style with arrow icon
- Color: var(--color-primary-600) or var(--color-accent-600)
- Hover: underline + color shift
- Not full-width buttons (too aggressive mid-content)

EXAMPLE:
<p class="micro-cta">
  <a href="/contact-us/">
    Ready to solve this? Get your free quote
    <Icon name="arrow-right" size="sm" />
  </a>
</p>

VERIFICATION:
- Run `pnpm build` to verify no errors
- Check service pages - inline CTAs appear in problem and solution sections
- CTAs are clickable and link to appropriate pages

Ask me any questions about this approach before implementing.
```

---

# PHASE 1: CRITICAL BUGS (Steps 1-6)

---

## STEP 1: Fix Blog Preview Section URL Bug

**Status**: [ ] Not Started
**Severity**: CRITICAL

**File**: `src/components/homepage/BlogPreviewSection.astro`
**Line**: 141
**Issue**: Uses `post.id` which includes `.md` extension, causing 404 errors

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Fix the blog URL bug in src/components/homepage/BlogPreviewSection.astro

PROBLEM: On line 141, the code uses `post.id` which includes the `.md` extension, causing 404 errors. URLs like /blog/furnace-installation-cost-ontario-2025.md/ should be /blog/furnace-installation-cost-ontario-2025/

SOLUTION:
- File: src/components/homepage/BlogPreviewSection.astro
- Line 141: Change `post.id` to `post.slug`
- From: href={`/blog/${post.id}/`}
- To: href={`/blog/${post.slug}/`}

VERIFICATION:
- Run `pnpm build` to verify no errors
- Check that blog links from homepage no longer have `.md` extension

Ask me any questions about this approach before implementing.
```

---

## STEP 2: Fix Service Areas Section - Region URLs

**Status**: [ ] Not Started
**Severity**: CRITICAL

**File**: `src/components/homepage/ServiceAreasSection.astro`
**Line**: 80
**Issue**: Uses raw `region.id` which includes `.md` extension

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Fix region URL bug in src/components/homepage/ServiceAreasSection.astro

PROBLEM: Line 80 uses raw `region.id` which includes the `.md` extension, causing 404 errors like /regions/dufferin-county.md/

SOLUTION:
1. Add a cleanSlug helper function at the top of the component's script section:
   const cleanSlug = (id: string) => id.replace(/\.md$/, '');

2. On line 80, change:
   - From: href: `/regions/${region.id}/`
   - To: href: `/regions/${cleanSlug(region.id)}/`

VERIFICATION:
- Run `pnpm build` to verify no errors
- Region links should be /regions/dufferin-county/ not /regions/dufferin-county.md/

Ask me any questions about this approach before implementing.
```

---

## STEP 3: Fix Service Areas Section - Location URLs

**Status**: [ ] Not Started
**Severity**: CRITICAL

**File**: `src/components/homepage/ServiceAreasSection.astro`
**Line**: 90
**Issue**: Uses raw `loc.id` which includes `.md` extension

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Fix location URL bug in src/components/homepage/ServiceAreasSection.astro

PROBLEM: Line 90 uses raw `loc.id` which includes the `.md` extension

SOLUTION:
- On line 90, change:
  - From: href: `/locations/${loc.id}/`
  - To: href: `/locations/${cleanSlug(loc.id)}/`
- The cleanSlug function should already exist from Step 2

VERIFICATION:
- Run `pnpm build` to verify no errors
- Location links no longer have `.md` extension

Ask me any questions about this approach before implementing.
```

---

## STEP 4: Fix Regions Grid URL Bug

**Status**: [ ] Not Started
**Severity**: CRITICAL

**File**: `src/components/shared/RegionsGrid.astro`
**Line**: 92
**Issue**: Uses raw `region.id` which includes `.md` extension

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Fix region URL bug in src/components/shared/RegionsGrid.astro

PROBLEM: Line 92 uses raw `region.id` which includes the `.md` extension, causing 404 errors

SOLUTION:
1. Add a cleanSlug helper function at the top of the component's script section:
   const cleanSlug = (id: string) => id.replace(/\.md$/, '');

2. On line 92, change:
   - From: href: `/regions/${region.id}/`
   - To: href: `/regions/${cleanSlug(region.id)}/`

VERIFICATION:
- Run `pnpm build` to verify no errors
- All region grid links work correctly without .md extension

Ask me any questions about this approach before implementing.
```

---

## STEP 5: Fix Exit Intent Modal Trigger Logic

**Status**: [ ] Not Started
**Severity**: HIGH

**File**: `src/components/shared/ExitIntentModal.astro`
**Lines**: 274-285
**Issue**: Overly strict mouseout conditions prevent modal from ever triggering

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Fix exit intent modal trigger in src/components/shared/ExitIntentModal.astro

PROBLEM: The exit intent popup never appears because the trigger conditions on lines 274-285 are too strict. The `e.toElement` check is deprecated and rarely works in modern browsers.

CURRENT CODE:
const shouldTrigger =
  e.clientY <= 5 &&
  e.relatedTarget === null &&
  e.toElement === null;

SOLUTION:
Change the shouldTrigger logic to:
const shouldTrigger =
  e.clientY <= 10 &&
  !e.relatedTarget;

VERIFICATION:
- Run `pnpm build` to verify no errors
- Exit intent modal should trigger when mouse leaves viewport top

Ask me any questions about this approach before implementing.
```

---

## STEP 6: Add SeasonalCalloutBar to Layout

**Status**: [ ] Not Started
**Severity**: HIGH

**File**: `src/layouts/BaseLayout.astro`
**Issue**: SeasonalCalloutBar component exists but is NEVER imported or rendered

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Add SeasonalCalloutBar to the site layout in src/layouts/BaseLayout.astro

PROBLEM: The SeasonalCalloutBar component exists at src/components/layout/SeasonalCalloutBar.astro with date-based logic for seasonal messages, but it's never imported or rendered in the layout. Seasonal promotions are completely invisible.

SOLUTION:
1. Add import near other layout component imports (around line 16-17):
   import SeasonalCalloutBar from '../components/layout/SeasonalCalloutBar.astro';

2. Add the component right after the Header (around line 161-162):
   <Header showTopBar={true} />
   <SeasonalCalloutBar />

The component already has date-based logic (winter content is enabled for Dec 1 - Feb 28).

VERIFICATION:
- Run `pnpm build` to verify no errors
- Seasonal message bar should appear (current date falls within winter range)

Ask me any questions about this approach before implementing.
```

---

# PHASE 2: NAVIGATION & ICONS (Steps 7-8)

---

## STEP 7: Add Close Icon to Icon Library

**Status**: [ ] Not Started
**Severity**: HIGH

**File**: `src/lib/icons.ts`
**Issue**: No `x` or `close` icon exists - MobileMenu uses rotated `plus` as hacky workaround

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Add close/x icon to the icon library in src/lib/icons.ts

PROBLEM: The icons object is missing an x/close icon. The MobileMenu currently uses a rotated plus icon as a confusing workaround that doesn't look like a close button.

SOLUTION:
Add these two entries to the icons object (near the plus icon for organization):

x: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />',
close: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />',

These are standard X icon paths used for close buttons.

VERIFICATION:
- Run `pnpm build` to verify no errors
- `x` and `close` icons should be available in icon library

Ask me any questions about this approach before implementing.
```

---

## STEP 8: Fix Mobile Menu Close Button

**Status**: [ ] Not Started
**Severity**: HIGH

**File**: `src/components/layout/MobileMenu.astro`
**Lines**: 101, 359-361
**Issue**: Uses rotated plus icon instead of proper X icon - confuses users

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Fix the mobile menu close button in src/components/layout/MobileMenu.astro

PROBLEM: The close button uses a plus icon rotated 45 degrees instead of a proper X icon. This is confusing for users - a plus sign doesn't communicate "close".

SOLUTION:
1. On line 101, change the icon from "plus" to "x":
   - From: <Icon name="plus" size="lg" class="mobile-menu__close-icon" />
   - To: <Icon name="x" size="lg" class="mobile-menu__close-icon" />

2. Remove the CSS rotation hack on lines 359-361:
   Delete this CSS block:
   .mobile-menu__close-icon {
     transform: rotate(45deg);
   }

The x icon was added in Step 7.

VERIFICATION:
- Run `pnpm build` to verify no errors
- Mobile menu should show proper X icon for close button

Ask me any questions about this approach before implementing.
```

---

# PHASE 3: FUNCTIONALITY (Steps 9-11)

---

## STEP 9: Replace ServiceTrustBand with Brand Logos

**Status**: [ ] Not Started
**Severity**: MEDIUM

**File**: `src/pages/services/[...slug].astro`
**Line**: 288
**Issue**: Duplicate trust signals - ServiceTrustBand shows same info as hero section

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Replace ServiceTrustBand with brand logos on service pages in src/pages/services/[...slug].astro

PROBLEM: On line 288, the ServiceTrustBand creates duplicate trust signals (same info already appears in hero). User requested replacing this with equipment brand logos instead.

SOLUTION:
1. Find the import for ServiceTrustBand and change it to import BrandLogosSection:
   import BrandLogosSection from '../../components/homepage/BrandLogosSection.astro';

2. On line 288, replace:
   - From: <ServiceTrustBand />
   - To: <BrandLogosSection variant="compact" /> (or just <BrandLogosSection /> if no compact variant)

The brands section shows logos like Carrier, Lennox, Trane, Goodman - provides unique value vs duplicating trust stats.

VERIFICATION:
- Run `pnpm build` to verify no errors
- Service pages should show brand logos instead of duplicate trust stats

Ask me any questions about this approach before implementing.
```

---

## STEP 10: Add Data Attributes for Blog Filtering

**Status**: [ ] Not Started
**Severity**: HIGH

**File**: `src/pages/blog/index.astro`
**Issue**: Blog cards need data-category attribute for client-side filtering to work

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Add data-category attributes to blog cards in src/pages/blog/index.astro

PROBLEM: For client-side blog filtering to work, each blog card needs a data-category attribute. Currently clicking category filters does nothing.

SOLUTION:
1. Find where blog posts are mapped/rendered
2. Add data-category to each card wrapper:
   data-category={post.data.category}

   Example:
   <article class="blog-card" data-category={post.data.category}>
     ...
   </article>

3. Add an id to the blog grid container for JavaScript targeting:
   <div id="blog-grid" class="blog-grid">

VERIFICATION:
- Run `pnpm build` to verify no errors
- Blog cards should have data-category attribute in HTML output

Ask me any questions about this approach before implementing.
```

---

## STEP 11: Implement Blog Category Filter Logic

**Status**: [ ] Not Started
**Severity**: HIGH

**File**: `src/components/blog/BlogCategoryNav.astro`
**Issue**: Category navigation is purely visual - clicking pills does NOTHING

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Implement client-side blog filtering in src/components/blog/BlogCategoryNav.astro

PROBLEM: The category pills are purely visual with no filtering logic. Clicking them does absolutely nothing - users expect filtering.

SOLUTION:
1. Add data-category attributes to each pill button
2. Add JavaScript to make the category pills filter blog posts:
   - Add click event listeners to each category pill
   - On click: prevent default, get category, show/hide cards by data-category, update URL hash, toggle active class

Script to add at bottom of component:
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const pills = document.querySelectorAll('.category-pill');
    const cards = document.querySelectorAll('[data-category]');

    pills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        const category = pill.dataset.category || 'all';
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        cards.forEach(card => {
          card.style.display = (category === 'all' || card.dataset.category === category) ? '' : 'none';
        });
        history.replaceState(null, '', category === 'all' ? '#' : `#${category}`);
      });
    });
    const hash = window.location.hash.slice(1);
    if (hash) {
      const pill = document.querySelector(`[data-category="${hash}"]`);
      if (pill) pill.click();
    }
  });
</script>

VERIFICATION:
- Run `pnpm build` to verify no errors
- Clicking category pills should filter blog posts
- URL hash should update when filtering

Ask me any questions about this approach before implementing.
```

---

# PHASE 4: ACCESSIBILITY FIXES (Steps 12-16)

---

## STEP 12: Fix Lightbox Alt Text - Dynamic Update

**Status**: [ ] Not Started
**Severity**: MEDIUM

**File**: `src/components/services/ServiceImageGallery.astro`
**Line**: 221
**Issue**: Lightbox image alt text is empty and never updated when images change

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Fix lightbox image alt text in src/components/services/ServiceImageGallery.astro

PROBLEM: Line 221 shows the lightbox image has `alt=""` that is never populated dynamically. When users open images in the lightbox, screen readers announce nothing - critical accessibility failure.

SOLUTION:
1. Find the lightbox image element (line 219-224):
   <img src="" alt="" ... data-lightbox-image />

2. In the JavaScript that opens the lightbox, ensure both src AND alt are updated:
   - Find where the image src is set when opening lightbox
   - Also set the alt attribute from the clicked thumbnail's alt

Look for the click handler that populates the lightbox and add:
   lightboxImg.alt = clickedImage.alt || 'Gallery image';

VERIFICATION:
- Run `pnpm build` to verify no errors
- Open lightbox and verify alt text appears in DOM inspector
- Screen reader should announce image description

Ask me any questions about this approach before implementing.
```

---

## STEP 13: Add Accordion ARIA Controls

**Status**: [ ] Not Started
**Severity**: MEDIUM

**File**: `src/components/primitives/AccordionItem.astro`
**Issue**: Accordion triggers missing `aria-controls` binding to content panels

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Add proper ARIA controls to AccordionItem.astro

PROBLEM: The accordion triggers are missing aria-controls attribute that binds them to their content panels. Screen readers can't announce which panel the button controls.

SOLUTION:
1. Generate unique IDs for each accordion panel
2. Add aria-controls to the trigger button pointing to the panel ID
3. Add the matching ID to the content panel

Example:
- Trigger: <button aria-controls="accordion-panel-1" aria-expanded="false">
- Panel: <div id="accordion-panel-1" role="region">

VERIFICATION:
- Run `pnpm build` to verify no errors
- Inspect accordion in browser - trigger should have aria-controls matching panel id
- Test with screen reader

Ask me any questions about this approach before implementing.
```

---

## STEP 14: Make MobileMenu Trust Signals Dynamic

**Status**: [ ] Not Started
**Severity**: LOW

**File**: `src/components/layout/MobileMenu.astro`
**Line**: 224
**Issue**: Hardcoded "Family-owned since 1992" should pull from business profile

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Make trust signals dynamic in MobileMenu.astro

PROBLEM: Line 224 has hardcoded "Family-owned since 1992" text. This should pull from the business profile to stay DRY and maintainable.

SOLUTION:
1. Import getBusinessProfile at the top of the component
2. Fetch the business profile data
3. Replace hardcoded text with dynamic values from profile

Example:
import { getBusinessProfile } from '../../lib/getBusinessProfile';
const profile = await getBusinessProfile();

Then replace hardcoded text:
- From: "Family-owned since 1992"
- To: `Family-owned since ${profile.establishedYear || '1992'}`

VERIFICATION:
- Run `pnpm build` to verify no errors
- Check that the text still displays correctly
- If business profile data changes, mobile menu should reflect it

Ask me any questions about this approach before implementing.
```

---

## STEP 15: Add ReviewsCarousel Slide Announcements

**Status**: [ ] Not Started
**Severity**: LOW

**File**: `src/components/homepage/ReviewsCarousel.astro`
**Issue**: Auto-advancing slides don't announce changes to screen readers

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Add aria-live announcements to ReviewsCarousel.astro

PROBLEM: When the carousel auto-advances or user navigates, screen readers don't announce the new slide content.

SOLUTION:
1. Add an aria-live region for announcements
2. Update the region when slides change

Add to the component:
<div aria-live="polite" aria-atomic="true" class="sr-only" id="carousel-announcement">
  <!-- Updated via JS when slide changes -->
</div>

In the JavaScript slide change handler, update the announcement:
document.getElementById('carousel-announcement').textContent =
  `Showing review ${currentSlide + 1} of ${totalSlides}`;

VERIFICATION:
- Run `pnpm build` to verify no errors
- Enable screen reader and navigate carousel
- Should announce current slide position

Ask me any questions about this approach before implementing.
```

---

## STEP 16: Add ProcessTimeline ARIA Progress

**Status**: [ ] Not Started
**Severity**: LOW

**File**: `src/components/shared/ProcessTimeline.astro`
**Issue**: Timeline steps lack ARIA markup for progress indication

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Add ARIA progress markup to ProcessTimeline.astro

PROBLEM: The process timeline steps don't have proper ARIA markup to indicate step numbers and total steps to screen readers.

SOLUTION:
1. Add role="list" to the timeline container
2. Add role="listitem" to each step
3. Add aria-label with step number context

Example:
<ol role="list" aria-label="Installation process steps">
  <li role="listitem" aria-label="Step 1 of 4: Consultation">
    ...
  </li>
</ol>

VERIFICATION:
- Run `pnpm build` to verify no errors
- Screen reader should announce "Step 1 of 4" etc.

Ask me any questions about this approach before implementing.
```

---

# PHASE 5: DESIGN SYSTEM - HARDCODED COLORS (Steps 17-26)

---

## STEP 17: Fix Hardcoded Colors - global.css Print Styles

**Status**: [ ] Not Started
**Severity**: MEDIUM

**File**: `src/styles/global.css`
**Lines**: 1091, 1092, 1099
**Issue**: Hardcoded colors #000, #fff, #666 in print styles

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Replace hardcoded print colors in src/styles/global.css

PROBLEM: Print styles use hardcoded colors:
- Line 1091: color: #000
- Line 1092: background: #fff
- Line 1099: color: #666

SOLUTION:
Replace with design tokens:
- #000 -> var(--color-text-primary)
- #fff -> var(--color-surface-primary)
- #666 -> var(--color-text-secondary)

Note: For print, these tokens should resolve to appropriate values.

VERIFICATION:
- Run `pnpm build` to verify no errors
- Print preview should still look correct

Ask me any questions about this approach before implementing.
```

---

## STEP 18: Fix Hardcoded Colors - TimelineStep Print Styles

**Status**: [ ] Not Started
**Severity**: MEDIUM

**File**: `src/components/shared/TimelineStep.astro`
**Lines**: 539, 543, 547
**Issue**: Print styles use hardcoded #333 and #ccc

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Replace hardcoded print colors in TimelineStep.astro

PROBLEM: Print styles (lines 539-547) use hardcoded colors:
- Line 539: border: 2px solid #333
- Line 543: color: #333
- Line 547: background: #ccc

SOLUTION:
Replace with design tokens:
- #333 -> var(--color-text-primary)
- #ccc -> var(--color-border-primary)

VERIFICATION:
- Run `pnpm build` to verify no errors
- No hardcoded hex colors in print styles

Ask me any questions about this approach before implementing.
```

---

## STEP 19: Fix Hardcoded Colors - ServiceValueProps

**Status**: [ ] Not Started
**Severity**: MEDIUM

**File**: `src/components/services/ServiceValueProps.astro`
**Line**: 146
**Issue**: Uses hardcoded #fffbf7 fallback

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Remove hardcoded color fallback in ServiceValueProps.astro

PROBLEM: Line 146 has fallback: background-color: var(--color-surface-warm, #fffbf7)

SOLUTION:
Remove the fallback - the token is defined in tokens.css:
- From: var(--color-surface-warm, #fffbf7)
- To: var(--color-surface-warm)

VERIFICATION:
- Run `pnpm build` to verify no errors
- Component should still have warm background

Ask me any questions about this approach before implementing.
```

---

## STEP 20: Fix Hardcoded Colors - ServiceSolution

**Status**: [ ] Not Started
**Severity**: MEDIUM

**File**: `src/components/services/ServiceSolution.astro`
**Lines**: 171, 177-178
**Issue**: Uses hardcoded #fffbf7 fallback and #fff9f2 in gradient

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Replace hardcoded colors in ServiceSolution.astro

PROBLEM:
- Line 171: background: var(--color-surface-warm, #fffbf7) - has fallback
- Lines 177-178: Uses #fff9f2 directly in gradient

SOLUTION:
1. Remove #fffbf7 fallback on line 171
2. Replace #fff9f2 with var(--color-surface-warm) for consistency:
   - From: #fff9f2 100%
   - To: var(--color-surface-warm) 100%

VERIFICATION:
- Run `pnpm build` to verify no errors
- Background gradient should still look correct

Ask me any questions about this approach before implementing.
```

---

## STEP 21: Fix Hardcoded Colors - BlogAuthorBio

**Status**: [ ] Not Started
**Severity**: MEDIUM

**File**: `src/components/blog/BlogAuthorBio.astro`
**Line**: 283
**Issue**: Uses hardcoded #fffbf7 in gradient

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Replace hardcoded color in BlogAuthorBio.astro

PROBLEM: Line 283 uses #fffbf7 directly in gradient instead of token

SOLUTION:
Replace #fffbf7 with var(--color-surface-warm):
- From: #fffbf7 50%
- To: var(--color-surface-warm) 50%

VERIFICATION:
- Run `pnpm build` to verify no errors
- Author bio gradient should still look correct

Ask me any questions about this approach before implementing.
```

---

## STEP 22: Fix Hardcoded Colors - FinancingTeaserSection

**Status**: [ ] Not Started
**Severity**: MEDIUM

**File**: `src/components/homepage/FinancingTeaserSection.astro`
**Line**: 259
**Issue**: Uses hardcoded #fffbf7 fallback in gradient

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Remove hardcoded color fallback in FinancingTeaserSection.astro

PROBLEM: Line 259 has fallback: var(--color-surface-warm, #fffbf7) 0%

SOLUTION:
Remove the fallback:
- From: var(--color-surface-warm, #fffbf7) 0%
- To: var(--color-surface-warm) 0%

VERIFICATION:
- Run `pnpm build` to verify no errors
- Financing section gradient should still look correct

Ask me any questions about this approach before implementing.
```

---

## STEP 23: Fix Hardcoded Colors - WhyChooseBAPSection

**Status**: [ ] Not Started
**Severity**: MEDIUM

**File**: `src/components/homepage/WhyChooseBAPSection.astro`
**Line**: 260
**Issue**: Uses hardcoded #fffbf7 fallback

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Remove hardcoded color fallback in WhyChooseBAPSection.astro

PROBLEM: Line 260 has fallback: background: var(--color-surface-warm, #fffbf7)

SOLUTION:
Remove the fallback:
- From: var(--color-surface-warm, #fffbf7)
- To: var(--color-surface-warm)

VERIFICATION:
- Run `pnpm build` to verify no errors
- Section background should still look correct

Ask me any questions about this approach before implementing.
```

---

## STEP 24: Fix Hardcoded Colors - Footer Print Styles

**Status**: [ ] Not Started
**Severity**: LOW

**File**: `src/components/layout/Footer.astro`
**Lines**: 876, 896
**Issue**: Print styles use hardcoded "black" for borders

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Replace hardcoded print border colors in Footer.astro

PROBLEM: Print styles use hardcoded "black":
- Line 876: border-top: 2px solid black
- Line 896: border: 1px solid black

SOLUTION:
Replace with design token:
- From: solid black
- To: solid var(--color-text-primary)

VERIFICATION:
- Run `pnpm build` to verify no errors
- Print preview should still show borders

Ask me any questions about this approach before implementing.
```

---

## STEP 25: Fix Hardcoded Colors - TopBar Print Styles

**Status**: [ ] Not Started
**Severity**: LOW

**File**: `src/components/layout/TopBar.astro`
**Line**: 379
**Issue**: Print style uses hardcoded "black" for border

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Replace hardcoded print border color in TopBar.astro

PROBLEM: Line 379 uses: border-bottom: 1px solid black

SOLUTION:
Replace with design token:
- From: solid black
- To: solid var(--color-text-primary)

VERIFICATION:
- Run `pnpm build` to verify no errors
- Print preview should still show border

Ask me any questions about this approach before implementing.
```

---

## STEP 26: Fix Hardcoded Colors - SeasonalCalloutBar

**Status**: [ ] Not Started
**Severity**: MEDIUM

**File**: `src/components/layout/SeasonalCalloutBar.astro`
**Issue**: Uses hardcoded gradient colors for seasonal themes

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Replace hardcoded gradient colors in SeasonalCalloutBar.astro

PROBLEM: The component uses hardcoded gradient colors for seasonal themes instead of design tokens.

SOLUTION:
1. Find seasonal gradient colors and replace with token references:
   - Blues -> var(--color-primary-*) tokens
   - Oranges -> var(--color-accent-*) tokens
   - Greens -> var(--color-success-*) tokens

2. For gradients, create CSS custom properties at the component level:
   --gradient-winter: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-800));
   --gradient-summer: linear-gradient(135deg, var(--color-accent-500), var(--color-accent-700));

VERIFICATION:
- Run `pnpm build` to verify no errors
- Seasonal colors should use the token system

Ask me any questions about this approach before implementing.
```

---

# PHASE 6: DESIGN SYSTEM - FONT SIZES (Steps 27-36)

---

## STEP 27: Fix Hardcoded Font Size - global.css

**Status**: [ ] Not Started
**Severity**: LOW

**File**: `src/styles/global.css`
**Line**: 169
**Issue**: Code blocks use hardcoded 0.9em font size

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Replace hardcoded font size in global.css

PROBLEM: Line 169 uses: font-size: 0.9em for code blocks

SOLUTION:
Replace with token (or create new token if needed):
- From: font-size: 0.9em
- To: font-size: var(--font-size-sm) /* 0.875rem = 14px */

VERIFICATION:
- Run `pnpm build` to verify no errors
- Code blocks should still be readable

Ask me any questions about this approach before implementing.
```

---

## STEP 28: Fix Hardcoded Font Size - Eyebrow.astro

**Status**: [ ] Not Started
**Severity**: LOW

**File**: `src/components/primitives/Eyebrow.astro`
**Line**: 150
**Issue**: Uses hardcoded 13px font size

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Replace hardcoded font size in Eyebrow.astro

PROBLEM: Line 150 uses: font-size: 13px

SOLUTION:
Replace with closest token:
- From: font-size: 13px
- To: font-size: var(--font-size-sm) /* 14px - close enough */

Or consider adding --font-size-13 token if 13px is intentionally different.

VERIFICATION:
- Run `pnpm build` to verify no errors
- Eyebrow text should still look appropriate

Ask me any questions about this approach before implementing.
```

---

## STEP 29: Fix Hardcoded Font Size - ServiceSolution.astro

**Status**: [ ] Not Started
**Severity**: LOW

**File**: `src/components/services/ServiceSolution.astro`
**Line**: 615
**Issue**: Uses hardcoded 10px font size

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Replace hardcoded font size in ServiceSolution.astro

PROBLEM: Line 615 uses: font-size: 10px

SOLUTION:
Replace with token:
- From: font-size: 10px
- To: font-size: var(--font-size-xs) /* 12px - xs is smallest token */

Note: 10px is very small and may have accessibility concerns.

VERIFICATION:
- Run `pnpm build` to verify no errors
- Text should still be readable

Ask me any questions about this approach before implementing.
```

---

## STEP 30: Fix Hardcoded Font Size - ServiceCaseStudy.astro

**Status**: [ ] Not Started
**Severity**: LOW

**File**: `src/components/services/ServiceCaseStudy.astro`
**Line**: 467
**Issue**: Uses hardcoded 11px font size

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Replace hardcoded font size in ServiceCaseStudy.astro

PROBLEM: Line 467 uses: font-size: 11px

SOLUTION:
Replace with token:
- From: font-size: 11px
- To: font-size: var(--font-size-xs) /* 12px */

VERIFICATION:
- Run `pnpm build` to verify no errors

Ask me any questions about this approach before implementing.
```

---

## STEP 31: Fix Hardcoded Font Sizes - ServiceSavings.astro

**Status**: [ ] Not Started
**Severity**: LOW

**File**: `src/components/services/ServiceSavings.astro`
**Lines**: 307, 501
**Issue**: Uses hardcoded 13px and 12px font sizes

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Replace hardcoded font sizes in ServiceSavings.astro

PROBLEM:
- Line 307: font-size: 13px
- Line 501: font-size: 12px

SOLUTION:
Replace with tokens:
- 13px -> var(--font-size-sm) /* 14px */
- 12px -> var(--font-size-xs) /* 12px - exact match */

VERIFICATION:
- Run `pnpm build` to verify no errors

Ask me any questions about this approach before implementing.
```

---

## STEP 32: Fix Hardcoded Font Size - ReviewCard.astro

**Status**: [ ] Not Started
**Severity**: LOW

**File**: `src/components/shared/ReviewCard.astro`
**Line**: 367
**Issue**: Uses hardcoded 11px font size

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Replace hardcoded font size in ReviewCard.astro

PROBLEM: Line 367 uses: font-size: 11px

SOLUTION:
Replace with token:
- From: font-size: 11px
- To: font-size: var(--font-size-xs)

VERIFICATION:
- Run `pnpm build` to verify no errors

Ask me any questions about this approach before implementing.
```

---

## STEP 33: Fix Hardcoded Font Size - ServiceCategoriesSection.astro

**Status**: [ ] Not Started
**Severity**: LOW

**File**: `src/components/homepage/ServiceCategoriesSection.astro`
**Line**: 667
**Issue**: Uses hardcoded 10px font size

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Replace hardcoded font size in ServiceCategoriesSection.astro

PROBLEM: Line 667 uses: font-size: 10px

SOLUTION:
Replace with token:
- From: font-size: 10px
- To: font-size: var(--font-size-xs)

VERIFICATION:
- Run `pnpm build` to verify no errors

Ask me any questions about this approach before implementing.
```

---

## STEP 34: Fix Hardcoded Font Size - SeasonalCalloutBar.astro

**Status**: [ ] Not Started
**Severity**: LOW

**File**: `src/components/layout/SeasonalCalloutBar.astro`
**Line**: 396
**Issue**: Uses hardcoded 10px font size

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Replace hardcoded font size in SeasonalCalloutBar.astro

PROBLEM: Line 396 uses: font-size: 10px

SOLUTION:
Replace with token:
- From: font-size: 10px
- To: font-size: var(--font-size-xs)

VERIFICATION:
- Run `pnpm build` to verify no errors

Ask me any questions about this approach before implementing.
```

---

## STEP 35: Fix Hardcoded Font Size - ServiceProblemAgitation.astro

**Status**: [ ] Not Started
**Severity**: LOW

**File**: `src/components/services/ServiceProblemAgitation.astro`
**Line**: 770
**Issue**: Uses hardcoded 10px font size

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Replace hardcoded font size in ServiceProblemAgitation.astro

PROBLEM: Line 770 uses: font-size: 10px

SOLUTION:
Replace with token:
- From: font-size: 10px
- To: font-size: var(--font-size-xs)

VERIFICATION:
- Run `pnpm build` to verify no errors

Ask me any questions about this approach before implementing.
```

---

## STEP 36: Fix Hardcoded Animation Duration - Button.astro

**Status**: [ ] Not Started
**Severity**: LOW

**File**: `src/components/primitives/Button.astro`
**Line**: 238
**Issue**: Uses hardcoded 2.5s animation duration

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Replace hardcoded animation duration in Button.astro

PROBLEM: Line 238 uses: animation: pulse-subtle 2.5s ease-in-out infinite

SOLUTION:
Consider using or creating a duration token. Currently tokens go up to 700ms.
Options:
1. Create new token: --duration-pulse: 2.5s
2. Keep as-is if intentionally different for this specific animation

VERIFICATION:
- Run `pnpm build` to verify no errors
- Button pulse animation should still work

Ask me any questions about this approach before implementing.
```

---

# PHASE 7: DESIGN SYSTEM - FONT WEIGHTS (Steps 37-43)

---

## STEP 37-43: Fix Hardcoded Font Weights - Header.astro

**Status**: [ ] Not Started
**Severity**: LOW

**File**: `src/components/layout/Header.astro`
**Lines**: 309, 317, 422, 496, 530, 658, 709
**Issue**: Uses numeric font-weight values instead of tokens

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Replace all hardcoded font weights in Header.astro

PROBLEM: Multiple lines use numeric font-weight values:
- Line 309: font-weight: 500 (should be var(--font-weight-medium))
- Line 317: font-weight: 700 (should be var(--font-weight-bold))
- Line 422: font-weight: 600 (should be var(--font-weight-semibold))
- Line 496: font-weight: 600 (should be var(--font-weight-semibold))
- Line 530: font-weight: 700 (should be var(--font-weight-bold))
- Line 658: font-weight: 600 (should be var(--font-weight-semibold))
- Line 709: font-weight: 700 (should be var(--font-weight-bold))

SOLUTION:
Replace all with corresponding tokens:
- 500 -> var(--font-weight-medium)
- 600 -> var(--font-weight-semibold)
- 700 -> var(--font-weight-bold)

VERIFICATION:
- Run `pnpm build` to verify no errors
- Header text weights should look the same

Ask me any questions about this approach before implementing.
```

---

# PHASE 8: FINAL REVIEW (Steps 44-45)

---

## STEP 44: Review and Adjust Color Palette

**Status**: [ ] Not Started
**Severity**: MEDIUM

**File**: `src/styles/tokens.css`
**Issue**: User requested review of color palette for better balance

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Review and refine the color palette in src/styles/tokens.css

PROBLEM: The user requested review and adjustment of the color palette for better balance and consistency.

CURRENT PALETTE CONCERNS:
1. Primary blue (#3b6fd9 at 500) may be too bright/saturated
2. Need to verify orange accent is used ONLY for CTAs, not decoratively

REVIEW AREAS:
- Primary (Trust Blue): --color-primary-50 through --color-primary-900
- Accent (Action Orange): --color-accent-50 through --color-accent-900

CONSIDERATIONS:
1. Primary blue-500 could be slightly desaturated for a more professional look
2. Ensure good contrast between all color levels
3. Aesthetic goal: "Trustworthy Industrial Modern" - professional, confident, approachable

CONSTRAINTS:
- Do not change emergency colors
- Make minimal adjustments only if needed

VERIFICATION:
- Run `pnpm build` to verify no errors
- Colors should appear balanced and professional
- Sufficient contrast should be maintained

Ask me any questions about this approach before implementing.
```

---

## STEP 45: Final Build Test & Verification

**Status**: [ ] Not Started
**Severity**: CRITICAL

**Prompt (copy and paste this):**
```
Use the /frontend-design skill. Enter plan mode first to discuss this step with me before implementing.

TASK: Final comprehensive build test and verification

VERIFICATION CHECKLIST:
1. Run `pnpm build` - must complete with 0 errors
2. Run `pnpm dev` and manually test:
   - [ ] Homepage loads correctly
   - [ ] Region links work (no 404s)
   - [ ] Blog links work (no 404s)
   - [ ] Exit intent modal triggers on mouse exit
   - [ ] Seasonal message bar appears (January = winter)
   - [ ] Mobile menu X button is clear and works
   - [ ] Blog category filtering works
   - [ ] Service pages show brand logos
   - [ ] All accessibility improvements work
   - [ ] No hardcoded colors visible in DevTools

3. Run Lighthouse audit:
   - Performance score
   - Accessibility score
   - Best practices score
   - SEO score

Report any remaining issues found during testing.

Ask me any questions about this approach before implementing.
```

---

## TODO List (Update After Each Step)

| Step | Description | Status | Verified |
|------|-------------|--------|----------|
| **PHASE 0: CRO CONVERSION FIXES** | | | |
| 0.1 | Show phone number on ALL mobile screens | [ ] | [ ] |
| 0.2 | Add sticky mobile footer CTA | [ ] | [ ] |
| 0.3 | Add hero CTA button to service pages | [ ] | [ ] |
| 0.4 | Move reviews carousel earlier on homepage | [ ] | [ ] |
| 0.5 | Add micro-CTAs to service content sections | [ ] | [ ] |
| **PHASE 1: CRITICAL BUGS** | | | |
| 1 | Fix BlogPreviewSection URL | [ ] | [ ] |
| 2 | Fix ServiceAreasSection region URLs | [ ] | [ ] |
| 3 | Fix ServiceAreasSection location URLs | [ ] | [ ] |
| 4 | Fix RegionsGrid URLs | [ ] | [ ] |
| 5 | Fix ExitIntentModal trigger | [ ] | [ ] |
| 6 | Add SeasonalCalloutBar to layout | [ ] | [ ] |
| **PHASE 2: NAVIGATION** | | | |
| 7 | Add close icon to icons.ts | [ ] | [ ] |
| 8 | Fix MobileMenu close button | [ ] | [ ] |
| **PHASE 3: FUNCTIONALITY** | | | |
| 9 | Replace ServiceTrustBand with brands | [ ] | [ ] |
| 10 | Add blog card data-category attributes | [ ] | [ ] |
| 11 | Implement blog filter logic | [ ] | [ ] |
| **PHASE 4: ACCESSIBILITY** | | | |
| 12 | Fix lightbox alt text | [ ] | [ ] |
| 13 | Add accordion ARIA controls | [ ] | [ ] |
| 14 | Make MobileMenu trust signals dynamic | [ ] | [ ] |
| 15 | Add carousel slide announcements | [ ] | [ ] |
| 16 | Add ProcessTimeline ARIA progress | [ ] | [ ] |
| **PHASE 5: COLORS** | | | |
| 17 | Fix global.css print colors | [ ] | [ ] |
| 18 | Fix TimelineStep print colors | [ ] | [ ] |
| 19 | Fix ServiceValueProps color | [ ] | [ ] |
| 20 | Fix ServiceSolution colors | [ ] | [ ] |
| 21 | Fix BlogAuthorBio color | [ ] | [ ] |
| 22 | Fix FinancingTeaserSection color | [ ] | [ ] |
| 23 | Fix WhyChooseBAPSection color | [ ] | [ ] |
| 24 | Fix Footer print colors | [ ] | [ ] |
| 25 | Fix TopBar print color | [ ] | [ ] |
| 26 | Fix SeasonalCalloutBar colors | [ ] | [ ] |
| **PHASE 6: FONT SIZES** | | | |
| 27 | Fix global.css font size | [ ] | [ ] |
| 28 | Fix Eyebrow font size | [ ] | [ ] |
| 29 | Fix ServiceSolution font size | [ ] | [ ] |
| 30 | Fix ServiceCaseStudy font size | [ ] | [ ] |
| 31 | Fix ServiceSavings font sizes | [ ] | [ ] |
| 32 | Fix ReviewCard font size | [ ] | [ ] |
| 33 | Fix ServiceCategoriesSection font size | [ ] | [ ] |
| 34 | Fix SeasonalCalloutBar font size | [ ] | [ ] |
| 35 | Fix ServiceProblemAgitation font size | [ ] | [ ] |
| 36 | Fix Button animation duration | [ ] | [ ] |
| **PHASE 7: FONT WEIGHTS** | | | |
| 37-43 | Fix Header font weights (7 instances) | [ ] | [ ] |
| **PHASE 8: FINAL** | | | |
| 44 | Review color palette | [ ] | [ ] |
| 45 | Final build test & verification | [ ] | [ ] |

---

## Next Prompt to Execute

**Copy and paste this to start Step 0.1 (CRO - Phone Visibility):**

```
/frontend-design

TASK: Step 0.1 - Make phone number visible on ALL mobile screen sizes in Header.astro

PROBLEM: The phone number is hidden on screens smaller than 640px (Header.astro lines 545-549). On iPhone SE and similar devices, users see only a phone icon - no actual number. For emergency HVAC calls (70%+ from mobile), this is devastating for conversions.

CURRENT CSS (lines 545-549):
.header__phone-number {
  display: none;
}
@media (min-width: 640px) {
  .header__phone-number {
    display: inline;
  }
}

SOLUTION:
Option A (Recommended): Always show the number with responsive font size:
.header__phone-number {
  display: inline;
  font-size: clamp(0.75rem, 2.5vw, 1rem);
}

VERIFICATION:
- Run `pnpm build` to verify no errors
- Test on mobile viewport (320px, 375px, 414px) - phone number must be visible
- Phone number must be tappable (tel: link)

Enter plan mode and discuss this approach with me before implementing.
```
