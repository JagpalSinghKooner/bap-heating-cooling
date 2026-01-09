/**
 * Build-time Vercel Configuration Merger
 *
 * This script merges redirects from redirects.json into vercel.json
 * allowing non-developers to manage redirects without code changes.
 *
 * Runs automatically before build via package.json prebuild hook.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File paths
const rootDir = path.join(__dirname, '..');
const vercelConfigPath = path.join(rootDir, 'vercel.json');
const redirectsPath = path.join(rootDir, 'redirects.json');

console.log('🔧 Building Vercel configuration...');

try {
  // Read current vercel.json
  const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));
  console.log(`✓ Read vercel.json (${vercelConfig.redirects?.length || 0} existing redirects)`);

  // Read redirects.json
  let customRedirects = [];
  if (fs.existsSync(redirectsPath)) {
    const redirectsData = JSON.parse(fs.readFileSync(redirectsPath, 'utf8'));
    customRedirects = redirectsData.redirects || [];
    console.log(`✓ Read redirects.json (${customRedirects.length} custom redirects)`);
  } else {
    console.log('ℹ No redirects.json found, using defaults only');
  }

  // Merge: custom redirects + existing vercel redirects
  // Custom redirects take precedence (added first)
  const mergedRedirects = [...customRedirects, ...(vercelConfig.redirects || [])];

  // Update vercel.json with merged redirects
  vercelConfig.redirects = mergedRedirects;

  // Write back to vercel.json
  fs.writeFileSync(
    vercelConfigPath,
    JSON.stringify(vercelConfig, null, 2) + '\n',
    'utf8'
  );

  console.log(`✓ Updated vercel.json with ${mergedRedirects.length} total redirects`);
  console.log('✅ Vercel configuration built successfully');
} catch (error) {
  console.error('❌ Error building Vercel configuration:', error.message);
  process.exit(1);
}
