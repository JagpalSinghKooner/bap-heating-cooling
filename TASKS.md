# B.A.P Heating & Cooling - Remaining Tasks

**Last Updated:** January 15, 2026
**Total Remaining:** 12 tasks across 4 categories

---

## Status Summary

| Category | Completed | Remaining |
|----------|-----------|-----------|
| Homepage | 11/16 | 5 |
| Service Page Template | 9/9 | 0 |
| Service Page Full Funnel | All components built | Content pending |
| Service Page Audit | Core issues fixed | Photos/polish pending |

---

## PRIORITY 1: Content & Media (Requires Client Input)

### Task 1: Replace Service Card Images
**Priority:** Critical (deferred until photos available)
**Blocked by:** Need real HVAC photos from client

**Current Wrong Images:**
- Heating: Person with skateboard
- Water Heating: Person painting
- 24/7 Emergency: Person sawing wood
- Indoor Air Quality: Generic kitchen

**Action Required:**
1. [ ] Client to provide 6 real HVAC service photos
2. [ ] Optimize images (1200px max width, <200KB, WebP preferred)
3. [ ] Update image references in `src/content/services/`

**Files:** `src/content/services/` image references

---

### Task 2: Replace Gallery/Portfolio Images
**Priority:** Critical (deferred until photos available)
**Blocked by:** Need real before/after photos from client

**Current Wrong Images:**
- "Emergency Furnace Replacement": Person holding fabric
- "Heat Pump Upgrade": Person sawing wood

**Action Required:**
1. [ ] Client to provide 6-10 real before/after installation photos
2. [ ] Add proper captions/descriptions
3. [ ] Optimize images for web

**Files:** `src/content/gallery/` or portfolio section

---

### Task 3: Add Real Service Photos to Image Gallery
**Priority:** Critical (deferred until photos available)
**Blocked by:** Need real installation photos from client

**Folder Structure Ready:**
```
public/images/services/
├── furnace-installation/
├── furnace-repair/
├── air-conditioner-installation/
├── ... (16 folders with .gitkeep files)
```

**Action Required:**
1. [ ] Client to provide 3-6 photos per service type
2. [ ] Optimize: max 1200px width, <200KB, WebP format
3. [ ] Update service markdown files with image arrays:
   ```yaml
   images:
     - src: '/images/services/furnace-installation/install-1.jpg'
       alt: 'New Lennox furnace installation in Guelph home'
       caption: 'High-efficiency furnace installed in basement'
   ```
4. [ ] Verify gallery component renders correctly

**Files:** `public/images/services/`, `src/content/services/*.md`

---

### Task 4: Populate Reviews with Real Customer Data
**Priority:** Critical (deferred until reviews available)
**Blocked by:** Need real customer reviews from client

**Current State:** 6 placeholder reviews with realistic names/content

**Options:**
1. Manual entry of real reviews from Google
2. Google reviews API integration
3. Third-party review widget (Birdeye, Podium, etc.)

**Action Required:**
1. [ ] Client to approve review collection method
2. [ ] Gather 10-15 real reviews with permission
3. [ ] Update `src/content/reviews/*.yaml` with real data

**Files:** `src/content/reviews/`

---

## PRIORITY 2: Optional Enhancements

### Task 5: Add Video Section
**Priority:** Medium
**Status:** Not started

**Purpose:** Company introduction or testimonial videos

**Action Required:**
1. [ ] Create `src/components/homepage/VideoSection.astro`
2. [ ] Add YouTube embed capability
3. [ ] Design responsive video container
4. [ ] Add placeholder until videos available

**Files:** Create `src/components/homepage/VideoSection.astro`

---

### Task 6: Add Live Chat Widget
**Priority:** Low
**Status:** Not started

**Options:**
- Tidio
- Intercom
- Crisp
- SMS: "Text us at XXX-XXX-XXXX"

**Action Required:**
1. [ ] Client to choose chat provider
2. [ ] Add script injection to `src/layouts/BaseLayout.astro`
3. [ ] Test mobile compatibility
4. [ ] Verify no significant performance impact

**Files:** `src/layouts/BaseLayout.astro`

---

## PRIORITY 3: Technical Polish

### Task 7: Fix Unused Variable Warning
**Priority:** Low
**Status:** Known issue

**Warning:** `'slug' is declared but its value is never read` in `[category].astro:55`

**Action Required:**
1. [ ] Remove or use the `slug` variable in category page template

**Files:** `src/pages/services/[category].astro`

---

## COMPLETED TASKS (Reference)

### Homepage (Completed Jan 14, 2026)
- [x] Title tag optimized
- [x] Meta description optimized
- [x] H1 heading optimized
- [x] Physical address added to footer
- [x] FAQ section expanded (11 FAQs)
- [x] Open Graph image tags added
- [x] Hero section headline improved
- [x] Emergency services section added
- [x] Reviews section redesigned
- [x] Brand logos section added
- [x] Blog structure set up (6 posts)

### Service Page Template (Completed Jan 14, 2026)
- [x] Content schema updated (serviceType, valueProps)
- [x] ServiceHero component created
- [x] ServiceTrustBand component created
- [x] ServiceValueProps component created
- [x] ServiceFinalCTA component created
- [x] All 22 service files populated with data

### Service Page Full Funnel (Completed Jan 14-15, 2026)
- [x] Extended services schema (problems, approach, processSteps, etc.)
- [x] Created service-city collection schema
- [x] ServiceProblemAgitation component created
- [x] ServiceSolution component created
- [x] ServiceProcess component created
- [x] ServiceInclusions component created
- [x] ServiceSavings component created
- [x] ServiceGuarantee component created
- [x] ServiceLocalProof component created
- [x] ServiceImageGallery component created
- [x] ServiceCaseStudy component created
- [x] ServiceObjections component created
- [x] Template updated with full funnel sections
- [x] 550 service-city content files created
- [x] Directory structure for images created

### Service Page Audit (Completed Jan 15, 2026)
- [x] FAQ filtering verified working (35 FAQs properly scoped)
- [x] Image gallery infrastructure created
- [x] Reviews section shows 4 reviews per page
- [x] Dead code removed (ServiceDetailsGrid deleted)
- [x] Icon system centralized (src/lib/icons.ts)
- [x] Seasonal banner is category-aware
- [x] Broken service links fixed (5 URLs corrected)
- [x] ServiceCategoriesSection updated for location-aware routing

---

## Build Status

**Last Build:** January 15, 2026
**Pages Generated:** 625
**Errors:** 0
**Warnings:** 1 (unused variable - minor)

```bash
# Verify build
npm run build

# Start dev server
npm run dev
```

---

## File Reference

| Area | Key Files |
|------|-----------|
| Service Pages | `src/pages/services/[...slug].astro` |
| Service Components | `src/components/services/*.astro` |
| Homepage Components | `src/components/homepage/*.astro` |
| Content Collections | `src/content/services/`, `src/content/service-city/` |
| Reviews | `src/content/reviews/*.yaml` |
| FAQs | `src/content/faqs/*.md` |
| Images | `public/images/services/` |
| Layout | `src/layouts/BaseLayout.astro` |
