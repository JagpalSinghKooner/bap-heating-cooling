# SECTION REGISTRY — B.A.P Heating & Cooling

**Version:** 1.0.0
**Date:** 2026-01-09
**Status:** LOCKED — Global section definitions

---

## PURPOSE

This is the **canonical registry** of all allowed content sections across the B.A.P Heating & Cooling website.

Every section used on any page type MUST be defined here.

---

## REGISTRY FORMAT

Each section defines:
- **Section ID** — Machine-safe identifier (kebab-case)
- **Human Name** — Display name for editors
- **Page Types Allowed** — Where this section can appear
- **Status** — Required | Optional | Conditional
- **Data Dependencies** — Which data sources this section consumes
- **Contributes to Uniqueness** — Yes | No | Conditional

---

## SECTION DEFINITIONS

### HERO SECTIONS

#### `hero`
- **Human Name:** Hero / Above-the-Fold
- **Page Types Allowed:** ALL
- **Status:** Required on all page types
- **Data Dependencies:**
  - `business_profile` (phone, primary CTA)
  - Page-specific collection (`service_collection`, `location_collection`, `region_collection`, `blog_collection`)
- **Contributes to Uniqueness:** Yes (page-specific title, CTA, and context)

---

### NAVIGATION & STRUCTURE

#### `breadcrumbs`
- **Human Name:** Breadcrumb Navigation
- **Page Types Allowed:** ALL (except Homepage)
- **Status:** Required on all dynamic pages, Optional on static pages
- **Data Dependencies:**
  - URL structure
  - Page hierarchy (service → service-in-city, region → location)
- **Contributes to Uniqueness:** No

#### `table_of_contents`
- **Human Name:** Table of Contents
- **Page Types Allowed:** Blog Article
- **Status:** Optional (required for articles >1500 words)
- **Data Dependencies:**
  - `blog_collection` (article headings H2/H3)
- **Contributes to Uniqueness:** No

---

### CONTENT SECTIONS

#### `service_description`
- **Human Name:** Service Description
- **Page Types Allowed:** Service, Service-in-City
- **Status:** Required
- **Data Dependencies:**
  - `service_collection` (description field)
- **Contributes to Uniqueness:** Yes (unique per service)

#### `service_details`
- **Human Name:** Service Details / Features
- **Page Types Allowed:** Service, Service-in-City
- **Status:** Required
- **Data Dependencies:**
  - `service_collection` (custom content fields)
- **Contributes to Uniqueness:** Yes (unique per service)

#### `location_overview`
- **Human Name:** Location Overview
- **Page Types Allowed:** Location
- **Status:** Required
- **Data Dependencies:**
  - `location_collection` (description, serviceArea fields)
- **Contributes to Uniqueness:** Yes (unique per location)

#### `local_context`
- **Human Name:** Local Context (City-Specific)
- **Page Types Allowed:** Service-in-City
- **Status:** Required
- **Data Dependencies:**
  - `location_collection` (description, geographic context)
  - `service_collection` (service context)
- **Contributes to Uniqueness:** Yes (unique combination of service + city context)

#### `region_overview`
- **Human Name:** Region Overview
- **Page Types Allowed:** Region
- **Status:** Required
- **Data Dependencies:**
  - `region_collection` (description field)
- **Contributes to Uniqueness:** Yes (unique per region)

#### `our_story`
- **Human Name:** Our Story / Company History
- **Page Types Allowed:** About Us
- **Status:** Required
- **Data Dependencies:**
  - `business_profile` (owner_public, established_year, company history)
- **Contributes to Uniqueness:** No (static content)

#### `article_intro`
- **Human Name:** Article Introduction
- **Page Types Allowed:** Blog Article
- **Status:** Required
- **Data Dependencies:**
  - `blog_collection` (content body)
- **Contributes to Uniqueness:** Yes (unique per article)

#### `article_body`
- **Human Name:** Article Body Content
- **Page Types Allowed:** Blog Article
- **Status:** Required
- **Data Dependencies:**
  - `blog_collection` (markdown content)
- **Contributes to Uniqueness:** Yes (unique per article)

#### `article_conclusion`
- **Human Name:** Article Conclusion / Key Takeaways
- **Page Types Allowed:** Blog Article
- **Status:** Required
- **Data Dependencies:**
  - `blog_collection` (content body)
- **Contributes to Uniqueness:** Yes (unique per article)

#### `financing_overview`
- **Human Name:** Financing Options Overview
- **Page Types Allowed:** Financing
- **Status:** Required
- **Data Dependencies:**
  - `business_profile` (financing options, partners)
- **Contributes to Uniqueness:** No (static content, dynamically updated)

#### `rebates_overview`
- **Human Name:** Rebates Programs Overview
- **Page Types Allowed:** Rebates
- **Status:** Required
- **Data Dependencies:**
  - `business_profile` (rebates info)
  - `static_config` (program details)
- **Contributes to Uniqueness:** No (static content, dynamically updated)

#### `emergency_services`
- **Human Name:** Emergency Services Details
- **Page Types Allowed:** Emergency HVAC
- **Status:** Required
- **Data Dependencies:**
  - `business_profile` (24/7 availability, emergency phone)
  - `service_collection` (emergency-eligible services)
- **Contributes to Uniqueness:** No (static content)

---

### SERVICE & NAVIGATION SECTIONS

#### `services_overview`
- **Human Name:** Services Overview Grid
- **Page Types Allowed:** Homepage, Region
- **Status:** Required
- **Data Dependencies:**
  - `service_collection` (filter: featured=true OR priority=true for Homepage; all services for Region)
- **Contributes to Uniqueness:** Conditional (static on Homepage, unique per region on Region pages)

#### `services_in_location`
- **Human Name:** Services Available in Location
- **Page Types Allowed:** Location
- **Status:** Required
- **Data Dependencies:**
  - `service_collection` (all services)
  - `location_collection` (current location for filtering)
- **Contributes to Uniqueness:** Yes (unique service availability per location)

#### `related_services`
- **Human Name:** Related Services
- **Page Types Allowed:** Service, Blog Article
- **Status:** Required on Service, Optional on Blog Article
- **Data Dependencies:**
  - `service_collection` (filter: same category, exclude current service)
- **Contributes to Uniqueness:** Yes (unique per service category)

#### `related_services_in_city`
- **Human Name:** Related Services in This City
- **Page Types Allowed:** Service-in-City
- **Status:** Required
- **Data Dependencies:**
  - `service_collection` (filter: same category)
  - `location_collection` (current location)
- **Contributes to Uniqueness:** Yes (unique combination per service + city)

#### `other_locations_for_service`
- **Human Name:** This Service in Other Cities
- **Page Types Allowed:** Service-in-City
- **Status:** Required
- **Data Dependencies:**
  - `service_collection` (current service)
  - `location_collection` (nearby locations)
- **Contributes to Uniqueness:** Yes (unique per service)

#### `services_eligible`
- **Human Name:** Services Eligible (Financing/Rebates)
- **Page Types Allowed:** Financing, Rebates
- **Status:** Required
- **Data Dependencies:**
  - `service_collection` (filter: financing-eligible or rebate-eligible)
- **Contributes to Uniqueness:** No (static list)

---

### LOCATION & GEOGRAPHIC SECTIONS

#### `service_areas`
- **Human Name:** Service Areas Overview
- **Page Types Allowed:** Homepage, Service, Emergency HVAC, About Us
- **Status:** Required on Homepage and Emergency HVAC, Optional on Service and About Us
- **Data Dependencies:**
  - `region_collection` (all regions)
  - `location_collection` (all locations)
- **Contributes to Uniqueness:** No (static list)

#### `location_details`
- **Human Name:** Location-Specific Details
- **Page Types Allowed:** Service-in-City
- **Status:** Required
- **Data Dependencies:**
  - `location_collection` (address, serviceArea, phone, response time)
- **Contributes to Uniqueness:** Yes (unique per location)

#### `cities_in_region`
- **Human Name:** Cities in This Region
- **Page Types Allowed:** Region
- **Status:** Required
- **Data Dependencies:**
  - `region_collection` (cities field)
  - `location_collection` (filter: locations in current region)
- **Contributes to Uniqueness:** Yes (unique per region)

#### `region_context`
- **Human Name:** Region Context (Parent Region Info)
- **Page Types Allowed:** Location
- **Status:** Required
- **Data Dependencies:**
  - `location_collection` (region field)
  - `region_collection` (region details)
- **Contributes to Uniqueness:** Conditional (same for all locations in a region)

#### `locations`
- **Human Name:** All Locations List
- **Page Types Allowed:** Contact Us
- **Status:** Required
- **Data Dependencies:**
  - `location_collection` (all locations with addresses)
- **Contributes to Uniqueness:** No (static list)

#### `nearby_locations`
- **Human Name:** Nearby Locations
- **Page Types Allowed:** Location
- **Status:** Optional
- **Data Dependencies:**
  - `location_collection` (filter: same region, exclude current location)
- **Contributes to Uniqueness:** Yes (unique per location)

#### `service_area_map`
- **Human Name:** Service Area Map
- **Page Types Allowed:** Location
- **Status:** Optional
- **Data Dependencies:**
  - `location_collection` (serviceArea field)
- **Contributes to Uniqueness:** Yes (unique per location)

#### `region_map`
- **Human Name:** Region Coverage Map
- **Page Types Allowed:** Region
- **Status:** Optional
- **Data Dependencies:**
  - `region_collection` (cities field)
  - `location_collection` (geographic coordinates if available)
- **Contributes to Uniqueness:** Yes (unique per region)

---

### TRUST & CREDIBILITY SECTIONS

#### `trust_signals`
- **Human Name:** Trust Signals / Certifications
- **Page Types Allowed:** Homepage, Service, Emergency HVAC, About Us
- **Status:** Required on Homepage and About Us, Optional on Service and Emergency HVAC
- **Data Dependencies:**
  - `business_profile` (licenses, insurance, WSIB, certifications)
- **Contributes to Uniqueness:** No (static content)

#### `local_trust_signals`
- **Human Name:** Local Trust Signals
- **Page Types Allowed:** Location
- **Status:** Required
- **Data Dependencies:**
  - `business_profile` (response time, service history)
  - `location_collection` (local presence indicators)
- **Contributes to Uniqueness:** Conditional (may vary by location)

#### `regional_trust_signals`
- **Human Name:** Regional Trust Signals
- **Page Types Allowed:** Region
- **Status:** Required
- **Data Dependencies:**
  - `business_profile` (coverage stats, response time)
  - `region_collection` (regional service stats)
- **Contributes to Uniqueness:** Yes (unique per region)

#### `credentials`
- **Human Name:** Licenses & Credentials
- **Page Types Allowed:** About Us
- **Status:** Required
- **Data Dependencies:**
  - `business_profile` (licenses, insurance, certifications, industry affiliations)
- **Contributes to Uniqueness:** No (static content)

---

### REVIEWS & SOCIAL PROOF SECTIONS

#### `reviews`
- **Human Name:** Customer Reviews
- **Page Types Allowed:** Service, Service-in-City, Location, Region
- **Status:** Required
- **Data Dependencies:**
  - `reviews_collection` (filter by: service, location, region, verified=true)
- **Contributes to Uniqueness:** Yes (unique review combinations per page)

#### `reviews_carousel`
- **Human Name:** Reviews Carousel
- **Page Types Allowed:** Homepage
- **Status:** Required
- **Data Dependencies:**
  - `reviews_collection` (filter: verified=true, sort: rating DESC, date DESC)
- **Contributes to Uniqueness:** No (displays latest/highest rated)

#### `reviews_grid`
- **Human Name:** All Reviews Grid
- **Page Types Allowed:** Reviews
- **Status:** Required
- **Data Dependencies:**
  - `reviews_collection` (all reviews, paginated or filterable)
- **Contributes to Uniqueness:** No (all reviews displayed)

#### `reviews_stats`
- **Human Name:** Reviews Statistics
- **Page Types Allowed:** Reviews
- **Status:** Required
- **Data Dependencies:**
  - `reviews_collection` (aggregate: total count, average rating, rating distribution)
- **Contributes to Uniqueness:** No (calculated from all reviews)

#### `filter_controls`
- **Human Name:** Review Filter Controls
- **Page Types Allowed:** Reviews
- **Status:** Required
- **Data Dependencies:**
  - `reviews_collection` (available filters: service, location, rating, date)
- **Contributes to Uniqueness:** No (UI controls)

#### `featured_reviews`
- **Human Name:** Featured Reviews
- **Page Types Allowed:** Reviews
- **Status:** Optional
- **Data Dependencies:**
  - `reviews_collection` (filter: manually featured or highest rated)
- **Contributes to Uniqueness:** No (editorial selection)

---

### FAQ SECTIONS

#### `faqs`
- **Human Name:** Frequently Asked Questions
- **Page Types Allowed:** ALL page types
- **Status:** Required on most pages, Optional on Contact Us and Blog Article
- **Data Dependencies:**
  - `faq_collection` (filter by: pageType, service, location, region)
- **Contributes to Uniqueness:** Yes (unique FAQ combinations per page scope)

---

### CTA & CONVERSION SECTIONS

#### `cta_footer`
- **Human Name:** Footer CTA
- **Page Types Allowed:** Homepage
- **Status:** Required
- **Data Dependencies:**
  - `business_profile` (primary CTA, phone, booking link)
- **Contributes to Uniqueness:** No (static CTA)

#### `cta_conversion`
- **Human Name:** Primary Conversion CTA
- **Page Types Allowed:** ALL page types
- **Status:** Required
- **Data Dependencies:**
  - `business_profile` (CTA text, phone, booking link)
  - Page-specific context (localized CTAs for location/service-in-city pages)
- **Contributes to Uniqueness:** Conditional (localized vs generic)

#### `emergency_cta`
- **Human Name:** Emergency Service CTA
- **Page Types Allowed:** Homepage, Emergency HVAC
- **Status:** Required
- **Data Dependencies:**
  - `business_profile` (24/7 phone, emergency messaging)
- **Contributes to Uniqueness:** No (static CTA)

#### `financing_teaser`
- **Human Name:** Financing Options Teaser
- **Page Types Allowed:** Homepage
- **Status:** Required
- **Data Dependencies:**
  - `business_profile` (financing options, link to financing page)
- **Contributes to Uniqueness:** No (static teaser)

#### `application_cta`
- **Human Name:** Apply Now CTA (Financing)
- **Page Types Allowed:** Financing
- **Status:** Required
- **Data Dependencies:**
  - `business_profile` (financing application link)
  - `static_config` (CTA text)
- **Contributes to Uniqueness:** No (static CTA)

#### `cta_leave_review`
- **Human Name:** Leave a Review CTA
- **Page Types Allowed:** Reviews
- **Status:** Required
- **Data Dependencies:**
  - `business_profile` (review platform links)
  - `static_config` (CTA text)
- **Contributes to Uniqueness:** No (static CTA)

#### `cta_emergency`
- **Human Name:** Emergency Contact CTA (Contact Page)
- **Page Types Allowed:** Contact Us
- **Status:** Optional
- **Data Dependencies:**
  - `business_profile` (emergency phone, 24/7 availability)
- **Contributes to Uniqueness:** No (static CTA)

---

### SUPPORTING CONTENT SECTIONS

#### `how_it_works`
- **Human Name:** How It Works / Process
- **Page Types Allowed:** Financing, Emergency HVAC
- **Status:** Required
- **Data Dependencies:**
  - `business_profile` (process details for financing or emergency service)
  - `static_config` (process steps)
- **Contributes to Uniqueness:** No (static process)

#### `eligibility`
- **Human Name:** Eligibility Requirements
- **Page Types Allowed:** Financing, Rebates
- **Status:** Required
- **Data Dependencies:**
  - `business_profile` (financing requirements)
  - `static_config` (rebate eligibility)
- **Contributes to Uniqueness:** No (static requirements)

#### `benefits`
- **Human Name:** Benefits / Why Choose
- **Page Types Allowed:** Financing
- **Status:** Required
- **Data Dependencies:**
  - `static_config` (financing benefits)
- **Contributes to Uniqueness:** No (static content)

#### `how_to_claim`
- **Human Name:** How to Claim (Rebates)
- **Page Types Allowed:** Rebates
- **Status:** Required
- **Data Dependencies:**
  - `static_config` (rebate claim process)
- **Contributes to Uniqueness:** No (static process)

#### `rebate_amounts`
- **Human Name:** Rebate Amounts / Potential Savings
- **Page Types Allowed:** Rebates
- **Status:** Required
- **Data Dependencies:**
  - `static_config` (rebate program amounts)
- **Contributes to Uniqueness:** No (static data, dynamically updated)

#### `response_time`
- **Human Name:** Response Time Promise
- **Page Types Allowed:** Emergency HVAC, Contact Us
- **Status:** Required on Emergency HVAC, Optional on Contact Us
- **Data Dependencies:**
  - `business_profile` (response time guarantees)
- **Contributes to Uniqueness:** No (static promise)

#### `pricing_transparency`
- **Human Name:** Pricing Transparency
- **Page Types Allowed:** Emergency HVAC
- **Status:** Required
- **Data Dependencies:**
  - `business_profile` (emergency pricing, after-hours fees)
- **Contributes to Uniqueness:** No (static pricing)

#### `pricing_guidance`
- **Human Name:** Pricing Guidance (Service)
- **Page Types Allowed:** Service
- **Status:** Optional
- **Data Dependencies:**
  - `service_collection` (pricing factors, ballpark ranges)
- **Contributes to Uniqueness:** Yes (unique per service)

#### `warranty_info`
- **Human Name:** Warranty Information
- **Page Types Allowed:** Service
- **Status:** Optional
- **Data Dependencies:**
  - `service_collection` (service-specific warranties)
  - `business_profile` (general warranty terms)
- **Contributes to Uniqueness:** Conditional (may vary by service)

#### `service_philosophy`
- **Human Name:** Service Philosophy
- **Page Types Allowed:** About Us
- **Status:** Required
- **Data Dependencies:**
  - `business_profile` (approach to service, quality guarantees)
- **Contributes to Uniqueness:** No (static content)

#### `team`
- **Human Name:** Team Overview
- **Page Types Allowed:** About Us
- **Status:** Required
- **Data Dependencies:**
  - `business_profile` (team info, certifications, training)
- **Contributes to Uniqueness:** No (static content)

#### `author_bio`
- **Human Name:** Author Biography
- **Page Types Allowed:** Blog Article
- **Status:** Required
- **Data Dependencies:**
  - `blog_collection` (author field)
  - `static_config` (author profiles)
- **Contributes to Uniqueness:** No (same for all articles by same author)

---

### RELATED CONTENT SECTIONS

#### `related_articles`
- **Human Name:** Related Blog Articles
- **Page Types Allowed:** Blog Article
- **Status:** Required
- **Data Dependencies:**
  - `blog_collection` (filter: same category, exclude current article)
- **Contributes to Uniqueness:** Yes (unique per article category)

#### `recent_blog_posts`
- **Human Name:** Recent Blog Posts
- **Page Types Allowed:** Homepage
- **Status:** Optional
- **Data Dependencies:**
  - `blog_collection` (filter: featured=true OR latest 3)
- **Contributes to Uniqueness:** No (displays latest)

---

### FORM & CONTACT SECTIONS

#### `contact_form`
- **Human Name:** Contact Form
- **Page Types Allowed:** Contact Us
- **Status:** Required
- **Data Dependencies:**
  - `static_config` (form fields, validation rules)
- **Contributes to Uniqueness:** No (static form)

#### `contact_methods`
- **Human Name:** Contact Methods
- **Page Types Allowed:** Contact Us
- **Status:** Required
- **Data Dependencies:**
  - `business_profile` (phone, email, hours of operation)
- **Contributes to Uniqueness:** No (static contact info)

---

### OPTIONAL / CONDITIONAL SECTIONS

#### `brands_served`
- **Human Name:** Brands Served / Supported
- **Page Types Allowed:** Homepage, Service
- **Status:** Optional
- **Data Dependencies:**
  - `business_profile` (brands list)
  - `service_collection` (service-specific brands)
- **Contributes to Uniqueness:** Conditional (unique if service-specific)

#### `seasonal_promotion`
- **Human Name:** Seasonal Promotion
- **Page Types Allowed:** Homepage
- **Status:** Optional
- **Data Dependencies:**
  - `static_config` (promotion details, active dates)
- **Contributes to Uniqueness:** No (time-based, not page-based)

#### `emergency_notice`
- **Human Name:** Emergency Availability Notice
- **Page Types Allowed:** Service, Service-in-City
- **Status:** Optional
- **Data Dependencies:**
  - `service_collection` (emergency availability flag)
  - `business_profile` (24/7 phone)
- **Contributes to Uniqueness:** Conditional (only on emergency-eligible services)

#### `local_regulations`
- **Human Name:** Local Regulations / Permit Info
- **Page Types Allowed:** Service-in-City
- **Status:** Optional
- **Data Dependencies:**
  - `location_collection` (city-specific regulations)
  - `service_collection` (permit requirements)
- **Contributes to Uniqueness:** Yes (unique per city + service combination)

#### `local_projects`
- **Human Name:** Local Project Highlights
- **Page Types Allowed:** Service-in-City
- **Status:** Optional
- **Data Dependencies:**
  - `static_config` (case studies, project portfolio)
  - Filter by: service + location
- **Contributes to Uniqueness:** Yes (unique per service + city)

#### `local_landmarks`
- **Human Name:** Local Landmarks / Geographic Context
- **Page Types Allowed:** Location
- **Status:** Optional
- **Data Dependencies:**
  - `location_collection` (geographic context)
- **Contributes to Uniqueness:** Yes (unique per location)

#### `regional_highlights`
- **Human Name:** Regional Service Highlights
- **Page Types Allowed:** Region
- **Status:** Optional
- **Data Dependencies:**
  - `region_collection` (regional considerations)
- **Contributes to Uniqueness:** Yes (unique per region)

#### `recent_updates`
- **Human Name:** Recent Updates (Rebates)
- **Page Types Allowed:** Rebates
- **Status:** Optional
- **Data Dependencies:**
  - `static_config` (rebate program changes)
- **Contributes to Uniqueness:** No (time-based updates)

#### `program_deadlines`
- **Human Name:** Program Deadlines (Rebates)
- **Page Types Allowed:** Rebates
- **Status:** Optional
- **Data Dependencies:**
  - `static_config` (program end dates)
- **Contributes to Uniqueness:** No (time-based deadlines)

#### `case_studies`
- **Human Name:** Case Studies / Examples
- **Page Types Allowed:** Rebates
- **Status:** Optional
- **Data Dependencies:**
  - `static_config` (rebate success stories)
- **Contributes to Uniqueness:** No (static examples)

#### `common_emergencies`
- **Human Name:** Common Emergency Scenarios
- **Page Types Allowed:** Emergency HVAC
- **Status:** Optional
- **Data Dependencies:**
  - `static_config` (emergency examples)
- **Contributes to Uniqueness:** No (static content)

#### `prevention_tips`
- **Human Name:** Prevention Tips
- **Page Types Allowed:** Emergency HVAC
- **Status:** Optional
- **Data Dependencies:**
  - `blog_collection` (preventative maintenance articles)
  - `static_config` (tips list)
- **Contributes to Uniqueness:** No (static content)

#### `team_photos`
- **Human Name:** Team Photos
- **Page Types Allowed:** About Us
- **Status:** Optional
- **Data Dependencies:**
  - `business_profile` (team member photos)
- **Contributes to Uniqueness:** No (static gallery)

#### `awards_recognition`
- **Human Name:** Awards & Recognition
- **Page Types Allowed:** About Us
- **Status:** Optional
- **Data Dependencies:**
  - `business_profile` (awards, certifications, recognition)
- **Contributes to Uniqueness:** No (static list)

#### `community_involvement`
- **Human Name:** Community Involvement
- **Page Types Allowed:** About Us
- **Status:** Optional
- **Data Dependencies:**
  - `business_profile` (community programs, sponsorships)
- **Contributes to Uniqueness:** No (static content)

#### `calculator_teaser`
- **Human Name:** Financing Calculator Teaser
- **Page Types Allowed:** Financing
- **Status:** Optional
- **Data Dependencies:**
  - `static_config` (calculator link)
- **Contributes to Uniqueness:** No (static link)

#### `partner_logos`
- **Human Name:** Partner Logos (Financing)
- **Page Types Allowed:** Financing
- **Status:** Optional
- **Data Dependencies:**
  - `business_profile` (financing partners)
- **Contributes to Uniqueness:** No (static logos)

#### `promotional_offers`
- **Human Name:** Promotional Financing Offers
- **Page Types Allowed:** Financing
- **Status:** Optional
- **Data Dependencies:**
  - `business_profile` (current promotions)
- **Contributes to Uniqueness:** No (time-based promotions)

#### `review_sources`
- **Human Name:** Review Sources
- **Page Types Allowed:** Reviews
- **Status:** Optional
- **Data Dependencies:**
  - `reviews_collection` (source field)
- **Contributes to Uniqueness:** No (metadata display)

#### `location_map`
- **Human Name:** Interactive Location Map
- **Page Types Allowed:** Contact Us
- **Status:** Optional
- **Data Dependencies:**
  - `location_collection` (all locations with coordinates)
- **Contributes to Uniqueness:** No (shows all locations)

#### `booking_link`
- **Human Name:** Direct Booking Link
- **Page Types Allowed:** Contact Us
- **Status:** Optional
- **Data Dependencies:**
  - `business_profile` (booking system URL)
- **Contributes to Uniqueness:** No (static link)

#### `image_gallery`
- **Human Name:** Image Gallery
- **Page Types Allowed:** Blog Article
- **Status:** Optional
- **Data Dependencies:**
  - `blog_collection` (article images)
- **Contributes to Uniqueness:** Yes (unique per article)

---

## VALIDATION RULES

Before adding a section to any page:

1. **Check Registry:** Section MUST be defined here
2. **Verify Page Type:** Section must be allowed on that page type
3. **Confirm Data Source:** Required data source must exist
4. **Respect Status:** Required sections cannot be omitted, prohibited sections cannot be added
5. **Uniqueness Contribution:** Track whether section contributes to 80% uniqueness goal

---

## ADDING NEW SECTIONS

To add a new section:

1. Define section in this registry first
2. Specify allowed page types
3. Map data dependencies
4. Update CONTENT_MODEL_LOCK.md for affected page types
5. Update FAQ_SYSTEM_CONTRACT.md if section uses FAQ data
6. Update CONTENT_GOVERNANCE_RULES.md if section affects uniqueness

**This registry is IMMUTABLE without architecture review.**
