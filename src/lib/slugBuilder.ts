/**
 * Slug Builder Utility
 * Enforces the canonical URL format for service-in-city pages:
 * /services/{serviceSlug}-{citySlug}-on/
 *
 * Rules:
 * - serviceSlug does NOT include 'on'
 * - citySlug does NOT include 'on'
 * - '-on' is appended only once at the end
 * - All slugs are lowercase, hyphen-separated
 */

/**
 * Clean a slug by removing .md extension and ensuring it doesn't end with -on
 */
export function cleanSlug(id: string): string {
  let slug = id.replace(/\.md$/, '');

  // Remove any trailing -on if present (to prevent doubling)
  if (slug.endsWith('-on')) {
    slug = slug.slice(0, -3);
  }

  return slug.toLowerCase();
}

/**
 * Build a service-in-city slug according to the canonical format
 * @param serviceId - The service content collection ID
 * @param cityId - The location content collection ID
 * @returns The canonical slug: {service}-{city}-on
 */
export function buildServiceCitySlug(serviceId: string, cityId: string): string {
  const serviceSlug = cleanSlug(serviceId);
  const citySlug = cleanSlug(cityId);

  return `${serviceSlug}-${citySlug}-on`;
}

/**
 * Build a service-in-city URL path
 * @param serviceId - The service content collection ID
 * @param cityId - The location content collection ID
 * @returns The full URL path: /services/{service}-{city}-on/
 */
export function buildServiceCityPath(serviceId: string, cityId: string): string {
  const slug = buildServiceCitySlug(serviceId, cityId);
  return `/services/${slug}/`;
}

/**
 * Build a service detail URL path
 * @param serviceId - The service content collection ID
 * @returns The full URL path: /services/{service}/
 */
export function buildServicePath(serviceId: string): string {
  const slug = cleanSlug(serviceId);
  return `/services/${slug}/`;
}

/**
 * Build a location detail URL path
 * @param locationId - The location content collection ID
 * @returns The full URL path: /locations/{location}/
 */
export function buildLocationPath(locationId: string): string {
  const slug = cleanSlug(locationId);
  return `/locations/${slug}/`;
}

/**
 * Normalize a city name to a slug format
 * @param cityName - Human-readable city name (e.g., "Guelph", "Eden Mills")
 * @returns Slug format (e.g., "guelph", "eden-mills")
 */
export function cityNameToSlug(cityName: string): string {
  return cityName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '') // Remove special characters
    .replace(/-+/g, '-'); // Collapse multiple hyphens
}
