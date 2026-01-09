# CONTENT POPULATION RULEBOOK

**Document Type:** Content Governance Framework
**Status:** Locked
**Last Updated:** 2026-01-09
**Owner:** Content Systems Architecture

---

## PURPOSE

This document establishes **enforceable rules** for all content added to the B.A.P Heating & Cooling Services Ltd website. These rules apply to:
- Human content creators
- AI-assisted content generation
- Content management systems
- Third-party content providers

**No exceptions are permitted without documented architectural review.**

---

## 1. ALLOWED CONTENT SOURCES (LOCKED)

### Approved Content Collections

Content MUST ONLY be added through these approved collections:

1. **`src/content/services/`**
   - Service-level descriptions
   - One file per service type
   - Format: `{service-slug}.md`

2. **`src/content/service-cities/`**
   - Service delivery in specific cities
   - One file per service-city combination
   - Format: `{service-slug}/{city-slug}.md`

3. **`src/content/locations/`**
   - City-level service area information
   - One file per city
   - Format: `{city-slug}.md`

4. **`src/content/regions/`**
   - Regional aggregation pages
   - One file per region
   - Format: `{region-slug}.md`

5. **`src/content/faqs/`**
   - Frequently asked questions
   - Scoped to services, cities, or global
   - Format: `{unique-slug}.md`

6. **`src/content/reviews/`**
   - Customer testimonials
   - Scoped to services, cities, or global
   - Format: `{unique-slug}.md`

7. **`src/content/blog/`**
   - Editorial content
   - Educational resources
   - Format: `{slug}.md`

### Explicitly Forbidden Content Locations

Content MUST NOT be added in:
- ❌ Inline content within `.astro` template files
- ❌ Markdown files outside approved collections
- ❌ Hardcoded copy in components (`src/components/`)
- ❌ JavaScript/TypeScript files as content strings
- ❌ Layout files (`src/layouts/`)
- ❌ Page files (`src/pages/`) except dynamic routing logic
- ❌ Public asset files as text content
- ❌ Configuration files (astro.config.mjs, etc.)

**Violation = Immediate rejection in review**

---

## 2. PAGE-TYPE CONTENT BOUNDARIES

### A) Service Pages (`/services/{service-slug}`)

**CAN Include:**
- Service definition and core value proposition
- How the service works (technical overview)
- When customers need this service (use cases)
- What equipment/methods are used
- Service process steps (installation, repair, maintenance)
- Qualifications and certifications relevant to service
- Warranty and guarantee information
- Service-level pricing structure (if applicable)
- General service area coverage (province/region level)
- Industry standards and regulations
- Safety considerations

**CANNOT Include:**
- City-specific availability details
- City-specific response times
- Individual city names in body copy
- Service-city URLs (use internal linking only)
- Emergency-first positioning (see Emergency Governance)
- Location-specific testimonials
- City-specific pricing
- Local regulatory variations

**Content Structure:**
- Must follow service content schema
- Must include service type taxonomy
- Must link to related services (internal linking)
- Must not duplicate service-city content

---

### B) Service-in-City Pages (`/services/{service-slug}/{city-slug}`)

**CAN Include:**
- Local service availability confirmation
- City-specific response time commitments
- Service area boundaries within city
- Local permits and regulations specific to city
- City-specific seasonal considerations
- Local service delivery logistics
- Proximity to service zones within city
- City-specific FAQ references
- City-specific review references
- Local emergency availability (if applicable)

**CANNOT Include:**
- Full service technical explanations (link to service page)
- Generic service benefits (link to service page)
- Content duplicated from service page
- Content duplicated from location page
- Generic testimonials (must be city-scoped)
- Other cities' information
- Regional overview (belongs on region page)

**Content Structure:**
- Must reference parent service
- Must reference parent location
- Must include city-specific FAQs (minimum 3)
- Must include city-scoped reviews (minimum 2)
- Must link back to service page
- Must differentiate from service page by ≥80% (see Uniqueness Matrix)

---

### C) Location Pages (`/locations/{city-slug}`)

**CAN Include:**
- City overview and service coverage summary
- All services available in this city (links only)
- Service area map and boundaries
- Local contact information
- City-specific operating hours
- General emergency service availability for city
- Local service history and community presence
- City-level FAQ aggregation
- City-level review aggregation
- Local industry context

**CANNOT Include:**
- Deep service technical details (link to service pages)
- Service-specific pricing
- Content duplicated from service-city pages
- Emergency-first positioning (see Emergency Governance)
- Service process details
- Single-service focus

**Content Structure:**
- Must aggregate all service-city pages
- Must link to all available services
- Must include city overview section
- Must differentiate from service-city pages by ≥85%

---

### D) Region Pages (`/locations/regions/{region-slug}`)

**CAN Include:**
- Regional service coverage overview
- Cities within region (list with links)
- Regional service authority positioning
- Multi-city service coordination
- Regional service statistics (if available)
- Regional FAQ aggregation
- Regional review aggregation
- Regional industry context

**CANNOT Include:**
- City-specific details (link to location pages)
- Service-specific technical content
- Duplicate city descriptions
- Emergency-first positioning

**Content Structure:**
- Must aggregate location pages within region
- Must link to all cities in region
- Must establish regional authority
- Must not duplicate city-level content

---

### E) Homepage (`/`)

**CAN Include:**
- Brand introduction
- Core service categories (high-level)
- Service area overview (regional)
- Primary value propositions
- Emergency service availability (secondary placement)
- Trust signals (certifications, years in business)
- Primary CTAs

**CANNOT Include:**
- Deep service technical content
- City-specific details
- Service-city URLs in primary navigation
- Emergency-first hero section (see Emergency Governance)
- Pricing details
- Blog content in main sections

---

### F) Emergency HVAC Page (`/services/emergency-hvac`)

**CAN Include:**
- 24/7 availability details
- Emergency response process
- Emergency service scope
- Emergency contact information
- Emergency pricing structure
- When to call for emergency vs. scheduled service
- Emergency service area coverage
- Emergency equipment and readiness

**CANNOT Include:**
- Non-emergency service details
- Generic service descriptions
- City-specific emergency times (use "service area" language)
- Content duplicated from other service pages

**Content Structure:**
- Must be clearly differentiated as emergency-only
- Must link to related non-emergency services
- Must follow Emergency Content Governance rules

---

### G) Financing Page (`/financing`)

**CAN Include:**
- Financing options overview
- Partner financing providers
- Application process
- Eligibility requirements
- Available financing plans
- Benefits of financing

**CANNOT Include:**
- Service-specific content
- City-specific financing (unless truly different)
- Emergency service content
- Pricing for services

---

### H) Rebates Page (`/rebates`)

**CAN Include:**
- Available rebate programs
- Government rebate information
- Manufacturer rebate details
- Rebate eligibility requirements
- Application assistance offered
- Regional rebate programs (Ontario-specific)

**CANNOT Include:**
- Service installation details
- City-specific rebates (unless verified)
- Outdated rebate information (must be current)
- Emergency service content

---

### I) Reviews Page (`/reviews`)

**CAN Include:**
- Aggregated customer reviews
- Review filtering by service/city
- Review submission process
- Trust signals and verification
- Response to reviews

**CANNOT Include:**
- Service descriptions
- City descriptions
- Unverified testimonials
- Duplicate reviews from service-city pages

---

### J) Blog Articles (`/blog/{slug}`)

**CAN Include:**
- Educational HVAC content
- Seasonal maintenance tips
- Industry news and updates
- How-to guides
- Product comparisons
- Energy efficiency advice
- Local climate considerations (Ontario-specific)
- FAQ expansion content

**CANNOT Include:**
- Direct service sales copy
- City-specific service pages disguised as blog posts
- Duplicate FAQ content
- Thin content (<800 words)
- Keyword-stuffed content
- Content without E-E-A-T signals

**Content Structure:**
- Must include author attribution
- Must include publish/update dates
- Must link to relevant service pages
- Must provide unique value beyond service pages

---

## 3. EMERGENCY CONTENT GOVERNANCE

### Emergency Service Positioning Rules

**Pages That MAY Mention Emergency Service:**
- `/services/emergency-hvac` (primary emergency page)
- Homepage (secondary placement only)
- All service-city pages (availability note only)
- Location pages (availability summary only)

**Pages That MUST NOT Lead With Emergency Intent:**
- Service pages (link to emergency page instead)
- Region pages
- Blog articles
- Financing page
- Rebates page
- Reviews page

### Emergency Keyword Containment

**Allowed Emergency Keywords by Page Type:**

**Emergency HVAC Page:**
- Unlimited use of: emergency, 24/7, urgent, immediate
- Primary intent: emergency service

**Homepage:**
- Maximum 2 instances of emergency keywords
- Placement: below-fold or secondary position
- Must not dominate hero section

**Service-City Pages:**
- Maximum 1 mention in "Emergency Availability" section
- Must link to emergency page
- Must not overshadow primary service content

**Location Pages:**
- Maximum 1 mention in "Service Coverage" section
- Must link to emergency page

**All Other Pages:**
- Zero emergency keywords in H1/H2 tags
- Maximum 1 mention in body content (contextual reference only)

**Violation = Emergency intent dilution = SEO penalty risk**

### Emergency CTA Escalation

Emergency CTAs MUST follow the hierarchy established in Step 7 (CTA Conversion Governance):
- Emergency HVAC page: Primary CTA = Emergency line
- Service-city pages: Secondary CTA = Emergency availability
- All other pages: Tertiary CTA or no emergency CTA

---

## 4. BRAND & LANGUAGE ENFORCEMENT

### Language Standards (Mandatory)

**Canadian English Only:**
- Spelling: colour, labour, neighbour, centre
- Terminology: furnace (not "heater"), air conditioner (not "AC unit")
- Units: Celsius, metric measurements
- Legal: Ontario regulations, Canadian standards

**Prohibited Spellings:**
- ❌ color, labor, neighbor, center (US English)
- ❌ Fahrenheit references
- ❌ US regulatory references

### Tone Standards (Locked)

**Required Tone:**
- Professional and direct
- Technically accurate
- Customer-focused
- Conversational but authoritative
- Transparent about processes and pricing

**Prohibited Tone:**
- Salesy or pushy language
- Overly casual or colloquial
- Technical jargon without explanation
- Fear-based messaging
- Hyperbolic claims

### Prohibited Words & Phrases

**Never Use:**
- ❌ "Cheap" or "budget" (use "cost-effective" or "affordable")
- ❌ "Best in [city]" (unverifiable claim)
- ❌ "#1 HVAC company" (unverifiable claim)
- ❌ "Guaranteed lowest price" (legal risk)
- ❌ "Same day service guaranteed" (unless truly guaranteed)
- ❌ AI fluff: "delve", "unlock", "elevate", "empower", "leverage" (overused)
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

### Claim Verification Requirements

**All Claims Must Be:**
1. Verifiable with documentation
2. Specific (include timeframes, numbers, sources)
3. Accurate as of content creation date
4. Updated when no longer accurate

**Examples:**
- ❌ "Decades of experience" → ✅ "Serving Ontario since 2005"
- ❌ "Thousands of customers" → ✅ "Over 500 verified reviews"
- ❌ "Fast service" → ✅ "Average response time: 2 hours in Greater Toronto Area"

---

## 5. E-E-A-T SIGNAL REQUIREMENTS

All content MUST support Google's E-E-A-T criteria:

### Experience
- Real service scenarios and case examples
- Seasonal considerations based on Ontario climate
- Common customer challenges addressed
- Service process transparency

### Expertise
- Technical accuracy in HVAC terminology
- References to TSSA regulations, Ontario Building Code
- Manufacturer specifications and standards
- Industry certifications mentioned where relevant

### Authoritativeness
- Service area longevity (years serving region)
- Verifiable customer reviews and testimonials
- Industry affiliations and certifications
- Educational content demonstrating knowledge

### Trustworthiness
- Transparent pricing structure references
- Clear service guarantees and warranties
- Accurate contact information
- Privacy policy and service terms compliance
- No deceptive or manipulative content

---

## 6. INTERNAL LINKING REQUIREMENTS

### Mandatory Link Relationships

**Service Pages MUST Link To:**
- Related services (minimum 2)
- Service-city pages (via dynamic query, not hardcoded)
- Emergency HVAC page (if emergency option available)
- Relevant blog articles (minimum 1 if available)

**Service-City Pages MUST Link To:**
- Parent service page
- Parent location page
- Related service-city pages in same city (minimum 2)
- Emergency HVAC page (emergency availability note)

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
- Relevant service-city pages (if geographically relevant)

### Link Context Requirements

All internal links MUST:
- Use descriptive anchor text (not "click here")
- Provide context for why user should click
- Be naturally integrated into content
- Not be keyword-stuffed
- Not be excessive (maximum 10 internal links per 500 words)

---

## 7. SCHEMA MARKUP COMPLIANCE

Content MUST support existing schema implementations:

**Service Pages:**
- Service schema required
- LocalBusiness schema inherited
- Must include service type, provider, area served

**Service-City Pages:**
- Service schema with location refinement
- Must reference parent service and location

**Location Pages:**
- LocalBusiness schema with city specificity
- Must include address, contact, service area

**Blog Articles:**
- Article schema required
- Must include author, publish date, modified date

**Reviews:**
- Review schema required
- Must include reviewer, rating, date, service context

---

## 8. FAQ AND REVIEW SCOPING

### FAQ Scoping Rules

**Global FAQs:**
- Apply to all services and locations
- Generic HVAC questions
- Stored in `/src/content/faqs/` with `scope: "global"`

**Service-Scoped FAQs:**
- Apply to specific service across all cities
- Service-specific questions
- Stored with `scope: "service"` and `serviceSlug: "{service}"`

**City-Scoped FAQs:**
- Apply to specific city across all services
- City-specific questions (permits, regulations, climate)
- Stored with `scope: "location"` and `locationSlug: "{city}"`

**Service-City-Scoped FAQs:**
- Apply to specific service in specific city
- Most specific scoping level
- Stored with `scope: "service-city"`, `serviceSlug: "{service}"`, `locationSlug: "{city}"`

**Enforcement:**
- Service-city pages MUST display minimum 3 scoped FAQs
- Must not duplicate FAQs across inappropriate scopes
- Generic FAQs MUST NOT appear on service-city pages unless no scoped FAQs exist

### Review Scoping Rules

**Global Reviews:**
- General company experience
- Multi-service experiences
- Stored with `scope: "global"`

**Service-Scoped Reviews:**
- Specific service across all cities
- Stored with `scope: "service"` and `serviceSlug: "{service}"`

**City-Scoped Reviews:**
- Specific city across all services
- Stored with `scope: "location"` and `locationSlug: "{city}"`

**Service-City-Scoped Reviews:**
- Specific service in specific city
- Most specific scoping level
- Stored with `scope: "service-city"`, `serviceSlug: "{service}"`, `locationSlug: "{city}"`

**Enforcement:**
- Service-city pages MUST display minimum 2 scoped reviews
- Reviews MUST include city name verification
- Reviews MUST NOT be reused across cities unless truly multi-city
- Fabricated reviews are STRICTLY PROHIBITED

---

## 9. METADATA REQUIREMENTS

All content files MUST include:

### Required Frontmatter Fields

**All Content Types:**
```yaml
title: "Descriptive, unique title"
description: "Meta description (120-160 characters)"
publishDate: "YYYY-MM-DD"
lastModified: "YYYY-MM-DD"
```

**Service Content:**
```yaml
serviceType: "installation|repair|maintenance|emergency"
relatedServices: ["service-slug-1", "service-slug-2"]
emergencyAvailable: true|false
```

**Service-City Content:**
```yaml
service: "service-slug"
location: "city-slug"
responseTime: "X hours in [city]"
```

**Location Content:**
```yaml
cityName: "Full City Name"
region: "region-slug"
serviceArea: "Description of coverage"
```

**Blog Content:**
```yaml
author: "Author Name"
category: "Category"
tags: ["tag1", "tag2"]
featured: true|false
```

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

---

## 10. CONTENT QUALITY STANDARDS

### Minimum Content Length

**Service Pages:** 800-1200 words
**Service-City Pages:** 600-1000 words
**Location Pages:** 500-800 words
**Region Pages:** 400-600 words
**Blog Articles:** 1000-2000 words
**FAQ Entries:** 50-200 words per answer

### Readability Standards

- Grade level: 8-10 (Flesch-Kincaid)
- Sentence length: Average 15-20 words
- Paragraph length: Maximum 4-5 sentences
- Use of headings: Required for content >400 words
- Use of lists: Encouraged for scanability

### Content Freshness

**Review Cycles:**
- Service pages: Annually
- Service-city pages: Annually
- Location pages: Bi-annually
- Emergency page: Quarterly
- Rebates page: Quarterly (or when rebates change)
- Blog articles: As needed (update date when revised)

---

## 11. IMAGE AND MEDIA REQUIREMENTS

### Image Usage

**Required Attribution:**
- All images must have proper licensing
- Stock photos must be licensed
- Customer photos require written permission

**Technical Requirements:**
- Alt text required for all images
- Descriptive, not keyword-stuffed
- File names must be descriptive (not IMG_1234.jpg)
- Images must be optimized (<200KB per image)

**Prohibited Images:**
- Unlicensed stock photography
- Competitor branding
- Unverified before/after claims
- Images with embedded text (accessibility)

---

## 12. ACCESSIBILITY REQUIREMENTS

All content MUST meet WCAG 2.1 Level AA:

- Headings in logical order (H1 → H2 → H3)
- Alt text for all images
- Descriptive link text
- Proper color contrast
- No text in images (or provide alternative)
- Keyboard navigation support
- Screen reader compatibility

---

## 13. LEGAL AND COMPLIANCE

### Required Disclaimers

**Pricing References:**
- Must include "pricing subject to inspection and quote"
- Must not guarantee pricing without qualification

**Service Guarantees:**
- Must be specific and attainable
- Must not overpromise
- Must link to terms and conditions

**Emergency Service:**
- Must clarify service area boundaries
- Must specify response time as "average" or "typical"
- Must not guarantee specific response times

### Prohibited Content

- Medical or health claims about HVAC systems
- Environmental claims without EPA/government backing
- Disparagement of competitors
- False or misleading statements
- Unverified statistics or data

---

## 14. CONTENT REVIEW CHECKLIST

Before publishing ANY content, verify:

- [ ] Content is in approved collection
- [ ] Frontmatter is complete and valid
- [ ] Title and description are unique
- [ ] Content meets minimum word count
- [ ] Content follows tone and language standards
- [ ] No prohibited words/phrases used
- [ ] All claims are verifiable
- [ ] Canadian English spelling throughout
- [ ] Internal links are present and valid
- [ ] FAQ/review scoping is correct (if applicable)
- [ ] Emergency content rules followed (if applicable)
- [ ] Schema support is present
- [ ] Images have alt text and proper licensing
- [ ] Accessibility standards met
- [ ] Legal disclaimers included (if needed)
- [ ] Content passes uniqueness threshold (see Uniqueness Matrix)

---

## ENFORCEMENT

**Violation Consequences:**

1. **First Violation:** Content rejected, revision required
2. **Second Violation:** Content creator re-training required
3. **Repeated Violations:** Content access revoked

**Audit Schedule:**

- Monthly random content audits
- Quarterly comprehensive reviews
- Immediate audit if SEO metrics decline

**Responsibility:**

- Content creators: Follow all rules
- Content reviewers: Enforce all rules
- SEO lead: Monitor compliance and results
- Technical lead: Maintain technical constraints

---

## DOCUMENT VERIFICATION

**Document Created:** 2026-01-09
**Scope:** Content population governance for B.A.P Heating & Cooling Services Ltd
**Confirmation:** This document contains NO actual page content, NO code modifications, ONLY governance rules and constraints.

**Status:** LOCKED
**Modifications:** Require architectural review and approval

---

**END OF CONTENT POPULATION RULEBOOK**
