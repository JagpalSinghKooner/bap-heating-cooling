#!/usr/bin/env tsx

/**
 * CONTENT ENFORCEMENT RUNNER (TypeScript)
 * Runs uniqueness, workflow, and E-E-A-T enforcement checks
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  enforceUniqueness,
  formatUniquenessReport,
  type ContentItem,
} from '../src/lib/enforcement/uniqueness.js';
import {
  enforceWorkflow,
  formatWorkflowReport,
  type WorkflowItem,
} from '../src/lib/enforcement/workflow.js';
import {
  lintEEAT,
  formatEEATReport,
  type LintItem,
} from '../src/lib/enforcement/eeatLint.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    const workflowItems: WorkflowItem[] = [];

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

        // Parse frontmatter
        let frontmatter: any;
        if (file.endsWith('.yaml') || file.endsWith('.yml')) {
          frontmatter = parseYAML(content);
        } else {
          frontmatter = parseFrontmatter(content);
        }

        // Note: New content should default to 'draft' via schema
        // Existing content may have 'published' from migration
        const workflowStatus = frontmatter.workflowStatus || 'draft';

        workflowItems.push({
          filePath: path.relative(path.join(__dirname, '..'), filePath),
          workflowStatus: workflowStatus as any,
          reviewedBy: frontmatter.reviewedBy,
          reviewedDate: frontmatter.reviewedDate,
          approvedBy: frontmatter.approvedBy,
          approvedDate: frontmatter.approvedDate,
          collectionType: collection,
        });
      }
    }

    // Run workflow validation
    const workflowResult = enforceWorkflow(workflowItems);
    const workflowReport = formatWorkflowReport(workflowResult);

    console.log(workflowReport);

    if (!workflowResult.passed) {
      overallPass = false;
    }
  } catch (error: any) {
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
    const contentItems: ContentItem[] = [];

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

    // Read blog
    const blogPath = path.join(__dirname, '..', 'src', 'content', 'blog');
    if (fs.existsSync(blogPath)) {
      const files = fs.readdirSync(blogPath).filter(f => f.endsWith('.md'));

      for (const file of files) {
        const filePath = path.join(blogPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const bodyContent = extractMarkdownBody(content);

        contentItems.push({
          filePath: path.relative(path.join(__dirname, '..'), filePath),
          content: bodyContent,
          type: 'blog',
        });
      }
    }

    // Read service-cities if exists
    const serviceCitiesPath = path.join(__dirname, '..', 'src', 'content', 'service-cities');
    if (fs.existsSync(serviceCitiesPath)) {
      // Recursively read service-city files
      const readServiceCities = (dir: string) => {
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
    } else if (contentItems.length === 1) {
      console.log(`✅ Only 1 content item found - no comparisons needed`);
      console.log('');
    } else {
      console.log(`Checking ${contentItems.length} content items...`);
      console.log('');

      // Run uniqueness enforcement
      const uniquenessResult = enforceUniqueness(contentItems);
      const uniquenessReport = formatUniquenessReport(uniquenessResult);

      console.log(uniquenessReport);

      if (!uniquenessResult.passed) {
        overallPass = false;
      }
    }
  } catch (error: any) {
    console.error('❌ Error running uniqueness enforcement:', error.message);
    console.error(error.stack);
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
    const lintItems: LintItem[] = [];

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
        const frontmatterText = extractFrontmatter(content);

        lintItems.push({
          filePath: path.relative(path.join(__dirname, '..'), filePath),
          content: bodyContent,
          frontmatter: frontmatterText,
          pageType: collection === 'services'
            ? 'service'
            : collection === 'locations'
            ? 'location'
            : collection === 'blog'
            ? 'blog'
            : collection === 'faqs'
            ? 'faq'
            : 'other',
        });
      }
    }

    // Read service-cities if exists
    const serviceCitiesPath = path.join(__dirname, '..', 'src', 'content', 'service-cities');
    if (fs.existsSync(serviceCitiesPath)) {
      const readServiceCities = (dir: string) => {
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);

          if (entry.isDirectory()) {
            readServiceCities(fullPath);
          } else if (entry.name.endsWith('.md')) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            const bodyContent = extractMarkdownBody(content);
            const frontmatterText = extractFrontmatter(content);

            lintItems.push({
              filePath: path.relative(path.join(__dirname, '..'), fullPath),
              content: bodyContent,
              frontmatter: frontmatterText,
              pageType: 'service-city',
            });
          }
        }
      };

      readServiceCities(serviceCitiesPath);
    }

    // Run E-E-A-T linting
    const lintResult = lintEEAT(lintItems, strictMode);
    const lintReport = formatEEATReport(lintResult, strictMode);

    console.log(lintReport);

    if (!lintResult.passed) {
      overallPass = false;
    }
  } catch (error: any) {
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

function parseFrontmatter(content: string): Record<string, any> {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return {};
  }

  const frontmatterText = match[1];
  const lines = frontmatterText.split('\n');
  const frontmatter: Record<string, any> = {};

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.substring(0, colonIndex).trim();
    let value: any = line.substring(colonIndex + 1).trim();

    // Remove quotes
    if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith('"') && value.endsWith('"'))) {
      value = value.slice(1, -1);
    }

    frontmatter[key] = value;
  }

  return frontmatter;
}

function parseYAML(content: string): Record<string, any> {
  const lines = content.split('\n');
  const frontmatter: Record<string, any> = {};

  for (const line of lines) {
    // Skip comments and empty lines
    if (line.trim().startsWith('#') || line.trim() === '') continue;

    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.substring(0, colonIndex).trim();
    let value: any = line.substring(colonIndex + 1).trim();

    // Remove quotes
    if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith('"') && value.endsWith('"'))) {
      value = value.slice(1, -1);
    }

    frontmatter[key] = value;
  }

  return frontmatter;
}

function extractMarkdownBody(content: string): string {
  // Remove frontmatter
  const withoutFrontmatter = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
  return withoutFrontmatter.trim();
}

function extractFrontmatter(content: string): string {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);
  return match ? match[1] : '';
}
