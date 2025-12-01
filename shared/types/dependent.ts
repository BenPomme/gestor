// Dependent types based on SPEC2.md

import { Language, ResidencyStatus } from './user';

export type Relationship = 'spouse' | 'partner' | 'child' | 'parent' | 'sibling' | 'other';

export type PadronStatus = 'not_registered' | 'registered' | 'expired' | 'pending';

export interface KeyDates {
  nieExpiry?: Date;
  passportExpiry?: Date;
  residencyExpiry?: Date;
  padronRenewal?: Date;
  [key: string]: Date | undefined;
}

export interface Dependent {
  id: string;
  userId: string;
  name: string;
  relationship: Relationship;
  birthdate?: Date;
  nieOrPassport?: string;
  residencyStatus?: ResidencyStatus;
  padronStatus?: PadronStatus;
  padronDate?: Date;
  keyDates?: KeyDates;
  preferredLanguage?: Language;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDependentDto {
  name: string;
  relationship: Relationship;
  birthdate?: Date;
  nieOrPassport?: string;
  residencyStatus?: ResidencyStatus;
  padronStatus?: PadronStatus;
  padronDate?: Date;
  keyDates?: KeyDates;
  preferredLanguage?: Language;
}

export interface UpdateDependentDto extends Partial<CreateDependentDto> {}
