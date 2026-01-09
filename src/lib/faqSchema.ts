/**
 * FAQ Schema Generator
 * Generates FAQPage JSON-LD schema from resolved FAQs
 */

import type { FAQ } from './faqResolver';

/**
 * Generate FAQPage schema for resolved FAQs
 * Returns null if no FAQs are provided
 */
export function generateFAQSchema(faqs: FAQ[]): object | null {
  if (faqs.length === 0) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.data.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.body,
      },
    })),
  };
}
