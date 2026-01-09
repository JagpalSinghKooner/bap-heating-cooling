#!/usr/bin/env tsx

/**
 * ENFORCEMENT BYPASS GUARD
 * Checks for ALLOW_SKIP_ENFORCE env var before allowing enforcement skip
 */

const ALLOW_SKIP_ENFORCE = process.env.ALLOW_SKIP_ENFORCE;

console.log('');
console.log('═'.repeat(80));
console.log('ENFORCEMENT BYPASS REQUEST');
console.log('═'.repeat(80));
console.log('');

if (ALLOW_SKIP_ENFORCE === 'true') {
  console.log('✅ ALLOW_SKIP_ENFORCE=true detected');
  console.log('');
  console.log('⚠️  WARNING: Skipping content enforcement');
  console.log('   This should only be used in emergencies');
  console.log('   Build will proceed without governance checks');
  console.log('');
  process.exit(0);
} else {
  console.log('❌ ENFORCEMENT BYPASS DENIED');
  console.log('');
  console.log('Enforcement bypass is locked for governance compliance.');
  console.log('');
  console.log('To skip enforcement (emergency use only):');
  console.log('  1. Set environment variable: ALLOW_SKIP_ENFORCE=true');
  console.log('  2. Run: pnpm build:skip-enforce');
  console.log('');
  console.log('Standard build command: pnpm build');
  console.log('');
  process.exit(1);
}
