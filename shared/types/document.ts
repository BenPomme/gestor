// Document types based on SPEC2.md

import { Language } from './user';

export type DocumentStatus = 'pending_ocr' | 'processing' | 'processed' | 'error';

export type DocumentType =
  | 'padron_certificate'
  | 'nie_certificate'
  | 'tax_notice'
  | 'traffic_fine'
  | 'beckham_notification'
  | 'modelo_149'
  | 'modelo_151'
  | 'rental_contract'
  | 'utility_bill'
  | 'bank_statement'
  | 'employment_contract'
  | 'other';

export interface ReferenceNumbers {
  expediente?: string;
  nif?: string;
  referencia?: string;
  [key: string]: string | undefined;
}

export interface SummaryByLanguage {
  en?: string;
  es?: string;
  ca?: string;
}

export interface StructuredData {
  senderName?: string;
  senderAddress?: string;
  recipientName?: string;
  subject?: string;
  mainContent?: string;
  requiredActions?: string[];
  confidence?: number;
  [key: string]: unknown;
}

export interface Document {
  id: string;
  userId: string;
  dependentId?: string;
  storagePathRaw: string;
  storagePathProcessed?: string;
  status: DocumentStatus;
  language?: Language;
  senderAuthority?: string;
  referenceNumbers?: ReferenceNumbers;
  amountEur?: number;
  deadlineDate?: Date;
  taxYear?: number;
  isBeckhamRelated?: boolean;
  isPadronFamiliar?: boolean;
  docType?: DocumentType;
  processId?: string;
  summaryByLanguage?: SummaryByLanguage;
  structuredData?: StructuredData;
  createdAt: Date;
  processedAt?: Date;
}

export interface UploadDocumentDto {
  dependentId?: string;
  file: File | Blob;
}

export interface UpdateDocumentDto {
  dependentId?: string;
  docType?: DocumentType;
  processId?: string;
}
