# FAQ SYSTEM CONTRACT — B.A.P Heating & Cooling

**Version:** 1.0.0
**Date:** 2026-01-09
**Status:** LOCKED — Structural contract only

---

## PURPOSE

This document defines the **structural rules** for the FAQ system that ensures:

- Every page can display unique, contextually relevant FAQs
- FAQ content is centrally managed in `/src/content/faqs/`
- FAQ resolution follows predictable, deterministic rules
- No page displays irrelevant or duplicate FAQs
- 80%+ uniqueness is achieved through scoped FAQ combinations

**This is NOT a list of FAQ content. This is a system contract.**

---

## CURRENT FAQ COLLECTION MODEL

### Collection Location
`/src/content/faqs/*.md`

### Schema Definition
Located in: `/src/content/config.ts` and `/.astro/collections/faqs.schema.json`

### Required Fields

#### `question` (string, required)
- The FAQ question text
- Must be unique across all FAQs
- Written as a user would ask it

#### `order` (number, default: 0)
- Display order when multiple FAQs apply to same page
- Lower numbers display first
- Allows editorial control over FAQ priority

#### `appliesTo` (object, required)
- Scope filter object that determines where FAQ appears
- Contains sub-fields for targeting:

**Sub-fields:**

##### `services` (array of strings, optional)
- Array of service slugs where this FAQ applies
- Example: `["furnace-installation", "heat-pump-repair"]`
- If empty or omitted, FAQ applies to all services (when other conditions met)

##### `locations` (array of strings, optional)
- Array of location slugs where this FAQ applies
- Example: `["guelph", "kitchener", "waterloo"]`
- If empty or omitted, FAQ applies to all locations (when other conditions met)

##### `regions` (array of strings, optional)
- Array of region slugs where this FAQ applies
- Example: `["waterloo-region", "halton-region"]`
- If empty or omitted, FAQ applies to all regions (when other conditions met)

##### `pageTypes` (array of enums, optional)
- Page types where this FAQ appears
- Allowed values: `service`, `service-city`, `location`, `region`, `homepage`
- Example: `["service", "service-city"]`
- If empty or omitted, FAQ can appear on any page type (when other conditions met)

### Content Field

#### FAQ Answer (markdown body)
- The answer to the FAQ question
- Stored as markdown content in the file body
- Supports rich text, lists, links, and formatting
- Must be clear, concise, and actionable

---

## FAQ SCOPE RESOLUTION RULES

### Scope Hierarchy (Most Specific to Least Specific)

1. **Service-in-City Scope** (most specific)
   - `appliesTo.services` contains current service slug
   - `appliesTo.locations` contains current location slug
   - `appliesTo.pageTypes` contains `service-city`

2. **Service + Region Scope**
   - `appliesTo.services` contains current service slug
   - `appliesTo.regions` contains current region slug
   - `appliesTo.pageTypes` contains `service` or `service-city`

3. **Service-Only Scope**
   - `appliesTo.services` contains current service slug
   - `appliesTo.pageTypes` contains `service` or `service-city`

4. **Location-Only Scope**
   - `appliesTo.locations` contains current location slug
   - `appliesTo.pageTypes` contains `location` or `service-city`

5. **Region-Only Scope**
   - `appliesTo.regions` contains current region slug
   - `appliesTo.pageTypes` contains `region`

6. **Page-Type Scope**
   - `appliesTo.pageTypes` contains current page type
   - No service/location/region filtering

7. **Global Scope** (least specific)
   - `appliesTo.services` is empty
   - `appliesTo.locations` is empty
   - `appliesTo.regions` is empty
   - `appliesTo.pageTypes` is empty OR contains current page type

---

## FAQ MATCHING LOGIC

### Matching Algorithm

For a given page, an FAQ matches if **ALL** of the following conditions are true:

1. **Page Type Match:**
   - `appliesTo.pageTypes` is empty (applies to all page types), OR
   - `appliesTo.pageTypes` contains the current page type

2. **Service Match (if page has service context):**
   - `appliesTo.services` is empty (applies to all services), OR
   - `appliesTo.services` contains the current service slug

3. **Location Match (if page has location context):**
   - `appliesTo.locations` is empty (applies to all locations), OR
   - `appliesTo.locations` contains the current location slug

4. **Region Match (if page has region context):**
   - `appliesTo.regions` is empty (applies to all regions), OR
   - `appliesTo.regions` contains the current region slug

### Page Context Definitions

**Homepage:**
- Page type: `homepage`
- Service context: none
- Location context: none
- Region context: none

**Service Page:**
- Page type: `service`
- Service context: current service slug
- Location context: none
- Region context: none (unless service targets specific regions)

**Service-in-City Page:**
- Page type: `service-city`
- Service context: current service slug
- Location context: current location slug
- Region context: parent region of current location

**Location Page:**
- Page type: `location`
- Service context: none
- Location context: current location slug
- Region context: parent region of current location

**Region Page:**
- Page type: `region`
- Service context: none
- Location context: none (unless displaying city-specific content)
- Region context: current region slug

**Static Pages (Financing, Rebates, Reviews, Emergency, About, Contact, Blog):**
- Page type: specific to page
- Service context: none (unless manually scoped)
- Location context: none
- Region context: none

---

## FAQ PRIORITIZATION RULES

When multiple FAQs match a page, display order is determined by:

1. **Specificity (highest priority):**
   - Service-in-City scoped FAQs first
   - Service + Region scoped FAQs second
   - Service-only scoped FAQs third
   - Location-only scoped FAQs fourth
   - Region-only scoped FAQs fifth
   - Page-type scoped FAQs sixth
   - Global FAQs last

2. **Order Field (secondary sort):**
   - Within same specificity level, sort by `order` field (ascending)
   - Lower `order` values appear first

3. **Alphabetical by Question (tertiary sort):**
   - If specificity and order are equal, sort alphabetically by question text

---

## UNIQUENESS GUARANTEES

### Per-Page Uniqueness

**Service Pages:**
- Each service has unique service-scoped FAQs
- Global FAQs supplement when service-scoped FAQs are insufficient
- Minimum 4-6 FAQs per service page

**Service-in-City Pages:**
- Each service+city combination has unique FAQ set
- Combines service-scoped, location-scoped, and service-in-city scoped FAQs
- Minimum 3-5 FAQs per service-in-city page
- FAQ combinations are unique due to service×location filtering

**Location Pages:**
- Each location has unique location-scoped FAQs
- Global FAQs supplement when location-scoped FAQs are insufficient
- Minimum 3-5 FAQs per location page

**Region Pages:**
- Each region has unique region-scoped FAQs
- Global FAQs supplement when region-scoped FAQs are insufficient
- Minimum 3-5 FAQs per region page

**Static Pages:**
- FAQs scoped to specific topics (financing, rebates, emergency, etc.)
- Page-type scoped FAQs ensure relevance
- Minimum 2-6 FAQs per static page

---

## FAQ DISPLAY LIMITS

### Recommended Limits by Page Type

- **Homepage:** 3-5 FAQs (global or high-priority)
- **Service:** 4-6 FAQs (service-scoped + global)
- **Service-in-City:** 3-5 FAQs (service+location scoped + service-only + global)
- **Location:** 3-5 FAQs (location-scoped + global)
- **Region:** 3-5 FAQs (region-scoped + global)
- **Financing:** 5-8 FAQs (financing-scoped)
- **Rebates:** 4-6 FAQs (rebates-scoped)
- **Reviews:** 2-3 FAQs (review-scoped)
- **Emergency HVAC:** 4-6 FAQs (emergency-scoped)
- **About Us:** 2-3 FAQs (company-scoped)
- **Contact Us:** 2-3 FAQs (contact-scoped)
- **Blog Article:** 0-3 FAQs (optional, article-topic scoped)

---

## FAQ CONTENT GOVERNANCE

### Required FAQ Types

**Every FAQ collection must include:**

1. **Global FAQs** (3-5)
   - General HVAC questions applicable to all pages
   - Example: "What areas do you serve?", "Are you licensed and insured?"

2. **Service-Scoped FAQs** (3-5 per service category)
   - Service-specific questions
   - Example for Furnace Installation: "How long does installation take?", "What brands do you install?"

3. **Location-Scoped FAQs** (1-2 per major location)
   - Location-specific questions
   - Example: "Do you serve [City Name]?", "What's your response time in [City Name]?"

4. **Topic-Scoped FAQs** (3-8 per topic)
   - Financing, rebates, emergency, etc.
   - Example: "What financing options do you offer?", "How do I apply for rebates?"

### FAQ Quality Requirements

**Every FAQ must:**
- Answer a real user question
- Be concise (50-200 words per answer)
- Provide actionable information
- Link to relevant pages when appropriate
- Avoid duplicate questions across FAQs

**Every FAQ must NOT:**
- Be keyword-stuffed
- Duplicate content from page sections
- Ask questions users don't actually have
- Provide incomplete or vague answers

---

## FAQ HELPER FUNCTIONS

### Existing Helper: `filterFAQsForPage()`

**Location:** `/src/lib/faqHelpers.ts`

**Purpose:** Filters FAQ collection based on page context

**Parameters:**
- `allFAQs` — Full FAQ collection from `getCollection('faqs')`
- `pageType` — Current page type enum
- `serviceSlug` — Optional current service slug
- `locationSlug` — Optional current location slug
- `regionSlug` — Optional current region slug

**Returns:**
- Array of matching FAQs, sorted by specificity, order, and question

**Usage Example:**
```typescript
const faqs = await filterFAQsForPage(
  allFAQs,
  'service-city',
  'furnace-installation',
  'guelph',
  'waterloo-region'
);
```

### Existing Helper: `getFAQCount()`

**Location:** `/src/lib/faqHelpers.ts`

**Purpose:** Returns count of FAQs that match page context

**Parameters:** Same as `filterFAQsForPage()`

**Returns:** Number of matching FAQs

---

## FAQ SCHEMA INTEGRATION

### JSON-LD Schema Output

**Location:** `/src/lib/schema.ts`

**Function:** `getFAQSchema()`

**Purpose:** Generates FAQ structured data for SEO

**Input:** Array of FAQs (from `filterFAQsForPage()`)

**Output:** JSON-LD FAQPage schema

**Schema Structure:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "FAQ question text",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FAQ answer text"
      }
    }
  ]
}
```

---

## FAQ POPULATION WORKFLOW (FOR FUTURE CONTENT WORK)

**This section is for future reference. NO content work happens in this step.**

### Step 1: Identify FAQ Gaps
- Audit all page types
- Identify pages with <3 FAQs
- Identify missing service/location/region scopes

### Step 2: Write FAQ Content
- Write questions as users would ask them
- Write concise, actionable answers
- Avoid keyword stuffing

### Step 3: Assign Scopes
- Determine which page types need this FAQ
- Assign service/location/region filters
- Set `order` value based on importance

### Step 4: Validate Uniqueness
- Run FAQ count query for each page type
- Verify 80%+ unique FAQ combinations across pages
- Adjust scopes if FAQ overlap is too high

### Step 5: Deploy and Monitor
- Add FAQs to `/src/content/faqs/`
- Rebuild site
- Verify FAQs appear on correct pages
- Monitor for user feedback

---

## VALIDATION REQUIREMENTS

Before FAQ content population (future step):

1. **Scope Coverage:** Every page type has at least minimum FAQ count
2. **No Orphan FAQs:** Every FAQ applies to at least one page
3. **No FAQ Drought:** No page has zero FAQs
4. **Uniqueness Verification:** Service-in-city pages have unique FAQ combinations
5. **Schema Validation:** All FAQs generate valid FAQPage schema

---

## ENFORCEMENT RULES

### Development Rules

1. **DO NOT** add FAQs outside `/src/content/faqs/` collection
2. **DO NOT** hard-code FAQs in page templates
3. **DO NOT** bypass `filterFAQsForPage()` helper function
4. **DO NOT** modify FAQ schema without updating this contract

### Content Rules

1. **DO NOT** create FAQs that apply to zero pages
2. **DO NOT** duplicate questions across multiple FAQs
3. **DO NOT** use FAQs for keyword stuffing
4. **DO NOT** write vague or unhelpful answers

---

## SUCCESS CRITERIA

This FAQ system contract is successful if:

1. Every page type has a defined FAQ display strategy
2. FAQ scoping rules are deterministic and predictable
3. FAQ uniqueness is guaranteed through scope combinations
4. FAQ content can be populated without breaking structure
5. Developers cannot accidentally break FAQ display logic

**This contract is IMMUTABLE without architecture review.**
