/**
 * Review Resolution System
 * Deterministic, scoped review filtering for site-wide display
 */

import type { CollectionEntry } from 'astro:content';

export type Review = CollectionEntry<'reviews'>;

export interface PageContext {
  pageType: 'homepage' | 'service' | 'service-city' | 'location' | 'region';
  serviceSlug?: string;
  locationSlug?: string;
  citySlug?: string;
  regionSlug?: string;
}

/**
 * Get reviews for site-wide review blocks
 * MUST return ONLY verified Google reviews
 * Falls back to max 3 unverified manual reviews if no verified Google reviews exist
 * Returns up to 6 reviews
 */
export function getSiteReviewBlock(allReviews: Review[]): Review[] {
  // Filter to live reviews only
  const liveReviews = allReviews.filter(r => r.data.status === 'live');

  // First try: verified Google reviews only
  const verifiedGoogleReviews = liveReviews.filter(
    r => r.data.source === 'google' && r.data.verified === true
  );

  if (verifiedGoogleReviews.length > 0) {
    return sortReviews(verifiedGoogleReviews).slice(0, 6);
  }

  // Fallback: unverified manual reviews (max 3)
  const manualReviews = liveReviews.filter(
    r => r.data.source === 'manual' && r.data.verified === false
  );

  return sortReviews(manualReviews).slice(0, 3);
}

/**
 * Get reviews for a specific page context
 * For non-reviews pages, filters to Google-only if verified reviews exist
 * Returns up to 6 reviews
 */
export function getReviewsForPage(
  allReviews: Review[],
  context: PageContext
): Review[] {
  // Filter to live reviews only
  const liveReviews = allReviews.filter(r => r.data.status === 'live');

  // Apply page-specific filtering with precedence:
  // 1. Page-specific (service-city, service, location, region)
  // 2. Global
  let filtered: Review[] = [];

  if (context.pageType === 'service-city' && context.serviceSlug && context.citySlug) {
    // Most specific: service + city match
    filtered = liveReviews.filter(
      r => r.data.serviceSlug === context.serviceSlug && r.data.citySlug === context.citySlug
    );
  }

  if (filtered.length === 0 && context.serviceSlug) {
    // Service-level match
    filtered = liveReviews.filter(r => r.data.serviceSlug === context.serviceSlug);
  }

  if (filtered.length === 0 && context.locationSlug) {
    // Location-level match
    filtered = liveReviews.filter(r => r.data.locationSlug === context.locationSlug);
  }

  if (filtered.length === 0 && context.citySlug) {
    // City-level match
    filtered = liveReviews.filter(r => r.data.citySlug === context.citySlug);
  }

  if (filtered.length === 0) {
    // Global fallback
    filtered = liveReviews;
  }

  // For non-reviews page blocks, filter to verified Google only if any exist
  const hasVerifiedGoogle = filtered.some(
    r => r.data.source === 'google' && r.data.verified === true
  );

  if (hasVerifiedGoogle) {
    filtered = filtered.filter(
      r => r.data.source === 'google' && r.data.verified === true
    );
  }

  return sortReviews(filtered).slice(0, 6);
}

/**
 * Get all reviews for the dedicated reviews page
 * Returns all sources (google/facebook/housecallpro/manual)
 * Sorted: verified first, then by rating desc, then by date desc, then priority
 */
export function getAllReviewsForReviewsPage(allReviews: Review[]): Review[] {
  // Filter to live reviews only
  const liveReviews = allReviews.filter(r => r.data.status === 'live');

  return sortReviews(liveReviews);
}

/**
 * Deterministic sorting function
 * Sort order: verified first, rating desc, date desc, priority desc
 */
function sortReviews(reviews: Review[]): Review[] {
  return [...reviews].sort((a, b) => {
    // 1. Verified first
    if (a.data.verified !== b.data.verified) {
      return a.data.verified ? -1 : 1;
    }

    // 2. Rating descending
    if (a.data.rating !== b.data.rating) {
      return b.data.rating - a.data.rating;
    }

    // 3. Date descending (newest first)
    // Handle optional reviewDate
    const dateA = a.data.reviewDate ? new Date(a.data.reviewDate).getTime() : 0;
    const dateB = b.data.reviewDate ? new Date(b.data.reviewDate).getTime() : 0;
    if (dateA !== dateB) {
      return dateB - dateA;
    }

    // 4. Priority descending
    return b.data.priority - a.data.priority;
  });
}
