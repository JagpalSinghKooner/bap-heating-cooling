# CONTENT MODEL LOCK — B.A.P Heating & Cooling

**Version:** 1.0.0
**Date:** 2026-01-09
**Status:** LOCKED — Changes require architecture review

---

## PURPOSE

This document defines the **fixed structural contract** for every page type in the B.A.P Heating & Cooling website. It ensures:

- Consistent page structure across all templates
- 80%+ content uniqueness per page through structural variation
- Safe constraints for future content generation (human or AI)
- Immutable section ordering and data source mappings

**NO content is defined here. Only structure.**

---

## PAGE TYPE DEFINITIONS

### 1. HOMEPAGE

**Purpose:**
Primary conversion hub. Establishes brand authority, showcases core services, builds trust, and drives emergency + financing CTAs.

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

**Optional Sections:**
- `recent_blog_posts` — Latest 3 blog articles
- `brands_served` — Brand/manufacturer logos
- `seasonal_promotion` — Time-sensitive offers

**Prohibited Sections:**
- Service-specific pricing
- Location-specific addresses (use service area overview only)
- Individual service deep-dives

**Data Sources:**
- `business_profile` → hero, trust_signals, emergency_cta, financing_teaser
- `service_collection` → services_overview (filter: featured=true OR priority=true)
- `reviews_collection` → reviews_carousel (filter: verified=true, sort: rating DESC, date DESC)
- `region_collection` → service_areas
- `faq_collection` → faqs (filter: appliesTo.pageTypes contains 'homepage')
- `blog_collection` → recent_blog_posts (filter: featured=true OR latest 3)

**Uniqueness Driver:**
None required. Homepage is singular. Uniqueness is structural (combination of latest reviews, recent posts, current promotions).

---

### 2. SERVICE PAGE

**Purpose:**
Authoritative resource for a specific HVAC service. Drives conversions for that service while establishing topical authority.

**Required Sections (Ordered):**
1. `hero` — Service name, category, primary CTA
2. `service_description` — Service overview (2-4 paragraphs)
3. `service_details` — Key benefits, process overview, or feature list
4. `service_areas` — Cities/regions where this service is offered
5. `related_services` — 3-5 related services from same category
6. `reviews` — Service-specific reviews (3-5 displayed)
7. `faqs` — Service-scoped FAQs (4-6 questions)
8. `cta_conversion` — Book now / Get quote CTA

**Optional Sections:**
- `pricing_guidance` — Ballpark pricing or factors affecting cost
- `brands_supported` — For equipment-specific services
- `warranty_info` — Service-specific warranties
- `emergency_notice` — If service has 24/7 availability

**Prohibited Sections:**
- Location-specific addresses or phone numbers (use business-wide contact)
- Unrelated service promotions
- Generic company history (link to About instead)

**Data Sources:**
- `service_collection` → hero, service_description, service_details, pricing_guidance, warranty_info
- `business_profile` → service_areas (cross-reference with service coverage), cta_conversion, emergency_notice
- `service_collection` → related_services (filter: same category, exclude current service)
- `reviews_collection` → reviews (filter: service=current_service_slug)
- `faq_collection` → faqs (filter: appliesTo.services contains current_service_slug OR appliesTo.pageTypes contains 'service')

**Uniqueness Driver:**
Service slug + service-specific content fields (description, details, pricing_guidance). Each service has unique scope, process, equipment, and FAQs.

---

### 3. SERVICE-IN-CITY PAGE

**Purpose:**
Hyper-localized service page. Combines service expertise with location-specific context. Drives local search visibility and conversions.

**Required Sections (Ordered):**
1. `hero` — Service + City combination, localized CTA
2. `service_description` — Service overview with city context
3. `local_context` — Why this service matters in this city (climate, building types, local regulations)
4. `service_details` — Service process/benefits
5. `location_details` — City-specific service information (response time, coverage area)
6. `related_services_in_city` — 3-5 related services also in this city
7. `other_locations_for_service` — This service in nearby cities (3-5)
8. `reviews` — Reviews filtered by location AND/OR service (2-4 displayed)
9. `faqs` — Service+City scoped FAQs (3-5 questions)
10. `cta_conversion` — Localized CTA with city name

**Optional Sections:**
- `local_projects` — Case studies or project highlights in this city
- `emergency_notice` — If service+location has 24/7 availability
- `local_regulations` — City-specific permit or compliance info

**Prohibited Sections:**
- Generic service areas (must be location-specific)
- Unrelated location information
- Multiple city mentions in hero (focus on current city only)

**Data Sources:**
- `service_collection` → service_description, service_details
- `location_collection` → local_context, location_details, localized CTAs
- `business_profile` → emergency_notice, contact info
- `service_collection` + `location_collection` → related_services_in_city (filter: same category services in current location)
- `location_collection` + `service_collection` → other_locations_for_service (filter: nearby cities with current service)
- `reviews_collection` → reviews (filter: service=current_service OR location=current_location)
- `faq_collection` → faqs (filter: appliesTo.services contains current_service AND/OR appliesTo.locations contains current_location AND/OR appliesTo.pageTypes contains 'service-city')

**Uniqueness Driver:**
Service slug × Location slug combination. Local context paragraph, location-specific details, unique review combinations, and scoped FAQs ensure 80%+ uniqueness across 550+ pages.

---

### 4. LOCATION PAGE

**Purpose:**
Establish geographic authority for a city/town. Showcase all services available in this location and drive local brand awareness.

**Required Sections (Ordered):**
1. `hero` — City name, region context, primary CTA
2. `location_overview` — City description, service area coverage
3. `services_in_location` — All services available in this city (grouped by category)
4. `region_context` — Parent region information and nearby cities
5. `local_trust_signals` — Response time, local presence, service history in area
6. `reviews` — Location-specific reviews (5-8 displayed)
7. `faqs` — Location-scoped FAQs (3-5 questions)
8. `cta_conversion` — Localized CTA

**Optional Sections:**
- `service_area_map` — Visual map showing coverage area
- `local_landmarks` — Geographic context (not promotional)
- `nearby_locations` — Other cities served in the region

**Prohibited Sections:**
- Service deep-dives (link to service pages instead)
- Pricing information (keep at service level)
- Multiple region mentions in hero

**Data Sources:**
- `location_collection` → hero, location_overview, local_trust_signals, service_area_map
- `region_collection` → region_context, nearby_locations
- `service_collection` + `location_collection` → services_in_location (filter: all services available in this location, grouped by category)
- `reviews_collection` → reviews (filter: location=current_location_slug)
- `faq_collection` → faqs (filter: appliesTo.locations contains current_location OR appliesTo.pageTypes contains 'location')
- `business_profile` → cta_conversion, local_trust_signals

**Uniqueness Driver:**
Location slug + location-specific content fields (overview, serviceArea, region context). Each location has unique geographic context, service availability, and reviews.

---

### 5. REGION PAGE

**Purpose:**
Establish authority for a multi-city region. Serve as hub for geographic navigation and showcase regional service coverage.

**Required Sections (Ordered):**
1. `hero` — Region name, primary city, coverage overview
2. `region_overview` — Region description, total cities served
3. `cities_in_region` — All cities/locations in this region (list + grid)
4. `services_overview` — All services available across the region (categorized)
5. `regional_trust_signals` — Coverage stats, response times, service history
6. `reviews` — Region-wide reviews (6-10 displayed)
7. `faqs` — Region-scoped FAQs (3-5 questions)
8. `cta_conversion` — Regional CTA

**Optional Sections:**
- `region_map` — Visual map of cities served
- `regional_highlights` — Unique regional service considerations

**Prohibited Sections:**
- Individual city deep-dives (link to location pages instead)
- Service-specific content (link to service pages instead)
- Pricing information

**Data Sources:**
- `region_collection` → hero, region_overview, regional_trust_signals
- `location_collection` → cities_in_region (filter: locations where region=current_region)
- `service_collection` → services_overview (all services, grouped by category)
- `reviews_collection` → reviews (filter: locations in current region)
- `faq_collection` → faqs (filter: appliesTo.regions contains current_region OR appliesTo.pageTypes contains 'region')
- `business_profile` → cta_conversion

**Uniqueness Driver:**
Region slug + cities list + region-specific content. Each region has unique city composition, geographic scope, and contextual information.

---

### 6. FINANCING PAGE

**Purpose:**
Educate on financing options and convert users who need payment flexibility. Build trust through transparency.

**Required Sections (Ordered):**
1. `hero` — Financing value proposition
2. `financing_overview` — Available financing options and partners
3. `how_it_works` — Application process, approval timeline, terms
4. `eligibility` — Requirements and qualifications
5. `benefits` — Why choose financing for HVAC
6. `application_cta` — Apply now CTA
7. `faqs` — Financing-specific FAQs (5-8 questions)
8. `services_eligible` — Which services qualify for financing
9. `cta_conversion` — Contact for questions CTA

**Optional Sections:**
- `calculator_teaser` — Link to financing calculator (if available)
- `partner_logos` — Financing partner branding
- `promotional_offers` — Limited-time financing deals

**Prohibited Sections:**
- Specific service descriptions (link to service pages)
- Location-specific information
- Legal/compliance disclaimers (use footer)

**Data Sources:**
- `business_profile` → financing_overview, how_it_works, eligibility, partner_logos, promotional_offers
- `service_collection` → services_eligible (filter: services that qualify for financing)
- `faq_collection` → faqs (filter: financing-related questions, manually scoped)
- `static_config` → application_cta, cta_conversion

**Uniqueness Driver:**
Not required. Financing page is singular. Structural uniqueness through dynamic promotional offers and FAQ updates.

---

### 7. REBATES PAGE

**Purpose:**
Educate on available rebates, incentives, and energy efficiency programs. Drive conversions by reducing perceived cost barriers.

**Required Sections (Ordered):**
1. `hero` — Rebates value proposition
2. `rebates_overview` — Available programs (provincial, federal, utility, manufacturer)
3. `eligibility` — Who qualifies for rebates
4. `how_to_claim` — Step-by-step rebate application process
5. `rebate_amounts` — Potential savings by program/equipment
6. `eligible_services` — Which services qualify for rebates
7. `faqs` — Rebate-specific FAQs (4-6 questions)
8. `cta_conversion` — Contact for rebate assistance CTA

**Optional Sections:**
- `recent_updates` — Changes to rebate programs
- `program_deadlines` — Time-sensitive program information
- `case_studies` — Real rebate savings examples

**Prohibited Sections:**
- Service deep-dives (link to service pages)
- Financing information (link to financing page)
- Location-specific rebate programs (unless universally applicable)

**Data Sources:**
- `business_profile` → rebates_overview, rebate_amounts, how_to_claim
- `service_collection` → eligible_services (filter: services that qualify for rebates)
- `faq_collection` → faqs (filter: rebate-related questions, manually scoped)
- `static_config` → cta_conversion, program_deadlines

**Uniqueness Driver:**
Not required. Rebates page is singular. Structural uniqueness through dynamic program updates and seasonal changes.

---

### 8. REVIEWS PAGE

**Purpose:**
Centralized social proof hub. Showcase all verified reviews and build trust at scale.

**Required Sections (Ordered):**
1. `hero` — Review count, average rating, credibility messaging
2. `reviews_stats` — Aggregate statistics (total reviews, rating breakdown, verified %)
3. `reviews_grid` — All reviews (paginated or filterable)
4. `filter_controls` — Filter by service, location, rating, date
5. `trust_signals` — Verification badges, third-party review platform links
6. `cta_leave_review` — Encourage customers to leave reviews
7. `faqs` — Review process FAQs (2-3 questions)

**Optional Sections:**
- `featured_reviews` — Highlighted testimonials
- `review_sources` — Where reviews come from (Google, Facebook, internal)

**Prohibited Sections:**
- Service descriptions (link to service pages)
- Location descriptions (link to location pages)
- Promotional offers

**Data Sources:**
- `reviews_collection` → reviews_grid, reviews_stats, filter_controls, featured_reviews
- `business_profile` → trust_signals, review platform links
- `faq_collection` → faqs (filter: review-related questions, manually scoped)
- `static_config` → cta_leave_review

**Uniqueness Driver:**
Not required. Reviews page is singular. Structural uniqueness through dynamic review content and filtering.

---

### 9. EMERGENCY HVAC PAGE

**Purpose:**
Convert urgent service requests. Emphasize 24/7 availability, fast response, and emergency service capabilities.

**Required Sections (Ordered):**
1. `hero` — Emergency CTA, 24/7 phone number, response time promise
2. `emergency_services` — What qualifies as an emergency, services offered
3. `response_time` — Guaranteed response time, coverage area
4. `how_it_works` — Emergency service process (call, dispatch, arrival, service)
5. `pricing_transparency` — Emergency service rates, after-hours fees
6. `trust_signals` — Licensed, insured, WSIB, certifications
7. `service_areas` — Where emergency service is available
8. `faqs` — Emergency service FAQs (4-6 questions)
9. `cta_conversion` — Call now CTA

**Optional Sections:**
- `common_emergencies` — Examples of emergency scenarios
- `prevention_tips` — How to prevent emergencies (link to blog)

**Prohibited Sections:**
- Non-emergency service information
- Financing information (not relevant for emergencies)
- Lengthy company history

**Data Sources:**
- `business_profile` → hero (24/7 phone), response_time, pricing_transparency, trust_signals, service_areas
- `service_collection` → emergency_services (filter: services with emergency availability)
- `faq_collection` → faqs (filter: emergency-related questions, manually scoped)
- `static_config` → cta_conversion

**Uniqueness Driver:**
Not required. Emergency page is singular. Structural uniqueness through dynamic emergency availability and seasonal considerations.

---

### 10. ABOUT US PAGE

**Purpose:**
Build brand trust and credibility. Humanize the business, showcase expertise, and differentiate from competitors.

**Required Sections (Ordered):**
1. `hero` — Company mission, established year, owner visibility
2. `our_story` — Company history, founder background, values
3. `team` — Team overview, certifications, training
4. `credentials` — Licenses, insurance, WSIB, industry affiliations
5. `service_philosophy` — How we approach service, quality guarantees
6. `service_areas` — Geographic coverage overview
7. `faqs` — Company-related FAQs (2-3 questions)
8. `cta_conversion` — Contact us CTA

**Optional Sections:**
- `team_photos` — Staff photos (if available)
- `awards_recognition` — Industry awards or recognition
- `community_involvement` — Local community engagement

**Prohibited Sections:**
- Service-specific content (link to service pages)
- Location-specific content (link to location pages)
- Reviews (link to reviews page)

**Data Sources:**
- `business_profile` → hero, our_story, team, credentials, service_philosophy, service_areas, community_involvement
- `faq_collection` → faqs (filter: company-related questions, manually scoped)
- `static_config` → cta_conversion

**Uniqueness Driver:**
Not required. About page is singular. Structural uniqueness through dynamic team updates and credential additions.

---

### 11. CONTACT US PAGE

**Purpose:**
Provide multiple contact methods and convert contact form submissions. Facilitate easy communication.

**Required Sections (Ordered):**
1. `hero` — Contact value proposition
2. `contact_form` — Multi-step or single-step form (name, email, phone, service interest, message)
3. `contact_methods` — Phone, email, hours of operation
4. `locations` — All locations with addresses (list or map)
5. `response_time` — Expected response timeframe
6. `faqs` — Contact-related FAQs (2-3 questions)
7. `cta_emergency` — Emergency contact CTA (if different from standard)

**Optional Sections:**
- `location_map` — Interactive map with all locations
- `booking_link` — Direct booking system integration

**Prohibited Sections:**
- Service descriptions (use form dropdown instead)
- Promotional offers
- Reviews

**Data Sources:**
- `business_profile` → contact_methods, response_time, cta_emergency
- `location_collection` → locations (all locations with addresses)
- `faq_collection` → faqs (filter: contact-related questions, manually scoped)
- `static_config` → contact_form configuration

**Uniqueness Driver:**
Not required. Contact page is singular. Structural uniqueness through dynamic location additions.

---

### 12. BLOG ARTICLE

**Purpose:**
Establish topical authority, drive organic traffic, and provide educational value. Support service pages with long-form content.

**Required Sections (Ordered):**
1. `hero` — Article title, publish date, author, category
2. `article_intro` — Problem statement, article overview
3. `article_body` — Structured content (H2/H3 sections, images, lists)
4. `article_conclusion` — Summary, key takeaways
5. `related_services` — Services related to article topic (2-3)
6. `related_articles` — Other blog posts in same category (3-4)
7. `author_bio` — Author credentials and expertise
8. `cta_conversion` — Related service CTA

**Optional Sections:**
- `table_of_contents` — For long-form articles (>1500 words)
- `faqs` — Article-specific FAQs embedded in content
- `image_gallery` — For visual how-to guides

**Prohibited Sections:**
- Service pricing (link to service pages)
- Location-specific information (keep articles geographically neutral)
- Promotional offers in article body (use CTA section)

**Data Sources:**
- `blog_collection` → hero, article_intro, article_body, article_conclusion, author_bio
- `service_collection` → related_services (manually tagged or category-matched)
- `blog_collection` → related_articles (filter: same category, exclude current article)
- `static_config` → cta_conversion

**Uniqueness Driver:**
Article slug + unique article content. Each article has unique topic, research, examples, and structure.

---

## VALIDATION CHECKPOINTS

Before content population, verify:

1. Every page type has required sections defined
2. Every section maps to a data source
3. No page type allows prohibited sections
4. Uniqueness drivers are explicit and measurable
5. Optional sections are clearly marked
6. Section order is locked

**This document is IMMUTABLE without architecture review.**
