# CONTENT GOVERNANCE RULES — B.A.P Heating & Cooling

**Version:** 1.0.0
**Date:** 2026-01-09
**Status:** LOCKED — Enforcement rules for content operations

---

## PURPOSE

This document defines the **rules and constraints** that govern content creation, modification, and AI-assisted generation for the B.A.P Heating & Cooling website.

These rules ensure:
- 80%+ content uniqueness across all pages
- SEO integrity is maintained
- Brand voice is consistent
- Content quality remains high
- AI-generated content is safely constrained
- Internal linking and schema remain intact

---

## CORE PRINCIPLES

### 1. STRUCTURE IS IMMUTABLE
- Page structures defined in `CONTENT_MODEL_LOCK.md` cannot be altered without architecture review
- Section order must be preserved
- Required sections cannot be removed
- Prohibited sections cannot be added

### 2. UNIQUENESS IS MEASURED STRUCTURALLY
- 80% uniqueness is achieved through content variation, not structural variation
- Pages with identical structure can have 80%+ unique content through:
  - Scoped data (service, location, region fields)
  - Unique FAQ combinations
  - Unique review combinations
  - Unique related content links
  - Unique local context paragraphs

### 3. CONTENT FOLLOWS DATA
- Content is derived from data collections, not hard-coded
- Data collections are the single source of truth
- Templates render data; they don't contain content

### 4. AI CONTENT MUST BE CONSTRAINED
- AI-generated content must follow section templates
- AI content must not violate prohibited sections
- AI content must not alter internal linking logic
- AI content must be reviewed before deployment

---

## 80% UNIQUENESS ENFORCEMENT STRATEGY

### What Counts as Unique Content

**Unique (contributes to 80% threshold):**
- Service-specific descriptions and details
- Location-specific context and geographic information
- Region-specific overviews and city lists
- Scoped FAQ combinations (unique per page)
- Scoped review combinations (unique per page)
- Service-in-city local context paragraphs
- Blog article content (inherently unique)
- Related service/location/article links (unique combinations)

**Shared (does NOT count toward uniqueness):**
- Navigation menus, headers, footers
- Business contact information (phone, email, address)
- Trust signals (licenses, certifications, insurance)
- CTAs (call to action buttons and text)
- Global site elements (schema, meta tags structure)

### Uniqueness Calculation Method

**Per-Page Uniqueness Formula:**
```
Uniqueness % = (Unique Content Bytes / Total Page Content Bytes) × 100
```

**Exclusions from calculation:**
- HTML/CSS/JS code
- Navigation and footer content
- Structured data (JSON-LD)
- Meta tags
- Common business information

**Required minimum:** 80% per page

### Uniqueness Verification Tools

**Manual Verification:**
1. Select random sample of 10 pages from same page type
2. Extract content sections (exclude shared elements)
3. Run text comparison tool (e.g., diff, plagiarism checker)
4. Calculate uniqueness percentage
5. Verify ≥80% unique content per page

**Automated Verification (future):**
- Build-time uniqueness checker script
- Compare content across pages of same type
- Flag pages below 80% threshold
- Block deployment if threshold violated

---

## CONTENT VARIATION STRATEGIES

### Strategy 1: Scoped Data Fields

**How it works:**
- Each service, location, region has unique data fields
- Templates render these fields without modification
- Uniqueness is guaranteed by data uniqueness

**Example:**
- Service pages: Each service has unique `description`, `details`, `pricing_guidance` fields
- Location pages: Each location has unique `overview`, `serviceArea`, `local_context` fields

**Enforcement:**
- Content editors must populate ALL required fields in data collections
- Empty or duplicate field values trigger validation errors
- AI content generation must populate unique field values per entity

---

### Strategy 2: FAQ Scoping

**How it works:**
- FAQs are filtered by service, location, region, page type
- Each page gets unique FAQ combinations based on scope
- See `FAQ_SYSTEM_CONTRACT.md` for full scoping rules

**Example:**
- Service page for "Furnace Installation" shows furnace-specific FAQs
- Service-in-city page for "Furnace Installation in Guelph" shows furnace + Guelph + service-city scoped FAQs
- Location page for "Guelph" shows Guelph-specific + general location FAQs

**Enforcement:**
- Minimum 3-6 unique FAQs per page
- FAQ overlap across pages <20%
- No page displays all global FAQs

---

### Strategy 3: Review Scoping

**How it works:**
- Reviews are filtered by service, location
- Each page displays unique subset of reviews
- Reviews contribute to page uniqueness

**Example:**
- Service page for "Heat Pump Repair" shows heat-pump-related reviews
- Location page for "Waterloo" shows Waterloo-location reviews
- Service-in-city page for "Heat Pump Repair in Waterloo" shows reviews for service OR location

**Enforcement:**
- Minimum 10 unique reviews per service
- Minimum 5 unique reviews per location
- Reviews must have unique `text` field (no duplicates)

---

### Strategy 4: Local Context Paragraphs

**How it works:**
- Service-in-city pages include location-specific context
- Context explains why service matters in that city
- Uses city-specific factors: climate, building types, regulations, demographics

**Example:**
- "Furnace Installation in Guelph": References Guelph's cold winters, older housing stock, proximity to University of Guelph
- "Furnace Installation in Hamilton": References Hamilton's industrial areas, steel town heritage, diverse neighborhoods

**Enforcement:**
- Every service-in-city page must have 100-200 word local context paragraph
- Context must reference city-specific factors
- AI-generated context must cite real geographic/demographic facts
- Generic context ("We serve [City Name]") is prohibited

---

### Strategy 5: Related Content Links

**How it works:**
- Each page links to related services, locations, regions, or articles
- Link combinations are unique per page
- Contributes to structural uniqueness

**Example:**
- Service page for "Furnace Installation" links to related services: "Furnace Repair", "Furnace Maintenance", "Heat Pump Installation"
- Location page for "Guelph" links to other locations in Waterloo Region
- Service-in-city page links to same service in nearby cities

**Enforcement:**
- Related content must be algorithmically generated (not hard-coded)
- Link lists must be unique per page (no copy-paste)
- Link count: 3-5 related items per section

---

## KEYWORD USAGE RULES

### Prohibited Keyword Practices

**Keyword Stuffing:**
- Repeating keywords unnaturally in content
- Forcing keywords into every paragraph
- Using keyword variations excessively (e.g., "HVAC, heating and cooling, heating & cooling")

**Generic Keyword Insertion:**
- City name + service name repetition in every sentence
- Example (prohibited): "Our Guelph furnace installation service is the best Guelph furnace installation service in Guelph."

**Keyword Density Targeting:**
- Writing to hit specific keyword density percentages
- Example (prohibited): Aiming for "2% keyword density" as a content goal

### Allowed Keyword Practices

**Natural Language Usage:**
- Use keywords where they naturally fit
- Write for humans first, search engines second

**Topic Clustering:**
- Cover related topics and semantic variations
- Use synonyms and related terms naturally

**Header Optimization:**
- Use primary keyword in H1 (page title)
- Use variations in H2/H3 headers where relevant
- Don't force keywords into every header

**Local Context:**
- Use city names when providing local context
- Don't force city name into unrelated content

---

## AI CONTENT GENERATION CONSTRAINTS

### When AI Content is Allowed

**Allowed use cases:**
1. **Populating data collection fields** (service descriptions, location overviews)
2. **Writing local context paragraphs** (service-in-city pages)
3. **Generating FAQ answers** (following FAQ system contract)
4. **Writing blog articles** (following blog structure)
5. **Expanding short descriptions** into full paragraphs

### When AI Content is Prohibited

**Prohibited use cases:**
1. **Modifying page templates or structure**
2. **Altering internal linking logic**
3. **Changing schema definitions**
4. **Generating fake reviews** (reviews must be real)
5. **Creating promotional content** (offers, discounts, sales copy)

### AI Content Quality Requirements

**Every AI-generated content piece must:**
1. **Pass uniqueness check** (80%+ unique vs other pages)
2. **Follow brand voice** (professional, helpful, authoritative)
3. **Be factually accurate** (no hallucinated facts)
4. **Cite real data** when referencing statistics or regulations
5. **Avoid generic statements** ("We are the best", "We care about quality")
6. **Include specific details** (equipment models, process steps, timelines)

### AI Content Review Process

**Before deployment, AI content must be:**
1. **Human reviewed** for accuracy and tone
2. **Fact-checked** for verifiable claims
3. **Compared** against existing pages for uniqueness
4. **Tested** in staging environment
5. **Approved** by content owner

---

## CONTENT EDITING RULES

### For Human Editors

**Editors MUST:**
1. Follow page structure defined in `CONTENT_MODEL_LOCK.md`
2. Populate all required fields in data collections
3. Ensure content is unique per entity (no copy-paste)
4. Use natural language (no keyword stuffing)
5. Link to internal pages using correct URL patterns
6. Test changes in staging before production

**Editors MUST NOT:**
1. Remove required sections from pages
2. Add prohibited sections to pages
3. Modify internal linking logic
4. Change schema definitions
5. Hard-code content in templates
6. Duplicate content across multiple pages

### For Developers

**Developers MUST:**
1. Preserve data-driven content architecture
2. Validate changes against content model lock
3. Test internal linking and schema after changes
4. Document any template modifications
5. Enforce required fields in data collections

**Developers MUST NOT:**
1. Hard-code content in components or pages
2. Bypass data collections (use templates + data)
3. Modify page structures without updating `CONTENT_MODEL_LOCK.md`
4. Remove FAQ or review filtering logic
5. Change URL patterns without URL governance review

---

## INTERNAL LINKING GOVERNANCE

### Linking Rules

**Internal links MUST:**
1. Use relative URLs (not absolute)
2. Follow URL patterns in `business_profile` (seoUrlRules)
3. Use correct slugs from data collections
4. Point to existing pages (no broken links)
5. Use descriptive anchor text (not "click here")

**Internal links MUST NOT:**
1. Link to external domains within primary content (use CTAs)
2. Use generic anchor text
3. Hard-code links (generate from data)
4. Create circular link patterns (A→B→A)

### Link Validation

**Before deployment:**
1. Run link checker on all pages
2. Verify all internal links resolve to 200 OK
3. Check for broken links or 404s
4. Verify anchor text is descriptive
5. Ensure link context matches destination page

---

## SCHEMA GOVERNANCE

### Schema Rules

**Schema definitions MUST:**
1. Follow schema.org specifications
2. Use helper functions in `/src/lib/schema.ts`
3. Be generated from data collections (not hard-coded)
4. Pass Google Rich Results Test
5. Be unique per page (no duplicate schema)

**Schema definitions MUST NOT:**
1. Include fake data (reviews, ratings, addresses)
2. Be modified without testing
3. Use deprecated schema types
4. Include incomplete required properties
5. Reference non-existent entities

### Schema Validation

**Before deployment:**
1. Run Google Rich Results Test on sample pages
2. Validate JSON-LD syntax (use JSON validator)
3. Verify all required properties are present
4. Check that data matches actual page content
5. Test structured data previews in Google Search Console

---

## REVIEW AND APPROVAL WORKFLOW

### Content Creation Workflow

**Step 1: Planning**
- Identify content need (new service, location, blog post)
- Verify page type has defined structure in `CONTENT_MODEL_LOCK.md`
- Determine data collection and required fields

**Step 2: Content Creation**
- Populate data collection fields (manually or AI-assisted)
- Follow section structure and data source mappings
- Ensure uniqueness requirements are met

**Step 3: Review**
- Human review for accuracy, tone, and brand voice
- Fact-check verifiable claims
- Run uniqueness checker
- Validate internal links and schema

**Step 4: Staging Deployment**
- Deploy to staging environment
- Test page rendering and functionality
- Run automated tests (link checker, schema validator, uniqueness checker)

**Step 5: Production Deployment**
- Get approval from content owner
- Deploy to production
- Verify page is live and indexed
- Monitor for errors or issues

---

## VIOLATION CONSEQUENCES

### Content Violations

**Minor violations** (e.g., missing optional field, single keyword repetition):
- Warning issued to editor
- Content flagged for revision
- Fix required before next deployment

**Major violations** (e.g., <80% uniqueness, keyword stuffing, broken structure):
- Content rejected
- Page removed from deployment
- Editor training required before next submission

**Critical violations** (e.g., fake reviews, broken schema, broken links):
- Immediate rollback
- Content owner notified
- Root cause analysis required
- Process update to prevent recurrence

### Developer Violations

**Minor violations** (e.g., hard-coded content in one component):
- Code review comment
- Refactor required before merge

**Major violations** (e.g., template structure change without updating docs):
- Pull request rejected
- Architecture review required
- Documentation update required

**Critical violations** (e.g., broken internal linking, schema errors in production):
- Immediate rollback
- Incident report required
- Post-mortem and process improvement

---

## QUALITY ASSURANCE CHECKLIST

### Pre-Deployment Checklist

**Content Quality:**
- [ ] All required fields populated in data collections
- [ ] Content is 80%+ unique vs similar pages
- [ ] No keyword stuffing or generic statements
- [ ] Brand voice and tone are consistent
- [ ] Factual claims are verifiable
- [ ] Grammar and spelling are correct

**Structure Quality:**
- [ ] Page follows structure defined in `CONTENT_MODEL_LOCK.md`
- [ ] Required sections are present and ordered correctly
- [ ] Optional sections are used appropriately
- [ ] Prohibited sections are NOT present
- [ ] Data sources are correctly mapped

**Technical Quality:**
- [ ] Internal links are working (no 404s)
- [ ] Schema validates (Google Rich Results Test passes)
- [ ] FAQ scoping is correct (unique FAQs per page)
- [ ] Review scoping is correct (relevant reviews displayed)
- [ ] Related content links are unique and relevant

**SEO Quality:**
- [ ] Meta title and description are unique and descriptive
- [ ] H1 contains primary keyword naturally
- [ ] H2/H3 headers are descriptive and hierarchical
- [ ] Image alt text is descriptive
- [ ] URL slug follows conventions

---

## ONGOING MAINTENANCE

### Monthly Content Audit

**Audit tasks:**
1. Run uniqueness checker on random sample of pages
2. Verify FAQ counts meet minimum thresholds
3. Check for broken internal links
4. Validate schema on random sample
5. Review new content submissions for compliance

### Quarterly Content Review

**Review tasks:**
1. Update business profile data (hours, contact info, services)
2. Refresh seasonal promotions and offers
3. Update rebate program information
4. Add new reviews to collection
5. Archive outdated blog posts

### Annual Architecture Review

**Review tasks:**
1. Evaluate content model effectiveness
2. Identify structural improvements
3. Review uniqueness enforcement strategy
4. Update governance rules based on learnings
5. Train editors and developers on updates

---

## SUCCESS METRICS

This governance system is successful if:

1. **100% of pages** meet 80% uniqueness threshold
2. **Zero critical violations** in production
3. **<5% rejection rate** for content submissions
4. **100% schema validation** pass rate
5. **Zero broken internal links** in production
6. **100% compliance** with page structure definitions

---

## ENFORCEMENT RESPONSIBILITY

**Content Owner:**
- Final approval for all content changes
- Quarterly content audits
- Governance rule updates

**Development Team:**
- Enforce data-driven architecture
- Build validation tools
- Code review for compliance

**Content Editors:**
- Follow content governance rules
- Maintain data collection quality
- Report issues and improvement opportunities

**QA Team:**
- Pre-deployment testing
- Automated validation runs
- Monthly compliance audits

**This document is LIVING and will be updated based on operational learnings.**
