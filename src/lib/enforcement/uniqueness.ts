/**
 * UNIQUENESS ENFORCEMENT MODULE
 * Detects duplicate content, city-name swap patterns, and enforces uniqueness thresholds
 */

// Basic English stopwords for filtering
const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
  'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
  'to', 'was', 'will', 'with', 'we', 'you', 'your', 'our', 'this',
  'these', 'those', 'their', 'they', 'them', 'have', 'had', 'do',
]);

// Known Ontario cities for city-swap detection
const ONTARIO_CITIES = new Set([
  'guelph', 'kitchener', 'waterloo', 'cambridge', 'toronto', 'mississauga',
  'brampton', 'hamilton', 'burlington', 'oakville', 'milton', 'georgetown',
  'orangeville', 'shelburne', 'fergus', 'elora', 'acton', 'erin',
]);

interface UniquenessResult {
  passed: boolean;
  comparisons: ComparisonResult[];
  summary: {
    totalComparisons: number;
    failedComparisons: number;
    worstSimilarity: number;
    citySwapDetections: number;
  };
}

interface ComparisonResult {
  file1: string;
  file2: string;
  comparisonType: string;
  similarity: number;
  uniqueness: number;
  threshold: number;
  passed: boolean;
  citySwapDetected: boolean;
  overlappingNgrams: string[];
  recommendation: string;
}

interface ContentItem {
  filePath: string;
  content: string;
  type: 'service' | 'location' | 'service-city' | 'blog' | 'other';
  metadata?: {
    serviceSlug?: string;
    locationSlug?: string;
    citySlug?: string;
  };
}

/**
 * Tokenize text: lowercase, strip punctuation, remove stopwords
 */
function tokenize(text: string, removeStopwords: boolean = true): string[] {
  const tokens = text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ') // Replace punctuation with space
    .split(/\s+/)
    .filter(token => token.length > 0);

  if (removeStopwords) {
    return tokens.filter(token => !STOPWORDS.has(token));
  }

  return tokens;
}

/**
 * Generate n-grams from token array
 */
function generateNgrams(tokens: string[], n: number): string[] {
  const ngrams: string[] = [];
  for (let i = 0; i <= tokens.length - n; i++) {
    ngrams.push(tokens.slice(i, i + n).join(' '));
  }
  return ngrams;
}

/**
 * Calculate Jaccard similarity between two sets
 */
function jaccardSimilarity(set1: Set<string>, set2: Set<string>): number {
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);

  if (union.size === 0) return 0;

  return intersection.size / union.size;
}

/**
 * Detect city-name swap pattern
 * Returns true if texts are identical except for city names
 */
function detectCitySwap(text1: string, text2: string): boolean {
  // Normalize both texts by replacing all city names with placeholder
  const normalize = (text: string): string => {
    let normalized = text.toLowerCase();
    for (const city of ONTARIO_CITIES) {
      const regex = new RegExp(`\\b${city}\\b`, 'gi');
      normalized = normalized.replace(regex, '__CITY__');
    }
    return normalized;
  };

  const normalized1 = normalize(text1);
  const normalized2 = normalize(text2);

  // If normalized versions are very similar (>95%), it's a city swap
  const tokens1 = tokenize(normalized1, false);
  const tokens2 = tokenize(normalized2, false);

  const ngrams1 = new Set(generateNgrams(tokens1, 3));
  const ngrams2 = new Set(generateNgrams(tokens2, 3));

  const similarity = jaccardSimilarity(ngrams1, ngrams2);

  return similarity > 0.95;
}

/**
 * Calculate textual similarity between two content items
 */
function calculateSimilarity(item1: ContentItem, item2: ContentItem): {
  similarity: number;
  overlappingNgrams: string[];
} {
  // Tokenize both texts
  const tokens1 = tokenize(item1.content, true);
  const tokens2 = tokenize(item2.content, true);

  // Generate 5-grams
  const ngrams1 = generateNgrams(tokens1, 5);
  const ngrams2 = generateNgrams(tokens2, 5);

  const set1 = new Set(ngrams1);
  const set2 = new Set(ngrams2);

  // Calculate Jaccard similarity
  const similarity = jaccardSimilarity(set1, set2);

  // Find overlapping n-grams (top 5)
  const overlapping = [...set1].filter(x => set2.has(x));
  const topOverlapping = overlapping.slice(0, 5);

  return {
    similarity,
    overlappingNgrams: topOverlapping,
  };
}

/**
 * Determine comparison type and threshold
 */
function getComparisonThreshold(item1: ContentItem, item2: ContentItem): {
  type: string;
  threshold: number;
} {
  // Service-city vs Service-city (same service, different cities)
  if (
    item1.type === 'service-city' &&
    item2.type === 'service-city' &&
    item1.metadata?.serviceSlug === item2.metadata?.serviceSlug &&
    item1.metadata?.citySlug !== item2.metadata?.citySlug
  ) {
    return { type: 'service-city vs service-city (same service)', threshold: 0.80 };
  }

  // Service vs Service-city
  if (
    (item1.type === 'service' && item2.type === 'service-city') ||
    (item1.type === 'service-city' && item2.type === 'service')
  ) {
    return { type: 'service vs service-city', threshold: 0.80 };
  }

  // Location vs Location
  if (item1.type === 'location' && item2.type === 'location') {
    return { type: 'location vs location', threshold: 0.75 };
  }

  // Blog vs Blog
  if (item1.type === 'blog' && item2.type === 'blog') {
    return { type: 'blog vs blog', threshold: 0.95 };
  }

  // Default
  return { type: 'general comparison', threshold: 0.70 };
}

/**
 * Generate recommendation based on failure
 */
function generateRecommendation(
  comparison: ComparisonResult,
  citySwapDetected: boolean
): string {
  if (citySwapDetected) {
    return 'CITY-NAME SWAP DETECTED: Rewrite content with unique local context. Add 2-3 paragraphs of city-specific details (local regulations, climate considerations, neighborhood characteristics).';
  }

  if (comparison.uniqueness < 0.70) {
    return 'SEVERE DUPLICATION: Content is nearly identical. Completely rewrite one of the pages with unique angle and information.';
  }

  if (comparison.uniqueness < 0.80) {
    return 'MODERATE DUPLICATION: Add unique local context, remove reused intro/outro paragraphs, include city-specific logistics and response times.';
  }

  return 'MINOR DUPLICATION: Add 1-2 unique paragraphs with local details to reach threshold.';
}

/**
 * Main uniqueness enforcement function
 */
export function enforceUniqueness(items: ContentItem[]): UniquenessResult {
  const comparisons: ComparisonResult[] = [];
  let failedCount = 0;
  let worstSimilarity = 0;
  let citySwapCount = 0;

  // Compare all pairs
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const item1 = items[i];
      const item2 = items[j];

      // Get comparison type and threshold
      const { type, threshold } = getComparisonThreshold(item1, item2);

      // Calculate similarity
      const { similarity, overlappingNgrams } = calculateSimilarity(item1, item2);
      const uniqueness = 1 - similarity;

      // Detect city swap
      const citySwapDetected = detectCitySwap(item1.content, item2.content);
      if (citySwapDetected) {
        citySwapCount++;
      }

      // Check if passed
      const passed = uniqueness >= threshold && !citySwapDetected;

      if (!passed) {
        failedCount++;
      }

      if (similarity > worstSimilarity) {
        worstSimilarity = similarity;
      }

      const comparison: ComparisonResult = {
        file1: item1.filePath,
        file2: item2.filePath,
        comparisonType: type,
        similarity,
        uniqueness,
        threshold,
        passed,
        citySwapDetected,
        overlappingNgrams,
        recommendation: generateRecommendation(
          {
            file1: item1.filePath,
            file2: item2.filePath,
            comparisonType: type,
            similarity,
            uniqueness,
            threshold,
            passed,
            citySwapDetected,
            overlappingNgrams,
            recommendation: '',
          },
          citySwapDetected
        ),
      };

      comparisons.push(comparison);
    }
  }

  return {
    passed: failedCount === 0,
    comparisons,
    summary: {
      totalComparisons: comparisons.length,
      failedComparisons: failedCount,
      worstSimilarity,
      citySwapDetections: citySwapCount,
    },
  };
}

/**
 * Format uniqueness report for console output
 */
export function formatUniquenessReport(result: UniquenessResult): string {
  const lines: string[] = [];

  lines.push('');
  lines.push('='.repeat(80));
  lines.push('UNIQUENESS ENFORCEMENT REPORT');
  lines.push('='.repeat(80));
  lines.push('');

  if (result.passed) {
    lines.push('✅ PASSED: All content meets uniqueness thresholds');
    lines.push('');
    lines.push(`Total comparisons: ${result.summary.totalComparisons}`);
    lines.push(`Failed comparisons: ${result.summary.failedComparisons}`);
    lines.push('');
    return lines.join('\n');
  }

  lines.push('❌ FAILED: Content uniqueness violations detected');
  lines.push('');
  lines.push('Summary:');
  lines.push(`  Total comparisons: ${result.summary.totalComparisons}`);
  lines.push(`  Failed comparisons: ${result.summary.failedComparisons}`);
  lines.push(`  Worst similarity: ${(result.summary.worstSimilarity * 100).toFixed(1)}%`);
  lines.push(`  City-swap detections: ${result.summary.citySwapDetections}`);
  lines.push('');
  lines.push('Failed Comparisons:');
  lines.push('');

  const failedComparisons = result.comparisons.filter(c => !c.passed);

  for (let i = 0; i < failedComparisons.length; i++) {
    const comp = failedComparisons[i];
    lines.push(`${i + 1}. ${comp.comparisonType}`);
    lines.push(`   File 1: ${comp.file1}`);
    lines.push(`   File 2: ${comp.file2}`);
    lines.push(`   Similarity: ${(comp.similarity * 100).toFixed(1)}%`);
    lines.push(`   Uniqueness: ${(comp.uniqueness * 100).toFixed(1)}%`);
    lines.push(`   Threshold: ${(comp.threshold * 100).toFixed(1)}%`);
    lines.push(`   Status: ${comp.passed ? '✅ PASS' : '❌ FAIL'}`);

    if (comp.citySwapDetected) {
      lines.push('   ⚠️  CITY-NAME SWAP PATTERN DETECTED');
    }

    if (comp.overlappingNgrams.length > 0) {
      lines.push('   Top overlapping phrases:');
      comp.overlappingNgrams.forEach(ngram => {
        lines.push(`     - "${ngram}"`);
      });
    }

    lines.push('');
    lines.push(`   📋 Recommendation: ${comp.recommendation}`);
    lines.push('');
    lines.push('-'.repeat(80));
    lines.push('');
  }

  return lines.join('\n');
}

export type { UniquenessResult, ComparisonResult, ContentItem };
