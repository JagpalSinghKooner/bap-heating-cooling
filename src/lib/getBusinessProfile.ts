import { getEntry } from 'astro:content';

export type BusinessProfile = {
  business: {
    legal_name: string;
    trading_name: string | null;
    established_year: number;
    owner_public: {
      name: string;
      roles: string[];
    };
    tone: {
      style: string;
      language: string;
      avoid_words: string[];
      seo_note: string;
    };
  };
  contact: {
    phone_display: string;
    phone_e164: string;
    email: string;
    primary_cta: {
      short: string;
      long: string;
    };
    booking: {
      enabled: boolean;
      provider: string;
      url: string;
    };
  };
  hours: {
    business_hours: string;
    emergency_service: boolean;
    phone_answered_24_7: boolean;
    target_response_time_minutes: number;
    response_time_statement: string;
  };
  locations: {
    primary: {
      name: string;
      address_full: string;
      city: string;
      province: string;
      postal_code: string;
      country: string;
      phone_e164: string;
      email: string;
      google_maps_embed?: string;
    };
    secondary: {
      name: string;
      address_full: string;
      city: string;
      province: string;
      postal_code: string;
      country: string;
      phone_e164: string;
      email: string;
      google_maps_embed?: string;
    };
  };
  coverage: {
    service_model: string;
    exclusions: string[];
    regions_enabled: boolean;
    regions: Array<{
      name: string;
      locations: Array<{
        name: string;
        slug: string;
      }>;
    }>;
  };
  services: {
    notes?: string[];
    navbar_categories: Array<{
      name: string;
      key: string;
    }>;
    list?: {
      heating?: Array<{ title: string; slug: string }>;
      cooling?: Array<{ title: string; slug: string }>;
      iaq?: Array<{ title: string; slug: string }>;
      water_heating?: Array<{ title: string; slug: string }>;
      commercial?: Array<{ title: string; slug: string }>;
      plans?: Array<{ title: string; slug: string }>;
    };
  };
  brands_and_capability?: {
    install_brands: string;
    service_brands: string;
    certifications_statement: string;
    rooftop_units_industries: string;
    project_types: string;
  };
  trust_and_compliance?: {
    licenses: {
      note: string;
      tssa: {
        numbers: string[];
      };
      other: string[];
    };
    wsib: boolean;
    insured_statement: string;
  };
  pricing_and_offers?: {
    estimates_free: boolean;
    diagnostic_free: boolean;
    financing: {
      available: boolean;
      statement: string;
    };
    rebates: {
      paperwork_supported: boolean;
      statement: string;
    };
  };
  warranty_and_guarantees?: {
    warranty_statement: string;
    guarantee_primary: {
      title: string;
      copy: string;
    };
    guarantee_secondary: {
      title: string;
      copy: string;
    };
    transparency_policy: boolean;
  };
  reputation: {
    google_rating: number;
    google_review_count: number;
    review_statement: string;
    live_reviews?: {
      enabled: boolean;
      note: string;
    };
  };
  social: {
    instagram: string;
    facebook: string;
  };
  warranty: {
    parts_and_labour_years: number;
    statement: string;
  };
  seo_url_rules: {
    combined_pages: {
      suffix: string;
      example: string;
      rule: string;
    };
  };
  copy_blocks?: {
    short_description: string;
    long_description: string;
    primary_cta_copy: string;
    secondary_cta_copy: string;
    trust_highlights: string[];
    about_us_owner_mention: string;
    service_in_city_intro_template: string;
    locations_page_intro: string;
    services_page_intro: string;
  };
};

/**
 * Get the business profile (single source of truth)
 * This should be the only way to access business data across the site
 */
export async function getBusinessProfile(): Promise<BusinessProfile> {
  const entry = await getEntry('business', 'profile');

  if (!entry) {
    throw new Error('Business profile not found at src/content/business/profile.yaml');
  }

  return entry.data as BusinessProfile;
}

/**
 * Get the company display name
 * Prefers trading_name if set, otherwise uses legal_name
 */
export function getCompanyName(profile: BusinessProfile): string {
  return profile.business.trading_name || profile.business.legal_name;
}

/**
 * Get formatted phone number for display
 */
export function getPhoneDisplay(profile: BusinessProfile): string {
  return profile.contact.phone_display;
}

/**
 * Get phone number in E.164 format for tel: links
 */
export function getPhoneLink(profile: BusinessProfile): string {
  return `tel:${profile.contact.phone_e164}`;
}

/**
 * Get email address
 */
export function getEmail(profile: BusinessProfile): string {
  return profile.contact.email;
}

/**
 * Get mailto link
 */
export function getEmailLink(profile: BusinessProfile): string {
  return `mailto:${profile.contact.email}`;
}
