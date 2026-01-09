/**
 * WORKFLOW STATE ENFORCEMENT MODULE
 * Enforces workflow state requirements and approval tracking
 */

type WorkflowStatus = 'draft' | 'internal_review' | 'seo_review' | 'approved' | 'published' | 'archived';

interface WorkflowItem {
  filePath: string;
  workflowStatus: WorkflowStatus;
  reviewedBy?: string;
  reviewedDate?: string;
  approvedBy?: string;
  approvedDate?: string;
  collectionType: string;
}

interface WorkflowResult {
  passed: boolean;
  violations: WorkflowViolation[];
  summary: {
    totalItems: number;
    violationCount: number;
    draftCount: number;
    approvedCount: number;
    publishedCount: number;
  };
}

interface WorkflowViolation {
  filePath: string;
  workflowStatus: WorkflowStatus;
  violationType: string;
  message: string;
  fix: string;
}

/**
 * Main workflow enforcement function
 */
export function enforceWorkflow(items: WorkflowItem[]): WorkflowResult {
  const violations: WorkflowViolation[] = [];
  let draftCount = 0;
  let approvedCount = 0;
  let publishedCount = 0;

  for (const item of items) {
    // Count by status
    if (item.workflowStatus === 'draft') draftCount++;
    if (item.workflowStatus === 'approved') approvedCount++;
    if (item.workflowStatus === 'published') publishedCount++;

    // Rule 1: Content must be 'approved' or 'published' to be built
    if (
      item.workflowStatus !== 'approved' &&
      item.workflowStatus !== 'published'
    ) {
      violations.push({
        filePath: item.filePath,
        workflowStatus: item.workflowStatus,
        violationType: 'UNAPPROVED_CONTENT',
        message: `Content has workflowStatus="${item.workflowStatus}" which is not approved for publication`,
        fix: 'Change workflowStatus to "approved" or "published" after completing review process',
      });
    }

    // Rule 2: If approved or published, must have approvedBy and approvedDate
    if (
      (item.workflowStatus === 'approved' || item.workflowStatus === 'published') &&
      (!item.approvedBy || !item.approvedDate)
    ) {
      violations.push({
        filePath: item.filePath,
        workflowStatus: item.workflowStatus,
        violationType: 'MISSING_APPROVAL_METADATA',
        message: `Content is "${item.workflowStatus}" but missing approvedBy or approvedDate fields`,
        fix: 'Add approvedBy (name) and approvedDate (ISO date string) to frontmatter',
      });
    }

    // Rule 3: If in seo_review or approved, should have reviewedBy and reviewedDate
    if (
      (item.workflowStatus === 'seo_review' ||
        item.workflowStatus === 'approved' ||
        item.workflowStatus === 'published') &&
      (!item.reviewedBy || !item.reviewedDate)
    ) {
      // This is a warning, not a hard failure
      // But we'll still track it as a violation for reporting
      violations.push({
        filePath: item.filePath,
        workflowStatus: item.workflowStatus,
        violationType: 'MISSING_REVIEW_METADATA',
        message: `Content is "${item.workflowStatus}" but missing reviewedBy or reviewedDate fields`,
        fix: 'Add reviewedBy (name) and reviewedDate (ISO date string) to frontmatter',
      });
    }

    // Rule 4: Validate date formats (ISO 8601)
    if (item.reviewedDate && !isValidISODate(item.reviewedDate)) {
      violations.push({
        filePath: item.filePath,
        workflowStatus: item.workflowStatus,
        violationType: 'INVALID_DATE_FORMAT',
        message: `reviewedDate="${item.reviewedDate}" is not a valid ISO 8601 date`,
        fix: 'Use ISO 8601 format: YYYY-MM-DD or YYYY-MM-DDTHH:mm:ssZ',
      });
    }

    if (item.approvedDate && !isValidISODate(item.approvedDate)) {
      violations.push({
        filePath: item.filePath,
        workflowStatus: item.workflowStatus,
        violationType: 'INVALID_DATE_FORMAT',
        message: `approvedDate="${item.approvedDate}" is not a valid ISO 8601 date`,
        fix: 'Use ISO 8601 format: YYYY-MM-DD or YYYY-MM-DDTHH:mm:ssZ',
      });
    }
  }

  // Separate hard failures from warnings
  const hardFailures = violations.filter(
    v => v.violationType === 'UNAPPROVED_CONTENT' || v.violationType === 'MISSING_APPROVAL_METADATA'
  );

  return {
    passed: hardFailures.length === 0,
    violations,
    summary: {
      totalItems: items.length,
      violationCount: violations.length,
      draftCount,
      approvedCount,
      publishedCount,
    },
  };
}

/**
 * Validate ISO 8601 date string
 */
function isValidISODate(dateString: string): boolean {
  // Check basic ISO 8601 formats
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?(Z|[+-]\d{2}:\d{2})?)?$/;
  if (!isoDateRegex.test(dateString)) {
    return false;
  }

  // Try to parse as Date
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

/**
 * Format workflow report for console output
 */
export function formatWorkflowReport(result: WorkflowResult): string {
  const lines: string[] = [];

  lines.push('');
  lines.push('='.repeat(80));
  lines.push('WORKFLOW STATE ENFORCEMENT REPORT');
  lines.push('='.repeat(80));
  lines.push('');

  if (result.passed) {
    lines.push('✅ PASSED: All content meets workflow requirements');
    lines.push('');
    lines.push('Summary:');
    lines.push(`  Total items: ${result.summary.totalItems}`);
    lines.push(`  Published: ${result.summary.publishedCount}`);
    lines.push(`  Approved: ${result.summary.approvedCount}`);
    lines.push(`  Draft: ${result.summary.draftCount}`);
    lines.push('');
    return lines.join('\n');
  }

  lines.push('❌ FAILED: Workflow violations detected');
  lines.push('');
  lines.push('Summary:');
  lines.push(`  Total items: ${result.summary.totalItems}`);
  lines.push(`  Violations: ${result.summary.violationCount}`);
  lines.push(`  Published: ${result.summary.publishedCount}`);
  lines.push(`  Approved: ${result.summary.approvedCount}`);
  lines.push(`  Draft: ${result.summary.draftCount}`);
  lines.push('');
  lines.push('Violations:');
  lines.push('');

  // Group by violation type
  const groupedViolations = result.violations.reduce((acc, v) => {
    if (!acc[v.violationType]) {
      acc[v.violationType] = [];
    }
    acc[v.violationType].push(v);
    return acc;
  }, {} as Record<string, WorkflowViolation[]>);

  let violationNum = 1;
  for (const [type, violations] of Object.entries(groupedViolations)) {
    lines.push(`${type} (${violations.length} occurrence${violations.length > 1 ? 's' : ''}):`);
    lines.push('');

    for (const violation of violations) {
      lines.push(`  ${violationNum}. ${violation.filePath}`);
      lines.push(`     Status: ${violation.workflowStatus}`);
      lines.push(`     Issue: ${violation.message}`);
      lines.push(`     Fix: ${violation.fix}`);
      lines.push('');
      violationNum++;
    }

    lines.push('-'.repeat(80));
    lines.push('');
  }

  return lines.join('\n');
}

export type { WorkflowItem, WorkflowResult, WorkflowViolation, WorkflowStatus };
