// Process types based on SPEC2.md

export type ProcessCategory =
  | 'padron_individual'
  | 'padron_familiar'
  | 'beckham'
  | 'traffic_fine'
  | 'tax_notice'
  | 'tax_filing';

export interface LocalizedText {
  en: string;
  es: string;
  ca: string;
}

export interface ProcessStep {
  order: number;
  title: LocalizedText;
  description: LocalizedText;
  requiredDocuments?: string[];
  appointmentRequired?: boolean;
  appointmentUrl?: string;
  estimatedDays?: number;
  notes?: LocalizedText;
}

export interface Process {
  id: string;
  slug: string;
  category: ProcessCategory;
  country: string;
  region?: string;
  city?: string;
  titles: LocalizedText;
  descriptions: LocalizedText;
  steps: ProcessStep[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProcessSummary {
  id: string;
  slug: string;
  category: ProcessCategory;
  title: string; // Localized based on user preference
  description: string;
}
