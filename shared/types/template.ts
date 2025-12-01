// Template types based on SPEC2.md

import { Language } from './user';

export type TemplateType =
  | 'padron_request'
  | 'padron_familiar_consent'
  | 'beckham_employer_letter'
  | 'traffic_fine_appeal'
  | 'tax_info_request'
  | 'general_inquiry';

export interface PlaceholderSchema {
  name: string;
  type: 'string' | 'date' | 'number';
  required: boolean;
  description?: string;
}

export interface Template {
  id: string;
  type: TemplateType;
  processId?: string;
  language: Language;
  name: string;
  body: string;
  placeholdersSchema: PlaceholderSchema[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GenerateTemplateDto {
  templateId: string;
  placeholders: Record<string, string | number | Date>;
  language?: Language;
}

export interface GeneratedTemplate {
  subject?: string;
  body: string;
  language: Language;
}
