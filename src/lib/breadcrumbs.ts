/**
 * Breadcrumb generation for consistent navigation across the site
 */

export interface BreadcrumbItem {
  label: string;
  href: string;
}

/**
 * Generate breadcrumbs for the home page
 */
export function getHomeBreadcrumbs(): BreadcrumbItem[] {
  return [{ label: 'Home', href: '/' }];
}

/**
 * Generate breadcrumbs for a service page
 * Path: Home > Services > {Service Name}
 */
export function getServiceBreadcrumbs(
  serviceTitle: string,
  serviceSlug: string
): BreadcrumbItem[] {
  return [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services/' },
    { label: serviceTitle, href: `/services/${serviceSlug}/` },
  ];
}

/**
 * Generate breadcrumbs for a location page
 * Path: Home > Locations > {City}, ON
 */
export function getLocationBreadcrumbs(
  locationTitle: string,
  locationSlug: string
): BreadcrumbItem[] {
  return [
    { label: 'Home', href: '/' },
    { label: 'Locations', href: '/locations/' },
    { label: `${locationTitle}, ON`, href: `/locations/${locationSlug}/` },
  ];
}

/**
 * Generate breadcrumbs for a region page
 * Path: Home > Regions > {Region Name}
 */
export function getRegionBreadcrumbs(
  regionTitle: string,
  regionSlug: string
): BreadcrumbItem[] {
  return [
    { label: 'Home', href: '/' },
    { label: 'Regions', href: '/regions/' },
    { label: regionTitle, href: `/regions/${regionSlug}/` },
  ];
}

/**
 * Generate breadcrumbs for a service-in-city page
 * Path: Home > Services > {Service Name} > {City}, ON
 */
export function getServiceCityBreadcrumbs(
  serviceTitle: string,
  serviceSlug: string,
  locationTitle: string,
  _locationSlug: string,
  combinedSlug: string
): BreadcrumbItem[] {
  return [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services/' },
    { label: serviceTitle, href: `/services/${serviceSlug}/` },
    {
      label: `${locationTitle}, ON`,
      href: `/services/${combinedSlug}/`,
    },
  ];
}

/**
 * Generate JSON-LD BreadcrumbList schema
 * Used for SEO structured data
 */
export function getBreadcrumbSchema(
  breadcrumbs: BreadcrumbItem[],
  baseUrl: string
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${baseUrl}${item.href}`,
    })),
  };
}
