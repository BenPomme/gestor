// API response types based on SPEC2.md

export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
}

export interface ApiError {
  code: string;
  message: string;
  details?: ErrorDetail[];
}

export interface ErrorDetail {
  field: string;
  message: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
  error: null;
}

export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export interface PaginationParams {
  page?: number;
  perPage?: number;
}

// Auth types
export interface LoginDto {
  email: string;
  password: string;
}

export interface SignupDto {
  email: string;
  password: string;
  name: string;
  preferredLanguage?: 'en' | 'es' | 'ca';
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

// Common error codes
export const ErrorCodes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  RATE_LIMITED: 'RATE_LIMITED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  OCR_FAILED: 'OCR_FAILED',
  LLM_FAILED: 'LLM_FAILED',
  STORAGE_ERROR: 'STORAGE_ERROR',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  LIMIT_EXCEEDED: 'LIMIT_EXCEEDED',
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];
