// Chat types based on SPEC2.md

import { Language } from './user';

export type ChatRole = 'user' | 'assistant' | 'system';

export interface ChatMetadata {
  documentIds?: string[];
  taskIds?: string[];
  processId?: string;
  confidence?: number;
  sources?: string[];
  [key: string]: unknown;
}

export interface ChatMessage {
  id: string;
  userId: string;
  role: ChatRole;
  content: string;
  language: Language;
  metadata?: ChatMetadata;
  createdAt: Date;
}

export interface SendMessageDto {
  content: string;
  language?: Language;
  contextDocumentIds?: string[];
}

export interface ChatResponse {
  message: ChatMessage;
  suggestedActions?: string[];
}

export interface ChatHistory {
  messages: ChatMessage[];
  hasMore: boolean;
  nextCursor?: string;
}
