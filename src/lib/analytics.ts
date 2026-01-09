/**
 * Google Analytics 4 and Consent Management
 * Privacy-ready analytics wiring with consent controls
 */

// Consent storage key
const CONSENT_KEY = 'bap_analytics_consent';

/**
 * Consent state type
 */
export type ConsentState = 'granted' | 'denied' | 'unknown';

/**
 * Get current analytics consent state
 * Reads from localStorage (client-side only)
 */
export function getAnalyticsConsent(): ConsentState {
  if (typeof window === 'undefined') {
    return 'unknown';
  }

  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === 'granted' || stored === 'denied') {
      return stored as ConsentState;
    }
  } catch (e) {
    console.warn('Failed to read analytics consent:', e);
  }

  // Default: granted (per requirements)
  return 'granted';
}

/**
 * Set analytics consent state
 * Writes to localStorage and updates GA4 consent mode
 */
export function setAnalyticsConsent(granted: boolean): void {
  if (typeof window === 'undefined') {
    return;
  }

  const consentState: ConsentState = granted ? 'granted' : 'denied';

  try {
    localStorage.setItem(CONSENT_KEY, consentState);
  } catch (e) {
    console.warn('Failed to save analytics consent:', e);
  }

  // Update GA4 consent mode if gtag is available
  if (typeof window.gtag !== 'undefined') {
    window.gtag('consent', 'update', {
      analytics_storage: consentState,
      ad_storage: consentState,
    });
  }
}

/**
 * Initialize Google Analytics 4
 * Called on page load with consent state
 */
export function initGA4(measurementId: string): void {
  if (typeof window === 'undefined' || !measurementId) {
    return;
  }

  // Get consent state
  const consent = getAnalyticsConsent();

  // Initialize gtag.js
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  // Set consent defaults
  window.gtag('consent', 'default', {
    analytics_storage: consent,
    ad_storage: consent,
    wait_for_update: 500,
  });

  // Initialize GA4
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: true,
    anonymize_ip: true,
  });

  console.info(`GA4 initialized: ${measurementId}, consent: ${consent}`);
}

/**
 * Generic event tracking
 */
export function track(eventName: string, params?: Record<string, any>): void {
  if (typeof window === 'undefined' || typeof window.gtag === 'undefined') {
    return;
  }

  window.gtag('event', eventName, params);
}

/**
 * Track phone number clicks
 */
export function trackCallClick(phoneNumber: string): void {
  track('phone_call_click', {
    event_category: 'engagement',
    event_label: phoneNumber,
    value: 1,
  });
}

/**
 * Track booking button clicks
 */
export function trackBookingClick(source: string = 'unknown'): void {
  track('booking_click', {
    event_category: 'conversion',
    event_label: source,
    value: 1,
  });
}

/**
 * Track form submissions
 */
export function trackFormSubmit(formName: string): void {
  track('form_submit', {
    event_category: 'engagement',
    event_label: formName,
    value: 1,
  });
}

/**
 * Track outbound links
 */
export function trackOutboundLink(url: string): void {
  track('outbound_link', {
    event_category: 'engagement',
    event_label: url,
  });
}

// TypeScript declarations for gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
