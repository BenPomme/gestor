// Subscription types based on SPEC2.md

export type SubscriptionPlan = 'free' | 'basic' | 'family';

export type SubscriptionStatus =
  | 'active'
  | 'past_due'
  | 'canceled'
  | 'incomplete'
  | 'trialing';

export interface Subscription {
  id: string;
  userId: string;
  stripeCustomerId: string;
  stripeSubscriptionId?: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  periodStart?: Date;
  periodEnd?: Date;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlanLimits {
  maxDocumentsPerMonth: number;
  maxDependents: number;
  maxChatMessagesPerDay: number;
  hasEmailReminders: boolean;
  hasPrioritySupport: boolean;
}

export const PLAN_LIMITS: Record<SubscriptionPlan, PlanLimits> = {
  free: {
    maxDocumentsPerMonth: 3,
    maxDependents: 0,
    maxChatMessagesPerDay: 10,
    hasEmailReminders: false,
    hasPrioritySupport: false,
  },
  basic: {
    maxDocumentsPerMonth: 20,
    maxDependents: 0,
    maxChatMessagesPerDay: 100,
    hasEmailReminders: true,
    hasPrioritySupport: false,
  },
  family: {
    maxDocumentsPerMonth: 50,
    maxDependents: 5,
    maxChatMessagesPerDay: 200,
    hasEmailReminders: true,
    hasPrioritySupport: true,
  },
};

export interface CreateCheckoutSessionDto {
  plan: SubscriptionPlan;
  successUrl: string;
  cancelUrl: string;
}

export interface BillingPortalDto {
  returnUrl: string;
}
