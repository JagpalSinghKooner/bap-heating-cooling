/**
 * E-E-A-T / PROHIBITED PHRASE LINTING MODULE
 * Detects unverifiable claims, AI fluff, and emergency keyword abuse
 */

interface LintItem {
  filePath: string;
  content: string;
  frontmatter: string;
  pageType: 'service' | 'service-city' | 'location' | 'blog' | 'faq' | 'other';
  headings?: {
    h1: string[];
    h2: string[];
  };
}

interface LintResult {
  passed: boolean;
  issues: LintIssue[];
  summary: {
    totalItems: number;
    totalIssues: number;
    criticalIssues: number;
    warningIssues: number;
  };
}

interface LintIssue {
  filePath: string;
  severity: 'critical' | 'warning';
  category: string;
  phrase: string;
  location: string; // e.g., "H1", "H2", "body", "frontmatter"
  message: string;
  fix: string;
}

// Prohibited phrases by category
const PROHIBITED_PATTERNS = {
  // Unverifiable superiority claims
  superiority: [
    /\b(best|#1|number one|top[- ]rated|leading)\s+(in|hvac|heating|cooling|service)/gi,
    /\bguaranteed\s+(lowest|best|cheapest)/gi,
    /\b(cheapest|lowest\s+price)/gi,
    /\bunbeatable\s+(price|service|quality)/gi,
  ],

  // Over-broad vague claims
  vague: [
    /\bfast\s+service\b/gi, // OK if paired with specific timeframe
    /\bquick\s+response\b/gi,
    /\baffordable\s+prices\b/gi,
    /\bhighest\s+quality\b/gi,
    /\bexceptional\s+service\b/gi,
  ],

  // AI fluff words
  aiFluff: [
    /\bdelve\b/gi,
    /\bunlock(ing)?\b/gi,
    /\belevate\s+(your|the)\b/gi,
    /\bempower(ing|ed)?\b/gi,
    /\bleverage\s+(our|the)\b/gi,
    /\bgame[- ]changer\b/gi,
    /\bseamless(ly)?\b/gi,
    /\btransformative\b/gi,
    /\bunparalleled\b/gi,
    /\bcut(ting)?[- ]edge\b/gi,
  ],

  // Emergency keyword patterns
  emergency: [
    /\b24\/7\s+emergency\b/gi,
    /\bemergency\s+(service|repair|hvac)/gi,
    /\burgent\s+(service|repair)/gi,
  ],
};

/**
 * Extract headings from markdown content
 */
function extractHeadings(content: string): { h1: string[]; h2: string[] } {
  const h1Regex = /^#\s+(.+)$/gm;
  const h2Regex = /^##\s+(.+)$/gm;

  const h1: string[] = [];
  const h2: string[] = [];

  let match;

  while ((match = h1Regex.exec(content)) !== null) {
    h1.push(match[1]);
  }

  while ((match = h2Regex.exec(content)) !== null) {
    h2.push(match[1]);
  }

  return { h1, h2 };
}

/**
 * Check emergency keyword usage rules
 */
function checkEmergencyUsage(item: LintItem): LintIssue[] {
  const issues: LintIssue[] = [];

  // Extract headings if not provided
  const headings = item.headings || extractHeadings(item.content);

  // Rule: No "emergency" in H1/H2 on non-emergency pages
  if (item.pageType !== 'service-city') {
    for (const h1 of headings.h1) {
      if (/\bemergency\b/gi.test(h1)) {
        issues.push({
          filePath: item.filePath,
          severity: 'critical',
          category: 'EMERGENCY_CONTAINMENT',
          phrase: h1,
          location: 'H1',
          message: 'Emergency keyword not allowed in H1 on non-service-city pages',
          fix: 'Remove "emergency" from H1 or use alternative phrasing like "Need Service Now?"',
        });
      }
    }

    for (const h2 of headings.h2) {
      if (/\bemergency\b/gi.test(h2)) {
        issues.push({
          filePath: item.filePath,
          severity: 'warning',
          category: 'EMERGENCY_CONTAINMENT',
          phrase: h2,
          location: 'H2',
          message: 'Emergency keyword not recommended in H2 on non-service-city pages',
          fix: 'Remove "emergency" from H2 or use alternative phrasing',
        });
      }
    }
  }

  // Count emergency mentions in body
  const emergencyMatches = item.content.match(/\bemergency\b/gi) || [];

  // Homepage: max 2 mentions
  if (item.pageType === 'other' && item.filePath.includes('index.astro')) {
    if (emergencyMatches.length > 2) {
      issues.push({
        filePath: item.filePath,
        severity: 'warning',
        category: 'EMERGENCY_CONTAINMENT',
        phrase: 'emergency',
        location: 'body',
        message: `Emergency keyword used ${emergencyMatches.length} times (max 2 on homepage)`,
        fix: 'Reduce emergency mentions to maximum of 2 on homepage',
      });
    }
  }

  // Service-city pages: max 3 mentions
  if (item.pageType === 'service-city' && emergencyMatches.length > 3) {
    issues.push({
      filePath: item.filePath,
      severity: 'warning',
      category: 'EMERGENCY_CONTAINMENT',
      phrase: 'emergency',
      location: 'body',
      message: `Emergency keyword used ${emergencyMatches.length} times (max 3 on service-city pages)`,
      fix: 'Reduce emergency mentions to maximum of 3',
    });
  }

  return issues;
}

/**
 * Check for prohibited patterns
 */
function checkProhibitedPatterns(item: LintItem): LintIssue[] {
  const issues: LintIssue[] = [];

  // Check superiority claims
  for (const pattern of PROHIBITED_PATTERNS.superiority) {
    const matches = item.content.match(pattern);
    if (matches) {
      for (const match of matches) {
        issues.push({
          filePath: item.filePath,
          severity: 'critical',
          category: 'UNVERIFIABLE_CLAIM',
          phrase: match,
          location: 'body',
          message: 'Unverifiable superiority claim detected',
          fix: 'Replace with specific, verifiable facts (e.g., "Serving Ontario since 2005" instead of "best in Ontario")',
        });
      }
    }
  }

  // Check vague claims
  for (const pattern of PROHIBITED_PATTERNS.vague) {
    const matches = item.content.match(pattern);
    if (matches) {
      for (const match of matches) {
        // Check if paired with specific details
        const context = getMatchContext(item.content, match);
        const hasSpecifics = /\d+\s*(hour|minute|day|year)/.test(context);

        if (!hasSpecifics) {
          issues.push({
            filePath: item.filePath,
            severity: 'warning',
            category: 'VAGUE_CLAIM',
            phrase: match,
            location: 'body',
            message: 'Vague claim without specific details',
            fix: 'Add specific details (e.g., "Average response time: 2 hours" instead of "fast service")',
          });
        }
      }
    }
  }

  // Check AI fluff words
  for (const pattern of PROHIBITED_PATTERNS.aiFluff) {
    const matches = item.content.match(pattern);
    if (matches) {
      for (const match of matches) {
        issues.push({
          filePath: item.filePath,
          severity: 'warning',
          category: 'AI_FLUFF',
          phrase: match,
          location: 'body',
          message: 'AI-generated fluff word detected',
          fix: 'Remove or replace with plain, direct language',
        });
      }
    }
  }

  return issues;
}

/**
 * Get context around a match (100 chars before and after)
 */
function getMatchContext(text: string, match: string): string {
  const index = text.toLowerCase().indexOf(match.toLowerCase());
  if (index === -1) return '';

  const start = Math.max(0, index - 100);
  const end = Math.min(text.length, index + match.length + 100);

  return text.substring(start, end);
}

/**
 * Main E-E-A-T linting function
 */
export function lintEEAT(items: LintItem[], strict: boolean = false): LintResult {
  const allIssues: LintIssue[] = [];

  for (const item of items) {
    const issues: LintIssue[] = [];

    // Check prohibited patterns
    issues.push(...checkProhibitedPatterns(item));

    // Check emergency usage
    issues.push(...checkEmergencyUsage(item));

    allIssues.push(...issues);
  }

  const criticalIssues = allIssues.filter(i => i.severity === 'critical');
  const warningIssues = allIssues.filter(i => i.severity === 'warning');

  // In strict mode, warnings also fail the build
  const passed = strict ? allIssues.length === 0 : criticalIssues.length === 0;

  return {
    passed,
    issues: allIssues,
    summary: {
      totalItems: items.length,
      totalIssues: allIssues.length,
      criticalIssues: criticalIssues.length,
      warningIssues: warningIssues.length,
    },
  };
}

/**
 * Format E-E-A-T lint report for console output
 */
export function formatEEATReport(result: LintResult, strict: boolean = false): string {
  const lines: string[] = [];

  lines.push('');
  lines.push('='.repeat(80));
  lines.push(`E-E-A-T CONTENT LINTING REPORT ${strict ? '(STRICT MODE)' : '(WARNING MODE)'}`);
  lines.push('='.repeat(80));
  lines.push('');

  if (result.passed) {
    lines.push('✅ PASSED: No content quality issues detected');
    lines.push('');
    lines.push('Summary:');
    lines.push(`  Total items scanned: ${result.summary.totalItems}`);
    lines.push(`  Critical issues: ${result.summary.criticalIssues}`);
    lines.push(`  Warnings: ${result.summary.warningIssues}`);
    lines.push('');
    return lines.join('\n');
  }

  if (strict) {
    lines.push('❌ FAILED: Content quality issues detected (strict mode)');
  } else {
    lines.push('❌ FAILED: Critical content quality issues detected');
  }

  lines.push('');
  lines.push('Summary:');
  lines.push(`  Total items scanned: ${result.summary.totalItems}`);
  lines.push(`  Total issues: ${result.summary.totalIssues}`);
  lines.push(`  Critical issues: ${result.summary.criticalIssues}`);
  lines.push(`  Warnings: ${result.summary.warningIssues}`);
  lines.push('');

  // Group by category
  const groupedIssues = result.issues.reduce((acc, issue) => {
    if (!acc[issue.category]) {
      acc[issue.category] = [];
    }
    acc[issue.category].push(issue);
    return acc;
  }, {} as Record<string, LintIssue[]>);

  lines.push('Issues by Category:');
  lines.push('');

  for (const [category, issues] of Object.entries(groupedIssues)) {
    const criticalCount = issues.filter(i => i.severity === 'critical').length;
    const warningCount = issues.filter(i => i.severity === 'warning').length;

    lines.push(`${category} (${criticalCount} critical, ${warningCount} warning):`);
    lines.push('');

    for (let i = 0; i < issues.length; i++) {
      const issue = issues[i];
      const icon = issue.severity === 'critical' ? '🔴' : '⚠️';

      lines.push(`  ${i + 1}. ${icon} ${issue.filePath}`);
      lines.push(`     Location: ${issue.location}`);
      lines.push(`     Phrase: "${issue.phrase}"`);
      lines.push(`     Issue: ${issue.message}`);
      lines.push(`     Fix: ${issue.fix}`);
      lines.push('');
    }

    lines.push('-'.repeat(80));
    lines.push('');
  }

  return lines.join('\n');
}

export type { LintItem, LintResult, LintIssue };
