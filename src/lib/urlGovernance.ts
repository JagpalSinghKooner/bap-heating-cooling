/**
 * URL Governance
 * Enforces canonical URL policies site-wide
 *
 * Policies:
 * - Trailing slash: ALWAYS (with trailing slash)
 * - Case: ALWAYS lowercase
 * - Host: non-www (www redirects to non-www)
 * - Protocol: HTTPS (HTTP redirects to HTTPS)
 */

/**
 * Get the canonical base URL
 * This should come from env in production
 */
export function getBaseUrl(): string {
  // In production, use env var; in dev, use localhost
  if (import.meta.env.PROD) {
    return import.meta.env.PUBLIC_SITE_URL || 'https://bapheating.ca';
  }
  return 'http://localhost:4321';
}

/**
 * Normalize a pathname to follow our URL policies
 * - Always lowercase
 * - Always has trailing slash
 * - Never has double slashes (except after protocol)
 */
export function normalizePathname(pathname: string): string {
  // Lowercase
  let normalized = pathname.toLowerCase();

  // Remove double slashes (except after protocol)
  normalized = normalized.replace(/([^:]\/)\/+/g, '$1');

  // Ensure trailing slash (except for file extensions)
  if (!normalized.endsWith('/') && !normalized.includes('.')) {
    normalized += '/';
  }

  // Ensure starts with slash
  if (!normalized.startsWith('/')) {
    normalized = '/' + normalized;
  }

  return normalized;
}

/**
 * Get the canonical URL for a given pathname
 * This is the single source of truth for canonical URLs
 */
export function getCanonicalUrl(pathname: string): string {
  const baseUrl = getBaseUrl();
  const normalizedPath = normalizePathname(pathname);

  return `${baseUrl}${normalizedPath}`;
}

/**
 * Check if a URL needs to be redirected
 * Returns the redirect target if redirect needed, null otherwise
 */
export function getRedirectTarget(url: URL): string | null {
  const { protocol, host, hostname, pathname } = url;

  // Force HTTPS in production
  if (import.meta.env.PROD && protocol === 'http:') {
    return `https://${host}${pathname}`;
  }

  // Remove www
  if (hostname.startsWith('www.')) {
    const nonWwwHost = hostname.replace(/^www\./, '');
    return `${protocol}//${nonWwwHost}${pathname}`;
  }

  // Check if pathname needs normalization
  const normalizedPath = normalizePathname(pathname);
  if (normalizedPath !== pathname) {
    return `${protocol}//${host}${normalizedPath}`;
  }

  return null;
}

/**
 * Build a site URL from a path
 * Useful for absolute URLs in feeds, sitemaps, etc.
 */
export function buildSiteUrl(path: string): string {
  return getCanonicalUrl(path);
}
