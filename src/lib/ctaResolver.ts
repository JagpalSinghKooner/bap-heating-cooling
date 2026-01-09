import type { BusinessProfile } from './getBusinessProfile';
import { getPhoneDisplay, getPhoneLink, getEmail, getEmailLink } from './getBusinessProfile';

/**
 * CTA variant types
 */
export type CTAVariant = 'call' | 'book' | 'email' | 'emergency';

/**
 * CTA context describes where the CTA is placed
 * Used for GA4 event_label tracking
 */
export type CTAContext =
  | 'homepage-hero'
  | 'homepage-footer'
  | 'service-above-fold'
  | 'service-footer'
  | 'service-city-hero'
  | 'service-city-footer'
  | 'category-pillar'
  | 'category-pillar-footer'
  | 'location-header'
  | 'location-footer'
  | 'region-header'
  | 'region-footer'
  | 'contact-primary'
  | 'contact-secondary'
  | 'financing-footer'
  | 'rebates-footer'
  | 'reviews-footer'
  | 'unknown';

/**
 * CTA configuration object
 */
export interface CTAConfig {
  variant: CTAVariant;
  label: string;
  href: string;
  ga4EventName: string;
  ariaLabel: string;
}

/**
 * Get CTA configuration for a given variant
 * @param profile Business profile
 * @param variant CTA variant type
 * @returns CTA configuration object
 */
export function getCTAConfig(
  profile: BusinessProfile,
  variant: CTAVariant
): CTAConfig {
  switch (variant) {
    case 'call':
      return {
        variant: 'call',
        label: `${profile.contact.primary_cta.short}: ${getPhoneDisplay(profile)}`,
        href: getPhoneLink(profile),
        ga4EventName: 'phone_call_click',
        ariaLabel: `Call ${getPhoneDisplay(profile)}`,
      };

    case 'emergency':
      return {
        variant: 'emergency',
        label: `24/7 Emergency: ${getPhoneDisplay(profile)}`,
        href: getPhoneLink(profile),
        ga4EventName: 'emergency_call_click',
        ariaLabel: `Call for emergency service ${getPhoneDisplay(profile)}`,
      };

    case 'book':
      return {
        variant: 'book',
        label: 'Book Online',
        href: profile.contact.booking.url,
        ga4EventName: 'booking_click',
        ariaLabel: 'Book appointment online with Housecall Pro',
      };

    case 'email':
      return {
        variant: 'email',
        label: `Email: ${getEmail(profile)}`,
        href: getEmailLink(profile),
        ga4EventName: 'email_click',
        ariaLabel: `Send email to ${getEmail(profile)}`,
      };
  }
}

/**
 * Helper: Get primary CTA (call)
 */
export function getPrimaryCTA(profile: BusinessProfile): CTAConfig {
  return getCTAConfig(profile, 'call');
}

/**
 * Helper: Get secondary CTA (book online)
 */
export function getSecondaryCTA(profile: BusinessProfile): CTAConfig {
  return getCTAConfig(profile, 'book');
}

/**
 * Helper: Get emergency CTA
 */
export function getEmergencyCTA(profile: BusinessProfile): CTAConfig {
  return getCTAConfig(profile, 'emergency');
}

/**
 * Helper: Get email CTA
 */
export function getEmailCTA(profile: BusinessProfile): CTAConfig {
  return getCTAConfig(profile, 'email');
}

/**
 * Get all contact CTAs (for contact page)
 */
export function getContactCTAs(profile: BusinessProfile): CTAConfig[] {
  return [
    getCTAConfig(profile, 'call'),
    getCTAConfig(profile, 'email'),
    getCTAConfig(profile, 'book'),
  ];
}
