# Codebase Cleanup & Consolidation Tasks

## STRICT RULES

> **RULE 1:** No task is complete until `pnpm build` passes with zero errors.
> **RULE 2:** No visual or layout changes. Only code consolidation and cleanup.
> **RULE 3:** Complete each task 100% before moving to the next.
> **RULE 4:** Only 1 task per context window. No exceptions.
> **RULE 5:** When a task finishes successfully, output the next task prompt at the end.

## HANDOFF FORMAT

When you complete a task, end your response with:

```
---
## NEXT TASK PROMPT (copy this to start new context):
Execute Task X.X from CLEANUP.md: [task name]. Run pnpm build when done.
---
```

## STARTING PROMPT

To begin cleanup, use this prompt in a new context window:

```
Execute Task 1.1 from CLEANUP.md: Clean vercel.json duplicate redirects. Run pnpm build when done.
```

---

## Phase 1: Critical Fixes

### Task 1.1: Clean vercel.json Duplicate Redirects
**Status:** `[x] COMPLETED`
**File:** `vercel.json`
**Issue:** 120 identical `/services` redirect rules (lines 2-723)
**Current size:** 758 lines
**Target size:** ~50 lines

**Steps:**
1. Open `vercel.json`
2. Find all duplicate `{ "source": "/services", ... }` rules
3. Keep only ONE redirect rule for `/services`
4. Keep all unique redirects (non-duplicate entries)
5. Run `pnpm build`
6. Verify build succeeds

**Verification:**
```bash
pnpm build
# Expected: Build successful
```

**Completion Criteria:**
- [x] Only 1 `/services` redirect remains
- [x] File reduced to ~50 lines
- [x] `pnpm build` passes

---

### Task 1.2: Delete Exact Duplicate Component
**Status:** `[x] COMPLETED`
**Delete:** `src/components/homepage/ImageLedServicesSection.astro`
**Keep:** `src/components/homepage/EmotionLedServicesSection.astro`
**Reason:** Files are 100% identical (99 lines each)

**Steps:**
1. Search codebase for imports of `ImageLedServicesSection`
2. Replace any imports with `EmotionLedServicesSection`
3. Delete `src/components/homepage/ImageLedServicesSection.astro`
4. Run `pnpm build`
5. Verify build succeeds

**Verification:**
```bash
grep -r "ImageLedServicesSection" src/
# Expected: No results
pnpm build
# Expected: Build successful
```

**Completion Criteria:**
- [x] No imports reference ImageLedServicesSection
- [x] File deleted
- [x] `pnpm build` passes

---

## Phase 2: Create Shared Primitives

### Task 2.1: Create SectionHeader Primitive
**Status:** `[x] COMPLETED`
**Create:** `src/components/primitives/SectionHeader.astro`
**Issue:** Same header pattern repeated in 20+ components

**Duplicated Pattern (found in 20+ files):**
```astro
<div class="mb-10 text-center">
  <p class="eyebrow mb-3">{eyebrow}</p>
  <h2 class="section-title mx-auto mb-4 max-w-3xl">{headline}</h2>
  <p class="mx-auto max-w-2xl text-base text-muted-foreground">{description}</p>
</div>
```

**Steps:**
1. Create new file `src/components/primitives/SectionHeader.astro`
2. Add the following code:
```astro
---
interface Props {
  eyebrow?: string;
  headline: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  class?: string;
}

const { eyebrow, headline, description, align = 'center', class: className = '' } = Astro.props;

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const descAlignClasses = {
  left: '',
  center: 'mx-auto',
  right: 'ml-auto',
};
---

<div class:list={['mb-10', alignClasses[align], className]}>
  {eyebrow && <p class="eyebrow mb-3">{eyebrow}</p>}
  <h2 class:list={['section-title mb-4 max-w-3xl', descAlignClasses[align]]}>{headline}</h2>
  {description && <p class:list={['max-w-2xl text-base text-muted-foreground', descAlignClasses[align]]}>{description}</p>}
</div>
```
3. Run `pnpm build`
4. Verify build succeeds

**Verification:**
```bash
pnpm build
# Expected: Build successful
```

**Completion Criteria:**
- [x] File created at `src/components/primitives/SectionHeader.astro`
- [x] Component accepts eyebrow, headline, description, align props
- [x] `pnpm build` passes

---

### Task 2.2: Create Shared Types File
**Status:** `[x] COMPLETED`
**Create:** `src/lib/types.ts`
**Issue:** Location type defined separately in 4+ components

**Steps:**
1. Create new file `src/lib/types.ts`
2. Add the following types:
```typescript
import type { CollectionEntry } from 'astro:content';

// Shared location context for service components
export interface LocationContext {
  title: string;
  slug?: string;
}

// Region to locations mapping
export interface RegionLocationMap {
  region: CollectionEntry<'regions'>;
  locations: CollectionEntry<'locations'>[];
}

// Merged service data for service-city pages
export interface MergedServiceData {
  // Base service fields
  title: string;
  description: string;
  category: string;
  // Optional city-specific overrides
  cityTitle?: string;
  cityDescription?: string;
}
```
3. Run `pnpm build`
4. Verify build succeeds

**Verification:**
```bash
pnpm build
# Expected: Build successful
```

**Completion Criteria:**
- [x] File created at `src/lib/types.ts`
- [x] Types exported: LocationContext, RegionLocationMap, MergedServiceData
- [x] `pnpm build` passes

---

### Task 2.3: Add CSS Utility Classes to global.css
**Status:** `[x] COMPLETED`
**File:** `src/styles/global.css`
**Issue:** Same CSS patterns repeated inline in multiple files

**Patterns to add:**

| Class Name | Pattern | Found In |
|------------|---------|----------|
| `.bg-diagonal-stripes` | Diagonal stripe overlay | 4 files |
| `.button-lift-hover` | Shadow + scale on hover | 10+ files |
| `.cta-icon-animate` | Icon rotation on group hover | 8 files |
| `.flex-center` | Flex centering shorthand | 9 files |

**Steps:**
1. Open `src/styles/global.css`
2. Add these utility classes at the end of the file:
```css
/* ========================================
   Utility Classes (Consolidation)
   ======================================== */

/* Diagonal stripes overlay - used in CTA sections */
.bg-diagonal-stripes {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 20px,
    rgba(255, 255, 255, 0.1) 20px,
    rgba(255, 255, 255, 0.1) 40px
  );
}

/* Button lift effect on hover */
.button-lift-hover {
  @apply shadow-2xl transition-all hover:scale-105 hover:shadow-3xl;
}

/* CTA icon animation on group hover */
.cta-icon-animate {
  @apply transition-transform group-hover:rotate-12;
}

/* Flex center shorthand */
.flex-center {
  @apply flex items-center justify-center;
}
```
3. Run `pnpm build`
4. Verify build succeeds

**Verification:**
```bash
pnpm build
# Expected: Build successful
```

**Completion Criteria:**
- [x] 4 utility classes added to global.css
- [x] Classes use @apply for Tailwind integration
- [x] `pnpm build` passes

---

## Phase 3: Component Consolidation

### Task 3.1: Refactor Components to Use SectionHeader
**Status:** `[x] COMPLETED`
**Primitive:** `src/components/primitives/SectionHeader.astro`
**Files to update:** (do one at a time, build after each)

**Update Order:**
1. `src/components/services/ServiceValueProps.astro`
2. `src/components/services/ServiceProblemAgitation.astro`
3. `src/components/services/ServiceInclusions.astro`
4. `src/components/services/ServiceProcess.astro`
5. `src/components/services/ServiceGuarantee.astro`
6. `src/components/homepage/ProcessSection.astro`
7. `src/components/homepage/GuaranteesSection.astro`
8. `src/components/homepage/WhyChooseSection.astro`
9. `src/components/homepage/ServiceAreasSection.astro`
10. `src/components/homepage/FAQSection.astro`

**For each file:**
1. Add import: `import SectionHeader from '../primitives/SectionHeader.astro';`
2. Find the section header markup (eyebrow + h2 + description pattern)
3. Replace with `<SectionHeader eyebrow="..." headline="..." description="..." />`
4. Run `pnpm build`
5. Verify build succeeds before moving to next file

**Example transformation:**
```astro
// BEFORE:
<div class="mb-10 text-center">
  <p class="eyebrow mb-3">Our Promise</p>
  <h2 class="section-title mx-auto mb-4 max-w-3xl">Why Choose Us</h2>
  <p class="mx-auto max-w-2xl text-muted-foreground">Description here</p>
</div>

// AFTER:
<SectionHeader
  eyebrow="Our Promise"
  headline="Why Choose Us"
  description="Description here"
/>
```

**Completion Criteria (per file):**
- [x] Import added
- [x] Header replaced with SectionHeader component
- [x] Visual output unchanged
- [x] `pnpm build` passes

---

### Task 3.2: Refactor Inline Diagonal Stripes to CSS Class
**Status:** `[x] COMPLETED`
**CSS Class:** `.bg-diagonal-stripes`
**Files to update:**

| File | Line |
|------|------|
| `src/components/services/ServiceGuarantee.astro` | ~46 |
| `src/components/services/ServiceHero.astro` | ~265 |
| `src/components/homepage/EmergencyCTASection.astro` | ~75 |
| `src/components/homepage/MidPageConversionAnchor.astro` | ~63 |

**For each file:**
1. Find: `style="background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,.1) 20px, rgba(255,255,255,.1) 40px);"`
2. Remove the `style` attribute
3. Add `bg-diagonal-stripes` to the element's class list
4. Run `pnpm build`
5. Verify build succeeds

**Example transformation:**
```astro
// BEFORE:
<div class="absolute inset-0" style="background-image: repeating-linear-gradient(...);">

// AFTER:
<div class="absolute inset-0 bg-diagonal-stripes">
```

**Completion Criteria:**
- [x] All 4 files updated
- [x] No inline style attributes for diagonal stripes
- [x] `pnpm build` passes

---

### Task 3.3: Create GradientCTASection Component
**Status:** `[x] COMPLETED`
**Create:** `src/components/shared/GradientCTASection.astro`
**Consolidates:**
- `src/components/homepage/EmergencyCTASection.astro` (78 lines)
- `src/components/homepage/FinalCTASection.astro` (53 lines)
- `src/components/services/ServiceFinalCTA.astro` (105 lines)

**Steps:**
1. Create `src/components/shared/GradientCTASection.astro`
2. Implement parametrized version supporting all 3 variants
3. Run `pnpm build`
4. Verify build succeeds
5. DO NOT replace existing components yet (separate task)

**Component interface:**
```astro
interface Props {
  headline: string;
  description: string;
  variant: 'emergency' | 'primary' | 'installation' | 'repair' | 'maintenance';
  phoneNumber: string;
  bookingUrl?: string;
  context?: string;
}
```

**Gradient mappings:**
- `emergency`: `from-red-600 to-orange-500`
- `primary`: `from-blue-600 to-blue-500`
- `installation`: `from-blue-600 to-blue-500`
- `repair`: `from-red-600 to-orange-500`
- `maintenance`: `from-green-600 to-green-500`

**Completion Criteria:**
- [x] Component created
- [x] Supports all 5 gradient variants
- [x] `pnpm build` passes

---

### Task 3.4: Create TrustSignals Component
**Status:** `[x] COMPLETED`
**Create:** `src/components/shared/TrustSignals.astro`
**Consolidates:**
- `src/components/TrustBadges.astro`
- `src/components/homepage/TrustStripSection.astro`
- `src/components/services/ServiceTrustBand.astro`
- `src/components/homepage/TrustSignalsSection.astro`

**Steps:**
1. Create `src/components/shared/TrustSignals.astro`
2. Implement parametrized version supporting all 4 layout variants
3. Run `pnpm build`
4. Verify build succeeds
5. DO NOT replace existing components yet (separate task)

**Component interface:**
```astro
interface Props {
  variant: 'badges' | 'strip' | 'band' | 'stats';
  location?: { title: string };
  class?: string;
}
```

**Completion Criteria:**
- [x] Component created
- [x] Supports all 4 layout variants
- [x] Pulls data from business profile
- [x] `pnpm build` passes

---

## Phase 4: Type Safety Fixes

### Task 4.1: Fix `any` Types in [...]slug.astro
**Status:** `[x] COMPLETED`
**File:** `src/pages/services/[...slug].astro`
**Lines to fix:** 84, 111, 228, 229, 230

**Steps:**
1. Import types from `src/lib/types.ts`
2. Replace `any` types with proper types:
   - Line 84: `let mergedData: MergedServiceData;`
   - Line 111: `let Content: AstroComponentFactory | null = null;`
   - Line 228: `let allLocations: CollectionEntry<'locations'>[] = [];`
   - Line 229: `let allRegions: CollectionEntry<'regions'>[] = [];`
   - Line 230: `let locationsByRegion: Map<string, RegionLocationMap>`
3. Run `pnpm build`
4. Fix any type errors that arise
5. Verify build succeeds

**Completion Criteria:**
- [x] No `any` types remain in file
- [x] All variables properly typed
- [x] `pnpm build` passes

---

### Task 4.2: Fix `any` Types in [category].astro
**Status:** `[x] COMPLETED`
**File:** `src/pages/services/[category].astro`
**Line to fix:** 71

**Steps:**
1. Import `RegionLocationMap` from types
2. Replace `Map<string, { region: any; locations: any[] }>` with proper typing
3. Run `pnpm build`
4. Verify build succeeds

**Completion Criteria:**
- [x] No `any` types remain
- [x] `pnpm build` passes

---

### Task 4.3: Fix Unused Variable Warning
**Status:** `[x] COMPLETED`
**File:** `src/pages/services/[category].astro`
**Line:** 55
**Issue:** `slug` destructured but never used

**Steps:**
1. Find line 55 where `slug` is destructured
2. Remove `slug` from destructuring (keep other variables)
3. Run `pnpm build`
4. Verify no ESLint warnings about unused variables

**Completion Criteria:**
- [x] Unused variable removed
- [x] `pnpm build` passes
- [x] No ESLint warnings

---

## Phase 5: Icon Consolidation

### Task 5.1: Expand icons.ts with Common Icons
**Status:** `[x] COMPLETED`
**File:** `src/lib/icons.ts`
**Issue:** Phone, checkmark, arrow icons duplicated across 10+ files

**Icons to add:**
1. `phone` - Found in 6 files
2. `check` / `checkmark` - Found in 5 files
3. `arrowRight` - Found in 4 files
4. `shield` - Found in 3 files
5. `clock` - Found in 3 files
6. `star` - Found in 3 files

**Steps:**
1. Open `src/lib/icons.ts`
2. Export SVG strings for each common icon
3. Run `pnpm build`
4. Verify build succeeds
5. DO NOT replace usages yet (separate task)

**Example structure:**
```typescript
export const icons = {
  phone: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>`,
  // ... more icons
};
```

**Completion Criteria:**
- [x] 6+ icon SVGs exported from icons.ts
- [x] Icons match existing usage (same viewBox, stroke settings)
- [x] `pnpm build` passes

---

## Phase 6: Gradual Component Replacement

> **NOTE:** These tasks replace old components with new consolidated ones.
> Only start after Phase 3 components are created and tested.

### Task 6.1: Replace EmergencyCTASection Usages
**Status:** `[x] COMPLETED`
**Prerequisites:** Task 3.3 completed
**Old:** `EmergencyCTASection`
**New:** `GradientCTASection` with `variant="emergency"`

**Steps:**
1. Find all imports of EmergencyCTASection
2. Replace import with GradientCTASection
3. Update props to match new interface
4. Run `pnpm build`
5. Visually verify no layout changes
6. Delete old component only after all usages replaced

**Completion Criteria:**
- [x] All usages migrated
- [x] Visual output identical
- [x] Old component deleted
- [x] `pnpm build` passes

---

### Task 6.2: Replace FinalCTASection Usages
**Status:** `[x] COMPLETED`
**Prerequisites:** Task 3.3 completed
**Old:** `FinalCTASection`
**New:** `GradientCTASection` with `variant="primary"`

(Same steps as 6.1)

---

### Task 6.3: Replace ServiceFinalCTA Usages
**Status:** `[x] COMPLETED`
**Prerequisites:** Task 3.3 completed
**Old:** `ServiceFinalCTA`
**New:** `GradientCTASection` with appropriate variant

(Same steps as 6.1)

---

### Task 6.4: Delete Replaced CTA Components
**Status:** `[x] COMPLETED`
**Prerequisites:** Tasks 6.1, 6.2, 6.3 completed

**Files to delete:**
- [x] `src/components/homepage/EmergencyCTASection.astro`
- [x] `src/components/homepage/FinalCTASection.astro`
- [x] `src/components/services/ServiceFinalCTA.astro`

**Steps:**
1. Verify no imports remain for these files
2. Delete files
3. Run `pnpm build`
4. Verify build succeeds

---

## Final Verification Checklist

After all tasks complete:

- [ ] `pnpm build` passes with zero errors
- [ ] `pnpm astro check` passes with zero type errors
- [ ] No ESLint warnings about unused variables
- [ ] All pages render correctly:
  - [ ] Homepage (/)
  - [ ] Service category (/services/heating/)
  - [ ] Service detail (/services/furnace-installation/)
  - [ ] Service-city (/services/furnace-installation/guelph/)
- [ ] vercel.json reduced from 758 to ~50 lines
- [ ] No duplicate components remain
- [ ] Shared primitives created and used

---

## Progress Tracker

| Phase | Task | Status |
|-------|------|--------|
| 1 | 1.1 Clean vercel.json | `[x]` |
| 1 | 1.2 Delete ImageLedServicesSection | `[x]` |
| 2 | 2.1 Create SectionHeader | `[x]` |
| 2 | 2.2 Create types.ts | `[x]` |
| 2 | 2.3 Add CSS utilities | `[x]` |
| 3 | 3.1 Refactor to SectionHeader | `[x]` |
| 3 | 3.2 Refactor diagonal stripes | `[x]` |
| 3 | 3.3 Create GradientCTASection | `[x]` |
| 3 | 3.4 Create TrustSignals | `[x]` |
| 4 | 4.1 Fix slug.astro types | `[x]` |
| 4 | 4.2 Fix category.astro types | `[x]` |
| 4 | 4.3 Fix unused variable | `[x]` |
| 5 | 5.1 Expand icons.ts | `[x]` |
| 6 | 6.1 Replace EmergencyCTASection | `[x]` |
| 6 | 6.2 Replace FinalCTASection | `[x]` |
| 6 | 6.3 Replace ServiceFinalCTA | `[x]` |
| 6 | 6.4 Delete replaced CTAs | `[x]` |

---

## Quick Reference: All Task Prompts

Copy the prompt for your current task into a new context window:

| Task | Prompt |
|------|--------|
| 1.1 | `Execute Task 1.1 from CLEANUP.md: Clean vercel.json duplicate redirects. Run pnpm build when done.` |
| 1.2 | `Execute Task 1.2 from CLEANUP.md: Delete exact duplicate ImageLedServicesSection. Run pnpm build when done.` |
| 2.1 | `Execute Task 2.1 from CLEANUP.md: Create SectionHeader primitive component. Run pnpm build when done.` |
| 2.2 | `Execute Task 2.2 from CLEANUP.md: Create shared types file at src/lib/types.ts. Run pnpm build when done.` |
| 2.3 | `Execute Task 2.3 from CLEANUP.md: Add CSS utility classes to global.css. Run pnpm build when done.` |
| 3.1 | `Execute Task 3.1 from CLEANUP.md: Refactor components to use SectionHeader. Run pnpm build when done.` |
| 3.2 | `Execute Task 3.2 from CLEANUP.md: Refactor inline diagonal stripes to CSS class. Run pnpm build when done.` |
| 3.3 | `Execute Task 3.3 from CLEANUP.md: Create GradientCTASection component. Run pnpm build when done.` |
| 3.4 | `Execute Task 3.4 from CLEANUP.md: Create TrustSignals component. Run pnpm build when done.` |
| 4.1 | `Execute Task 4.1 from CLEANUP.md: Fix any types in [...slug].astro. Run pnpm build when done.` |
| 4.2 | `Execute Task 4.2 from CLEANUP.md: Fix any types in [category].astro. Run pnpm build when done.` |
| 4.3 | `Execute Task 4.3 from CLEANUP.md: Fix unused variable warning. Run pnpm build when done.` |
| 5.1 | `Execute Task 5.1 from CLEANUP.md: Expand icons.ts with common icons. Run pnpm build when done.` |
| 6.1 | `Execute Task 6.1 from CLEANUP.md: Replace EmergencyCTASection usages. Run pnpm build when done.` |
| 6.2 | `Execute Task 6.2 from CLEANUP.md: Replace FinalCTASection usages. Run pnpm build when done.` |
| 6.3 | `Execute Task 6.3 from CLEANUP.md: Replace ServiceFinalCTA usages. Run pnpm build when done.` |
| 6.4 | `Execute Task 6.4 from CLEANUP.md: Delete replaced CTA components. Run pnpm build when done.` |
