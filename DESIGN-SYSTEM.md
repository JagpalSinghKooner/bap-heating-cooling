# B.A.P Heating & Cooling - Design System

> **Version**: 1.0
> **Created**: January 2026
> **Aesthetic Direction**: Trustworthy Industrial Modern

---

## 1. Design Philosophy

### The Big Idea

**"Your neighbor who happens to be an expert."**

B.A.P isn't a faceless corporation. It's Paul Palmer, who's been keeping homes comfortable since 1992. The design should feel like a firm handshake - confident, warm, reliable. Not slick and corporate. Not cluttered and cheap. Professional expertise delivered with genuine care.

### Emotional Targets

| Moment | Feeling We Create |
|--------|-------------------|
| Landing on homepage | "These guys look legit" |
| Reading about services | "They actually know what they're doing" |
| Seeing the phone number | "I should just call them" |
| Viewing reviews | "Real people trust them" |
| Emergency at 2am | "Thank God they're 24/7" |

### Design Principles

1. **Trust Over Flash** - Every design choice earns trust. No gratuitous animations or flashy effects that feel like sales tactics.

2. **Phone Calls Win** - The phone number is always one glance away. CTAs are impossible to miss but never feel aggressive.

3. **Local & Personal** - Imagery, copy, and design choices reinforce "we're your neighbors" not "we're a franchise."

4. **Clarity Beats Cleverness** - Information hierarchy is ruthless. Users find what they need in seconds.

5. **Emergency Empathy** - When someone's furnace dies at midnight, the design guides them to help fast with zero friction.

---

## 2. Aesthetic Direction

### Visual Tone: Trustworthy Industrial Modern

A fusion of blue-collar reliability and contemporary design sophistication. Clean lines, generous whitespace, but with warmth and texture that says "real people work here."

**NOT THIS:**
- Cold corporate tech aesthetic
- Overly playful/cartoonish
- Cluttered contractor chaos
- Generic template design

**YES THIS:**
- Confident and grounded
- Warm but professional
- Clean but not sterile
- Modern but approachable

### Signature Elements

1. **The Confident Grid** - Strong horizontal rhythm with deliberate asymmetric breaks. Headlines can bleed. Images can overlap. But the underlying grid provides stability.

2. **Industrial Accents** - Subtle diagonal lines (inspired by caution tape/industrial markings) appear as decorative elements. Geometric badge shapes. Chunky borders.

3. **Warm Shadows** - Drop shadows have a slight warm tint rather than pure black. Feels more human.

4. **Photo-Forward** - Real photos of real work, real people, real equipment. Hero images show actual B.A.P trucks, technicians, completed jobs.

5. **The Orange Signal** - Accent orange is used strategically to signal "action here" - like a safety vest in a crowd. Never decoration, always function.

---

## 3. Typography

### Font Stack

```
Display (Hero headlines):     Fraunces
Headings (Section titles):    Plus Jakarta Sans
Body (All text):              Source Sans 3
Mono (Technical/specs):       JetBrains Mono
```

### Why These Fonts?

**Fraunces** (Display)
- A "soft serif" with organic, slightly wonky letterforms
- Feels handcrafted and warm - perfect for "family-owned since 1992"
- The optical size axis allows dramatic hero use
- Distinctive without being trendy

**Plus Jakarta Sans** (Headings)
- Geometric sans with subtle humanist touches
- Excellent legibility at all sizes
- Professional but not cold
- Strong x-height for scanning

**Source Sans 3** (Body)
- Adobe's open-source workhorse, evolved
- Extremely readable at body sizes
- Slightly condensed for efficient line lengths
- Feels approachable and clear

### Type Scale (Desktop → Mobile)

| Token | Desktop | Tablet | Mobile | Use |
|-------|---------|--------|--------|-----|
| `display-hero` | 72px / 1.0 | 56px | 40px | Homepage hero headline |
| `display-lg` | 60px / 1.05 | 48px | 36px | Service hero headlines |
| `heading-xl` | 48px / 1.1 | 40px | 32px | Section titles |
| `heading-lg` | 36px / 1.2 | 32px | 28px | Card titles, H2 |
| `heading-md` | 30px / 1.25 | 26px | 24px | Subsection titles, H3 |
| `heading-sm` | 24px / 1.3 | 22px | 20px | Small headings, H4 |
| `body-xl` | 20px / 1.6 | 18px | 18px | Lead paragraphs |
| `body-lg` | 18px / 1.6 | 17px | 16px | Emphasized body |
| `body-md` | 16px / 1.6 | 16px | 16px | Default body |
| `body-sm` | 14px / 1.5 | 14px | 14px | Captions, metadata |
| `body-xs` | 12px / 1.5 | 12px | 12px | Legal, footnotes |

### Typography Treatments

**Hero Headlines**
```css
font-family: 'Fraunces', serif;
font-weight: 600;
font-optical-sizing: auto;
letter-spacing: -0.02em;
color: var(--color-text-primary);
```

**Section Titles**
```css
font-family: 'Plus Jakarta Sans', sans-serif;
font-weight: 700;
letter-spacing: -0.015em;
color: var(--color-text-primary);
```

**Eyebrows**
```css
font-family: 'Plus Jakarta Sans', sans-serif;
font-weight: 600;
font-size: 13px;
letter-spacing: 0.08em;
text-transform: uppercase;
color: var(--color-primary-600);
```

**Phone Numbers** (Always prominent)
```css
font-family: 'Plus Jakarta Sans', sans-serif;
font-weight: 700;
font-size: 20px;
letter-spacing: 0.02em;
color: var(--color-primary-700);
```

---

## 4. Color System

### Brand Colors

#### Primary: Trust Blue

A deep, confident navy that modernizes the existing blue without losing recognition. Warm undertones prevent it from feeling corporate-cold.

```css
--color-primary-50:  #eef4ff;   /* Lightest tint - backgrounds */
--color-primary-100: #dae6ff;   /* Light tint */
--color-primary-200: #bdd4ff;   /* Hover backgrounds */
--color-primary-300: #90b8ff;   /* Borders, accents */
--color-primary-400: #5d91ff;   /* Links on dark */
--color-primary-500: #3b6fd9;   /* Base primary */
--color-primary-600: #2451b3;   /* Primary buttons, links */
--color-primary-700: #1d408f;   /* Button hover */
--color-primary-800: #1b366f;   /* Dark accents */
--color-primary-900: #1a2f59;   /* Darkest - footer bg */
```

#### Accent: Action Orange

Safety-vest orange. Impossible to miss. Used exclusively for primary CTAs and urgent messaging. Never decorative.

```css
--color-accent-50:  #fff7ed;   /* Lightest tint */
--color-accent-100: #ffedd5;   /* Soft backgrounds */
--color-accent-200: #fed7aa;   /* Hover states */
--color-accent-300: #fdba74;   /* Secondary accent */
--color-accent-400: #fb923c;   /* Bright accent */
--color-accent-500: #f97316;   /* Base accent */
--color-accent-600: #ea580c;   /* Primary CTA buttons */
--color-accent-700: #c2410c;   /* CTA hover */
--color-accent-800: #9a3412;   /* Dark accent */
--color-accent-900: #7c2d12;   /* Darkest */
```

#### Emergency: Urgent Red

Reserved exclusively for emergency/24-7 messaging. Creates immediate visual priority.

```css
--color-emergency-50:  #fef2f2;
--color-emergency-100: #fee2e2;
--color-emergency-200: #fecaca;
--color-emergency-500: #ef4444;   /* Emergency indicators */
--color-emergency-600: #dc2626;   /* Emergency buttons */
--color-emergency-700: #b91c1c;   /* Emergency hover */
--color-emergency-800: #991b1b;
```

### Surface Colors

```css
/* Light theme surfaces */
--color-surface-primary:   #ffffff;         /* Main background */
--color-surface-secondary: #f8fafc;         /* Alternate sections - warm gray */
--color-surface-tertiary:  #f1f5f9;         /* Cards, elevated elements */
--color-surface-inverse:   #0f172a;         /* Dark backgrounds - slate-900 */

/* Subtle warmth to prevent clinical feel */
--color-surface-warm:      #fffbf7;         /* Warm white for trust sections */
```

### Text Colors

```css
--color-text-primary:    #0f172a;   /* Main body - slate-900 */
--color-text-secondary:  #475569;   /* Supporting text - slate-600 */
--color-text-tertiary:   #94a3b8;   /* Placeholder, disabled - slate-400 */
--color-text-inverse:    #f8fafc;   /* Text on dark backgrounds */
--color-text-link:       #2451b3;   /* Link color = primary-600 */
--color-text-link-hover: #1d408f;   /* Link hover = primary-700 */
```

### Semantic Colors

```css
/* Success - confirmations, positive feedback */
--color-success-50:  #f0fdf4;
--color-success-500: #22c55e;
--color-success-600: #16a34a;
--color-success-700: #15803d;

/* Warning - alerts, attention needed */
--color-warning-50:  #fffbeb;
--color-warning-500: #f59e0b;
--color-warning-600: #d97706;
--color-warning-700: #b45309;

/* Error - validation, problems */
--color-error-50:  #fef2f2;
--color-error-500: #ef4444;
--color-error-600: #dc2626;
--color-error-700: #b91c1c;

/* Info - helpful notes */
--color-info-50:  #eff6ff;
--color-info-500: #3b82f6;
--color-info-600: #2563eb;
```

### Border Colors

```css
--color-border-primary:   #e2e8f0;   /* Default borders - slate-200 */
--color-border-secondary: #f1f5f9;   /* Subtle borders - slate-100 */
--color-border-focus:     #3b6fd9;   /* Focus rings - primary-500 */
```

### Color Application Rules

1. **Primary blue** = trust, authority, links, secondary buttons
2. **Accent orange** = primary CTAs ONLY (call, book, submit)
3. **Emergency red** = 24/7 messaging, urgent repairs ONLY
4. **Never use orange decoratively** - it's the "act now" signal
5. **Dark sections** use inverse colors for contrast sections
6. **Warm surfaces** for testimonials, trust content

---

## 5. Spacing System

### Base Unit: 4px

All spacing derived from 4px base for consistent rhythm.

```css
--space-0:  0;          /* 0px */
--space-1:  0.25rem;    /* 4px */
--space-2:  0.5rem;     /* 8px */
--space-3:  0.75rem;    /* 12px */
--space-4:  1rem;       /* 16px */
--space-5:  1.25rem;    /* 20px */
--space-6:  1.5rem;     /* 24px */
--space-7:  1.75rem;    /* 28px */
--space-8:  2rem;       /* 32px */
--space-10: 2.5rem;     /* 40px */
--space-12: 3rem;       /* 48px */
--space-14: 3.5rem;     /* 56px */
--space-16: 4rem;       /* 64px */
--space-20: 5rem;       /* 80px */
--space-24: 6rem;       /* 96px */
--space-28: 7rem;       /* 112px */
--space-32: 8rem;       /* 128px */
```

### Section Spacing

Generous vertical rhythm between sections creates breathing room and clear separation.

```css
/* Section padding (top/bottom) */
--section-padding-sm: 3rem;    /* 48px - compact sections */
--section-padding-md: 5rem;    /* 80px - default sections */
--section-padding-lg: 7rem;    /* 112px - hero, major sections */

/* Mobile reduction */
@media (max-width: 768px) {
  --section-padding-sm: 2rem;   /* 32px */
  --section-padding-md: 3rem;   /* 48px */
  --section-padding-lg: 4rem;   /* 64px */
}
```

### Container Widths

```css
--container-sm:  640px;    /* Narrow content (blog post body) */
--container-md:  768px;    /* Medium content */
--container-lg:  1024px;   /* Standard content */
--container-xl:  1280px;   /* Default max-width */
--container-2xl: 1440px;   /* Wide layouts */
--container-full: 100%;    /* Edge-to-edge */
```

### Component Spacing Guidelines

| Element | Internal Padding | External Margin |
|---------|-----------------|-----------------|
| Button (sm) | 8px 16px | - |
| Button (md) | 12px 24px | - |
| Button (lg) | 16px 32px | - |
| Card | 24px | 16px gap in grids |
| Section Header | - | 48px bottom |
| Form field | 12px 16px | 16px bottom |
| List items | 8px 0 | - |

---

## 6. Effects & Motion

### Border Radius

Slightly rounded corners feel approachable without being childish.

```css
--radius-none: 0;
--radius-sm:   4px;     /* Subtle rounding */
--radius-md:   8px;     /* Default - buttons, inputs */
--radius-lg:   12px;    /* Cards, containers */
--radius-xl:   16px;    /* Large cards, modals */
--radius-2xl:  24px;    /* Feature cards */
--radius-full: 9999px;  /* Pills, avatars */
```

### Shadows

Warm-tinted shadows feel more natural and less digital.

```css
/* Each shadow has slight warm tint via rgba color */
--shadow-sm:
  0 1px 2px 0 rgba(15, 23, 42, 0.04),
  0 1px 3px 0 rgba(15, 23, 42, 0.06);

--shadow-md:
  0 4px 6px -1px rgba(15, 23, 42, 0.06),
  0 2px 4px -2px rgba(15, 23, 42, 0.06);

--shadow-lg:
  0 10px 15px -3px rgba(15, 23, 42, 0.08),
  0 4px 6px -4px rgba(15, 23, 42, 0.04);

--shadow-xl:
  0 20px 25px -5px rgba(15, 23, 42, 0.08),
  0 8px 10px -6px rgba(15, 23, 42, 0.04);

--shadow-2xl:
  0 25px 50px -12px rgba(15, 23, 42, 0.16);

--shadow-inner:
  inset 0 2px 4px 0 rgba(15, 23, 42, 0.04);

/* CTA buttons get a colored shadow for depth */
--shadow-cta:
  0 4px 14px 0 rgba(234, 88, 12, 0.35);

--shadow-cta-hover:
  0 6px 20px 0 rgba(234, 88, 12, 0.45);
```

### Transitions

Snappy but smooth. Never sluggish.

```css
--duration-instant: 75ms;   /* Micro-interactions */
--duration-fast:    150ms;  /* Hover states */
--duration-normal:  200ms;  /* Standard transitions */
--duration-slow:    300ms;  /* Complex animations */
--duration-slower:  500ms;  /* Page-level motion */

/* Easings */
--ease-default:  cubic-bezier(0.4, 0, 0.2, 1);    /* General purpose */
--ease-in:       cubic-bezier(0.4, 0, 1, 1);       /* Accelerate out */
--ease-out:      cubic-bezier(0, 0, 0.2, 1);       /* Decelerate in */
--ease-in-out:   cubic-bezier(0.4, 0, 0.2, 1);     /* Smooth both */
--ease-bounce:   cubic-bezier(0.68, -0.15, 0.265, 1.25);  /* Slight bounce */
--ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);       /* Springy */
```

### Animation Patterns

**Page Load Sequence** (staggered reveal)
```css
.animate-fade-up {
  animation: fadeUp 0.5s var(--ease-out) forwards;
  opacity: 0;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Stagger children */
.stagger-children > * {
  animation-delay: calc(var(--stagger-index, 0) * 100ms);
}
```

**Button Hover**
```css
.btn-primary {
  transition:
    transform var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out),
    background-color var(--duration-fast) var(--ease-out);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-cta-hover);
}

.btn-primary:active {
  transform: translateY(0);
}
```

**Card Hover**
```css
.card-interactive {
  transition:
    transform var(--duration-normal) var(--ease-out),
    box-shadow var(--duration-normal) var(--ease-out);
}

.card-interactive:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

### Motion Guidelines

1. **Hero section** - Staggered fade-up on load (headline → subhead → CTAs → trust badges)
2. **Cards** - Subtle lift on hover, never bounce excessively
3. **Buttons** - Quick transform + shadow change, never scale
4. **Accordions** - CSS grid-based smooth expand (no janky height transitions)
5. **Mobile menu** - Slide from right with backdrop fade
6. **Page transitions** - Keep instant, no elaborate route transitions
7. **Scroll animations** - Subtle fade-up for sections entering viewport (Intersection Observer)

---

## 7. Component Patterns

### Button Hierarchy

| Priority | Variant | Use Case |
|----------|---------|----------|
| 1 (Highest) | `emergency` | 24/7 call buttons, urgent repairs |
| 2 | `primary` | Main CTAs - Call Now, Book Online |
| 3 | `secondary` | Supporting actions |
| 4 | `outline` | Alternative primary on dark backgrounds |
| 5 | `ghost` | Tertiary actions, "Learn more" |
| 6 (Lowest) | `link` | Inline text links |

### Card Variants

| Variant | Background | Border | Shadow | Use |
|---------|------------|--------|--------|-----|
| `default` | white | border-primary | shadow-sm | Standard cards |
| `elevated` | white | none | shadow-md | Featured content |
| `outlined` | transparent | border-primary | none | Minimal cards |
| `ghost` | surface-secondary | none | none | Subtle groupings |

### Section Backgrounds

| Variant | Background | Text | Border | Use |
|---------|------------|------|--------|-----|
| `default` | white | primary | none | Standard |
| `muted` | surface-secondary | primary | none | Alternate rhythm |
| `warm` | surface-warm | primary | none | Trust/testimonial |
| `primary` | primary-600 | inverse | none | CTA sections |
| `dark` | surface-inverse | inverse | none | Footer, contrast |
| `gradient` | Custom | varies | none | Hero sections |

### Trust Signal Patterns

**Trust Strip** (horizontal bar)
- 4-5 badges in a row
- Icons + short labels
- Muted styling (doesn't compete with CTAs)
- Example: "30+ Years" | "4.9 Google" | "TSSA Licensed" | "24/7 Service"

**Trust Badge Grid** (detailed)
- 2x2 or 2x3 grid of cards
- Icon + title + description
- Used for "Why Choose Us" sections

**Review Highlight**
- Featured testimonial with photo
- Star rating prominent
- Source badge (Google, etc.)
- Location indicator for local proof

---

## 8. Responsive Strategy

### Breakpoints

```css
/* Mobile first approach */
--breakpoint-sm:  640px;   /* Small tablets */
--breakpoint-md:  768px;   /* Tablets */
--breakpoint-lg:  1024px;  /* Desktop */
--breakpoint-xl:  1280px;  /* Large desktop */
--breakpoint-2xl: 1536px;  /* Extra large */
```

### Layout Shifts

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Navigation | Hamburger | Hamburger | Full nav |
| Hero | Stacked, centered | Stacked | Two-column |
| Service grid | 1 col | 2 col | 3-4 col |
| Footer | Stacked | 2 col | 4 col |
| Card grids | 1 col | 2 col | 3-4 col |
| Process steps | Vertical | Vertical | Horizontal |

### Mobile-Specific Rules

1. **Phone number** always visible in sticky header
2. **Floating CTA** appears at bottom on mobile
3. **Touch targets** minimum 44x44px
4. **Font sizes** don't go below 16px for body
5. **Tap, don't hover** - no hover-dependent reveals
6. **Horizontal scroll** eliminated everywhere

---

## 9. Accessibility Commitments

### Color Contrast

- All text meets WCAG 2.1 AA (4.5:1 for body, 3:1 for large text)
- Interactive elements have 3:1 contrast minimum
- Focus states visible with 3:1 contrast against background

### Focus States

```css
:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

/* Remove default focus for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}
```

### Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Semantic Structure

- Proper heading hierarchy (h1 → h2 → h3, no skips)
- Skip links for main content
- Landmark regions (header, nav, main, footer)
- Descriptive link text (no "click here")
- Alt text for all images

---

## 10. Image Guidelines

### Photography Style

**DO:**
- Real B.A.P technicians at work
- Actual completed installations
- Local Ontario imagery (recognizable neighborhoods)
- Diverse homeowners (families, seniors, young couples)
- Clean, well-lit equipment shots
- Before/after comparisons

**DON'T:**
- Generic stock photos of models
- Overly staged perfection
- Cold, corporate imagery
- Low-quality phone photos
- Cluttered job site chaos

### Image Treatments

**Hero images**: Full-bleed with gradient overlay
```css
/* Overlay for text legibility */
background: linear-gradient(
  135deg,
  rgba(15, 23, 42, 0.85) 0%,
  rgba(15, 23, 42, 0.4) 100%
);
```

**Service images**: Rounded corners, subtle shadow
```css
border-radius: var(--radius-lg);
box-shadow: var(--shadow-md);
```

**Team photos**: Circular crop with border
```css
border-radius: var(--radius-full);
border: 4px solid var(--color-primary-100);
```

### Aspect Ratios

| Use Case | Ratio | Example |
|----------|-------|---------|
| Hero | 16:9 or 2:1 | Homepage hero |
| Cards | 3:2 | Service cards |
| Thumbnails | 1:1 | Team avatars |
| Gallery | 4:3 | Project photos |
| Blog | 16:9 | Featured images |

---

## 11. Icon System

Using the existing `src/lib/icons.ts` SVG paths with consistent styling.

### Icon Sizes

```css
--icon-xs: 12px;
--icon-sm: 16px;
--icon-md: 20px;
--icon-lg: 24px;
--icon-xl: 32px;
--icon-2xl: 48px;
```

### Icon Styling

```css
.icon {
  flex-shrink: 0;
  width: var(--icon-size, 20px);
  height: var(--icon-size, 20px);
  color: currentColor; /* Inherits text color */
}
```

### Icon Categories in Use

- **Navigation**: menu, close, chevron, arrow
- **Services**: heating, cooling, water, air-quality, tools
- **Trust**: star, shield, certificate, clock, check
- **Contact**: phone, email, location, calendar
- **Social**: facebook, google, instagram
- **UI**: plus, minus, search, filter

---

## 12. Z-Index Scale

Predictable stacking context.

```css
--z-base:           0;
--z-dropdown:       10;
--z-sticky:         20;
--z-fixed:          30;
--z-modal-backdrop: 40;
--z-modal:          50;
--z-popover:        60;
--z-tooltip:        70;
--z-toast:          80;
--z-max:            9999;
```

---

## 13. Implementation Notes

### Font Loading

Use `font-display: swap` for web fonts to prevent FOIT (Flash of Invisible Text).

```html
<!-- Preconnect to Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Load fonts with display=swap -->
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Source+Sans+3:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### CSS Architecture

1. **tokens.css** - All custom properties (single source of truth)
2. **global.css** - Imports tokens, Tailwind, base styles, utilities
3. **tailwind.config.ts** - Maps tokens to Tailwind utilities
4. **Components** - Use Tailwind classes, reference tokens via `var()`

### No Hardcoded Values

Every color, spacing, font, shadow, etc. must use tokens:

```css
/* CORRECT */
color: var(--color-primary-600);
padding: var(--space-4);
font-family: var(--font-family-heading);

/* WRONG */
color: #2451b3;
padding: 16px;
font-family: 'Plus Jakarta Sans', sans-serif;
```

---

## 14. Quick Reference

### CTA Decision Tree

```
Is it emergency/24-7?
  → Yes → variant="emergency" (red)
  → No → Is it the primary action?
           → Yes → variant="primary" (orange)
           → No → Is it important secondary?
                   → Yes → variant="secondary" (blue/outline)
                   → No → variant="ghost" or "link"
```

### Section Rhythm

```
Homepage:
default → muted → primary → default → muted → dark → default → gradient

Service Page:
gradient (hero) → default → muted → default → warm → muted → default → primary

Location Page:
primary (hero) → default → muted → default → primary
```

### The Phone Number Rule

The phone number appears:
1. Top bar (always visible)
2. Header (desktop nav)
3. Mobile menu (prominent)
4. Hero section CTA
5. Every CTA section
6. Floating mobile CTA
7. Footer (multiple times)
8. Exit intent modal

---

*Document Version 1.0*
*Last Updated: January 2026*
