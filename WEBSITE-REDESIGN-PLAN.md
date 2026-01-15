# B.A.P Heating & Cooling - Complete Website Redesign Specification

> **Document Version**: 2.0 (Full Specification)
> **Created**: January 2026
> **Status**: Ready for Execution

---

# PART 1: EXECUTIVE OVERVIEW

## 1.1 Project Summary

Complete ground-up redesign of the B.A.P Heating & Cooling website. All visual code will be deleted and rebuilt from scratch using the `/frontend-design` skill.

**Scope:**
- Delete and rebuild 56 components
- Delete and rebuild 16 page templates
- Delete and rebuild entire design system (tokens, config, global CSS)
- Preserve all content (724 files) and utilities (12 lib files)
- Generate 625 pages from content

**Primary Goal:** Every page is a conversion funnel optimized for phone calls.

---

## 1.2 Design Direction

### Brand Essence
| Attribute | Value |
|-----------|-------|
| Primary Emotion | Trust & Reliability ("These guys know what they're doing") |
| USP | Family-owned, local trust (Paul Palmer, owner-operated since 1992) |
| Primary CTA | Phone calls (highest quality leads) |
| Secondary CTA | Online booking |
| Audience | Residential homeowners + commercial, all income levels |

### Visual Direction
| Attribute | Value |
|-----------|-------|
| Theme | Light (clean, trustworthy, easy to read) |
| Color Base | Evolved blue/orange - keep blue as primary, modernize palette |
| Imagery | Photo-rich with realistic images |
| Typography | Bold, trustworthy, distinctive (NO Inter, NO system fonts) |
| Layout | Generous whitespace, clear hierarchy, asymmetric where impactful |

### Conversion Hierarchy by Page Type
| Page Type | Primary CTA | Secondary CTA | Urgency Level |
|-----------|-------------|---------------|---------------|
| Homepage | Call Now | Book Online | Medium |
| Service (Repair) | Call 24/7 | - | HIGH (emergency) |
| Service (Install) | Call for Estimate | Book Consultation | Medium |
| Service (Maintenance) | Book Service | Call | Low |
| Service-City | Call Now | Book Online | Varies by service type |
| Location | Call Now | Book Online | Medium |
| Contact | Call Now | - | High |

---

## 1.3 What We PRESERVE (Never Touch)

### Content Collections (src/content/)
```
src/content/
├── services/           # 22 files - Base service definitions
├── service-city/       # 550 files - Localized service pages
├── locations/          # 25 files - City/location pages
├── regions/            # 6 files - Regional groupings
├── reviews/            # 72 files - Customer reviews (YAML)
├── faqs/               # 35 files - Scoped FAQ entries
├── blog/               # 6 files - Blog posts
├── case-studies/       # 3 files - Before/after stories
├── seasonal-messages/  # 4 files - Seasonal CTAs
└── business/
    └── profile.yaml    # 1 file - Master business config
```
**Total: 724 content files**

### Content Schema (src/content/config.ts)
- All Zod schema definitions
- Workflow status enums
- Shared schemas (problemSchema, processStepSchema, etc.)
- Collection definitions

### Utility Libraries (src/lib/)
```
src/lib/
├── slugBuilder.ts       # URL/slug generation (buildServicePath, buildServiceCityPath, etc.)
├── getBusinessProfile.ts # Business data access (getPhoneDisplay, getEmail, etc.)
├── faqResolver.ts       # Scoped FAQ resolution
├── reviewResolver.ts    # Review filtering by context
├── caseStudyResolver.ts # Case study selection
├── ctaResolver.ts       # CTA variant resolution + GA4 tracking
├── icons.ts             # SVG icon paths (50+ icons)
├── urlGovernance.ts     # Canonical URL handling
├── breadcrumbs.ts       # Breadcrumb generation
├── analytics.ts         # GA4 event tracking
├── schema.ts            # JSON-LD schema helpers
└── types.ts             # TypeScript type definitions
```
**Total: 12 utility files - DO NOT MODIFY**

### Assets to Keep
```
public/
├── images/             # All existing images (use as placeholders)
├── logo.svg            # Brand logo
├── favicon.ico         # Favicon
└── [other brand assets]
```

---

## 1.4 What We DELETE (Replace Completely)

### Components (src/components/) - DELETE ENTIRE FOLDER
```
src/components/
├── primitives/         # 12 components - DELETE ALL
├── shared/             # 7 components - DELETE ALL
├── services/           # 13 components - DELETE ALL
├── homepage/           # 18 components - DELETE ALL
├── header/             # 3 components - DELETE ALL
├── hero/               # 1 component - DELETE ALL
├── PrimaryCTA.astro    # DELETE
├── TrustBadges.astro   # DELETE
└── ReviewsBlock.astro  # DELETE
```
**Total: 56 components to delete**

### Styles (src/styles/) - DELETE ALL
```
src/styles/
├── tokens.css          # DELETE - will recreate
└── global.css          # DELETE - will recreate
```

### Config
```
tailwind.config.ts      # DELETE - will recreate
PAGE-TEMPLATES.md       # DELETE - old task tracker
```

### Page Templates (src/pages/) - GUT VISUAL CONTENT
Keep `getStaticPaths()` and `getCollection()` logic, remove all visual/component code.

### Layout (src/layouts/)
```
src/layouts/
└── BaseLayout.astro    # GUT - keep head/meta, remove visual structure
```

---

# PART 2: DESIGN SYSTEM SPECIFICATION

## 2.1 File Structure (New)

```
src/
├── components/
│   ├── primitives/           # Atomic building blocks
│   │   ├── Button.astro
│   │   ├── Heading.astro
│   │   ├── Text.astro
│   │   ├── Eyebrow.astro
│   │   ├── Container.astro
│   │   ├── Section.astro
│   │   ├── SectionHeader.astro
│   │   ├── Card.astro
│   │   ├── CardMedia.astro
│   │   ├── CardBody.astro
│   │   ├── CardHeader.astro
│   │   ├── CardFooter.astro
│   │   ├── Badge.astro
│   │   ├── IconBadge.astro
│   │   ├── Icon.astro
│   │   ├── Divider.astro
│   │   ├── Skeleton.astro
│   │   └── Avatar.astro
│   │
│   ├── shared/               # Reusable across pages
│   │   ├── Hero.astro
│   │   ├── PageHero.astro
│   │   ├── CTASection.astro
│   │   ├── InlineCTA.astro
│   │   ├── FloatingCTA.astro
│   │   ├── TrustSignals.astro
│   │   ├── TrustBadges.astro
│   │   ├── ReviewCard.astro
│   │   ├── StarRating.astro
│   │   ├── ReviewsCarousel.astro
│   │   ├── FAQSection.astro
│   │   ├── Accordion.astro
│   │   ├── AccordionItem.astro
│   │   ├── ServicesGrid.astro
│   │   ├── ServiceCard.astro
│   │   ├── ServicePill.astro
│   │   ├── CitiesGrid.astro
│   │   ├── RegionsGrid.astro
│   │   ├── MapEmbed.astro
│   │   ├── AddressCard.astro
│   │   ├── ProcessTimeline.astro
│   │   ├── TimelineStep.astro
│   │   ├── Modal.astro
│   │   └── ExitIntentModal.astro
│   │
│   ├── layout/               # Site-wide layout
│   │   ├── Header.astro
│   │   ├── Navigation.astro
│   │   ├── MobileMenu.astro
│   │   ├── MegaMenu.astro
│   │   ├── TopBar.astro
│   │   ├── SeasonalCalloutBar.astro
│   │   └── Footer.astro
│   │
│   ├── homepage/             # Homepage-specific sections
│   │   ├── HeroSection.astro
│   │   ├── ServiceCategoriesSection.astro
│   │   ├── WhyChooseBAPSection.astro
│   │   ├── ProcessSection.astro
│   │   ├── GallerySection.astro
│   │   ├── FinancingTeaserSection.astro
│   │   ├── ServiceAreasSection.astro
│   │   ├── BlogPreviewSection.astro
│   │   └── BrandLogosSection.astro
│   │
│   ├── services/             # Service page sections
│   │   ├── ServiceHero.astro
│   │   ├── ServiceTrustBand.astro
│   │   ├── ServiceValueProps.astro
│   │   ├── ServiceProblemAgitation.astro
│   │   ├── ServiceSolution.astro
│   │   ├── ServiceProcess.astro
│   │   ├── ServiceInclusions.astro
│   │   ├── ServiceSavings.astro
│   │   ├── ServiceGuarantee.astro
│   │   ├── ServiceLocalProof.astro
│   │   ├── ServiceImageGallery.astro
│   │   ├── ServiceCaseStudy.astro
│   │   └── ServiceObjections.astro
│   │
│   └── blog/                 # Blog-specific
│       ├── BlogPostHero.astro
│       ├── BlogPostCard.astro
│       ├── BlogAuthorBio.astro
│       ├── BlogRelatedPosts.astro
│       ├── BlogTableOfContents.astro
│       └── BlogCategoryNav.astro
│
├── styles/
│   ├── tokens.css            # Design tokens (CSS custom properties)
│   └── global.css            # Base styles, utilities, animations
│
├── layouts/
│   └── BaseLayout.astro      # Main layout wrapper
│
└── pages/                    # Page templates (keep data logic)
    ├── index.astro
    ├── services.astro
    ├── locations.astro
    ├── regions.astro
    ├── about-us.astro
    ├── contact-us.astro
    ├── financing.astro
    ├── rebates.astro
    ├── reviews.astro
    ├── 404.astro
    ├── services/
    │   ├── [category].astro
    │   └── [...slug].astro
    ├── locations/
    │   └── [slug].astro
    ├── regions/
    │   └── [slug].astro
    └── blog/
        ├── index.astro
        └── [slug].astro
```

---

## 2.2 Design Tokens Specification (tokens.css)

### Color Tokens
```css
:root {
  /* ========== BRAND COLORS ========== */
  /* Primary - Trust Blue (evolved from existing) */
  --color-primary-50: ;   /* Lightest tint */
  --color-primary-100: ;
  --color-primary-200: ;
  --color-primary-300: ;
  --color-primary-400: ;
  --color-primary-500: ;  /* Base primary */
  --color-primary-600: ;
  --color-primary-700: ;
  --color-primary-800: ;
  --color-primary-900: ;  /* Darkest shade */

  /* Accent - Action Orange (evolved from existing) */
  --color-accent-50: ;
  --color-accent-100: ;
  --color-accent-200: ;
  --color-accent-300: ;
  --color-accent-400: ;
  --color-accent-500: ;   /* Base accent */
  --color-accent-600: ;
  --color-accent-700: ;
  --color-accent-800: ;
  --color-accent-900: ;

  /* Emergency - Urgent Red */
  --color-emergency-500: ;
  --color-emergency-600: ;
  --color-emergency-700: ;

  /* ========== SURFACE COLORS ========== */
  --color-surface-primary: ;    /* Main background (white/off-white) */
  --color-surface-secondary: ;  /* Alternate sections (light gray) */
  --color-surface-tertiary: ;   /* Cards, elevated elements */
  --color-surface-inverse: ;    /* Dark backgrounds for contrast */

  /* ========== TEXT COLORS ========== */
  --color-text-primary: ;       /* Main body text */
  --color-text-secondary: ;     /* Secondary/muted text */
  --color-text-tertiary: ;      /* Disabled/placeholder */
  --color-text-inverse: ;       /* Text on dark backgrounds */
  --color-text-link: ;          /* Link color */
  --color-text-link-hover: ;    /* Link hover */

  /* ========== SEMANTIC COLORS ========== */
  --color-success-500: ;
  --color-success-600: ;
  --color-warning-500: ;
  --color-warning-600: ;
  --color-error-500: ;
  --color-error-600: ;
  --color-info-500: ;
  --color-info-600: ;

  /* ========== BORDER COLORS ========== */
  --color-border-primary: ;     /* Default borders */
  --color-border-secondary: ;   /* Subtle borders */
  --color-border-focus: ;       /* Focus rings */
}
```

### Typography Tokens
```css
:root {
  /* ========== FONT FAMILIES ========== */
  /* Must choose distinctive fonts - NOT Inter, NOT system fonts */
  --font-family-display: ;      /* Hero headlines, impact moments */
  --font-family-heading: ;      /* Section headings */
  --font-family-body: ;         /* Body text, UI elements */
  --font-family-mono: ;         /* Code, technical */

  /* ========== FONT SIZES (Fluid Scale) ========== */
  --font-size-xs: ;             /* 12px */
  --font-size-sm: ;             /* 14px */
  --font-size-base: ;           /* 16px */
  --font-size-lg: ;             /* 18px */
  --font-size-xl: ;             /* 20px */
  --font-size-2xl: ;            /* 24px */
  --font-size-3xl: ;            /* 30px */
  --font-size-4xl: ;            /* 36px */
  --font-size-5xl: ;            /* 48px */
  --font-size-6xl: ;            /* 60px */
  --font-size-7xl: ;            /* 72px */

  /* ========== FONT WEIGHTS ========== */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;

  /* ========== LINE HEIGHTS ========== */
  --line-height-none: 1;
  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 2;

  /* ========== LETTER SPACING ========== */
  --letter-spacing-tighter: -0.05em;
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0em;
  --letter-spacing-wide: 0.025em;
  --letter-spacing-wider: 0.05em;
  --letter-spacing-widest: 0.1em;
}
```

### Spacing Tokens
```css
:root {
  /* ========== SPACING SCALE ========== */
  /* Base unit: 4px */
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-7: 1.75rem;   /* 28px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-14: 3.5rem;   /* 56px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-28: 7rem;     /* 112px */
  --space-32: 8rem;     /* 128px */

  /* ========== SECTION SPACING ========== */
  --section-padding-sm: var(--space-12);   /* Compact sections */
  --section-padding-md: var(--space-16);   /* Default sections */
  --section-padding-lg: var(--space-24);   /* Spacious sections */

  /* ========== CONTAINER WIDTHS ========== */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
}
```

### Effect Tokens
```css
:root {
  /* ========== BORDER RADIUS ========== */
  --radius-none: 0;
  --radius-sm: 0.25rem;   /* 4px */
  --radius-md: 0.5rem;    /* 8px */
  --radius-lg: 0.75rem;   /* 12px */
  --radius-xl: 1rem;      /* 16px */
  --radius-2xl: 1.5rem;   /* 24px */
  --radius-full: 9999px;

  /* ========== SHADOWS ========== */
  --shadow-sm: ;
  --shadow-md: ;
  --shadow-lg: ;
  --shadow-xl: ;
  --shadow-2xl: ;
  --shadow-inner: ;

  /* ========== TRANSITIONS ========== */
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;

  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

  /* ========== Z-INDEX SCALE ========== */
  --z-dropdown: 10;
  --z-sticky: 20;
  --z-fixed: 30;
  --z-modal-backdrop: 40;
  --z-modal: 50;
  --z-popover: 60;
  --z-tooltip: 70;
}
```

---

## 2.3 Tailwind Config Specification (tailwind.config.ts)

```typescript
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      // Map CSS tokens to Tailwind utilities
      colors: {
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          // ... all shades
          DEFAULT: 'var(--color-primary-500)',
        },
        accent: {
          // ... all shades
          DEFAULT: 'var(--color-accent-500)',
        },
        emergency: {
          DEFAULT: 'var(--color-emergency-500)',
        },
        surface: {
          primary: 'var(--color-surface-primary)',
          secondary: 'var(--color-surface-secondary)',
          tertiary: 'var(--color-surface-tertiary)',
          inverse: 'var(--color-surface-inverse)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          inverse: 'var(--color-text-inverse)',
        },
        border: {
          DEFAULT: 'var(--color-border-primary)',
          secondary: 'var(--color-border-secondary)',
          focus: 'var(--color-border-focus)',
        },
      },
      fontFamily: {
        display: 'var(--font-family-display)',
        heading: 'var(--font-family-heading)',
        body: 'var(--font-family-body)',
        mono: 'var(--font-family-mono)',
      },
      fontSize: {
        // Map to tokens
      },
      spacing: {
        // Map to tokens
      },
      borderRadius: {
        // Map to tokens
      },
      boxShadow: {
        // Map to tokens
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        normal: 'var(--duration-normal)',
        slow: 'var(--duration-slow)',
      },
      transitionTimingFunction: {
        bounce: 'var(--ease-bounce)',
      },
      zIndex: {
        dropdown: 'var(--z-dropdown)',
        sticky: 'var(--z-sticky)',
        fixed: 'var(--z-fixed)',
        'modal-backdrop': 'var(--z-modal-backdrop)',
        modal: 'var(--z-modal)',
        popover: 'var(--z-popover)',
        tooltip: 'var(--z-tooltip)',
      },
    },
  },
  plugins: [],
} satisfies Config;
```

---

## 2.4 Global CSS Specification (global.css)

```css
/* ========== IMPORTS ========== */
@import './tokens.css';
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ========== CSS RESET ADDITIONS ========== */
@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-family-body);
    color: var(--color-text-primary);
    background-color: var(--color-surface-primary);
    line-height: var(--line-height-normal);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Typography defaults */
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-family-heading);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
  }

  /* Focus visible for accessibility */
  :focus-visible {
    outline: 2px solid var(--color-border-focus);
    outline-offset: 2px;
  }

  /* Remove default focus for mouse users */
  :focus:not(:focus-visible) {
    outline: none;
  }
}

/* ========== CUSTOM UTILITY CLASSES ========== */
@layer components {
  /* Button base - used by Button.astro */
  .btn-base {
    @apply inline-flex items-center justify-center gap-2;
    @apply font-semibold transition-all;
    @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2;
    min-height: 44px; /* Touch target */
  }

  /* Section padding utility */
  .section-padding {
    padding-top: var(--section-padding-md);
    padding-bottom: var(--section-padding-md);
  }

  .section-padding-sm {
    padding-top: var(--section-padding-sm);
    padding-bottom: var(--section-padding-sm);
  }

  .section-padding-lg {
    padding-top: var(--section-padding-lg);
    padding-bottom: var(--section-padding-lg);
  }

  /* Card hover effect */
  .card-hover {
    @apply transition-all duration-normal;
  }

  .card-hover:hover {
    @apply shadow-lg -translate-y-1;
  }

  /* Container utility */
  .container-default {
    @apply mx-auto px-4 sm:px-6 lg:px-8;
    max-width: var(--container-xl);
  }

  /* Eyebrow text style */
  .eyebrow {
    @apply text-sm font-semibold uppercase tracking-wider;
    color: var(--color-primary-600);
  }

  /* Section title style */
  .section-title {
    @apply text-3xl md:text-4xl lg:text-5xl font-bold;
    font-family: var(--font-family-heading);
  }

  /* Phone link - always prominent */
  .phone-link {
    @apply font-bold text-lg;
    color: var(--color-primary-600);
  }

  .phone-link:hover {
    color: var(--color-primary-700);
  }

  /* Emergency phone link */
  .phone-link-emergency {
    @apply font-bold text-lg;
    color: var(--color-emergency-600);
  }
}

/* ========== ANIMATIONS ========== */
@layer utilities {
  /* Fade in animation */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .animate-fade-in {
    animation: fadeIn var(--duration-normal) var(--ease-out);
  }

  /* Slide up animation */
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-slide-up {
    animation: slideUp var(--duration-slow) var(--ease-out);
  }

  /* Pulse for CTAs */
  @keyframes pulse-subtle {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.85; }
  }

  .animate-pulse-subtle {
    animation: pulse-subtle 3s ease-in-out infinite;
  }
}
```

---

# PART 3: PRIMITIVE COMPONENTS SPECIFICATION

## 3.1 Button Component

**File:** `src/components/primitives/Button.astro`

### Props Interface
```typescript
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'emergency' | 'link';
  size?: 'sm' | 'md' | 'lg';
  href?: string;              // If provided, renders as <a>
  type?: 'button' | 'submit'; // For <button> elements
  disabled?: boolean;
  fullWidth?: boolean;
  iconLeft?: string;          // Icon name from icons.ts
  iconRight?: string;         // Icon name from icons.ts
  class?: string;             // Additional classes
  'data-cta-context'?: string; // For GA4 tracking
}
```

### Variant Styles
| Variant | Background | Text | Border | Hover | Use Case |
|---------|------------|------|--------|-------|----------|
| primary | `--color-primary-600` | white | none | darker shade | Main CTAs |
| secondary | `--color-surface-tertiary` | `--color-text-primary` | `--color-border-primary` | darker | Secondary actions |
| ghost | transparent | `--color-primary-600` | none | light bg | Tertiary actions |
| outline | transparent | `--color-primary-600` | `--color-primary-600` | filled | Alternative primary |
| emergency | `--color-emergency-600` | white | none | darker | 24/7 / urgent |
| link | transparent | `--color-text-link` | none | underline | Inline links |

### Size Styles
| Size | Padding | Font Size | Min Height |
|------|---------|-----------|------------|
| sm | `--space-2` `--space-4` | `--font-size-sm` | 36px |
| md | `--space-3` `--space-6` | `--font-size-base` | 44px |
| lg | `--space-4` `--space-8` | `--font-size-lg` | 52px |

### Usage Examples
```astro
<!-- Primary CTA -->
<Button variant="primary" size="lg" href="tel:+15551234567">
  Call Now: (555) 123-4567
</Button>

<!-- Emergency CTA -->
<Button variant="emergency" size="lg" href="tel:+15551234567" iconLeft="phone">
  24/7 Emergency: (555) 123-4567
</Button>

<!-- Secondary action -->
<Button variant="secondary" href="/services/">
  View All Services
</Button>

<!-- Ghost button -->
<Button variant="ghost" iconRight="arrow-right">
  Learn More
</Button>
```

---

## 3.2 Typography Components

### Heading Component
**File:** `src/components/primitives/Heading.astro`

```typescript
interface Props {
  level: 1 | 2 | 3 | 4 | 5 | 6;  // Renders as h1-h6
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'; // Visual size (can differ from semantic level)
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  color?: 'primary' | 'secondary' | 'inverse' | 'accent';
  class?: string;
}
```

| Size | Font Size | Line Height |
|------|-----------|-------------|
| sm | `--font-size-lg` | tight |
| md | `--font-size-xl` | tight |
| lg | `--font-size-2xl` | tight |
| xl | `--font-size-3xl` | tight |
| 2xl | `--font-size-4xl` | tight |
| 3xl | `--font-size-5xl` | tight |
| 4xl | `--font-size-6xl` | none |

### Text Component
**File:** `src/components/primitives/Text.astro`

```typescript
interface Props {
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'accent';
  as?: 'p' | 'span' | 'div';  // HTML element
  class?: string;
}
```

### Eyebrow Component
**File:** `src/components/primitives/Eyebrow.astro`

```typescript
interface Props {
  color?: 'primary' | 'accent' | 'inverse';
  class?: string;
}
```

Always renders as uppercase, tracked text with `--font-size-sm`.

---

## 3.3 Container Component

**File:** `src/components/primitives/Container.astro`

```typescript
interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean;  // Default true - adds horizontal padding
  class?: string;
}
```

| Size | Max Width |
|------|-----------|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px (default) |
| 2xl | 1536px |
| full | 100% |

---

## 3.4 Section Component

**File:** `src/components/primitives/Section.astro`

```typescript
interface Props {
  variant?: 'default' | 'muted' | 'primary' | 'accent' | 'dark' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  id?: string;
  class?: string;
}
```

| Variant | Background | Text Color |
|---------|------------|------------|
| default | `--color-surface-primary` | `--color-text-primary` |
| muted | `--color-surface-secondary` | `--color-text-primary` |
| primary | `--color-primary-600` | white |
| accent | `--color-accent-500` | white |
| dark | `--color-surface-inverse` | `--color-text-inverse` |
| gradient | Custom gradient | varies |

---

## 3.5 SectionHeader Component

**File:** `src/components/primitives/SectionHeader.astro`

```typescript
interface Props {
  eyebrow?: string;
  headline: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  headlineSize?: 'md' | 'lg' | 'xl';
  class?: string;
}
```

Structure:
1. Eyebrow (optional) - uses Eyebrow component
2. Headline - uses Heading component (h2 default)
3. Description (optional) - uses Text component

---

## 3.6 Card System

### Card Component
**File:** `src/components/primitives/Card.astro`

```typescript
interface Props {
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost';
  interactive?: boolean;  // Adds hover effects
  href?: string;          // Makes entire card clickable
  padding?: 'none' | 'sm' | 'md' | 'lg';
  class?: string;
}
```

### CardMedia Component
**File:** `src/components/primitives/CardMedia.astro`

```typescript
interface Props {
  src: string;
  alt: string;
  aspectRatio?: '1/1' | '4/3' | '16/9' | '3/2';
  class?: string;
}
```

### CardBody Component
**File:** `src/components/primitives/CardBody.astro`

```typescript
interface Props {
  padding?: 'sm' | 'md' | 'lg';
  class?: string;
}
```

### CardHeader Component
**File:** `src/components/primitives/CardHeader.astro`

```typescript
interface Props {
  padding?: 'sm' | 'md' | 'lg';
  class?: string;
}
```

### CardFooter Component
**File:** `src/components/primitives/CardFooter.astro`

```typescript
interface Props {
  padding?: 'sm' | 'md' | 'lg';
  border?: boolean;  // Top border
  class?: string;
}
```

---

## 3.7 Badge Components

### Badge Component
**File:** `src/components/primitives/Badge.astro`

```typescript
interface Props {
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
  class?: string;
}
```

### IconBadge Component
**File:** `src/components/primitives/IconBadge.astro`

```typescript
interface Props {
  icon: string;  // Icon name from icons.ts
  variant?: 'default' | 'primary' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  class?: string;
}
```

---

## 3.8 Icon Component

**File:** `src/components/primitives/Icon.astro`

```typescript
interface Props {
  name: string;         // Icon name from src/lib/icons.ts
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'current' | 'primary' | 'accent' | 'muted';
  class?: string;
}
```

| Size | Dimensions |
|------|------------|
| xs | 12px |
| sm | 16px |
| md | 20px |
| lg | 24px |
| xl | 32px |

**Uses:** `src/lib/icons.ts` - contains 50+ SVG paths for semantic icons.

---

## 3.9 Utility Components

### Divider Component
**File:** `src/components/primitives/Divider.astro`

```typescript
interface Props {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  spacing?: 'sm' | 'md' | 'lg';
  class?: string;
}
```

### Skeleton Component
**File:** `src/components/primitives/Skeleton.astro`

```typescript
interface Props {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string;
  height?: string;
  class?: string;
}
```

### Avatar Component
**File:** `src/components/primitives/Avatar.astro`

```typescript
interface Props {
  src?: string;
  alt: string;
  fallback?: string;  // Initials if no image
  size?: 'sm' | 'md' | 'lg' | 'xl';
  class?: string;
}
```

---

# PART 4: SHARED COMPONENTS SPECIFICATION

## 4.1 Hero Components

### Hero Component (Homepage)
**File:** `src/components/shared/Hero.astro`

```typescript
interface Props {
  headline: string;
  subheadline?: string;
  eyebrow?: string;
  primaryCTA: {
    label: string;
    href: string;
    variant?: 'primary' | 'emergency';
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
  backgroundImage?: string;
  showTrustIndicators?: boolean;
  showAvailability?: boolean;
}
```

**Data Sources:**
- Business profile for phone number, booking URL
- Business hours for availability indicator

**Structure:**
1. Background (gradient or image with overlay)
2. Container with max-width
3. Eyebrow badge (optional)
4. Headline (h1)
5. Subheadline (optional)
6. CTA buttons (phone primary)
7. Trust indicators row (optional)
8. Availability indicator (optional)

### PageHero Component (Non-homepage)
**File:** `src/components/shared/PageHero.astro`

```typescript
interface Props {
  title: string;
  description?: string;
  eyebrow?: string;
  variant?: 'default' | 'location' | 'service' | 'blog' | 'contact';
  breadcrumbs?: Array<{ label: string; href: string }>;
  backgroundImage?: string;
  ctaButtons?: Array<{
    label: string;
    href: string;
    variant: 'primary' | 'secondary';
  }>;
}
```

---

## 4.2 CTA Components

### CTASection Component
**File:** `src/components/shared/CTASection.astro`

```typescript
interface Props {
  variant?: 'primary' | 'emergency' | 'dark' | 'gradient';
  headline: string;
  description?: string;
  primaryCTA: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
  showPhone?: boolean;
  showHours?: boolean;
}
```

**Data Sources:**
- Business profile for phone, hours

### InlineCTA Component
**File:** `src/components/shared/InlineCTA.astro`

```typescript
interface Props {
  variant?: 'card' | 'banner' | 'minimal';
  headline: string;
  ctaLabel: string;
  ctaHref: string;
}
```

### FloatingCTA Component
**File:** `src/components/shared/FloatingCTA.astro`

```typescript
interface Props {
  variant?: 'call' | 'emergency';
}
```

**Behavior:**
- Fixed position bottom of screen
- Only visible on mobile/tablet (hidden lg+)
- Hides when near top/bottom of page
- Hides on scroll down, shows on scroll up

**Data Sources:**
- Business profile for phone number

---

## 4.3 Trust Components

### TrustSignals Component
**File:** `src/components/shared/TrustSignals.astro`

```typescript
interface Props {
  variant?: 'horizontal' | 'vertical' | 'compact';
  showRating?: boolean;
  showReviewCount?: boolean;
  showYears?: boolean;
  showLicense?: boolean;
  showEmergency?: boolean;
}
```

**Data Sources:**
- Business profile for: rating, review count, established year, TSSA license, emergency availability

### TrustBadges Component
**File:** `src/components/shared/TrustBadges.astro`

```typescript
interface Props {
  items?: Array<{
    icon: string;
    label: string;
    value?: string;
  }>;
  variant?: 'default' | 'compact' | 'featured';
}
```

Default items from business profile:
- Google rating
- Years in business
- TSSA Licensed
- WSIB Covered
- 24/7 Emergency

---

## 4.4 Review Components

### StarRating Component
**File:** `src/components/shared/StarRating.astro`

```typescript
interface Props {
  rating: number;  // 1-5
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}
```

### ReviewCard Component
**File:** `src/components/shared/ReviewCard.astro`

```typescript
interface Props {
  review: {
    authorName: string;
    rating: number;
    text: string;
    source: string;
    verified: boolean;
    citySlug?: string;
    reviewDate?: string;
  };
  variant?: 'default' | 'compact' | 'featured';
  showSource?: boolean;
}
```

### ReviewsCarousel Component
**File:** `src/components/shared/ReviewsCarousel.astro`

```typescript
interface Props {
  filterBy?: {
    locationSlug?: string;
    serviceSlug?: string;
    regionSlug?: string;
  };
  limit?: number;
  title?: string;
  showNavigation?: boolean;
}
```

**Data Sources:**
- Reviews collection via reviewResolver

**Features:**
- Touch/swipe support
- Pagination dots
- Navigation arrows
- Responsive (1/2/3 columns)
- Auto-advances (optional)

---

## 4.5 FAQ Components

### Accordion Component
**File:** `src/components/shared/Accordion.astro`

```typescript
interface Props {
  allowMultiple?: boolean;  // Allow multiple open
  class?: string;
}
```

### AccordionItem Component
**File:** `src/components/shared/AccordionItem.astro`

```typescript
interface Props {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}
```

**Features:**
- Smooth open/close animation (CSS grid-based)
- Plus/minus icon toggle
- Focus states

### FAQSection Component
**File:** `src/components/shared/FAQSection.astro`

```typescript
interface Props {
  faqs: Array<{ question: string; answer: string }>;
  title?: string;
  description?: string;
  columns?: 1 | 2;
  showCTA?: boolean;
}
```

**Data Sources:**
- FAQs via faqResolver (scoped to page context)

**Schema.org:**
- Outputs FAQPage structured data

---

## 4.6 Service Components

### ServiceCard Component
**File:** `src/components/shared/ServiceCard.astro`

```typescript
interface Props {
  service: {
    title: string;
    description: string;
    category: string;
    slug: string;
  };
  locationSlug?: string;  // For service-city links
  variant?: 'default' | 'compact' | 'featured';
  showCategory?: boolean;
  showDescription?: boolean;
}
```

**Link Logic:**
- If `locationSlug` provided: `/services/{service}-{location}-on/`
- Otherwise: `/services/{service}/`

### ServicesGrid Component
**File:** `src/components/shared/ServicesGrid.astro`

```typescript
interface Props {
  filterByCategory?: string;
  locationSlug?: string;
  columns?: 2 | 3 | 4;
  variant?: 'cards' | 'compact' | 'list';
  showDescription?: boolean;
  limit?: number;
}
```

**Data Sources:**
- Services collection

### ServicePill Component
**File:** `src/components/shared/ServicePill.astro`

```typescript
interface Props {
  label: string;
  href: string;
  variant?: 'default' | 'active';
}
```

---

## 4.7 Location Components

### CitiesGrid Component
**File:** `src/components/shared/CitiesGrid.astro`

```typescript
interface Props {
  regionSlug?: string;  // Filter by region
  columns?: 2 | 3 | 4;
  showServiceCount?: boolean;
}
```

**Data Sources:**
- Locations collection
- Regions collection (for filtering)

### RegionsGrid Component
**File:** `src/components/shared/RegionsGrid.astro`

```typescript
interface Props {
  columns?: 2 | 3;
  showCityCount?: boolean;
}
```

**Data Sources:**
- Regions collection

### MapEmbed Component
**File:** `src/components/shared/MapEmbed.astro`

```typescript
interface Props {
  address?: string;
  embedUrl?: string;  // Google Maps embed URL
  height?: string;
  class?: string;
}
```

**Data Sources:**
- Business profile for embed URLs

### AddressCard Component
**File:** `src/components/shared/AddressCard.astro`

```typescript
interface Props {
  location: {
    name: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
    phone: string;
    email: string;
  };
  showMap?: boolean;
}
```

---

## 4.8 Process Components

### ProcessTimeline Component
**File:** `src/components/shared/ProcessTimeline.astro`

```typescript
interface Props {
  steps: Array<{
    step: number;
    title: string;
    description: string;
    icon?: string;
  }>;
  variant?: 'horizontal' | 'vertical';
  showNumbers?: boolean;
}
```

### TimelineStep Component
**File:** `src/components/shared/TimelineStep.astro`

```typescript
interface Props {
  step: number;
  title: string;
  description: string;
  icon?: string;
  isLast?: boolean;
}
```

---

## 4.9 Modal Components

### Modal Component
**File:** `src/components/shared/Modal.astro`

```typescript
interface Props {
  id: string;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
}
```

**Features:**
- Focus trap
- Escape to close
- Backdrop click to close
- Body scroll lock
- Animation

### ExitIntentModal Component
**File:** `src/components/shared/ExitIntentModal.astro`

```typescript
interface Props {
  headline?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  showPhone?: boolean;
}
```

**Behavior:**
- Triggers when cursor moves toward browser close
- Shows once per session (localStorage)
- Delayed appearance (not immediate)

---

# PART 5: LAYOUT COMPONENTS SPECIFICATION

## 5.1 Header Component

**File:** `src/components/layout/Header.astro`

**Structure:**
1. TopBar (contact info)
2. SeasonalCalloutBar (if active)
3. Main header bar
   - Logo (left)
   - Navigation (center)
   - CTAs (right): Phone + Book buttons
4. Mobile: Hamburger menu trigger

**Data Sources:**
- Business profile for logo, phone, booking URL
- Services list for mega menu

### Navigation Component
**File:** `src/components/layout/Navigation.astro`

```typescript
interface Props {
  items: Array<{
    label: string;
    href: string;
    children?: Array<{ label: string; href: string }>;
  }>;
}
```

### MobileMenu Component
**File:** `src/components/layout/MobileMenu.astro`

**Features:**
- Slide-out from right
- Accordion for nested items
- Phone CTA prominent at top
- Backdrop overlay

### MegaMenu Component
**File:** `src/components/layout/MegaMenu.astro`

**Structure:**
- Services dropdown with categories
- Each category shows services list
- Featured service highlight
- CTA at bottom

### TopBar Component
**File:** `src/components/layout/TopBar.astro`

**Content:**
- Email link (left)
- Phone link (center/prominent)
- Social links (right)
- Hours indicator

### SeasonalCalloutBar Component
**File:** `src/components/layout/SeasonalCalloutBar.astro`

**Data Sources:**
- Seasonal messages collection

**Features:**
- Date-based display (startDate/endDate)
- Dismissible (localStorage memory)
- Category-aware (shows on relevant pages)

---

## 5.2 Footer Component

**File:** `src/components/layout/Footer.astro`

**Structure:**
1. Main footer grid (4 columns)
   - Brand column: Logo, description, contact
   - Services column: Service category links
   - Company column: About, Contact, Financing, etc.
   - Location column: Address, map embed
2. Trust bar: Rating, certifications, badges
3. Social links row
4. Copyright bar

**Data Sources:**
- Business profile for all content

---

# PART 6: HOMEPAGE COMPONENTS SPECIFICATION

## 6.1 HeroSection

**File:** `src/components/homepage/HeroSection.astro`

**Structure:**
1. Full-width background (gradient + optional image)
2. Container
3. Two-column layout (desktop) / stacked (mobile)
   - Left: Content
     - Eyebrow badge
     - Headline (h1)
     - Subheadline
     - CTA buttons (Call primary, Book secondary)
     - Trust indicators row
   - Right: Hero image or graphic
4. Availability indicator

**Data Sources:**
- Business profile

**Conversion Focus:**
- Phone number in headline or immediately visible
- "Call Now" is primary CTA
- Emergency 24/7 messaging prominent

---

## 6.2 ServiceCategoriesSection

**File:** `src/components/homepage/ServiceCategoriesSection.astro`

**Structure:**
1. SectionHeader (eyebrow, headline, description)
2. 6-card grid (3x2 desktop, 2x3 tablet, 1x6 mobile)
   - Each card: Icon, title, description, link
   - Emergency/repair card visually distinct (accent color)

**Categories:**
1. Heating
2. Cooling
3. Indoor Air Quality
4. Water Heating
5. Commercial
6. Maintenance Plans

**Data Sources:**
- Hardcoded categories (mapped to services collection)

---

## 6.3 WhyChooseBAPSection

**File:** `src/components/homepage/WhyChooseBAPSection.astro`

**Structure:**
1. SectionHeader
2. Two-column layout
   - Left: Image of team/owner
   - Right:
     - Owner introduction (Paul Palmer)
     - 4 differentiator cards:
       1. Family-owned since 1992
       2. 24/7 Emergency Service
       3. 10-Year Warranty
       4. Transparent Pricing
3. Stats row: Years in business, customers served, 5-star reviews

**Data Sources:**
- Business profile

---

## 6.4 ProcessSection

**File:** `src/components/homepage/ProcessSection.astro`

**Structure:**
1. SectionHeader
2. ProcessTimeline with 4 steps:
   1. Call or Book Online
   2. Same-Day Diagnosis
   3. Upfront Quote
   4. Expert Repair/Install
3. CTA button

**Data Sources:**
- Hardcoded steps (standard process)

---

## 6.5 GallerySection

**File:** `src/components/homepage/GallerySection.astro`

**Structure:**
1. SectionHeader
2. Image carousel/grid
   - Before/after capability
   - Project descriptions
   - Navigation arrows
   - Pagination dots
3. CTA: View more projects

**Data Sources:**
- Hardcoded or from case studies

---

## 6.6 FinancingTeaserSection

**File:** `src/components/homepage/FinancingTeaserSection.astro`

**Structure:**
1. Two-column layout
   - Left: Headline, benefits list, CTA
   - Right: Decorative graphic or calculator preview
2. Benefits:
   - Flexible monthly payments
   - Quick approval
   - Competitive rates

**Data Sources:**
- Business profile financing info

---

## 6.7 ServiceAreasSection

**File:** `src/components/homepage/ServiceAreasSection.astro`

**Structure:**
1. SectionHeader
2. RegionsGrid or map visualization
3. List of cities served
4. CTA: Find your location

**Data Sources:**
- Locations collection
- Regions collection

---

## 6.8 BlogPreviewSection

**File:** `src/components/homepage/BlogPreviewSection.astro`

**Structure:**
1. SectionHeader
2. 3-card grid of latest posts
   - Featured image
   - Category badge
   - Title
   - Excerpt
   - Read more link
3. CTA: View all articles

**Data Sources:**
- Blog collection (latest 3)

---

## 6.9 BrandLogosSection

**File:** `src/components/homepage/BrandLogosSection.astro`

**Structure:**
1. Simple headline: "Brands We Install & Service"
2. Logo row/grid (Carrier, Lennox, Trane, Goodman, etc.)
3. Subtle styling (grayscale or muted)

**Data Sources:**
- Hardcoded brand logos

---

# PART 7: SERVICE PAGE COMPONENTS SPECIFICATION

## 7.1 ServiceHero

**File:** `src/components/services/ServiceHero.astro`

```typescript
interface Props {
  service: {
    title: string;
    description: string;
    serviceType: 'installation' | 'repair' | 'maintenance';
    category: string;
  };
  location?: {
    title: string;
    slug: string;
  };
}
```

**Variants by serviceType:**

| Type | Color Theme | Primary CTA | Urgency |
|------|-------------|-------------|---------|
| repair | Emergency red | Call 24/7 | HIGH |
| installation | Primary blue | Call for Estimate | Medium |
| maintenance | Accent/teal | Book Service | Low |

**Structure:**
1. Background (variant-colored gradient)
2. Breadcrumbs
3. Eyebrow (category + service type)
4. Headline (h1) - includes location if service-city
5. Description
6. CTA buttons
7. Trust indicators (TSSA, warranty, etc.)
8. Availability indicator (for repair)

---

## 7.2 ServiceTrustBand

**File:** `src/components/services/ServiceTrustBand.astro`

Compact horizontal strip of trust signals specific to service context.

**Items:**
- Licensed & Insured
- X-Year Warranty
- Upfront Pricing
- Same-Day Service (if applicable)

---

## 7.3 ServiceValueProps

**File:** `src/components/services/ServiceValueProps.astro`

```typescript
interface Props {
  valueProps: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
}
```

**Data Sources:**
- Service content `valueProps` field

**Structure:**
- 2x2 or 4x1 grid of value prop cards
- Each card: Icon, title, description

---

## 7.4 ServiceProblemAgitation

**File:** `src/components/services/ServiceProblemAgitation.astro`

```typescript
interface Props {
  problems: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
}
```

**Data Sources:**
- Service content `problems` field

**Structure:**
- Section header: "Don't Wait Until It's Too Late" or similar
- 3 problem cards showing consequences of delay
- Each card: Icon, title, description

---

## 7.5 ServiceSolution

**File:** `src/components/services/ServiceSolution.astro`

```typescript
interface Props {
  approach: {
    headline: string;
    description: string;
    quote?: string;
    quotePerson?: string;
  };
}
```

**Data Sources:**
- Service content `approach` field

**Structure:**
- Two-column layout
- Left: Headline, description
- Right: Quote card (if available)

---

## 7.6 ServiceProcess

**File:** `src/components/services/ServiceProcess.astro`

```typescript
interface Props {
  processSteps: Array<{
    step: number;
    title: string;
    description: string;
  }>;
}
```

**Data Sources:**
- Service content `processSteps` field

**Structure:**
- Uses ProcessTimeline component
- Typically 4 steps

---

## 7.7 ServiceInclusions

**File:** `src/components/services/ServiceInclusions.astro`

```typescript
interface Props {
  inclusions: {
    equipment: string[];
    labour: string[];
    warranty: string[];
    extras: string[];
  };
}
```

**Data Sources:**
- Service content `inclusions` field

**Structure:**
- 4-quadrant layout
- Each quadrant: Icon, title, bullet list

---

## 7.8 ServiceSavings

**File:** `src/components/services/ServiceSavings.astro`

```typescript
interface Props {
  savings: {
    headline: string;
    description: string;
    bullets: string[];
    rebateInfo?: string;
    financingNote?: string;
  };
}
```

**Data Sources:**
- Service content `savings` field

**Structure:**
- Headline
- Description
- Bullet list of savings/benefits
- Rebate info callout (if available)
- Financing note (if available)
- CTA: Learn about financing

---

## 7.9 ServiceGuarantee

**File:** `src/components/services/ServiceGuarantee.astro`

```typescript
interface Props {
  guarantee: {
    items: Array<{
      title: string;
      description: string;
    }>;
  };
}
```

**Data Sources:**
- Service content `guarantee` field

**Structure:**
- Section header: "Our Guarantee"
- Grid of guarantee cards
- Each card: Title, description

---

## 7.10 ServiceLocalProof

**File:** `src/components/services/ServiceLocalProof.astro`

**Only used on service-city pages.**

```typescript
interface Props {
  localProof: {
    testimonial: string;
    customerName: string;
    customerLocation: string;
    result?: string;
  };
  locationTitle: string;
}
```

**Data Sources:**
- Service-city content `localProof` field

**Structure:**
- Location-specific headline
- Featured testimonial card
- Optional result stat

---

## 7.11 ServiceImageGallery

**File:** `src/components/services/ServiceImageGallery.astro`

```typescript
interface Props {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
}
```

**Data Sources:**
- Service content `images` field

**Structure:**
- Grid of project images
- Lightbox on click
- Captions

---

## 7.12 ServiceCaseStudy

**File:** `src/components/services/ServiceCaseStudy.astro`

```typescript
interface Props {
  caseStudy: {
    title: string;
    problem: { headline: string; description: string };
    solution: { headline: string; description: string };
    results: { headline: string; stats: Array<{ value: string; label: string }> };
    testimonial: { text: string; authorName: string; location: string };
  };
}
```

**Data Sources:**
- Case studies collection via caseStudyResolver

**Structure:**
- Before/after visual
- Problem description
- Solution description
- Results stats
- Customer quote

---

## 7.13 ServiceObjections

**File:** `src/components/services/ServiceObjections.astro`

FAQ-style objection handling specific to service type.

**Data Sources:**
- FAQs collection filtered by service

---

# PART 8: PAGE TEMPLATES SPECIFICATION

## 8.1 BaseLayout

**File:** `src/layouts/BaseLayout.astro`

```typescript
interface Props {
  title: string;
  description: string;
  canonicalURL?: string;
  robots?: string;
  schema?: object | object[];
  ogImage?: string;
}
```

**Structure:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Meta tags -->
  <!-- Title -->
  <!-- Canonical URL -->
  <!-- Open Graph -->
  <!-- Twitter Card -->
  <!-- JSON-LD Schema -->
  <!-- CSS imports -->
  <!-- Font imports -->
  <!-- GA4 -->
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to content</a>
  <Header />
  <main id="main-content">
    <slot />
  </main>
  <Footer />
  <FloatingCTA />
  <ExitIntentModal />
  <!-- Analytics scripts -->
</body>
</html>
```

---

## 8.2 Homepage Template

**File:** `src/pages/index.astro`

**Section Order:**
1. HeroSection
2. ServiceCategoriesSection
3. CTASection (variant="emergency")
4. WhyChooseBAPSection
5. BrandLogosSection
6. ProcessSection
7. GallerySection
8. ReviewsCarousel
9. FinancingTeaserSection
10. ServiceAreasSection
11. BlogPreviewSection
12. FAQSection
13. CTASection (variant="primary")

**Data Fetching:**
```typescript
// Get FAQs scoped to homepage
const faqs = await resolveFAQs({ pageType: 'homepage' });

// Get reviews
const reviews = await resolveReviews({ pageType: 'homepage', limit: 6 });

// Get latest blog posts
const posts = await getCollection('blog');
const latestPosts = posts.slice(0, 3);

// Business profile
const profile = await getBusinessProfile();
```

---

## 8.3 Service Page Template

**File:** `src/pages/services/[...slug].astro`

**Handles both:**
- Base service pages: `/services/furnace-installation/`
- Service-city pages: `/services/furnace-installation-guelph-on/`

**Section Order (Base Service):**
1. ServiceHero
2. ServiceTrustBand
3. ServiceProblemAgitation
4. ServiceSolution
5. ServiceValueProps
6. ServiceProcess
7. ServiceInclusions
8. ServiceSavings
9. ServiceImageGallery
10. ServicesGrid (related services)
11. ReviewsCarousel
12. ServiceGuarantee
13. FAQSection
14. CTASection

**Section Order (Service-City):**
Same as above, plus:
- ServiceLocalProof (after ServiceSavings)
- Location-specific messaging in headlines

**Data Fetching:**
```typescript
export async function getStaticPaths() {
  const services = await getCollection('services');
  const serviceCityEntries = await getCollection('service-city');

  // Generate paths for base services
  const servicePaths = services.map(service => ({
    params: { slug: service.id },
    props: { type: 'service', service }
  }));

  // Generate paths for service-city
  const serviceCityPaths = serviceCityEntries.map(entry => ({
    params: { slug: `${entry.data.serviceSlug}-${entry.data.locationSlug}-on` },
    props: { type: 'service-city', entry }
  }));

  return [...servicePaths, ...serviceCityPaths];
}
```

---

## 8.4 Location Page Template

**File:** `src/pages/locations/[slug].astro`

**Section Order:**
1. PageHero (variant="location")
2. TrustSignals (location-specific review count)
3. ServicesGrid (linked to service-city pages)
4. ReviewsCarousel (filtered by location)
5. MapEmbed
6. FAQSection (location-scoped)
7. CTASection

**Data Fetching:**
```typescript
export async function getStaticPaths() {
  const locations = await getCollection('locations');
  return locations.map(location => ({
    params: { slug: location.id },
    props: { location }
  }));
}

// In component:
const faqs = await resolveFAQs({
  pageType: 'location',
  locationSlug: location.id
});

const reviews = await resolveReviews({
  pageType: 'location',
  locationSlug: location.id
});
```

---

## 8.5 Region Page Template

**File:** `src/pages/regions/[slug].astro`

**Section Order:**
1. PageHero
2. CitiesGrid (cities in this region)
3. ServicesGrid
4. ReviewsCarousel (filtered by region)
5. FAQSection
6. CTASection

---

## 8.6 Blog Templates

### Blog Index
**File:** `src/pages/blog/index.astro`

**Structure:**
1. PageHero (variant="blog")
2. BlogCategoryNav
3. Featured post (full width)
4. Posts grid (3 columns)
5. Pagination (if needed)

### Blog Post
**File:** `src/pages/blog/[slug].astro`

**Structure:**
1. BlogPostHero
2. Two-column layout
   - Main: Article content (prose styling)
   - Sidebar: BlogTableOfContents (sticky)
3. BlogAuthorBio
4. BlogRelatedPosts
5. CTASection

---

## 8.7 Static Page Templates

### About Page
**File:** `src/pages/about-us.astro`

**Sections:**
1. PageHero (variant="about")
2. Owner/Mission section
3. TeamGrid (if team data available)
4. Timeline/History
5. CertificationsGrid
6. ReviewsCarousel
7. CTASection

### Contact Page
**File:** `src/pages/contact-us.astro`

**Sections:**
1. PageHero (variant="contact")
2. Two-column layout
   - Left: Contact info (phone prominent, email, hours)
   - Right: Location cards with maps
3. ServiceAreasSection (compact)
4. CTASection

### Financing Page
**File:** `src/pages/financing.astro`

**Sections:**
1. PageHero
2. Financing benefits
3. How it works
4. FAQSection (financing-scoped)
5. CTASection

### Rebates Page
**File:** `src/pages/rebates.astro`

**Sections:**
1. PageHero
2. Available rebates list
3. How to qualify
4. FAQSection (rebates-scoped)
5. CTASection

### Reviews Page
**File:** `src/pages/reviews.astro`

**Sections:**
1. PageHero
2. Overall rating display
3. ReviewsCarousel (all reviews, filterable)
4. CTASection

---

# PART 9: TASK EXECUTION GUIDE

## 9.1 Task Execution Rules

### Design Rules
1. **MANDATORY**: Use `/frontend-design` skill for ALL visual decisions
2. **MANDATORY**: Document aesthetic direction before coding each component
3. **NO GENERIC DESIGN**: No Inter font, no purple gradients, no cookie-cutter patterns

### Code Architecture Rules (STRICT)
4. **PROPS-BASED VARIANTS**: One component with variant prop
   ```astro
   <!-- CORRECT -->
   <Button variant="primary" />
   <Button variant="emergency" />

   <!-- WRONG -->
   <PrimaryButton />
   <EmergencyButton />
   ```

5. **NO HARDCODED VALUES**: All values from tokens
   ```css
   /* CORRECT */
   color: var(--color-primary-600);
   padding: var(--space-4);

   /* WRONG */
   color: #1e40af;
   padding: 16px;
   ```

6. **NO INLINE REPETITION**: Extract to utilities
   ```css
   /* If used 2+ times, create utility */
   .btn-base { @apply inline-flex items-center justify-center gap-2 font-semibold; }
   ```

7. **CSS TOKENS = SOURCE OF TRUTH**
   - `tokens.css` → defines values
   - `tailwind.config.ts` → maps tokens
   - Components → use Tailwind classes

### CTA Rules
8. **PHONE CALLS PRIMARY**: Every page optimized for calls
9. **FORMS SECONDARY**: Defer complex forms

### Verification Rules
10. **MANDATORY**: `pnpm build` after each task
11. **MANDATORY**: Visual check in dev server
12. **MANDATORY**: Preserve data fetching logic

---

## 9.2 Task List

### Phase 0: Clean Slate + Foundation
| Task | Description | Output |
|------|-------------|--------|
| 0.0 | Delete all existing visual code | Clean src/components/, styles, config |
| 0.1 | Create DESIGN-SYSTEM.md | Design direction document |
| 0.2 | Create tokens.css | All CSS custom properties |
| 0.3 | Create tailwind.config.ts | Tailwind token mapping |
| 0.4 | Create global.css | Base styles + utilities |

### Phase 1: Primitives
| Task | Components |
|------|------------|
| 1.1 | Button |
| 1.2 | Heading, Text, Eyebrow |
| 1.3 | Container, Section |
| 1.4 | Card, CardMedia, CardBody, CardHeader, CardFooter |
| 1.5 | Badge, IconBadge |
| 1.6 | Icon |
| 1.7 | SectionHeader |
| 1.8 | Divider, Skeleton, Avatar |

### Phase 2: Shared Components
| Task | Components |
|------|------------|
| 2.1 | Hero, PageHero |
| 2.2 | CTASection |
| 2.3 | InlineCTA, FloatingCTA |
| 2.4 | TrustSignals, TrustBadges |
| 2.5 | StarRating, ReviewCard |
| 2.6 | ReviewsCarousel |
| 2.7 | Accordion, AccordionItem, FAQSection |
| 2.8 | ServiceCard, ServicesGrid, ServicePill |
| 2.9 | CitiesGrid, RegionsGrid |
| 2.10 | MapEmbed, AddressCard |
| 2.11 | ProcessTimeline, TimelineStep |
| 2.12 | Modal, ExitIntentModal |

### Phase 3: Layout
| Task | Components |
|------|------------|
| 3.1 | Header |
| 3.2 | Navigation, MobileMenu |
| 3.3 | MegaMenu |
| 3.4 | TopBar |
| 3.5 | SeasonalCalloutBar |
| 3.6 | Footer |

### Phase 4: Homepage
| Task | Components |
|------|------------|
| 4.1 | HeroSection |
| 4.2 | ServiceCategoriesSection |
| 4.3 | WhyChooseBAPSection |
| 4.4 | ProcessSection |
| 4.5 | GallerySection |
| 4.6 | FinancingTeaserSection |
| 4.7 | ServiceAreasSection |
| 4.8 | BlogPreviewSection |
| 4.9 | BrandLogosSection |
| 4.10 | Homepage assembly (index.astro) |

### Phase 5: Service Components
| Task | Components |
|------|------------|
| 5.1 | ServiceHero |
| 5.2 | ServiceTrustBand |
| 5.3 | ServiceValueProps |
| 5.4 | ServiceProblemAgitation |
| 5.5 | ServiceSolution |
| 5.6 | ServiceProcess |
| 5.7 | ServiceInclusions |
| 5.8 | ServiceSavings |
| 5.9 | ServiceGuarantee |
| 5.10 | ServiceLocalProof |
| 5.11 | ServiceImageGallery |
| 5.12 | ServiceCaseStudy |
| 5.13 | ServiceObjections |

### Phase 6: Page Templates
| Task | Template |
|------|----------|
| 6.1 | BaseLayout |
| 6.2 | Homepage (index.astro) |
| 6.3 | Service page ([...slug].astro) |
| 6.4 | Service category ([category].astro) |
| 6.5 | Location page ([slug].astro) |
| 6.6 | Region page ([slug].astro) |
| 6.7 | Blog index + post |
| 6.8 | About, Contact |
| 6.9 | Financing, Rebates, Reviews |
| 6.10 | 404, Services index, Locations index, Regions index |

### Phase 7: Blog Components
| Task | Components |
|------|------------|
| 7.1 | BlogPostHero, BlogPostCard |
| 7.2 | BlogAuthorBio, BlogRelatedPosts |
| 7.3 | BlogTableOfContents, BlogCategoryNav |

### Phase 8: Verification
| Task | Check |
|------|-------|
| 8.1 | Full build verification |
| 8.2 | All 625 pages render |
| 8.3 | Mobile responsive audit |
| 8.4 | Accessibility audit |
| 8.5 | Performance audit |
| 8.6 | SEO audit |
| 8.7 | Final documentation |

---

## 9.3 Handoff Format

After completing each task, output:

```
---
## COMPLETED: Task [X.X] - [Name]

Files created/modified:
- path/to/file.astro

Verification:
- [x] pnpm build passed
- [x] Visual check completed

---
## NEXT TASK PROMPT (copy to new context):

Execute Task [X.X]: [Name].
Use /frontend-design skill.
Follow WEBSITE-REDESIGN-PLAN.md specifications.
Run pnpm build when done.
---
```

---

## 9.4 Starting Prompt

```
Execute Task 0.0: Clean Slate - Delete all existing visual code.

DELETE:
- src/components/ (entire folder)
- src/styles/tokens.css
- src/styles/global.css
- PAGE-TEMPLATES.md
- tailwind.config.ts
- Gut src/pages/*.astro to bare data fetching logic
- Gut src/layouts/BaseLayout.astro to bare head/meta logic

KEEP:
- src/content/ (all collections)
- src/content/config.ts
- src/lib/ (all utilities)
- public/images/
- public/ brand assets

Then run pnpm build to verify preserved files still work.
```

---

# PART 10: PROGRESS TRACKER

| Phase | Status | Tasks Completed |
|-------|--------|-----------------|
| 0 - Foundation | `[x] COMPLETE` | 4/5 |
| 1 - Primitives | `[x] COMPLETE` | 8/8 |
| 2 - Shared | `[~] IN PROGRESS` | 9/12 |
| 3 - Layout | `[ ] PENDING` | 0/6 |
| 4 - Homepage | `[ ] PENDING` | 0/10 |
| 5 - Service | `[ ] PENDING` | 0/13 |
| 6 - Templates | `[ ] PENDING` | 0/10 |
| 7 - Blog | `[ ] PENDING` | 0/3 |
| 8 - Verification | `[ ] PENDING` | 0/7 |

**Total: ~74 tasks | Completed: ~21 tasks**

---

## Detailed Task Completion Log

### Phase 0: Foundation
| Task | Description | Status | Files |
|------|-------------|--------|-------|
| 0.1 | Create DESIGN-SYSTEM.md | `[x] DONE` | `DESIGN-SYSTEM.md` |
| 0.2 | Create tokens.css | `[x] DONE` | `src/styles/tokens.css` |
| 0.3 | Create tailwind.config.ts | `[x] DONE` | `tailwind.config.ts` |
| 0.4 | Create global.css | `[x] DONE` | `src/styles/global.css` |

### Phase 1: Primitives
| Task | Components | Status | Files |
|------|------------|--------|-------|
| 1.1 | Button | `[x] DONE` | `src/components/primitives/Button.astro` |
| 1.2 | Heading, Text, Eyebrow | `[x] DONE` | `Heading.astro`, `Text.astro`, `Eyebrow.astro` |
| 1.3 | Container, Section | `[x] DONE` | `Container.astro`, `Section.astro` |
| 1.4 | Card, CardMedia, CardBody, CardHeader, CardFooter | `[x] DONE` | `Card.astro`, `CardMedia.astro`, `CardBody.astro`, `CardHeader.astro`, `CardFooter.astro` |
| 1.5 | Badge, IconBadge | `[x] DONE` | `Badge.astro`, `IconBadge.astro` |
| 1.6 | Icon | `[x] DONE` | `Icon.astro` |
| 1.7 | SectionHeader | `[x] DONE` | `SectionHeader.astro` |
| 1.8 | Divider, Skeleton, Avatar | `[x] DONE` | `Divider.astro`, `Skeleton.astro`, `Avatar.astro` |

### Phase 2: Shared Components
| Task | Components | Status | Files |
|------|------------|--------|-------|
| 2.1 | Hero, PageHero | `[x] DONE` | `src/components/shared/Hero.astro`, `PageHero.astro` |
| 2.2 | CTASection | `[x] DONE` | `src/components/shared/CTASection.astro` |
| 2.3 | InlineCTA, FloatingCTA | `[x] DONE` | `InlineCTA.astro`, `FloatingCTA.astro` |
| 2.4 | TrustSignals, TrustBadges | `[x] DONE` | `TrustSignals.astro`, `TrustBadges.astro` |
| 2.5 | StarRating, ReviewCard | `[x] DONE` | `StarRating.astro`, `ReviewCard.astro` |
| 2.6 | ReviewsCarousel | `[x] DONE` | `ReviewsCarousel.astro` |
| 2.7 | Accordion, AccordionItem, FAQSection | `[x] DONE` | `Accordion.astro`, `AccordionItem.astro`, `FAQSection.astro` |
| 2.8 | ServiceCard, ServicesGrid, ServicePill | `[x] DONE` | `ServiceCard.astro`, `ServicesGrid.astro`, `ServicePill.astro` |
| 2.9 | CitiesGrid, RegionsGrid | `[x] DONE` | `CitiesGrid.astro`, `RegionsGrid.astro` |
| 2.10 | MapEmbed, AddressCard | `[ ] PENDING` | - |
| 2.11 | ProcessTimeline, TimelineStep | `[ ] PENDING` | - |
| 2.12 | Modal, ExitIntentModal | `[ ] PENDING` | - |

### Phase 3: Layout
| Task | Components | Status |
|------|------------|--------|
| 3.1 | Header | `[ ] PENDING` |
| 3.2 | Navigation, MobileMenu | `[ ] PENDING` |
| 3.3 | MegaMenu | `[ ] PENDING` |
| 3.4 | TopBar | `[ ] PENDING` |
| 3.5 | SeasonalCalloutBar | `[ ] PENDING` |
| 3.6 | Footer | `[ ] PENDING` |

### Phase 4-8: Remaining
See task list in Section 9.2 for full details.

---

*Document Version 2.0 - Full Specification*
*Last Updated: January 15, 2026*
