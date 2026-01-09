# B.A.P Heating and Cooling - Astro Website

High-performance, future-proof Astro website with a fully customizable UI system, ready to support a headless CMS.

## Tech Stack

- **Astro 5.16.7** - Static site generator
- **TypeScript** - Type safety
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **PostCSS & Autoprefixer** - CSS processing
- **ESLint** - Code linting
- **pnpm** - Package manager

## Project Structure

```
/
├── public/              # Static assets
│   └── favicon.svg
├── src/
│   ├── content/        # Content collections (CMS-ready)
│   │   ├── config.ts   # Collection schemas
│   │   ├── services/   # Service content
│   │   │   ├── installation.md
│   │   │   ├── repair.md
│   │   │   └── maintenance.md
│   │   └── locations/  # Location content
│   │       ├── downtown.md
│   │       └── suburbs.md
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/          # Routes
│   │   ├── index.astro
│   │   ├── about-us.astro
│   │   ├── services.astro
│   │   ├── locations.astro
│   │   └── contact-us.astro
│   └── styles/
│       ├── global.css  # Global styles
│       └── tokens.css  # Design system tokens
├── astro.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Design System

The project uses a **token-based design system** inspired by shadcn, but framework-agnostic:

- **CSS Variables** for colors, radius, and shadows defined in `src/styles/tokens.css`
- **Tailwind Configuration** maps to CSS variables in `tailwind.config.ts`
- **Dark Mode** support built-in (toggle implementation pending)
- **Fully customizable** without React dependencies

### Design Tokens

Colors use HSL values for better manipulation:
- Primary, Secondary, Accent colors
- Background, Foreground, Border colors
- Muted and Destructive variants
- Card and Popover variants

Spacing and effects:
- Border radius system (sm, md, lg)
- Shadow system (sm, md, lg, xl)

## Available Commands

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run linter
pnpm lint

# Type checking (included in build)
astro check
```

## Pages

All pages are fully static with zero client-side JavaScript:

1. **Home** (`/`) - Landing page with service highlights
2. **About Us** (`/about-us`) - Company information
3. **Services** (`/services`) - Service offerings
4. **Locations** (`/locations`) - Service areas
5. **Contact Us** (`/contact-us`) - Contact information

## Content Collections

Content is structured using Astro Content Collections for easy CMS integration:

### Services Collection
- `title` - Service name
- `description` - Brief description
- `featured` - Featured flag
- `order` - Display order
- `metaTitle`, `metaDescription` - SEO fields

### Locations Collection
- `title` - Location name
- `description` - Location description
- `address`, `phone`, `email` - Contact info
- `serviceArea` - Array of service areas
- `metaTitle`, `metaDescription` - SEO fields

## Performance

- **100% Static** - All pages pre-rendered at build time
- **Zero Client JS** - No JavaScript shipped to browser
- **Optimized CSS** - Minimal, scoped styles
- **Fast Loading** - Optimized for performance

## SEO Features

- Semantic HTML structure
- Meta descriptions and titles
- Open Graph tags
- Twitter Card tags
- Canonical URLs
- Mobile-responsive viewport

## Future Enhancements

The architecture is ready for:
- Headless CMS integration (swap markdown files for API calls)
- Dynamic service/location pages
- Contact form implementation
- Analytics integration
- Image optimization
- Advanced animations

## Development Notes

- TypeScript strict mode enabled
- ESLint configured for Astro
- No React components (pure Astro)
- CSS-first approach (no inline styles)
- Mobile-first responsive design

## CMS Migration Path

When ready to integrate a headless CMS:

1. Keep the same collection schemas in `src/content/config.ts`
2. Replace markdown files with API fetches in collection loaders
3. Templates remain unchanged - they consume the same data structure
4. Zero refactoring of page components required

This foundation is production-ready and optimized for future expansion.
