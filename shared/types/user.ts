// User types based on SPEC2.md

export type Language = 'en' | 'es' | 'ca';

export type ResidencyStatus = 'citizen' | 'resident' | 'non_resident' | 'pending';

export interface User {
  id: string;
  email: string;
  name: string;
  preferredLanguage: Language;
  region?: string;
  city?: string;
  residencyStatus?: ResidencyStatus;
  nieOrPassport?: string;
  taxResidencyDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends Omit<User, 'id' | 'createdAt' | 'updatedAt'> {
  beckhamEligible?: boolean;
  beckhamAppliedDate?: Date;
}

export interface CreateUserDto {
  email: string;
  password: string;
  name: string;
  preferredLanguage?: Language;
}

export interface UpdateUserDto {
  name?: string;
  preferredLanguage?: Language;
  region?: string;
  city?: string;
  residencyStatus?: ResidencyStatus;
  nieOrPassport?: string;
  taxResidencyDate?: Date;
}
