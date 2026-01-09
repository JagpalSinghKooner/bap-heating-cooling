/**
 * FAQ Resolution System
 * Implements deterministic, scoped FAQ resolution for all page types
 */

import type { CollectionEntry } from 'astro:content';

export type FAQ = CollectionEntry<'faqs'>;

export interface PageContext {
  pageType: 'service' | 'service-city' | 'location' | 'region' | 'homepage';
  serviceSlug?: string;
  locationSlug?: string;
  regionSlug?: string;
}

interface ScopeMatch {
  faq: FAQ;
  scopePriority: number; // 1=service-city, 2=service, 3=location, 4=region, 5=global
  faqPriority: number;   // From FAQ's priority field
}

const MAX_FAQS_PER_PAGE = 6;

/**
 * Parse a scope string and check if it matches the page context
 * Returns the scope priority (lower = higher priority) or null if no match
 */
function matchScope(scope: string, context: PageContext): number | null {
  // service-city scope: service-city:{serviceSlug}:{locationSlug}
  if (scope.startsWith('service-city:')) {
    const parts = scope.split(':');
    if (parts.length === 3) {
      const [, serviceSlug, locationSlug] = parts;
      if (
        context.serviceSlug === serviceSlug &&
        context.locationSlug === locationSlug
      ) {
        return 1;
      }
    }
    return null;
  }

  // service scope: service:{serviceSlug}
  if (scope.startsWith('service:')) {
    const serviceSlug = scope.substring('service:'.length);
    if (context.serviceSlug === serviceSlug) {
      return 2;
    }
    return null;
  }

  // location scope: location:{locationSlug}
  if (scope.startsWith('location:')) {
    const locationSlug = scope.substring('location:'.length);
    if (context.locationSlug === locationSlug) {
      return 3;
    }
    return null;
  }

  // region scope: region:{regionSlug}
  if (scope.startsWith('region:')) {
    const regionSlug = scope.substring('region:'.length);
    if (context.regionSlug === regionSlug) {
      return 4;
    }
    return null;
  }

  // global scope
  if (scope === 'global') {
    return 5;
  }

  return null;
}

/**
 * Resolve FAQs for a given page context
 * Returns up to 6 FAQs, deterministically ordered
 */
export function resolveFAQs(allFAQs: FAQ[], context: PageContext): FAQ[] {
  // Filter to only live FAQs
  const liveFAQs = allFAQs.filter((faq) => faq.data.status === 'live');

  // Find all FAQs that match the page context
  const matches: ScopeMatch[] = [];

  for (const faq of liveFAQs) {
    // Check all scopes for this FAQ
    let bestScopePriority: number | null = null;

    for (const scope of faq.data.scopes) {
      const scopePriority = matchScope(scope, context);
      if (scopePriority !== null) {
        // Keep the best (lowest) scope priority
        if (bestScopePriority === null || scopePriority < bestScopePriority) {
          bestScopePriority = scopePriority;
        }
      }
    }

    // If this FAQ matches at least one scope, add it
    if (bestScopePriority !== null) {
      matches.push({
        faq,
        scopePriority: bestScopePriority,
        faqPriority: faq.data.priority,
      });
    }
  }

  // Sort matches by:
  // 1. Scope priority (ascending - lower is better)
  // 2. FAQ priority (descending - higher is better)
  // 3. FAQ id (ascending - for deterministic ordering)
  matches.sort((a, b) => {
    if (a.scopePriority !== b.scopePriority) {
      return a.scopePriority - b.scopePriority;
    }
    if (a.faqPriority !== b.faqPriority) {
      return b.faqPriority - a.faqPriority; // Higher priority first
    }
    return a.faq.id.localeCompare(b.faq.id);
  });

  // Remove duplicates (same question text)
  const seen = new Set<string>();
  const unique: FAQ[] = [];

  for (const match of matches) {
    const question = match.faq.data.question.toLowerCase().trim();
    if (!seen.has(question)) {
      seen.add(question);
      unique.push(match.faq);
    }
  }

  // Return up to MAX_FAQS_PER_PAGE
  return unique.slice(0, MAX_FAQS_PER_PAGE);
}
