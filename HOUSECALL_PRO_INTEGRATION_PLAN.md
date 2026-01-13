# Housecall Pro Integration Plan
## B.A.P Heating & Cooling Website Enhancement Strategy

**Document Version:** 1.0
**Created:** January 2026
**Objective:** Integrate Housecall Pro capabilities to boost user experience, local SEO, and customer confidence

---

## Executive Summary

This plan outlines a phased approach to deeply integrate Housecall Pro with the B.A.P Heating & Cooling website. The current implementation only uses an external booking link. This plan leverages HCP's full capabilities including the API (requires MAX plan), webhooks, widgets, and native features to create a seamless, trust-building customer experience.

---

## Current State Analysis

### What's Already Implemented
| Feature | Status | Implementation |
|---------|--------|----------------|
| Online Booking | ✅ Basic | External link to `book.housecallpro.com` |
| Reviews | ✅ Partial | Manual YAML files, HCP listed as source option |
| Analytics | ✅ Active | GA4 with CTA tracking |
| Service Pages | ✅ Complete | 30+ services × 30+ locations = ~900 pages |

### Gaps & Opportunities
- No embedded booking widget (users leave site)
- No live review sync (manual content management)
- No chat widget for instant customer engagement
- No real-time availability display
- No customer portal integration
- No automated follow-up visibility

---

## Integration Tiers

### Tier 1: No API Required (All Plans)
### Tier 2: Zapier/Make Automations (Essentials+)
### Tier 3: Full API Integration (MAX Plan Required)

---

## Phase 1: Quick Wins (No API Required)
**Timeline Estimate:** Can be implemented immediately
**Impact:** High | **Effort:** Low

### 1.1 Embedded Booking Widget
**What:** Replace external booking links with embedded modal widget

**Implementation:**
```astro
<!-- BookingWidget.astro -->
<script is:inline>
  // Housecall Pro Booking Widget Embed Code
  (function() {
    var script = document.createElement('script');
    script.src = 'https://online-booking.housecallpro.com/widget.js';
    script.setAttribute('data-company-id', 'YOUR_COMPANY_ID');
    script.setAttribute('data-button-color', '#2563eb'); // Match brand blue
    document.head.appendChild(script);
  })();
</script>
```

**Benefits:**
- Users stay on your site (reduced bounce rate)
- Seamless booking experience
- Better conversion tracking
- Mobile-optimized overlay

**Files to modify:**
- `/src/components/primitives/Button.astro` - Add booking widget trigger variant
- `/src/layouts/BaseLayout.astro` - Include widget script globally
- `/src/lib/ctaResolver.ts` - Update CTA logic for embedded booking

### 1.2 Chat Widget Integration
**What:** Add Housecall Pro's live chat to website

**Implementation:**
```html
<!-- Add to BaseLayout.astro before </body> -->
<script
  src="https://chat.housecallpro.com/widget.js"
  data-company-id="YOUR_COMPANY_ID"
  data-position="bottom-right"
  data-primary-color="#2563eb">
</script>
```

**Benefits:**
- Instant customer engagement 24/7
- Lead capture for after-hours inquiries
- Photo/video sharing for quick diagnostics
- Integrated with HCP inbox

**Placement Strategy:**
- All service pages (high intent)
- Homepage (general inquiries)
- Contact page (alternative to forms)
- NOT on blog pages (lower intent)

### 1.3 Google Business Profile Booking Integration
**What:** Enable "Book Online" button directly in Google Search results

**Setup in Housecall Pro:**
1. Marketing Center → Online Booking → Google Integration
2. Connect Google Business Profile
3. Enable booking button

**SEO Impact:**
- Higher click-through rates from search
- Direct booking from Google Maps
- Improved local pack visibility
- Rich results with booking action

### 1.4 Review Request Automation
**What:** Configure HCP to automatically request reviews after job completion

**Optimal Distribution:**
| Platform | Percentage | Rationale |
|----------|------------|-----------|
| Google | 60% | Strongest SEO impact |
| HCP Website Reviews | 30% | On-site social proof |
| Facebook | 10% | Social media presence |

**Setup:**
1. HCP → Reviews → Distribution Settings
2. Set percentages as above
3. Enable email + SMS review requests
4. Customize review request timing (2 hours post-job)

---

## Phase 2: Enhanced Trust Signals (No API Required)
**Timeline Estimate:** 1-2 development cycles
**Impact:** High | **Effort:** Medium

### 2.1 Dynamic Reviews Display Component
**What:** Create a new component that prominently displays review metrics

**New Component: `/src/components/ReviewMetrics.astro`**
```astro
---
import { getBusinessProfile } from '@/lib/getBusinessProfile';
const profile = await getBusinessProfile();
const { googleRating, reviewCount } = profile.trustSignals;
---

<div class="review-metrics bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 shadow-lg">
  <div class="flex items-center gap-6">
    <!-- Google Rating -->
    <div class="text-center">
      <div class="text-4xl font-bold text-blue-600">{googleRating}</div>
      <div class="flex justify-center text-yellow-400 text-xl">★★★★★</div>
      <div class="text-sm text-gray-600 mt-1">Google Rating</div>
    </div>

    <!-- Review Count -->
    <div class="text-center border-l border-blue-200 pl-6">
      <div class="text-4xl font-bold text-blue-600">{reviewCount}+</div>
      <div class="text-sm text-gray-600 mt-1">Verified Reviews</div>
    </div>

    <!-- Trust Badge -->
    <div class="text-center border-l border-blue-200 pl-6">
      <img src="/images/housecall-pro-badge.svg" alt="Housecall Pro Verified" class="h-12 mx-auto" />
      <div class="text-sm text-gray-600 mt-1">Verified Business</div>
    </div>
  </div>

  <!-- CTA -->
  <div class="mt-4 text-center">
    <a href="/reviews/" class="text-blue-600 hover:text-blue-800 font-medium">
      Read all customer reviews →
    </a>
  </div>
</div>
```

**Placement:**
- Homepage hero section (above fold)
- All service category pages
- Contact page
- Location pages

### 2.2 "On My Way" Real-Time Tracking Page
**What:** Create a landing page for customers receiving "On My Way" notifications

**New Page: `/src/pages/technician-arrival.astro`**

**Content:**
- Technician photo and name (when available)
- Estimated arrival time
- Company contact information
- What to expect during the visit
- Safety protocols and credentials
- Customer preparation checklist

**Benefits:**
- Professional experience
- Reduces no-shows
- Builds trust before arrival
- SEO value for branded searches

### 2.3 Service Price Transparency Section
**What:** Display service pricing ranges from HCP price book

**Implementation:**
- Create pricing tables for common services
- Show "Starting at $X" pricing
- Include "Get Exact Quote" CTA
- Match services to HCP price book categories

**New Component: `/src/components/services/PricingTable.astro`**
```astro
---
interface Props {
  category: 'heating' | 'cooling' | 'iaq';
}

const pricingData = {
  heating: [
    { service: 'Furnace Tune-Up', startingPrice: 129, description: 'Annual maintenance inspection' },
    { service: 'Furnace Repair', startingPrice: 199, description: 'Diagnosis + standard repairs' },
    { service: 'Furnace Installation', startingPrice: 3500, description: 'Complete replacement' },
  ],
  // ... more categories
};
---

<div class="pricing-table">
  {pricingData[Astro.props.category].map(item => (
    <div class="pricing-row">
      <span class="service-name">{item.service}</span>
      <span class="price">Starting at ${item.startingPrice}</span>
      <button data-booking-trigger>Get Exact Price</button>
    </div>
  ))}
</div>
```

---

## Phase 3: Zapier/Make Automations (Essentials+ Plan)
**Impact:** Medium-High | **Effort:** Medium

### 3.1 Automated Review Sync to Website
**What:** When new reviews come in via HCP, automatically update website content

**Zapier Workflow:**
```
Trigger: New Review in Housecall Pro
Action 1: Format review data
Action 2: Create/Update YAML file via GitHub API
Action 3: Trigger Astro site rebuild (via webhook)
```

**Alternative: Manual Review Pipeline**
```
HCP Review → Email Notification → Staff Review → Add to /src/content/reviews/
```

### 3.2 Job Completion → Thank You Page
**What:** Create personalized thank-you pages after job completion

**Workflow:**
```
Trigger: Job marked "Complete" in HCP
Action: Generate unique thank you URL
Content:
  - Service performed
  - Technician name
  - Review request links
  - Referral incentive
  - Related services upsell
```

### 3.3 Estimate Follow-Up Automation
**What:** Automated nurture sequence for pending estimates

**Workflow:**
```
Trigger: Estimate sent (not approved after 48h)
Actions:
  - Day 2: Email reminder with FAQ link
  - Day 5: SMS with financing options link
  - Day 10: Final follow-up with limited-time offer
```

---

## Phase 4: Full API Integration (MAX Plan Required)
**Impact:** Very High | **Effort:** High

### 4.1 Real-Time Availability Calendar
**What:** Show actual availability on service pages

**API Endpoint:** `GET /schedule/availability`

**New Component: `/src/components/booking/AvailabilityCalendar.astro`**
```astro
---
// Server-side fetch during build won't work for real-time
// This needs to be a client-side component
---

<div id="availability-calendar" class="bg-white rounded-xl shadow-lg p-6">
  <h3 class="text-xl font-bold mb-4">Next Available Appointments</h3>
  <div id="calendar-slots" class="grid grid-cols-3 gap-2">
    <!-- Populated via JavaScript -->
  </div>
  <p class="text-sm text-gray-500 mt-4">
    Select a time to book instantly
  </p>
</div>

<script>
  async function loadAvailability() {
    const response = await fetch('/api/availability');
    const slots = await response.json();
    // Render available time slots
  }
  loadAvailability();
</script>
```

**Requires:** Serverless function or edge function for API proxy

### 4.2 Live Review Feed with Webhooks
**What:** Automatically sync reviews in real-time

**Webhook Events:**
- `review.created` - New review submitted
- `review.updated` - Review modified

**Implementation:**
```javascript
// /api/webhooks/housecall.js (Serverless function)
export async function POST(request) {
  const payload = await request.json();
  const signature = request.headers.get('X-HCP-Signature');

  // Verify webhook signature
  if (!verifySignature(payload, signature)) {
    return new Response('Unauthorized', { status: 401 });
  }

  if (payload.event === 'review.created') {
    // Add to content collection
    await addReviewToContent(payload.data);
    // Trigger site rebuild
    await triggerRebuild();
  }

  return new Response('OK', { status: 200 });
}
```

### 4.3 Customer Portal Deep Link
**What:** Allow existing customers to access their HCP portal from your site

**New Page: `/src/pages/my-account.astro`**

**Features:**
- Link to HCP customer portal
- View past jobs/invoices
- Schedule new service
- Access maintenance plan details
- Payment history

### 4.4 Service-Specific Dynamic Pricing
**What:** Pull prices from HCP Price Book API

**API Endpoint:** `GET /pricebook/services`

**Benefits:**
- Always-accurate pricing on website
- No manual updates needed
- Can show promotional pricing
- Syncs with estimates

### 4.5 Technician Profiles Integration
**What:** Display real technician profiles on website

**API Data:**
- Technician name and photo
- Certifications
- Customer rating
- Specializations

**New Component: `/src/components/team/TechnicianCard.astro`**

---

## Phase 5: Advanced SEO Enhancements
**Impact:** High | **Effort:** Medium

### 5.1 Enhanced Schema Markup
**What:** Add HCP-specific structured data

**LocalBusiness Schema Additions:**
```json
{
  "@type": "HVACBusiness",
  "priceRange": "$$",
  "paymentAccepted": ["Credit Card", "Debit Card", "Financing"],
  "areaServed": [...],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "HVAC Services",
    "itemListElement": [...]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "407",
    "bestRating": "5"
  },
  "potentialAction": {
    "@type": "ReserveAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://book.housecallpro.com/book/BAP-Heating...",
      "actionPlatform": ["http://schema.org/DesktopWebPlatform"]
    }
  }
}
```

### 5.2 Review Rich Snippets
**What:** Ensure reviews appear in search results

**Implementation:**
- Add `Review` schema to individual review items
- Add `AggregateRating` to service pages
- Include `author`, `datePublished`, `reviewRating`

### 5.3 FAQ Schema from HCP Data
**What:** Generate FAQ schema from common customer questions

**Sources:**
- HCP chat history (common questions)
- Review analysis (pain points)
- Estimate questions

### 5.4 Service Area Pages with Booking
**What:** Enhance location pages with embedded booking

**For each location page:**
- Show services available in that area
- Display local reviews
- Embedded booking with location pre-selected
- Local phone number (if applicable)
- Estimated response time for that area

---

## Implementation Priority Matrix

| Feature | Impact | Effort | Priority | Tier |
|---------|--------|--------|----------|------|
| Embedded Booking Widget | High | Low | 🔴 P0 | 1 |
| Chat Widget | High | Low | 🔴 P0 | 1 |
| Google Business Booking | High | Low | 🔴 P0 | 1 |
| Review Metrics Component | High | Low | 🔴 P0 | 1 |
| Review Request Config | Medium | Low | 🟡 P1 | 1 |
| Enhanced Schema Markup | High | Medium | 🟡 P1 | 1 |
| Pricing Tables | Medium | Medium | 🟡 P1 | 1 |
| Technician Arrival Page | Medium | Low | 🟡 P1 | 1 |
| Zapier Review Sync | Medium | Medium | 🟢 P2 | 2 |
| Estimate Follow-Up | Medium | Medium | 🟢 P2 | 2 |
| Real-Time Availability | High | High | 🔵 P3 | 3 |
| Live Review Webhooks | High | High | 🔵 P3 | 3 |
| Dynamic Pricing | Medium | High | 🔵 P3 | 3 |
| Customer Portal | Low | Medium | 🔵 P3 | 3 |

---

## Technical Requirements

### For Tier 1 (No API):
- Housecall Pro account (any plan)
- Website access to add embed codes
- Google Business Profile connected

### For Tier 2 (Automations):
- Housecall Pro Essentials plan or higher
- Zapier or Make.com account
- GitHub access (for automated content updates)
- Webhook endpoint (Netlify/Vercel function)

### For Tier 3 (Full API):
- Housecall Pro MAX plan
- API key from HCP dashboard
- Serverless function capability
- Secure environment variable storage

---

## Files to Create/Modify

### New Files:
```
/src/components/booking/
├── BookingWidget.astro          # Embedded booking modal
├── AvailabilityCalendar.astro   # Real-time slots (Phase 4)
└── QuickBook.astro              # Inline booking form

/src/components/reviews/
├── ReviewMetrics.astro          # Trust signal banner
├── LiveReviewFeed.astro         # Auto-updating reviews
└── ReviewCarousel.astro         # Animated review slider

/src/components/chat/
└── ChatWidget.astro             # HCP chat integration

/src/components/services/
├── PricingTable.astro           # Service pricing display
└── ServiceAvailability.astro    # Available now badge

/src/pages/
├── technician-arrival.astro     # On-my-way landing page
├── my-account.astro             # Customer portal link
└── api/
    ├── availability.ts          # Availability API proxy
    └── webhooks/housecall.ts    # Webhook handler

/src/lib/
├── housecallpro.ts              # HCP API client
└── webhookVerifier.ts           # Signature verification
```

### Modified Files:
```
/src/layouts/BaseLayout.astro    # Add widget scripts
/src/lib/ctaResolver.ts          # Update for embedded booking
/src/lib/schema.ts               # Enhanced structured data
/src/content/business/profile.yaml # Add HCP config section
```

---

## Measuring Success

### Key Metrics to Track:

| Metric | Current | Target | How to Measure |
|--------|---------|--------|----------------|
| Booking Conversion Rate | Unknown | +25% | GA4 goal tracking |
| Bounce Rate (Contact pages) | Unknown | -15% | GA4 behavior |
| Reviews per Month | ~3 manual | 40+ auto | HCP dashboard |
| Google Review Rating | 4.8 | Maintain 4.8+ | GBP dashboard |
| Time to Book | Unknown | <2 min | User testing |
| Chat Conversations | 0 | 50+/month | HCP chat metrics |

### GA4 Events to Add:
```javascript
// Booking widget interactions
gtag('event', 'booking_widget_open', { location: 'homepage' });
gtag('event', 'booking_widget_complete', { service: 'furnace-repair' });

// Chat interactions
gtag('event', 'chat_started', { page: window.location.pathname });
gtag('event', 'chat_converted', { outcome: 'booking' });

// Review interactions
gtag('event', 'review_read', { review_source: 'google' });
gtag('event', 'review_link_clicked', { destination: 'google' });
```

---

## Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| HCP API downtime | Low | High | Fallback to static content |
| Widget loading slow | Medium | Medium | Lazy load, performance budget |
| Review spam | Low | Medium | Verified-only display |
| Price book mismatch | Medium | Low | Regular sync schedule |
| Chat overwhelm | Low | Medium | Set business hours in widget |

---

## Next Steps

### Immediate Actions (This Week):
1. [ ] Verify current Housecall Pro plan level
2. [ ] Get HCP company ID for widget embeds
3. [ ] Connect Google Business Profile to HCP (if not done)
4. [ ] Configure review distribution percentages in HCP

### Development Sprint 1:
1. [ ] Implement embedded booking widget
2. [ ] Add chat widget with conditional loading
3. [ ] Create ReviewMetrics component
4. [ ] Update schema.ts with enhanced markup

### Development Sprint 2:
1. [ ] Build pricing table components
2. [ ] Create technician-arrival page
3. [ ] Set up Zapier review automation (if applicable)
4. [ ] Add GA4 event tracking for new features

---

## Appendix: Housecall Pro Resources

### Documentation:
- [API Documentation](https://docs.housecallpro.com/)
- [Help Center](https://help.housecallpro.com/)
- [Online Booking Setup](https://help.housecallpro.com/en/collections/2365038-how-to-integrate-online-booking)
- [Reviews Setup](https://help.housecallpro.com/en/collections/1843616-reviews)
- [Chat Widget](https://help.housecallpro.com/en/articles/6060766-add-a-chat-widget-to-your-website)
- [Webhooks Guide](https://help.housecallpro.com/en/articles/5683520-how-to-enable-webhooks)

### API Endpoints (MAX Plan):
- `GET /customers` - Customer data
- `GET /jobs` - Job information
- `GET /invoices` - Invoice data
- `GET /estimates` - Estimate information
- `GET /pricebook/services` - Service pricing
- Webhooks: customer.*, job.*, estimate.*, invoice.*, review.*

### Support:
- Housecall Pro Support: support@housecallpro.com
- API Support: api-support@housecallpro.com

---

*This document should be reviewed quarterly and updated as Housecall Pro releases new features or API capabilities.*
