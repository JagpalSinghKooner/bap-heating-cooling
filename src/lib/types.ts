import type { CollectionEntry } from 'astro:content';

// Shared location context for service components
export interface LocationContext {
  title: string;
  slug?: string;
}

// Region to locations mapping
export interface RegionLocationMap {
  region: CollectionEntry<'regions'>;
  locations: CollectionEntry<'locations'>[];
}

// Problem/pain point type - matches config.ts problemSchema
export interface Problem {
  title: string;
  description: string;
  icon: string;
}

// Process step type - matches config.ts processStepSchema
export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

// Approach/solution type - matches config.ts approachSchema
export interface Approach {
  headline: string;
  description: string;
  quote?: string;
  quotePerson?: string;
}

// Inclusions type - matches config.ts inclusionsSchema
export interface Inclusions {
  equipment: string[];
  labour: string[];
  warranty: string[];
  extras: string[];
}

// Savings type - matches config.ts savingsSchema
export interface Savings {
  headline: string;
  description: string;
  bullets: string[];
  rebateInfo?: string;
  financingNote?: string;
}

// Guarantee item type
export interface GuaranteeItem {
  title: string;
  description: string;
}

// Guarantee type - matches config.ts guaranteeSchema
export interface Guarantee {
  items: GuaranteeItem[];
}

// Image type - matches config.ts imageSchema
export interface ServiceImage {
  src: string;
  alt: string;
  caption?: string;
}

// Local proof type - matches config.ts localProofSchema
export interface LocalProof {
  testimonial: string;
  customerName: string;
  customerLocation: string;
  result?: string;
}

// Value prop type
export interface ValueProp {
  title: string;
  description: string;
  icon: string;
}

// Merged service data for service-city pages
// Combines base service fields with optional city-specific overrides
export interface MergedServiceData {
  // Base service fields
  title: string;
  description: string;
  category: string;
  serviceType?: 'installation' | 'repair' | 'maintenance';
  valueProps?: ValueProp[];

  // Full funnel fields (from service or overridden by service-city)
  problems?: Problem[];
  approach?: Approach;
  processSteps?: ProcessStep[];
  inclusions?: Inclusions;
  savings?: Savings;
  guarantee?: Guarantee;
  images?: ServiceImage[];

  // SEO fields
  seoTitle?: string;
  seoDescription?: string;

  // City-specific fields (only present on service-city pages)
  localContext?: string;
  localProof?: LocalProof;
}
