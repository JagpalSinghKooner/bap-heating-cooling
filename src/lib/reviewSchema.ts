/**
 * Review Schema Generation (Schema.org JSON-LD)
 * ONLY generates schema for verified reviews
 */

import type { Review } from './reviewResolver';

/**
 * Generate Review schema for verified reviews only
 * Returns null if review is not verified
 */
export function generateReviewSchema(review: Review): object | null {
  // HARD RULE: Only generate schema for verified reviews
  if (!review.data.verified) {
    return null;
  }

  // Verified reviews must have a reviewDate
  if (!review.data.reviewDate) {
    return null;
  }

  return {
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.data.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      '@type': 'Person',
      name: review.data.authorName,
    },
    datePublished: review.data.reviewDate,
    reviewBody: review.data.text,
    itemReviewed: {
      '@type': 'LocalBusiness',
      '@id': 'https://bapheating.ca/#organization',
    },
  };
}

/**
 * Generate an array of Review schemas for all verified reviews in a list
 * Only includes reviews that pass verification checks
 */
export function generateReviewSchemas(reviews: Review[]): object[] {
  return reviews
    .map(review => generateReviewSchema(review))
    .filter((schema): schema is object => schema !== null);
}
