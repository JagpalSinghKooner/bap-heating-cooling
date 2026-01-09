# Redirect Management

## Active Redirect Mechanism

**File:** `vercel.json`

All production redirects are defined in the `redirects` array in `vercel.json`. Vercel reads this file directly during deployment and enforces the redirect rules.

### Current Active Redirects

1. **www → non-www** (lines 2-13)
   - Redirects `www.bapheating.ca` to `bapheating.ca`
   - Type: 301 (permanent)

### Adding New Redirects

To add a new redirect:

1. Open `vercel.json`
2. Add a new object to the `redirects` array:

```json
{
  "source": "/old-path",
  "destination": "/new-path/",
  "permanent": true
}
```

3. Commit and deploy

### Automatic Redirects (No Manual Config Required)

The following redirects are handled automatically:

- **Trailing slash enforcement:** Handled by `trailingSlash: 'always'` in `astro.config.mjs` and `normalizePathname()` in `src/lib/urlGovernance.ts`
- **Lowercase enforcement:** Handled by `normalizePathname()` in `src/lib/urlGovernance.ts`
- **HTTP → HTTPS:** Handled by Vercel hosting platform

## Registry File

**File:** `redirects.json`

This file serves as a planning/documentation registry. It is **not** actively consumed by the build process. Use it to:

- Document redirect policies
- Plan future redirects before implementing them in `vercel.json`
- Track redirect history and reasoning

## Redirect Testing

To test redirects locally:

1. Build the site: `pnpm build`
2. Preview: `pnpm preview`
3. Note: Vercel-specific redirects (like www→non-www) only work in production

To test in production:

1. Deploy to Vercel
2. Test redirect URLs with curl:
   ```bash
   curl -I https://www.bapheating.ca
   ```
3. Verify response includes `Location:` header pointing to non-www URL
