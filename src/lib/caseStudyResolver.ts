/**
 * Case Study Resolution System
 * Fetches relevant case studies for service pages
 */

import type { CollectionEntry } from 'astro:content';

export type CaseStudy = CollectionEntry<'case-studies'>;

/**
 * Get case studies for a specific service
 * Returns up to 1 featured case study (for clean UI)
 */
export function getCaseStudyForService(
  allCaseStudies: CaseStudy[],
  serviceSlug: string,
  locationSlug?: string
): CaseStudy | null {
  // Filter to live case studies only
  const liveCaseStudies = allCaseStudies.filter(
    (cs) => cs.data.status === 'live'
  );

  // First try: exact service + location match
  if (locationSlug) {
    const exactMatch = liveCaseStudies.find(
      (cs) =>
        cs.data.serviceSlug === serviceSlug &&
        cs.data.locationSlug === locationSlug
    );
    if (exactMatch) return exactMatch;
  }

  // Second try: service match, prioritize featured
  const serviceMatches = liveCaseStudies
    .filter((cs) => cs.data.serviceSlug === serviceSlug)
    .sort((a, b) => {
      // Featured first
      if (a.data.featured !== b.data.featured) {
        return a.data.featured ? -1 : 1;
      }
      // Then by priority
      return b.data.priority - a.data.priority;
    });

  return serviceMatches[0] || null;
}
