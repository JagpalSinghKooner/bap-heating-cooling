#!/usr/bin/env node

/**
 * CONTENT ENFORCEMENT RUNNER
 * Runs uniqueness, workflow, and E-E-A-T enforcement checks
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import enforcement modules (we'll need to compile these or use tsx)
// For now, we'll implement the logic inline

// Parse command line args
const args = process.argv.slice(2);
const strictMode = args.includes('--strict');
const skipUniqueness = args.includes('--skip-uniqueness');
const skipWorkflow = args.includes('--skip-workflow');
const skipLint = args.includes('--skip-lint');

// Load config
const configPath = path.join(__dirname, 'enforce.config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

console.log('');
console.log('═'.repeat(80));
console.log('CONTENT ENFORCEMENT SYSTEM');
console.log('═'.repeat(80));
console.log('');
console.log(`Mode: ${strictMode ? 'STRICT (warnings fail build)' : 'STANDARD (warnings only)'}`);
console.log('');

// Track overall pass/fail
let overallPass = true;

// ========================================================================
// WORKFLOW ENFORCEMENT
// ========================================================================

if (!skipWorkflow && config.workflow.enabled) {
  console.log('Running workflow state enforcement...');
  console.log('');

  try {
    const workflowItems = [];

    // Read all content collections
    const collections = ['services', 'locations', 'regions', 'faqs', 'reviews', 'blog'];

    for (const collection of collections) {
      const collectionPath = path.join(__dirname, '..', 'src', 'content', collection);

      if (!fs.existsSync(collectionPath)) {
        continue;
      }

      const files = fs.readdirSync(collectionPath).filter(f =>
        f.endsWith('.md') || f.endsWith('.yaml') || f.endsWith('.yml')
      );

      for (const file of files) {
        const filePath = path.join(collectionPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');

        // Parse frontmatter (simple approach)
        let frontmatter;
        if (file.endsWith('.yaml') || file.endsWith('.yml')) {
          frontmatter = parseYAML(content);
        } else {
          frontmatter = parseFrontmatter(content);
        }

        // Default to 'published' if not specified (existing content)
        const workflowStatus = frontmatter.workflowStatus || 'published';

        workflowItems.push({
          filePath: path.relative(path.join(__dirname, '..'), filePath),
          workflowStatus,
          reviewedBy: frontmatter.reviewedBy,
          reviewedDate: frontmatter.reviewedDate,
          approvedBy: frontmatter.approvedBy,
          approvedDate: frontmatter.approvedDate,
          collectionType: collection,
        });
      }
    }

    // Run workflow validation
    const workflowViolations = [];

    for (const item of workflowItems) {
      // Rule 1: Must be approved or published
      if (item.workflowStatus !== 'approved' && item.workflowStatus !== 'published') {
        workflowViolations.push({
          filePath: item.filePath,
          type: 'UNAPPROVED_CONTENT',
          message: `Content has workflowStatus="${item.workflowStatus}" which is not approved for publication`,
          severity: 'critical',
        });
      }

      // Rule 2: If approved/published, must have approval metadata
      if (
        (item.workflowStatus === 'approved' || item.workflowStatus === 'published') &&
        (!item.approvedBy || !item.approvedDate)
      ) {
        workflowViolations.push({
          filePath: item.filePath,
          type: 'MISSING_APPROVAL_METADATA',
          message: `Content is "${item.workflowStatus}" but missing approvedBy or approvedDate`,
          severity: 'critical',
        });
      }
    }

    if (workflowViolations.length === 0) {
      console.log('✅ PASSED: All content meets workflow requirements');
      console.log('');
    } else {
      console.log('❌ FAILED: Workflow violations detected');
      console.log('');
      console.log(`Total violations: ${workflowViolations.length}`);
      console.log('');

      for (let i = 0; i < workflowViolations.length; i++) {
        const v = workflowViolations[i];
        console.log(`${i + 1}. ${v.filePath}`);
        console.log(`   Type: ${v.type}`);
        console.log(`   Issue: ${v.message}`);
        console.log('');
      }

      overallPass = false;
    }
  } catch (error) {
    console.error('❌ Error running workflow enforcement:', error.message);
    overallPass = false;
  }

  console.log('─'.repeat(80));
  console.log('');
}

// ========================================================================
// UNIQUENESS ENFORCEMENT
// ========================================================================

if (!skipUniqueness && config.uniqueness.enabled) {
  console.log('Running uniqueness enforcement...');
  console.log('');

  try {
    const contentItems = [];

    // Read services
    const servicesPath = path.join(__dirname, '..', 'src', 'content', 'services');
    if (fs.existsSync(servicesPath)) {
      const files = fs.readdirSync(servicesPath).filter(f => f.endsWith('.md'));

      for (const file of files) {
        const filePath = path.join(servicesPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const bodyContent = extractMarkdownBody(content);

        contentItems.push({
          filePath: path.relative(path.join(__dirname, '..'), filePath),
          content: bodyContent,
          type: 'service',
          metadata: {
            serviceSlug: file.replace('.md', ''),
          },
        });
      }
    }

    // Read locations
    const locationsPath = path.join(__dirname, '..', 'src', 'content', 'locations');
    if (fs.existsSync(locationsPath)) {
      const files = fs.readdirSync(locationsPath).filter(f => f.endsWith('.md'));

      for (const file of files) {
        const filePath = path.join(locationsPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const bodyContent = extractMarkdownBody(content);

        contentItems.push({
          filePath: path.relative(path.join(__dirname, '..'), filePath),
          content: bodyContent,
          type: 'location',
          metadata: {
            locationSlug: file.replace('.md', ''),
          },
        });
      }
    }

    // Read service-cities if exists
    const serviceCitiesPath = path.join(__dirname, '..', 'src', 'content', 'service-cities');
    if (fs.existsSync(serviceCitiesPath)) {
      // Recursively read service-city files
      const readServiceCities = (dir) => {
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);

          if (entry.isDirectory()) {
            readServiceCities(fullPath);
          } else if (entry.name.endsWith('.md')) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            const bodyContent = extractMarkdownBody(content);
            const frontmatter = parseFrontmatter(content);

            contentItems.push({
              filePath: path.relative(path.join(__dirname, '..'), fullPath),
              content: bodyContent,
              type: 'service-city',
              metadata: {
                serviceSlug: frontmatter.service || entry.name.replace('.md', ''),
                citySlug: frontmatter.location || path.basename(dir),
              },
            });
          }
        }
      };

      readServiceCities(serviceCitiesPath);
    }

    if (contentItems.length === 0) {
      console.log('⚠️  No content items found for uniqueness checking');
      console.log('');
    } else {
      console.log(`Checking ${contentItems.length} content items...`);
      console.log('');

      // For now, just check that we have content
      // Full uniqueness checking requires the TypeScript module
      // This is a placeholder that shows structure is ready

      console.log('✅ Uniqueness enforcement ready (detailed checks require TS compilation)');
      console.log('   Note: Run full enforcement after implementing TS compilation or tsx');
      console.log('');
    }
  } catch (error) {
    console.error('❌ Error running uniqueness enforcement:', error.message);
    overallPass = false;
  }

  console.log('─'.repeat(80));
  console.log('');
}

// ========================================================================
// E-E-A-T LINTING
// ========================================================================

if (!skipLint && config.eeat.enabled) {
  console.log(`Running E-E-A-T content linting ${strictMode ? '(STRICT MODE)' : ''}...`);
  console.log('');

  try {
    const lintItems = [];

    // Read all markdown content
    const collections = ['services', 'locations', 'blog', 'faqs'];

    for (const collection of collections) {
      const collectionPath = path.join(__dirname, '..', 'src', 'content', collection);

      if (!fs.existsSync(collectionPath)) {
        continue;
      }

      const files = fs.readdirSync(collectionPath).filter(f => f.endsWith('.md'));

      for (const file of files) {
        const filePath = path.join(collectionPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const bodyContent = extractMarkdownBody(content);

        lintItems.push({
          filePath: path.relative(path.join(__dirname, '..'), filePath),
          content: bodyContent,
          pageType: collection === 'services' ? 'service' : collection === 'locations' ? 'location' : 'other',
        });
      }
    }

    // Simple prohibited phrase detection
    const prohibitedPatterns = {
      superiority: [
        /\b(best|#1|number one|top[- ]rated|leading)\s+(in|hvac|heating|cooling|service)/gi,
        /\bguaranteed\s+(lowest|best|cheapest)/gi,
      ],
      aiFluff: [
        /\bdelve\b/gi,
        /\bunlock(ing)?\b/gi,
        /\belevate\s+(your|the)\b/gi,
        /\bleverage\s+(our|the)\b/gi,
      ],
    };

    const issues = [];

    for (const item of lintItems) {
      // Check superiority claims
      for (const pattern of prohibitedPatterns.superiority) {
        const matches = item.content.match(pattern);
        if (matches) {
          for (const match of matches) {
            issues.push({
              filePath: item.filePath,
              severity: 'critical',
              category: 'UNVERIFIABLE_CLAIM',
              phrase: match,
              message: 'Unverifiable superiority claim detected',
            });
          }
        }
      }

      // Check AI fluff
      for (const pattern of prohibitedPatterns.aiFluff) {
        const matches = item.content.match(pattern);
        if (matches) {
          for (const match of matches) {
            issues.push({
              filePath: item.filePath,
              severity: 'warning',
              category: 'AI_FLUFF',
              phrase: match,
              message: 'AI-generated fluff word detected',
            });
          }
        }
      }
    }

    const criticalIssues = issues.filter(i => i.severity === 'critical');
    const warningIssues = issues.filter(i => i.severity === 'warning');

    const passed = strictMode ? issues.length === 0 : criticalIssues.length === 0;

    if (passed) {
      console.log('✅ PASSED: No content quality issues detected');
      console.log('');
      console.log(`Scanned: ${lintItems.length} items`);
      console.log(`Critical issues: ${criticalIssues.length}`);
      console.log(`Warnings: ${warningIssues.length}`);
      console.log('');
    } else {
      console.log(`❌ FAILED: Content quality issues detected`);
      console.log('');
      console.log(`Total issues: ${issues.length}`);
      console.log(`Critical: ${criticalIssues.length}`);
      console.log(`Warnings: ${warningIssues.length}`);
      console.log('');

      // Show first 10 issues
      const displayIssues = issues.slice(0, 10);

      for (let i = 0; i < displayIssues.length; i++) {
        const issue = displayIssues[i];
        const icon = issue.severity === 'critical' ? '🔴' : '⚠️';

        console.log(`${i + 1}. ${icon} ${issue.filePath}`);
        console.log(`   Category: ${issue.category}`);
        console.log(`   Phrase: "${issue.phrase}"`);
        console.log(`   Issue: ${issue.message}`);
        console.log('');
      }

      if (issues.length > 10) {
        console.log(`... and ${issues.length - 10} more issues`);
        console.log('');
      }

      overallPass = false;
    }
  } catch (error) {
    console.error('❌ Error running E-E-A-T linting:', error.message);
    overallPass = false;
  }

  console.log('─'.repeat(80));
  console.log('');
}

// ========================================================================
// FINAL REPORT
// ========================================================================

console.log('═'.repeat(80));
console.log('ENFORCEMENT SUMMARY');
console.log('═'.repeat(80));
console.log('');

if (overallPass) {
  console.log('✅ ALL CHECKS PASSED');
  console.log('');
  console.log('Content is ready for build and deployment.');
  console.log('');
  process.exit(0);
} else {
  console.log('❌ ENFORCEMENT FAILED');
  console.log('');
  console.log('Fix the issues above and run enforcement again.');
  console.log('');
  process.exit(1);
}

// ========================================================================
// UTILITY FUNCTIONS
// ========================================================================

function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return {};
  }

  const frontmatterText = match[1];
  const lines = frontmatterText.split('\n');
  const frontmatter = {};

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.substring(0, colonIndex).trim();
    let value = line.substring(colonIndex + 1).trim();

    // Remove quotes
    if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith('"') && value.endsWith('"'))) {
      value = value.slice(1, -1);
    }

    frontmatter[key] = value;
  }

  return frontmatter;
}

function parseYAML(content) {
  const lines = content.split('\n');
  const frontmatter = {};

  for (const line of lines) {
    // Skip comments and empty lines
    if (line.trim().startsWith('#') || line.trim() === '') continue;

    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.substring(0, colonIndex).trim();
    let value = line.substring(colonIndex + 1).trim();

    // Remove quotes
    if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith('"') && value.endsWith('"'))) {
      value = value.slice(1, -1);
    }

    frontmatter[key] = value;
  }

  return frontmatter;
}

function extractMarkdownBody(content) {
  // Remove frontmatter
  const withoutFrontmatter = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
  return withoutFrontmatter.trim();
}
