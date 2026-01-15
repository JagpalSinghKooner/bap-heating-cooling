import { defineCollection, z } from 'astro:content';

// ============================================
// SHARED SCHEMAS (DRY - reused across collections)
// ============================================

// Workflow status enum - used across all content collections
const workflowStatusEnum = z.enum([
  'draft',
  'internal_review',
  'seo_review',
  'approved',
  'published',
  'archived'
]).default('draft');

// Problem/pain point schema - for agitation sections
const problemSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string(), // warning, alert, moisture, temperature, cost, etc.
});

// Process step schema - for "how it works" sections
const processStepSchema = z.object({
  step: z.number(),
  title: z.string(),
  description: z.string(),
});

// Approach/solution schema - positions B.A.P as the answer
const approachSchema = z.object({
  headline: z.string(),
  description: z.string(),
  quote: z.string().optional(),
  quotePerson: z.string().optional(),
});

// Inclusions schema - "what's included" breakdown
const inclusionsSchema = z.object({
  equipment: z.array(z.string()),
  labour: z.array(z.string()),
  warranty: z.array(z.string()),
  extras: z.array(z.string()),
});

// Savings schema - value/investment info (NO prices)
const savingsSchema = z.object({
  headline: z.string(),
  description: z.string(),
  bullets: z.array(z.string()),
  rebateInfo: z.string().optional(),
  financingNote: z.string().optional(),
});

// Guarantee schema - risk reversal items
const guaranteeSchema = z.object({
  items: z.array(z.object({
    title: z.string(),
    description: z.string(),
  })),
});

// Image schema - for galleries
const imageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
});

// Local proof schema - city-specific testimonials
const localProofSchema = z.object({
  testimonial: z.string(),
  customerName: z.string(),
  customerLocation: z.string(),
  result: z.string().optional(),
});

// ============================================
// COLLECTIONS
// ============================================

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['heating', 'cooling', 'iaq', 'water-heating', 'commercial', 'plans']),
    status: z.enum(['live', 'planned']).default('live'),
    featured: z.boolean().default(false),
    priority: z.boolean().default(false), // Money page prioritization
    order: z.number().default(0),
    // Service type for hero/CTA differentiation
    serviceType: z.enum(['installation', 'repair', 'maintenance']).default('installation'),
    // Service-specific value propositions (USPs) - unique per service for SEO
    valueProps: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string(), // Semantic icon name matching content (e.g., 'price-tag', 'warranty', 'response-time')
    })).optional(),

    // ========== FULL FUNNEL FIELDS ==========
    // Problem agitation - consequences of delay
    problems: z.array(problemSchema).optional(),
    // Our approach/solution positioning
    approach: approachSchema.optional(),
    // Step-by-step process
    processSteps: z.array(processStepSchema).optional(),
    // What's included breakdown
    inclusions: inclusionsSchema.optional(),
    // Savings/investment info (NO prices)
    savings: savingsSchema.optional(),
    // Risk reversal guarantees
    guarantee: guaranteeSchema.optional(),
    // Work images/gallery
    images: z.array(imageSchema).optional(),

    // SEO fields
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    robots: z.string().optional(),
    // Workflow fields
    workflowStatus: workflowStatusEnum,
    reviewedBy: z.string().optional(),
    reviewedDate: z.string().optional(), // ISO date string
    approvedBy: z.string().optional(),
    approvedDate: z.string().optional(), // ISO date string
  }),
});

const locations = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    region: z.string(),
    province: z.string().default('ON'),
    address: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    serviceArea: z.array(z.string()).optional(),
    // SEO fields
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    robots: z.string().optional(),
    // Workflow fields
    workflowStatus: workflowStatusEnum,
    reviewedBy: z.string().optional(),
    reviewedDate: z.string().optional(), // ISO date string
    approvedBy: z.string().optional(),
    approvedDate: z.string().optional(), // ISO date string
  }),
});

const regions = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    primaryCity: z.string(), // Reference to a location slug
    cities: z.array(z.string()), // Array of location slugs
    // SEO fields
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    robots: z.string().optional(),
    // Workflow fields
    workflowStatus: workflowStatusEnum,
    reviewedBy: z.string().optional(),
    reviewedDate: z.string().optional(), // ISO date string
    approvedBy: z.string().optional(),
    approvedDate: z.string().optional(), // ISO date string
  }),
});

const business = defineCollection({
  type: 'data',
  schema: z.object({
    business: z.object({
      legal_name: z.string(),
      trading_name: z.string().nullable(),
      established_year: z.number(),
      owner_public: z.object({
        name: z.string(),
        roles: z.array(z.string()),
      }),
      tone: z.object({
        style: z.string(),
        language: z.string(),
        avoid_words: z.array(z.string()),
        seo_note: z.string(),
      }),
    }),
    contact: z.object({
      phone_display: z.string(),
      phone_e164: z.string(),
      email: z.string(),
      primary_cta: z.object({
        short: z.string(),
        long: z.string(),
      }),
      booking: z.object({
        enabled: z.boolean(),
        provider: z.string(),
        url: z.string(),
      }),
    }),
    hours: z.object({
      business_hours: z.string(),
      emergency_service: z.boolean(),
      phone_answered_24_7: z.boolean(),
      target_response_time_minutes: z.number(),
      response_time_statement: z.string(),
    }),
    locations: z.object({
      primary: z.object({
        name: z.string(),
        address_full: z.string(),
        city: z.string(),
        province: z.string(),
        postal_code: z.string(),
        country: z.string(),
        phone_e164: z.string(),
        email: z.string(),
        google_maps_embed: z.string().optional(),
      }),
      secondary: z.object({
        name: z.string(),
        address_full: z.string(),
        city: z.string(),
        province: z.string(),
        postal_code: z.string(),
        country: z.string(),
        phone_e164: z.string(),
        email: z.string(),
        google_maps_embed: z.string().optional(),
      }),
    }),
    coverage: z.object({
      service_model: z.string(),
      exclusions: z.array(z.string()),
      regions_enabled: z.boolean(),
      regions: z.array(z.object({
        name: z.string(),
        locations: z.array(z.object({
          name: z.string(),
          slug: z.string(),
        })),
      })),
    }),
    services: z.object({
      notes: z.array(z.string()).optional(),
      navbar_categories: z.array(z.object({
        name: z.string(),
        key: z.string(),
      })),
      list: z.object({
        heating: z.array(z.object({ title: z.string(), slug: z.string() })).optional(),
        cooling: z.array(z.object({ title: z.string(), slug: z.string() })).optional(),
        iaq: z.array(z.object({ title: z.string(), slug: z.string() })).optional(),
        water_heating: z.array(z.object({ title: z.string(), slug: z.string() })).optional(),
        commercial: z.array(z.object({ title: z.string(), slug: z.string() })).optional(),
        plans: z.array(z.object({ title: z.string(), slug: z.string() })).optional(),
      }).optional(),
    }),
    brands_and_capability: z.object({
      install_brands: z.string(),
      service_brands: z.string(),
      certifications_statement: z.string(),
      rooftop_units_industries: z.string(),
      project_types: z.string(),
    }).optional(),
    trust_and_compliance: z.object({
      licenses: z.object({
        note: z.string(),
        tssa: z.object({
          numbers: z.array(z.string()),
        }),
        other: z.array(z.string()),
      }),
      wsib: z.boolean(),
      insured_statement: z.string(),
    }).optional(),
    pricing_and_offers: z.object({
      estimates_free: z.boolean(),
      diagnostic_free: z.boolean(),
      financing: z.object({
        available: z.boolean(),
        statement: z.string(),
      }),
      rebates: z.object({
        paperwork_supported: z.boolean(),
        statement: z.string(),
      }),
    }).optional(),
    warranty_and_guarantees: z.object({
      warranty_statement: z.string(),
      guarantee_primary: z.object({
        title: z.string(),
        copy: z.string(),
      }),
      guarantee_secondary: z.object({
        title: z.string(),
        copy: z.string(),
      }),
      transparency_policy: z.boolean(),
    }).optional(),
    reputation: z.object({
      google_rating: z.number(),
      google_review_count: z.number(),
      review_statement: z.string(),
      live_reviews: z.object({
        enabled: z.boolean(),
        note: z.string(),
      }).optional(),
    }),
    social: z.object({
      instagram: z.string(),
      facebook: z.string(),
    }),
    warranty: z.object({
      parts_and_labour_years: z.number(),
      statement: z.string(),
    }),
    seo_url_rules: z.object({
      combined_pages: z.object({
        suffix: z.string(),
        example: z.string(),
        rule: z.string(),
      }),
    }),
    copy_blocks: z.object({
      short_description: z.string(),
      long_description: z.string(),
      primary_cta_copy: z.string(),
      secondary_cta_copy: z.string(),
      trust_highlights: z.array(z.string()),
      about_us_owner_mention: z.string(),
      service_in_city_intro_template: z.string(),
      locations_page_intro: z.string(),
      services_page_intro: z.string(),
    }).optional(),
  }),
});

const faqs = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    answer: z.string(), // Short answer; full content in body
    scopes: z.array(z.string()), // Scope strings: global, service:{slug}, location:{slug}, region:{slug}, service-city:{serviceSlug}:{locationSlug}
    priority: z.number().default(0),
    status: z.enum(['draft', 'live']).default('live'),
    // Workflow fields
    workflowStatus: workflowStatusEnum,
    reviewedBy: z.string().optional(),
    reviewedDate: z.string().optional(), // ISO date string
    approvedBy: z.string().optional(),
    approvedDate: z.string().optional(), // ISO date string
  }),
});

const reviews = defineCollection({
  type: 'data',
  schema: z.object({
    source: z.enum(['google', 'facebook', 'housecallpro', 'manual']),
    verified: z.boolean().default(false),
    authorName: z.string(),
    rating: z.number().min(1).max(5),
    text: z.string(),
    reviewDate: z.string().optional(), // ISO date string, optional for placeholder; required for verified
    locationSlug: z.string().optional(), // For GBP/location association
    serviceSlug: z.string().optional(), // Service association
    citySlug: z.string().optional(), // Service-city association
    url: z.string().optional(), // Review permalink — required for verified if available
    providerPlaceUrl: z.string().optional(), // Google maps place URL for GBP
    status: z.enum(['draft', 'live']).default('live'),
    priority: z.number().default(0),
    // Workflow fields
    workflowStatus: workflowStatusEnum,
    reviewedBy: z.string().optional(),
    reviewedDate: z.string().optional(), // ISO date string
    approvedBy: z.string().optional(),
    approvedDate: z.string().optional(), // ISO date string
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    modifiedDate: z.date().optional(),
    author: z.string().default('Paul Palmer'),
    category: z.enum(['heating', 'cooling', 'maintenance', 'efficiency', 'news', 'guides']),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    robots: z.string().optional(),
    // Workflow fields
    workflowStatus: workflowStatusEnum,
    reviewedBy: z.string().optional(),
    reviewedDate: z.string().optional(), // ISO date string
    approvedBy: z.string().optional(),
    approvedDate: z.string().optional(), // ISO date string
  }),
});

const seasonalMessages = defineCollection({
  type: 'content',
  schema: z.object({
    season: z.enum(['winter', 'spring', 'summer', 'fall']),
    startDate: z.string(), // MM-DD format
    endDate: z.string(), // MM-DD format
    message: z.string(),
    icon: z.enum(['snowflake', 'sun', 'flame', 'leaf']).optional(),
    enabled: z.boolean().default(true),
    // Service categories this message applies to (empty = show on all pages)
    categories: z.array(z.enum(['heating', 'cooling', 'iaq', 'water-heating', 'commercial', 'plans'])).optional(),
  }),
});

// ============================================
// SERVICE-CITY COLLECTION (NEW)
// For 550 city-specific service pages with unique local SEO content
// URL format: /services/[service]-[city]-on/
// ============================================
const serviceCity = defineCollection({
  type: 'content',
  schema: z.object({
    // Identity (required) - used to link to base service and location
    serviceSlug: z.string(),
    locationSlug: z.string(),

    // Page title and SEO (required)
    title: z.string(), // "[Service] in [City], ON"
    seoTitle: z.string(), // Max 60 chars with keywords
    seoDescription: z.string(), // Max 160 chars

    // City-specific local context (required) - 100+ words unique content
    localContext: z.string().min(400), // Minimum 400 chars (~100 words)

    // City-specific social proof (required)
    localProof: localProofSchema,

    // Optional overrides - only include if different from base service
    problems: z.array(problemSchema).optional(),
    processSteps: z.array(processStepSchema).optional(),
    savings: savingsSchema.optional(),
    inclusions: inclusionsSchema.optional(),

    // Workflow fields
    workflowStatus: workflowStatusEnum,
    reviewedBy: z.string().optional(),
    reviewedDate: z.string().optional(),
    approvedBy: z.string().optional(),
    approvedDate: z.string().optional(),
  }),
});

// ============================================
// CASE STUDIES COLLECTION
// Before/after transformation stories for social proof
// ============================================
const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    // Identity
    title: z.string(),
    serviceSlug: z.string(), // Links to service type
    locationSlug: z.string().optional(), // Optional city association

    // The transformation story
    problem: z.object({
      headline: z.string(),
      description: z.string(),
      details: z.array(z.string()).optional(),
    }),
    solution: z.object({
      headline: z.string(),
      description: z.string(),
      equipment: z.string().optional(), // e.g., "Lennox SL280V Variable-Speed Furnace"
    }),
    results: z.object({
      headline: z.string(),
      stats: z.array(z.object({
        value: z.string(),
        label: z.string(),
      })),
    }),

    // Customer quote
    testimonial: z.object({
      text: z.string(),
      authorName: z.string(),
      location: z.string(),
    }),

    // Images (optional - placeholder icons used if not provided)
    beforeImage: z.string().optional(),
    afterImage: z.string().optional(),

    // Display
    featured: z.boolean().default(false),
    priority: z.number().default(0),
    status: z.enum(['draft', 'live']).default('live'),

    // Workflow fields
    workflowStatus: workflowStatusEnum,
    reviewedBy: z.string().optional(),
    reviewedDate: z.string().optional(),
    approvedBy: z.string().optional(),
    approvedDate: z.string().optional(),
  }),
});

export const collections = {
  services,
  locations,
  regions,
  business,
  faqs,
  reviews,
  blog,
  'seasonal-messages': seasonalMessages,
  'service-city': serviceCity,
  'case-studies': caseStudies,
};
