# B.A.P Heating & Cooling — Master AI Agent Rulebook

**Version:** 2.0.1
**Status:** LOCKED — This is the single source of truth for all AI agents
**Last Updated:** 2026-01-09

---

## CRITICAL NOTICE FOR ALL AI AGENTS

This README is the **NUMBER 1 SOURCE** for all content generation, component creation, and development work. Every rule in this document MUST be followed without exception.

**NO content may be created without following these rules.**
**NO pages may be generated without adhering to the defined structures.**
**NO shortcuts, bypasses, or "creative interpretations" are allowed.**

Violations will result in immediate rejection and rebuild.

---

## TABLE OF CONTENTS

1. [Project Overview](#1-project-overview)
2. [Tech Stack & Architecture](#2-tech-stack--architecture)
3. [Content Governance Rules](#3-content-governance-rules)
4. [Page Type Structures (Content Model Lock)](#4-page-type-structures-content-model-lock)
5. [Section Registry](#5-section-registry)
6. [FAQ System Contract](#6-faq-system-contract)
7. [Uniqueness Enforcement](#7-uniqueness-enforcement)
8. [Content Approval Workflow](#8-content-approval-workflow)
9. [AI Usage Rules](#9-ai-usage-rules)
10. [Brand & Language Standards](#10-brand--language-standards)
11. [SEO & Metadata Requirements](#11-seo--metadata-requirements)
12. [Internal Linking & Schema](#12-internal-linking--schema)
13. [Emergency Content Governance](#13-emergency-content-governance)
14. [Business Profile Data](#14-business-profile-data)
15. [Enforcement & Validation](#15-enforcement--validation)
16. [Quick Reference Checklists](#16-quick-reference-checklists)

---

## 1. PROJECT OVERVIEW

### Business
- **Legal Name:** `{business.legal_name}` from business profile
- **Owner:** `{business.owner_public.name}` from business profile
- **Established:** `{business.established_year}` from business profile
- **Service Model:** `{coverage.service_model}` from business profile
- **Service Area:** Wellington County, Waterloo Region, Halton Region, Peel Region, Hamilton & Brant, Dufferin County, ON

### Website Purpose
High-performance, SEO-optimized Astro website with:
- 100% static generation (zero client-side JS)
- Data-driven content architecture
- 80%+ uniqueness across all pages
- Enforceable content governance
- Future-ready for headless CMS

---

## 2. TECH STACK & ARCHITECTURE

### Core Technologies
- **Astro 5.16.7** — Static site generator
- **TypeScript** — Type safety
- **Tailwind CSS 3.4** — Utility-first CSS framework
- **PostCSS & Autoprefixer** — CSS processing
- **ESLint** — Code linting
- **pnpm** — Package manager

### Project Structure
```
/
├── src/
│   ├── content/              # Content collections (CMS-ready)
│   │   ├── config.ts         # Collection schemas with workflow fields
│   │   ├── business/         # Business profile YAML
│   │   ├── services/         # Service content (22 services)
│   │   ├── locations/        # Location pages (25 cities)
│   │   ├── regions/          # Region aggregation pages (6 regions)
│   │   ├── faqs/             # FAQ collection with scoping
│   │   ├── reviews/          # Review collection with scoping
│   │   └── blog/             # Blog articles
│   ├── lib/                  # Helper functions
│   │   ├── enforcement/      # Content validation (uniqueness, workflow, E-E-A-T)
│   │   ├── faqResolver.ts    # FAQ scoping logic
│   │   ├── reviewResolver.ts # Review scoping logic
│   │   ├── schema.ts         # JSON-LD schema generation
│   │   └── ctaResolver.ts    # CTA hierarchy logic
│   ├── components/           # Reusable Astro components
│   ├── layouts/              # Page layouts
│   ├── pages/                # Routes (dynamic + static)
│   └── styles/               # Global CSS + design tokens
├── scripts/
│   └── enforce.ts            # Pre-build enforcement runner
├── docs/                     # Governance documentation
│   ├── CONTENT_GOVERNANCE_RULES.md
│   ├── CONTENT_MODEL_LOCK.md
│   ├── CONTENT_POPULATION_RULEBOOK.md
│   ├── CONTENT_APPROVAL_WORKFLOW.md
│   ├── SECTION_REGISTRY.md
│   ├── FAQ_SYSTEM_CONTRACT.md
│   └── UNIQUENESS_ENFORCEMENT_MATRIX.md
└── package.json
```

### Key Commands
```bash
pnpm dev          # Development server
pnpm build        # Production build (runs enforcement first)
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
pnpm enforce      # Run content enforcement checks
```

---

## 3. CONTENT GOVERNANCE RULES

### Core Principles

#### 1. STRUCTURE IS IMMUTABLE
- Page structures defined in this README cannot be altered without architecture review
- Section order MUST be preserved
- Required sections CANNOT be removed
- Prohibited sections CANNOT be added

#### 2. UNIQUENESS IS MEASURED STRUCTURALLY
- 80% uniqueness is achieved through content variation, NOT structural variation
- Pages with identical structure can have 80%+ unique content through:
  - Scoped data (service, location, region fields)
  - Unique FAQ combinations
  - Unique review combinations
  - Unique related content links
  - Unique local context paragraphs

#### 3. CONTENT FOLLOWS DATA
- Content is derived from data collections, NOT hard-coded
- Data collections are the single source of truth
- Templates render data; they DON'T contain content

#### 4. AI CONTENT MUST BE CONSTRAINED
- AI-generated content MUST follow section templates
- AI content MUST NOT violate prohibited sections
- AI content MUST NOT alter internal linking logic
- AI content MUST be reviewed before deployment

### Allowed Content Sources

Content MUST ONLY be added through these approved collections:

1. **`src/content/services/`** — Service-level descriptions (22 services)
2. **`src/content/locations/`** — City-level information (25 cities)
3. **`src/content/regions/`** — Regional aggregation (6 regions)
4. **`src/content/faqs/`** — FAQ system with scoping
5. **`src/content/reviews/`** — Customer testimonials with scoping
6. **`src/content/blog/`** — Editorial content

### Explicitly Forbidden Content Locations

Content MUST NOT be added in:
- ❌ Inline content within `.astro` template files
- ❌ Markdown files outside approved collections
- ❌ Hardcoded copy in components
- ❌ JavaScript/TypeScript files as content strings
- ❌ Layout files
- ❌ Page files (except dynamic routing logic)

**Violation = Immediate rejection**

---

## 4. PAGE TYPE STRUCTURES (CONTENT MODEL LOCK)

### 1. HOMEPAGE (`/`)

**Purpose:** Primary conversion hub

**Required Sections (Ordered):**
1. `hero` — Primary CTA and value proposition
2. `services_overview` — Featured services grid (6-8 services)
3. `trust_signals` — Certifications, licenses, insurance, WSIB
4. `service_areas` — Geographic coverage map/list
5. `reviews_carousel` — Verified reviews (5-10 displayed)
6. `emergency_cta` — 24/7 availability messaging
7. `financing_teaser` — Financing options preview
8. `faqs` — Homepage-scoped FAQs (3-5 questions)
9. `cta_footer` — Primary CTA reinforcement

**Data Sources:**
- `business_profile` → hero, trust_signals, emergency_cta, financing_teaser
- `service_collection` → services_overview (filter: featured=true OR priority=true)
- `reviews_collection` → reviews_carousel (filter: verified=true, sort: rating DESC)
- `region_collection` → service_areas
- `faq_collection` → faqs (filter: scopes contains 'global')

---

### 2. SERVICE PAGE (`/services/{service-slug}`)

**Purpose:** Authoritative resource for specific HVAC service

**Required Sections (Ordered):**
1. `hero` — Service name, category, primary CTA
2. `service_description` — Service overview (2-4 paragraphs)
3. `service_details` — Key benefits, process overview, feature list
4. `service_areas` — Cities/regions where service is offered
5. `related_services` — 3-5 related services from same category
6. `reviews` — Service-specific reviews (3-5 displayed)
7. `faqs` — Service-scoped FAQs (4-6 questions)
8. `cta_conversion` — Book now / Get quote CTA

**Optional Sections:**
- `pricing_guidance` — Ballpark pricing or cost factors
- `brands_supported` — For equipment-specific services
- `warranty_info` — Service-specific warranties
- `emergency_notice` — If service has 24/7 availability

**Prohibited Sections:**
- ❌ Location-specific addresses or phone numbers
- ❌ Unrelated service promotions
- ❌ Generic company history (link to About instead)

**Data Sources:**
- `service_collection` → hero, service_description, service_details
- `business_profile` → service_areas, cta_conversion
- `reviews_collection` → reviews (filter: serviceSlug=current_service_slug)
- `faq_collection` → faqs (filter: scopes contains 'service:{slug}')

**Uniqueness Driver:** Service slug + service-specific content fields (description, details, pricing_guidance)

**Minimum Uniqueness:** 90% vs other service pages

---

### 3. LOCATION PAGE (`/locations/{city-slug}`)

**Purpose:** Establish geographic authority for a city/town

**Required Sections (Ordered):**
1. `hero` — City name, region context, primary CTA
2. `location_overview` — City description, service area coverage
3. `services_in_location` — All services available (grouped by category)
4. `region_context` — Parent region info and nearby cities
5. `local_trust_signals` — Response time, local presence
6. `reviews` — Location-specific reviews (5-8 displayed)
7. `faqs` — Location-scoped FAQs (3-5 questions)
8. `cta_conversion` — Localized CTA

**Optional Sections:**
- `service_area_map` — Visual map showing coverage
- `local_landmarks` — Geographic context (not promotional)
- `nearby_locations` — Other cities served in region

**Prohibited Sections:**
- ❌ Service deep-dives (link to service pages)
- ❌ Pricing information
- ❌ Multiple region mentions in hero

**Data Sources:**
- `location_collection` → hero, location_overview, local_trust_signals
- `region_collection` → region_context, nearby_locations
- `service_collection` + `location_collection` → services_in_location
- `reviews_collection` → reviews (filter: locationSlug=current_location_slug)
- `faq_collection` → faqs (filter: scopes contains 'location:{slug}')

**Uniqueness Driver:** Location slug + location-specific content (overview, serviceArea, region context)

**Minimum Uniqueness:** 75% vs other location pages

---

### 4. REGION PAGE (`/locations/regions/{region-slug}`)

**Purpose:** Establish authority for multi-city region

**Required Sections (Ordered):**
1. `hero` — Region name, primary city, coverage overview
2. `region_overview` — Region description, total cities served
3. `cities_in_region` — All cities/locations (list + grid)
4. `services_overview` — All services available (categorized)
5. `regional_trust_signals` — Coverage stats, response times
6. `reviews` — Region-wide reviews (6-10 displayed)
7. `faqs` — Region-scoped FAQs (3-5 questions)
8. `cta_conversion` — Regional CTA

**Optional Sections:**
- `region_map` — Visual map of cities served
- `regional_highlights` — Unique regional considerations

**Prohibited Sections:**
- ❌ Individual city deep-dives
- ❌ Service-specific content
- ❌ Pricing information

**Data Sources:**
- `region_collection` → hero, region_overview, regional_trust_signals
- `location_collection` → cities_in_region
- `service_collection` → services_overview
- `reviews_collection` → reviews (filter: locations in current region)
- `faq_collection` → faqs (filter: scopes contains 'region:{slug}')

**Uniqueness Driver:** Region slug + cities list + region-specific content

**Minimum Uniqueness:** 75% vs other region pages

---

### 5. BLOG ARTICLE (`/blog/{slug}`)

**Purpose:** Establish topical authority, drive organic traffic

**Required Sections (Ordered):**
1. `hero` — Article title, publish date, author, category
2. `article_intro` — Problem statement, article overview
3. `article_body` — Structured content (H2/H3 sections)
4. `article_conclusion` — Summary, key takeaways
5. `related_services` — Services related to topic (2-3)
6. `related_articles` — Other posts in category (3-4)
7. `author_bio` — Author credentials and expertise
8. `cta_conversion` — Related service CTA

**Optional Sections:**
- `table_of_contents` — For articles >1500 words
- `faqs` — Article-specific FAQs embedded
- `image_gallery` — For visual how-to guides

**Prohibited Sections:**
- ❌ Service pricing
- ❌ Location-specific information
- ❌ Promotional offers in article body

**Data Sources:**
- `blog_collection` → hero, article_intro, article_body, article_conclusion, author_bio
- `service_collection` → related_services
- `blog_collection` → related_articles

**Uniqueness Driver:** Article slug + unique article content

**Minimum Uniqueness:** 95% vs other blog articles

---

## 5. SECTION REGISTRY

### Hero Sections
- **`hero`** — Required on ALL page types. Page-specific title, CTA, context. Contributes to uniqueness.

### Content Sections
- **`service_description`** — Service overview (Service, Service-City pages)
- **`service_details`** — Features, benefits, process (Service, Service-City pages)
- **`location_overview`** — City description, coverage (Location pages)
- **`local_context`** — City-specific context (Service-City pages) — **REQUIRED for uniqueness**
- **`region_overview`** — Region description (Region pages)
- **`article_body`** — Blog content (Blog pages)

### Service & Navigation Sections
- **`services_overview`** — Featured services grid (Homepage, Region pages)
- **`services_in_location`** — All services in city (Location pages)
- **`related_services`** — 3-5 related services (Service, Blog pages)
- **`related_services_in_city`** — Related services in city (Service-City pages)
- **`other_locations_for_service`** — Service in nearby cities (Service-City pages)

### Location & Geographic Sections
- **`service_areas`** — Service area overview (Homepage, Service, About pages)
- **`location_details`** — City-specific details (Service-City pages)
- **`cities_in_region`** — All cities in region (Region pages)
- **`region_context`** — Parent region info (Location pages)
- **`nearby_locations`** — Other cities in region (Location pages)

### Trust & Credibility Sections
- **`trust_signals`** — Certifications, licenses, insurance (Homepage, Service, About pages)
- **`local_trust_signals`** — Response time, local presence (Location pages)
- **`regional_trust_signals`** — Regional coverage stats (Region pages)
- **`credentials`** — Licenses & credentials (About page)

### Reviews & Social Proof Sections
- **`reviews`** — Customer reviews (Service, Service-City, Location, Region pages) — **Scoped by context**
- **`reviews_carousel`** — Reviews carousel (Homepage)
- **`reviews_grid`** — All reviews (Reviews page)
- **`reviews_stats`** — Aggregate statistics (Reviews page)

### FAQ Sections
- **`faqs`** — Frequently Asked Questions — **REQUIRED on most pages, scoped by context**

### CTA & Conversion Sections
- **`cta_footer`** — Footer CTA (Homepage)
- **`cta_conversion`** — Primary conversion CTA (ALL page types)
- **`emergency_cta`** — Emergency service CTA (Homepage, Emergency page)

---

## 6. FAQ SYSTEM CONTRACT

### FAQ Schema

**Collection Location:** `src/content/faqs/*.md`

**Required Fields:**
```yaml
question: "The FAQ question text"
answer: "Short answer summary"
scopes: ["global", "service:furnace-installation", "location:guelph"]
priority: 0
status: "live"
workflowStatus: "published"
```

**Content:** Full answer in markdown body

### FAQ Scoping Rules

**Scope Syntax:**
- `global` — Applies to all pages
- `service:{slug}` — Applies to specific service (e.g., `service:furnace-installation`)
- `location:{slug}` — Applies to specific city (e.g., `location:guelph`)
- `region:{slug}` — Applies to specific region (e.g., `region:waterloo-region`)
- `service-city:{serviceSlug}:{locationSlug}` — Most specific (e.g., `service-city:furnace-installation:guelph`)

### FAQ Matching Algorithm

For a given page, an FAQ matches if at least one scope in the `scopes` array matches the page context:
1. Service scope matches (if page has service context)
2. Location scope matches (if page has location context)
3. Region scope matches (if page has region context)
4. Global scope always matches

### FAQ Prioritization (EXACT ALGORITHM)

FAQs are sorted by:
1. **Scope priority** (ascending - lower number = higher priority):
   - service-city scope = 1 (highest priority)
   - service scope = 2
   - location scope = 3
   - region scope = 4
   - global scope = 5 (lowest priority)
2. **FAQ priority field** (descending - higher number = higher priority)
3. **FAQ ID** (ascending - alphabetical, for deterministic ordering)

**Example:**
- FAQ A: scopes = ["service:furnace-repair"], priority = 10
- FAQ B: scopes = ["service:furnace-repair"], priority = 5
- FAQ C: scopes = ["global"], priority = 20

On a furnace-repair service page, order is: **A, B, C**
(Both A and B have scope priority 2, but A has higher FAQ priority 10 > 5)

### FAQ Display Limits

- **Homepage:** 3-5 FAQs (global or high-priority)
- **Service:** 4-6 FAQs (service-scoped + global)
- **Location:** 3-5 FAQs (location-scoped + global)
- **Region:** 3-5 FAQs (region-scoped + global)
- **Blog:** 0-3 FAQs (optional, topic-scoped)

### FAQ Uniqueness Requirements

- Service pages: Each service has unique service-scoped FAQs (minimum 4-6)
- Location pages: Each location has unique location-scoped FAQs (minimum 3-5)
- NO duplicate questions across inappropriate scopes
- Generic FAQs MUST NOT appear on service-city pages unless no scoped FAQs exist

---

## 7. UNIQUENESS ENFORCEMENT

### Uniqueness Formula

```
Uniqueness Score = (Structural × 0.20) + (Data-Source × 0.30) + (Textual × 0.40) + (Contextual × 0.10)
```

Each dimension scored 0-100%.

### Minimum Uniqueness Thresholds

| Comparison | Minimum Uniqueness | Key Differentiator |
|------------|-------------------|-------------------|
| Service Page A vs Service Page B | 90% | Different services = completely different technical content |
| Location Page A vs Location Page B | 75% | Different cities = unique local context + reviews + FAQs |
| Service-City vs Service-City (same service) | 80% | Different cities = unique local context, reviews, FAQs |
| Service-City vs Service (same service) | 80% | Different purposes: service-city adds local context |
| Service Page vs Location Page | 85% | Different page purposes and structures |
| Blog Article A vs Blog Article B | 95% | Completely unique topics and research |
| Homepage vs All Other Pages | 90% | Unique structure and aggregated data |

**Source:** `scripts/enforce.config.json`

### STRICTLY FORBIDDEN PATTERNS (Automatic Rejection)

#### 1. City-Name Swap Pattern
**FORBIDDEN:**
```
Toronto Page: "We provide furnace repair in Toronto. Our Toronto-based technicians..."
Mississauga Page: "We provide furnace repair in Mississauga. Our Mississauga-based technicians..."
```

**Why:** Detected by search engines as duplicate content. No unique value.

---

#### 2. Paragraph Spinning Pattern
**FORBIDDEN:**
```
Original: "Our licensed technicians arrive promptly to diagnose your furnace issue..."
Spun: "Our certified professionals show up quickly to assess your heating system problem..."
```

**Why:** Search engines detect synonym swapping. Low-quality content signal.

---

#### 3. Template Intro/Outro Pattern
**FORBIDDEN:**
Using identical introductions across multiple pages:
```
"Welcome to B.A.P Heating & Cooling, your trusted HVAC partner in [city]..."
```

**Enforcement:** Maximum 1 templated sentence allowed per page

---

#### 4. Service Description Copy-Paste
**FORBIDDEN:**
Copying full service descriptions from service page to service-city page.

**Correct Approach:**
- Service page: Technical explanation
- Service-city page: "We provide [service] in [city]" + link to service page + local availability

---

#### 5. FAQ Duplication Across Cities
**FORBIDDEN:**
Using identical FAQs on service-city pages for different cities.

**Correct Approach:**
- Toronto FAQ: "How much does furnace repair cost **in Toronto**? Costs in Toronto typically range from $150-$500..."
- Mississauga FAQ: "How much does furnace repair cost **in Mississauga**? Costs in Mississauga typically range from $150-$500, with potential variations for areas near Pearson Airport..."

---

### Uniqueness Improvement Strategies

#### Strategy 1: Local Context Injection
Add 2-3 paragraphs of city-specific context:
- Local landmarks and neighborhoods
- City-specific regulations or permits
- Building type prevalence
- Climate and seasonal factors
- Historical service data in city

**Example:**
> "In Oakville, our furnace repair service addresses the unique needs of the area's predominantly large, single-family homes. Many Oakville properties feature multi-zone HVAC systems requiring specialized diagnostic expertise. We're familiar with the local permit requirements for HVAC work in Oakville and ensure all repairs meet Town of Oakville building code standards."

---

#### Strategy 2: FAQ Localization
Create city-specific FAQ variations.

**Generic FAQ:**
> "How long does furnace installation take?"

**City-Specific FAQ (Toronto):**
> "How long does furnace installation take in Toronto? Most installations in Toronto homes take 4-6 hours. For downtown Toronto condos with building access restrictions, installations may require 6-8 hours to coordinate with building management and ensure compliance with condo bylaws."

---

#### Strategy 3: Review Specificity
Use reviews with city-specific details.

**Generic Review (LOW VALUE):**
> "Great service, very professional!"

**City-Specific Review (HIGH VALUE):**
> "B.A.P installed our new furnace in our Brampton home last week. The team navigated the tight basement access typical of Brampton townhomes with ease and completed the installation in one day despite the challenging workspace. Highly recommend for Brampton homeowners!"

---

## 8. CONTENT APPROVAL WORKFLOW

### Workflow States

All content collections include `workflowStatus` field with these possible values:

1. **draft** — Content is being created, not ready for review
2. **internal_review** — First-pass quality review by content team
3. **seo_review** — SEO and technical compliance review
4. **approved** — Passed all reviews, ready for publication
5. **published** — Live on production site
6. **archived** — Unpublished, retained for records

### Workflow Truth Table

| State | Allowed in Repo? | Eligible for Production Build? | Requires Approval Metadata? |
|-------|-----------------|-------------------------------|---------------------------|
| draft | ✅ Yes | ❌ No | ❌ No |
| internal_review | ✅ Yes | ❌ No | ❌ No |
| seo_review | ✅ Yes | ❌ No | ❌ No |
| approved | ✅ Yes | ✅ Yes | ✅ Yes (approvedBy, approvedDate) |
| published | ✅ Yes | ✅ Yes | ✅ Yes (approvedBy, approvedDate) |
| archived | ✅ Yes | ❌ No | ❌ No |

### Workflow Behavior

**Drafts in Repository:**
- Content may remain in `draft`, `internal_review`, or `seo_review` states in the repository
- These states DO NOT block builds
- Draft content is excluded from production page generation
- Enforcement warns about draft count but does not fail build

**Production-Eligible Content:**
- Only `approved` and `published` content is included in production builds
- Production-eligible content MUST have `approvedBy` and `approvedDate` fields
- Missing approval metadata on approved/published content = build failure

**Enforcement Rules:**
```yaml
# Draft state - ALLOWED, not built
workflowStatus: "draft"
# No approval metadata required

# Approved state - ALLOWED, built to production
workflowStatus: "approved"
approvedBy: "Content Lead" # REQUIRED
approvedDate: "2026-01-09" # REQUIRED (ISO 8601 format)

# Published state - ALLOWED, built to production
workflowStatus: "published"
approvedBy: "SEO Lead" # REQUIRED
approvedDate: "2026-01-09" # REQUIRED (ISO 8601 format)
```

### Pre-Publication Validation Checklist

Before ANY content advances to Approved or Published:

**Content Quality:**
- [ ] Meets minimum word count for page type
- [ ] All required sections present
- [ ] No placeholder text
- [ ] Grammar and spelling correct
- [ ] Canadian English spelling throughout
- [ ] No prohibited words/phrases

**Uniqueness Compliance:**
- [ ] Uniqueness score ≥ threshold for page type
- [ ] No city-name swap patterns
- [ ] No paragraph spinning
- [ ] FAQ/review scoping validated

**SEO Compliance:**
- [ ] Title tag unique (<60 chars)
- [ ] Meta description unique (120-160 chars)
- [ ] H1 tag unique
- [ ] Heading hierarchy correct
- [ ] Internal links present (minimum required)
- [ ] URL slug follows convention

**Schema Safety:**
- [ ] Content supports schema implementation
- [ ] Service type accurate (if service page)
- [ ] Location data accurate (if location page)

**Final Approvals:**
- [ ] Internal reviewer signature
- [ ] SEO lead signature
- [ ] Content systems architect approval (if high-value page)

---

## 9. AI USAGE RULES

### Where AI Is ALLOWED

AI-assisted content generation is PERMITTED in:

1. **Drafting Phase (Draft State Only)**
   - Initial content outlines
   - First-draft paragraph generation
   - FAQ question/answer generation
   - Service description drafting
   - Blog article research and structure

2. **Content Optimization**
   - Readability improvements
   - Grammar and spelling corrections
   - Meta description variations
   - Title tag optimization suggestions

3. **Research and Ideation**
   - Keyword research assistance
   - Topic ideation
   - Competitor content analysis
   - FAQ question identification

**Requirements:**
- Human MUST review and edit ALL AI output
- AI output is considered Draft state only
- Human creator is responsible for final content quality
- AI-generated content MUST pass all review stages

---

### Where AI Is FORBIDDEN

AI MUST NOT be used for:

1. **Final Content Approval**
   - AI cannot approve content for publication
   - AI cannot sign off on SEO review
   - AI cannot override governance rules

2. **Factual Claims Without Verification**
   - Service pricing (must be verified by ops team)
   - Response time commitments (must be verified by dispatch)
   - Certifications and licenses (must be verified by compliance)
   - Customer testimonials (must be real and verified)

3. **Bypassing Review Workflow**
   - AI cannot auto-publish content
   - AI cannot skip review stages
   - AI cannot modify published content without human approval

4. **Legal or Compliance Content**
   - Terms of service
   - Privacy policy
   - Service guarantees (legal implications)
   - Warranty statements

5. **Sensitive or High-Stakes Content**
   - Emergency HVAC page (safety-critical)
   - Homepage (brand-critical)
   - Legal disclaimers
   - Pricing commitments

---

### AI Content Quality Requirements

Every AI-generated content piece MUST:
1. Pass uniqueness check (80%+ unique vs other pages)
2. Follow brand voice (professional, helpful, authoritative)
3. Be factually accurate (no hallucinated facts)
4. Cite real data when referencing statistics
5. Avoid generic statements ("We are the best", "We care about quality")
6. Include specific details (equipment models, process steps, timelines)

### AI Output Red Flags (Auto-Reject)

- ❌ Unverifiable statistics ("studies show", without citation)
- ❌ Superlatives without proof ("best in", "#1")
- ❌ US English spelling (AI default is often US)
- ❌ Generic, templated conclusions
- ❌ Placeholder text left in ("insert city name here")
- ❌ AI fluff words: "delve", "unlock", "elevate", "empower", "leverage"

---

## 10. BRAND & LANGUAGE STANDARDS

### Language Standards (MANDATORY)

**Canadian English Only:**
- Spelling: colour, labour, neighbour, centre
- Terminology: furnace (not "heater"), air conditioner (not "AC unit")
- Units: Celsius, metric measurements
- Legal: Ontario regulations, Canadian standards (NOT generic "local regulations")

**Prohibited Spellings:**
- ❌ color, labor, neighbor, center (US English)
- ❌ Fahrenheit references
- ❌ US regulatory references

**Ontario HVAC Specificity:**
- Reference TSSA (Technical Standards and Safety Authority) for Ontario-specific licensing
- Mention Ontario building codes where relevant
- Use Ontario-specific terminology for permits and compliance

### Tone Standards (LOCKED)

**Required Tone:**
- Professional and direct
- Technically accurate
- Customer-focused
- Conversational but authoritative
- Transparent about processes and pricing

**Prohibited Tone:**
- ❌ Salesy or pushy language
- ❌ Overly casual or colloquial
- ❌ Technical jargon without explanation
- ❌ Fear-based messaging
- ❌ Hyperbolic claims

### Prohibited Words & Phrases

**Never Use:**
- ❌ "Cheap" or "budget" (use "cost-effective" or "affordable")
- ❌ "Best in [city]" (unverifiable claim)
- ❌ "#1 HVAC company" (unverifiable claim)
- ❌ "Guaranteed lowest price" (legal risk)
- ❌ "Same day service guaranteed" (unless truly guaranteed)
- ❌ AI fluff: "delve", "unlock", "elevate", "empower", "leverage"
- ❌ "Industry-leading" without evidence
- ❌ "Award-winning" without specific award citation
- ❌ "Trusted by thousands" without verification

**Use Instead:**
- ✅ "Cost-effective solutions"
- ✅ "Experienced in [city] since [year]"
- ✅ "Licensed and insured"
- ✅ "Competitive pricing"
- ✅ "Fast response times" (with specific timeframes)
- ✅ Specific, verifiable claims

---

## 11. SEO & METADATA REQUIREMENTS

### Title Tag Rules
- Maximum 60 characters (including brand)
- Must be unique across all pages
- Must include target keyword naturally
- Must not be keyword-stuffed
- Format: `{Primary Keyword} | B.A.P Heating & Cooling`

### Meta Description Rules
- 120-160 characters optimal
- Must be unique across all pages
- Must include call-to-action
- Must accurately describe page content
- Must not duplicate title tag verbatim

### Heading Hierarchy
- H1: Page title (primary keyword)
- H2: Major sections
- H3: Subsections
- NO H1 → H3 jumps
- NO multiple H1 tags

### Minimum Content Length
- **Service Pages:** 800-1200 words
- **Location Pages:** 500-800 words
- **Region Pages:** 400-600 words
- **Blog Articles:** 1000-2000 words
- **FAQ Entries:** 50-200 words per answer

### Readability Standards
- Grade level: 8-10 (Flesch-Kincaid)
- Sentence length: Average 15-20 words
- Paragraph length: Maximum 4-5 sentences
- Use of headings: Required for content >400 words
- Use of lists: Encouraged for scanability

---

## 12. INTERNAL LINKING & SCHEMA

### Internal Linking Rules

**Service Pages MUST Link To:**
- Related services (minimum 2)
- Service-city pages (via dynamic query)
- Emergency HVAC page (if emergency available)
- Relevant blog articles (minimum 1 if available)

**Location Pages MUST Link To:**
- All service-city pages in that city
- Parent region page
- Nearby location pages (minimum 2)

**Region Pages MUST Link To:**
- All location pages within region
- Major service categories available in region

**Blog Articles MUST Link To:**
- Relevant service pages (minimum 2)
- Related blog articles (minimum 1)

### Link Context Requirements

All internal links MUST:
- Use descriptive anchor text (not "click here")
- Provide context for why user should click
- Be naturally integrated into content
- Not be keyword-stuffed

**Link Density Guidance (not enforced):**
- Target: 5-10 internal links per 500 words
- Avoid excessive linking (>15 links per 500 words)

### Schema Markup Compliance

**Service Pages:**
- Service schema required
- LocalBusiness schema inherited
- Must include service type, provider, area served

**Location Pages:**
- LocalBusiness schema with city specificity
- Must include address, contact, service area

**Blog Articles:**
- Article schema required
- Must include author, publish date, modified date

**Reviews:**
- Review schema required
- Must include reviewer, rating, date, service context

**FAQs:**
- FAQPage schema required
- Generated from FAQ collection

---

## 13. EMERGENCY CONTENT GOVERNANCE

### Emergency Keyword Rules

**Allowed Page Types for "Emergency" Keyword:**
1. Homepage (emergency_cta section only)
2. Emergency service page (`/emergency/`)
3. Service pages (emergency_notice section if service is 24/7 available)

**Prohibited:**
- ❌ "Emergency" in H1 or H2 tags on non-emergency pages
- ❌ "Emergency" in location page titles
- ❌ "Emergency" in blog article titles (unless emergency-focused article)
- ❌ "Emergency" in meta titles for non-emergency pages

### Emergency Keyword Limits by Page Type

| Page Type | Max "Emergency" Mentions | Allowed Locations |
|-----------|-------------------------|-------------------|
| Homepage | 3-5 | emergency_cta section, trust_signals |
| Emergency Page | Unlimited | All sections |
| Service Page (24/7) | 2-3 | emergency_notice section, CTA |
| Service Page (non-24/7) | 0 | Not allowed |
| Location Page | 1-2 | trust_signals only (if 24/7 in area) |
| Blog Article | 0-1 | Only if emergency-focused content |

### Emergency CTA Placement

**Emergency CTA Variant (Red, Urgent):**
- Homepage: emergency_cta section
- Emergency page: hero + cta_conversion
- Service-city pages: hero CTA block
- Service pages (24/7 only): optional emergency_notice

**Standard CTA (Non-Emergency):**
- All other pages
- All footer CTAs

### Emergency Content Requirements

When mentioning emergency service:
- MUST reference actual 24/7 availability from business profile
- MUST include `{hours.response_time_statement}` or paraphrase
- MUST NOT promise specific response times unless verified in business profile
- MUST link to `/emergency/` page for full emergency service details

**Example (Correct):**
> "We provide 24/7 emergency furnace repair. {hours.response_time_statement}"

**Example (Incorrect):**
> "Emergency furnace repair available!" (No context, overpromises)

---

## 14. BUSINESS PROFILE DATA

**All business data is sourced from `src/content/business/business-profile.yaml`**

### Contact Information
- **Phone:** `{contact.phone_display}`
- **Email:** `{contact.email}`
- **Hours:** `{hours.business_hours}`
- **Emergency Service:** `{hours.emergency_service}` (boolean)
- **Response Time:** `{hours.response_time_statement}`

### Service Area
**Regions Served:** `{coverage.regions}` (6 regions)
1. Wellington County (6 cities including Guelph, Fergus, Elora)
2. Waterloo Region (5 cities including Kitchener, Waterloo, Cambridge)
3. Halton Region (6 cities including Milton, Burlington, Oakville)
4. Peel Region (2 cities: Caledon, Bolton)
5. Hamilton & Brant (3 cities including Hamilton, Brantford)
6. Dufferin County (3 cities including Orangeville, Shelburne)

**Total Cities Served:** 25 (count from coverage.regions)

### Services Offered
**Heating (10 services):**
- Furnace Installation, Repair, Maintenance
- Boiler Installation, Repair, Maintenance
- Heat Pump Installation, Repair, Maintenance
- Ductless Mini-Split

**Cooling (3 services):**
- Air Conditioner Installation, Repair, Maintenance

**Indoor Air Quality (4 services):**
- Humidifiers, Dehumidifiers
- Air Filtration & Air Purifiers
- HRV/ERV Ventilation

**Water Heating (2 services):**
- Tank Water Heaters, Tankless Water Heaters

**Commercial (2 services):**
- Rooftop Units, Commercial HVAC

**Maintenance (1 service):**
- Maintenance Plans

**Total Services:** 22 (count from services.list)

### Trust Signals (Single Source)
- **Established:** `{business.established_year}`
- **Licensed & Insured:** `{trust_and_compliance.insured_statement}`
- **WSIB:** `{trust_and_compliance.wsib}` (boolean)
- **Warranty:** `{warranty_and_guarantees.warranty_statement}`
- **Google Rating:** `{reputation.google_rating}` stars
- **Review Count:** `{reputation.google_review_count}` reviews
- **Free Estimates:** `{pricing_and_offers.estimates_free}` (boolean)
- **Free Diagnostics:** `{pricing_and_offers.diagnostic_free}` (boolean)

### Financing & Rebates
- **Financing Available:** `{pricing_and_offers.financing.available}` (boolean)
- **Financing Statement:** `{pricing_and_offers.financing.statement}`
- **Rebate Support:** `{pricing_and_offers.rebates.paperwork_supported}` (boolean)
- **Rebate Statement:** `{pricing_and_offers.rebates.statement}`

**CRITICAL:** Do NOT hardcode numeric values like "Established: 2000" or "4.8 stars (407 reviews)" in content. Reference business profile fields or templates will inject values.

---

## 15. ENFORCEMENT & VALIDATION

### Build-Time Enforcement

**Pre-Build Checks (Automated):**
- Uniqueness score calculation for all content
- City-name swap detection
- FAQ/review scoping validation
- Workflow status verification (approved/published have approval metadata)
- E-E-A-T linting

**Build Will NOT Fail If:**
- Draft content exists (drafts are allowed in repo)
- Content is in internal_review or seo_review state
- Draft content lacks approval metadata

**Build WILL Fail If:**
- Content is marked approved or published without approvedBy/approvedDate
- Uniqueness score below threshold for production-eligible content
- City-name swap pattern detected in approved/published content
- Prohibited phrases in approved/published content
- Invalid date formats in approval metadata

**Build Failure Example:**
```
ERROR: Content uniqueness below threshold

File: src/content/locations/brampton.md
Uniqueness Score: 72% (minimum 75% required)

Issues:
- 35% text overlap with src/content/locations/mississauga.md
- Identical FAQ detected: "What areas do you serve?"
- City-name swap pattern detected in paragraphs 2, 4

Action Required:
1. Add city-specific context (see Strategy 1)
2. Create unique FAQ for Brampton
3. Rewrite flagged paragraphs with local details

Build aborted. Fix issues and retry.
```

### Enforcement Scripts

**Location:** `scripts/enforce.ts`

**Run Command:** `pnpm enforce`

**What It Checks:**
1. **Uniqueness Enforcement**
   - Calculates uniqueness scores
   - Detects city-name swap patterns
   - Flags content below threshold

2. **Workflow Enforcement**
   - Counts draft vs approved vs published content
   - Validates approval metadata for approved/published content
   - Warns about draft count but does not block build
   - Blocks build if approved/published content lacks approval metadata

3. **E-E-A-T Linting**
   - Checks for prohibited words/phrases
   - Validates Canadian English spelling
   - Ensures minimum content length
   - Verifies factual claim citations

**Exit Code:**
- `0` = All checks passed (drafts allowed)
- `1` = Violations detected, build blocked (only for approved/published content issues)

### Enforcement Configuration

**File:** `scripts/enforce.config.json`

```json
{
  "uniqueness": {
    "enabled": true,
    "thresholds": {
      "serviceCityVsServiceCity": 0.80,
      "serviceVsServiceCity": 0.80,
      "locationVsLocation": 0.75,
      "blogVsBlog": 0.95,
      "general": 0.70
    }
  },
  "workflow": {
    "enabled": true,
    "requiredStatuses": ["approved", "published"],
    "strictApprovalMetadata": true
  },
  "eeat": {
    "enabled": true,
    "checkEmergencyUsage": true,
    "checkProhibitedPhrases": true,
    "checkAIFluff": true
  }
}
```

---

## 16. QUICK REFERENCE CHECKLISTS

### ✅ Content Creation Checklist

Before creating ANY content:
- [ ] Identify page type and required structure
- [ ] Verify all required sections present
- [ ] Ensure content is in approved collection
- [ ] Follow frontmatter schema exactly
- [ ] Use Canadian English spelling
- [ ] Avoid prohibited words/phrases
- [ ] Include city-specific context (if location-based)
- [ ] Create scoped FAQs (minimum required)
- [ ] Include scoped reviews (minimum required)
- [ ] Set workflowStatus to "draft"
- [ ] Run uniqueness check before submitting for review

---

### ✅ Service Page Checklist

- [ ] Service slug matches business profile
- [ ] Title is unique and includes service keyword
- [ ] Description is 2-4 paragraphs, technically accurate
- [ ] Service details include benefits, process, features
- [ ] Related services linked (minimum 2)
- [ ] Service-scoped FAQs present (4-6)
- [ ] Service-scoped reviews present (3-5)
- [ ] No location-specific information
- [ ] No pricing commitments (use "pricing_guidance" if needed)
- [ ] Emergency notice only if service is emergency-available
- [ ] Uniqueness score ≥90% vs other service pages

---

### ✅ Location Page Checklist

- [ ] Location slug matches business profile
- [ ] Title includes city name naturally
- [ ] Location overview includes city description, serviceArea
- [ ] Region context includes parent region info
- [ ] Services in location lists all available services
- [ ] Local trust signals include response time, presence
- [ ] Location-scoped FAQs present (3-5)
- [ ] Location-scoped reviews present (5-8)
- [ ] Nearby locations linked (minimum 2)
- [ ] No service deep-dives (link to service pages)
- [ ] Uniqueness score ≥75% vs other location pages

---

### ✅ FAQ Creation Checklist

- [ ] Question is clear and user-focused
- [ ] Answer is concise (50-200 words)
- [ ] Answer provides actionable information
- [ ] Scopes array correctly set (e.g., ["global"], ["service:furnace-repair"], etc.)
- [ ] Priority field set (higher number = higher priority within same scope)
- [ ] Status set to "live"
- [ ] workflowStatus set to "draft" (for new FAQs) or "published" (for approved FAQs)
- [ ] No duplicate questions across inappropriate scopes
- [ ] Canadian English spelling throughout
- [ ] No keyword stuffing

---

### ✅ Review Creation Checklist

- [ ] Source is accurate (google, facebook, housecallpro, manual)
- [ ] Verified flag is correct (true for real reviews)
- [ ] Author name present
- [ ] Rating is 1-5
- [ ] Text is meaningful (not just "Great service!")
- [ ] Review date present (ISO format)
- [ ] Scope fields correct (locationSlug, serviceSlug, citySlug)
- [ ] Status set to "live"
- [ ] workflowStatus set to "draft" (for new reviews) or "published" (for approved reviews)
- [ ] No fabricated reviews
- [ ] Review includes city-specific details (if city-scoped)

---

### ✅ Blog Article Checklist

- [ ] Title is unique and compelling
- [ ] Description is 120-160 characters
- [ ] Publish date set
- [ ] Author set to "Paul Palmer"
- [ ] Category is accurate
- [ ] Article intro establishes problem/value
- [ ] Article body is well-structured (H2/H3 hierarchy)
- [ ] Article conclusion summarizes key takeaways
- [ ] Related services linked (2-3)
- [ ] Related articles linked (3-4)
- [ ] Author bio present
- [ ] Minimum 1000 words
- [ ] Canadian English spelling throughout
- [ ] No promotional content in body
- [ ] Uniqueness score ≥95% vs other blog articles

---

## FINAL REMINDERS FOR AI AGENTS

1. **THIS README IS THE SINGLE SOURCE OF TRUTH**
   - All rules are mandatory
   - No exceptions without architectural review
   - Violations result in immediate rejection

2. **UNIQUENESS IS NON-NEGOTIABLE**
   - 80%+ uniqueness required for most page types
   - City-name swap = automatic rejection
   - Paragraph spinning = automatic rejection
   - Template intro/outro = maximum 1 sentence

3. **WORKFLOW ALLOWS DRAFTS**
   - All new content starts in "draft" state
   - Drafts are allowed in repository without blocking builds
   - Only approved/published content is built to production
   - Approved/published content requires approval metadata
   - No bypassing workflow stages for production content

4. **AI OUTPUT REQUIRES HUMAN REVIEW**
   - AI is a tool, not a replacement
   - Human creator responsible for all content quality
   - All factual claims must be verified
   - Canadian English spelling required

5. **BUSINESS DATA IS SINGLE SOURCE**
   - All numeric claims reference business profile
   - No hardcoded values in content
   - Templates inject business profile data

6. **FAQ SYSTEM USES SCOPES ARRAY**
   - Use `scopes: ["global", "service:slug", "location:slug"]`
   - NOT `appliesTo.pageTypes` or similar
   - Higher FAQ priority number = higher priority within same scope

7. **WHEN IN DOUBT, ASK**
   - Don't guess or interpret rules creatively
   - Refer to detailed documentation in `/docs/`
   - Escalate uncertainties to content lead or architect

---

## DOCUMENTATION HIERARCHY

1. **This README** — Master rulebook, quick reference
2. **`docs/CONTENT_GOVERNANCE_RULES.md`** — Detailed governance policies
3. **`docs/CONTENT_MODEL_LOCK.md`** — Complete page type definitions
4. **`docs/CONTENT_POPULATION_RULEBOOK.md`** — Detailed content creation rules
5. **`docs/CONTENT_APPROVAL_WORKFLOW.md`** — Complete workflow process
6. **`docs/SECTION_REGISTRY.md`** — All allowed sections with data sources
7. **`docs/FAQ_SYSTEM_CONTRACT.md`** — FAQ scoping and resolution rules
8. **`docs/UNIQUENESS_ENFORCEMENT_MATRIX.md`** — Detailed uniqueness requirements

---

**This README is LOCKED. Changes require architectural review and approval.**

**Last Updated:** 2026-01-09
**Version:** 2.0.1
**Status:** Production-Ready

---

**END OF MASTER AI AGENT RULEBOOK**
