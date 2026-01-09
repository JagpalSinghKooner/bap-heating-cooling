/**
 * Structured Data (Schema.org JSON-LD) Helpers
 * Generates consistent schema markup across the site
 */

import type { BusinessProfile } from './getBusinessProfile';
import { getCompanyName } from './getBusinessProfile';

/**
 * Base LocalBusiness schema
 * Used on homepage and about page
 */
export function getLocalBusinessSchema(profile: BusinessProfile): object {
  const companyName = getCompanyName(profile);

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://bapheating.ca/#organization',
    name: companyName,
    legalName: profile.business.legal_name,
    description:
      'Professional heating and cooling services for residential and commercial properties across Southern Ontario',
    url: 'https://bapheating.ca',
    telephone: profile.contact.phone_e164,
    email: profile.contact.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: profile.locations.primary.address_full.split(',')[0],
      addressLocality: profile.locations.primary.city,
      addressRegion: profile.locations.primary.province,
      postalCode: profile.locations.primary.postal_code,
      addressCountry: profile.locations.primary.country,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: profile.reputation.google_rating,
      reviewCount: profile.reputation.google_review_count,
    },
    sameAs: [
      profile.social.facebook,
      profile.social.instagram,
    ].filter(Boolean),
  };
}

/**
 * Service schema
 * Used on service detail pages and service-in-city pages
 */
export function getServiceSchema(
  profile: BusinessProfile,
  service: {
    title: string;
    description: string;
    slug: string;
  },
  location?: {
    title: string;
    slug: string;
  }
): object {
  const companyName = getCompanyName(profile);
  const serviceUrl = location
    ? `https://bapheating.ca/services/${service.slug}-${location.slug}-on/`
    : `https://bapheating.ca/services/${service.slug}/`;

  const areaServed = location
    ? {
        '@type': 'City',
        name: `${location.title}, ON`,
        containedInPlace: {
          '@type': 'State',
          name: 'Ontario',
        },
      }
    : {
        '@type': 'State',
        name: 'Ontario',
      };

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.title,
    name: service.title,
    description: service.description,
    url: serviceUrl,
    provider: {
      '@type': 'LocalBusiness',
      '@id': 'https://bapheating.ca/#organization',
      name: companyName,
    },
    areaServed: areaServed,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.title,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.title,
          },
        },
      ],
    },
  };
}

/**
 * Location-aware LocalBusiness schema
 * Used on location detail pages
 */
export function getLocationSchema(
  profile: BusinessProfile,
  location: {
    title: string;
    region: string;
    description: string;
  }
): object {
  const companyName = getCompanyName(profile);

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://bapheating.ca/#organization',
    name: `${companyName} - ${location.title}`,
    description: location.description,
    url: `https://bapheating.ca/locations/${location.title
      .toLowerCase()
      .replace(/\s+/g, '-')}/`,
    telephone: profile.contact.phone_e164,
    email: profile.contact.email,
    areaServed: {
      '@type': 'City',
      name: `${location.title}, ON`,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: location.region,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: profile.reputation.google_rating,
      reviewCount: profile.reputation.google_review_count,
    },
  };
}

/**
 * Region-aware LocalBusiness schema
 * Used on region detail pages
 */
export function getRegionSchema(
  profile: BusinessProfile,
  region: {
    title: string;
    description: string;
    cities: string[];
  }
): object {
  const companyName = getCompanyName(profile);

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://bapheating.ca/#organization',
    name: `${companyName} - ${region.title}`,
    description: region.description,
    url: `https://bapheating.ca/regions/${region.title
      .toLowerCase()
      .replace(/\s+/g, '-')}/`,
    telephone: profile.contact.phone_e164,
    email: profile.contact.email,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: region.title,
    },
  };
}

/**
 * Article schema (for future blog)
 * Ready to use when blog is implemented
 */
export function getArticleSchema(
  profile: BusinessProfile,
  post: {
    title: string;
    description: string;
    slug: string;
    publishDate: Date;
    modifiedDate?: Date;
    author?: string;
    image?: string;
  }
): object {
  const companyName = getCompanyName(profile);
  const authorName = post.author || profile.business.owner_public.name;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    url: `https://bapheating.ca/blog/${post.slug}/`,
    datePublished: post.publishDate.toISOString(),
    dateModified: (post.modifiedDate || post.publishDate).toISOString(),
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://bapheating.ca/#organization',
      name: companyName,
      logo: {
        '@type': 'ImageObject',
        url: 'https://bapheating.ca/logo.png',
      },
    },
    image: post.image || 'https://bapheating.ca/default-image.jpg',
  };
}

/**
 * FAQ schema
 * Used on pages with FAQ sections to enable rich results in search
 */
export function getFAQSchema(
  faqs: Array<{ question: string; body: string }>
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.body,
      },
    })),
  };
}
