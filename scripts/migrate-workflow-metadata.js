#!/usr/bin/env node

/**
 * WORKFLOW METADATA MIGRATION SCRIPT
 * Adds workflow metadata to existing content files
 * Run once to migrate existing content to the new workflow system
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Migration date (ISO 8601)
const MIGRATION_DATE = new Date().toISOString().split('T')[0];
const APPROVED_BY = 'System Migration (Step 9.5)';

console.log('');
console.log('═'.repeat(80));
console.log('WORKFLOW METADATA MIGRATION');
console.log('═'.repeat(80));
console.log('');
console.log(`Migration date: ${MIGRATION_DATE}`);
console.log(`Approved by: ${APPROVED_BY}`);
console.log('');

let totalFiles = 0;
let migratedFiles = 0;
let skippedFiles = 0;

// Migrate a single file
function migrateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Check if file has frontmatter
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    console.log(`⚠️  Skipping ${filePath} (no frontmatter)`);
    skippedFiles++;
    return;
  }

  const frontmatterText = match[1];

  // Check if already has workflow metadata
  if (frontmatterText.includes('workflowStatus:') || frontmatterText.includes('approvedBy:')) {
    console.log(`⏭️  Skipping ${filePath} (already has workflow metadata)`);
    skippedFiles++;
    return;
  }

  // Add workflow metadata to frontmatter
  const workflowMetadata = `workflowStatus: 'published'
reviewedBy: '${APPROVED_BY}'
reviewedDate: '${MIGRATION_DATE}'
approvedBy: '${APPROVED_BY}'
approvedDate: '${MIGRATION_DATE}'`;

  const newFrontmatter = frontmatterText + '\n' + workflowMetadata;
  const newContent = content.replace(frontmatterRegex, `---\n${newFrontmatter}\n---`);

  // Write back to file
  fs.writeFileSync(filePath, newContent, 'utf-8');

  console.log(`✅ Migrated ${path.relative(path.join(__dirname, '..'), filePath)}`);
  migratedFiles++;
}

// Migrate collections
const collections = ['services', 'locations', 'regions', 'faqs', 'blog'];

for (const collection of collections) {
  const collectionPath = path.join(__dirname, '..', 'src', 'content', collection);

  if (!fs.existsSync(collectionPath)) {
    console.log(`⚠️  Collection not found: ${collection}`);
    continue;
  }

  console.log(`\nMigrating ${collection}...`);

  const files = fs.readdirSync(collectionPath).filter(f => f.endsWith('.md'));

  for (const file of files) {
    const filePath = path.join(collectionPath, file);
    totalFiles++;
    migrateFile(filePath);
  }
}

// Migrate reviews (YAML files)
console.log('\nMigrating reviews...');
const reviewsPath = path.join(__dirname, '..', 'src', 'content', 'reviews');

if (fs.existsSync(reviewsPath)) {
  const files = fs.readdirSync(reviewsPath).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));

  for (const file of files) {
    const filePath = path.join(reviewsPath, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    totalFiles++;

    // Check if already has workflow metadata
    if (content.includes('workflowStatus:') || content.includes('approvedBy:')) {
      console.log(`⏭️  Skipping ${filePath} (already has workflow metadata)`);
      skippedFiles++;
      continue;
    }

    // Add workflow metadata to end of YAML file
    const workflowMetadata = `
# Workflow metadata
workflowStatus: 'published'
reviewedBy: '${APPROVED_BY}'
reviewedDate: '${MIGRATION_DATE}'
approvedBy: '${APPROVED_BY}'
approvedDate: '${MIGRATION_DATE}'`;

    const newContent = content.trim() + '\n' + workflowMetadata + '\n';

    fs.writeFileSync(filePath, newContent, 'utf-8');

    console.log(`✅ Migrated ${path.relative(path.join(__dirname, '..'), filePath)}`);
    migratedFiles++;
  }
}

console.log('');
console.log('═'.repeat(80));
console.log('MIGRATION COMPLETE');
console.log('═'.repeat(80));
console.log('');
console.log(`Total files processed: ${totalFiles}`);
console.log(`Migrated: ${migratedFiles}`);
console.log(`Skipped: ${skippedFiles}`);
console.log('');

if (migratedFiles > 0) {
  console.log('✅ Migration successful!');
  console.log('');
  console.log('Next steps:');
  console.log('1. Review the changes with: git diff');
  console.log('2. Run enforcement: npm run enforce');
  console.log('3. Commit the changes if everything looks good');
  console.log('');
} else {
  console.log('⚠️  No files needed migration.');
  console.log('');
}
