-- CreateEnum
CREATE TYPE "Language" AS ENUM ('en', 'es', 'ca');

-- CreateEnum
CREATE TYPE "ResidencyStatus" AS ENUM ('citizen', 'resident', 'non_resident', 'pending');

-- CreateEnum
CREATE TYPE "Relationship" AS ENUM ('spouse', 'partner', 'child', 'parent', 'sibling', 'other');

-- CreateEnum
CREATE TYPE "PadronStatus" AS ENUM ('not_registered', 'registered', 'expired', 'pending');

-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('pending_ocr', 'processing', 'processed', 'error');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('padron_certificate', 'nie_certificate', 'tax_notice', 'traffic_fine', 'beckham_notification', 'modelo_149', 'modelo_151', 'rental_contract', 'utility_bill', 'bank_statement', 'employment_contract', 'other');

-- CreateEnum
CREATE TYPE "ProcessCategory" AS ENUM ('padron_individual', 'padron_familiar', 'beckham', 'traffic_fine', 'tax_notice', 'tax_filing');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('low', 'medium', 'high', 'urgent');

-- CreateEnum
CREATE TYPE "ChatRole" AS ENUM ('user', 'assistant', 'system');

-- CreateEnum
CREATE TYPE "SubscriptionPlan" AS ENUM ('free', 'basic', 'family');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('active', 'past_due', 'canceled', 'incomplete', 'trialing');

-- CreateEnum
CREATE TYPE "TemplateType" AS ENUM ('padron_request', 'padron_familiar_consent', 'beckham_employer_letter', 'traffic_fine_appeal', 'tax_info_request', 'general_inquiry');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "preferred_language" "Language" NOT NULL DEFAULT 'en',
    "region" TEXT,
    "city" TEXT,
    "residency_status" "ResidencyStatus",
    "nie_or_passport" TEXT,
    "tax_residency_date" TIMESTAMP(3),
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dependents" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "relationship" "Relationship" NOT NULL,
    "birthdate" TIMESTAMP(3),
    "nie_or_passport" TEXT,
    "residency_status" "ResidencyStatus",
    "padron_status" "PadronStatus",
    "padron_date" TIMESTAMP(3),
    "key_dates" JSONB,
    "preferred_language" "Language",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dependents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "dependent_id" TEXT,
    "storage_path_raw" TEXT NOT NULL,
    "storage_path_processed" TEXT,
    "status" "DocumentStatus" NOT NULL DEFAULT 'pending_ocr',
    "language" "Language",
    "sender_authority" TEXT,
    "reference_numbers" JSONB,
    "amount_eur" DECIMAL(10,2),
    "deadline_date" TIMESTAMP(3),
    "tax_year" INTEGER,
    "is_beckham_related" BOOLEAN NOT NULL DEFAULT false,
    "is_padron_familiar" BOOLEAN NOT NULL DEFAULT false,
    "doc_type" "DocumentType",
    "process_id" TEXT,
    "summary_by_language" JSONB,
    "structured_data" JSONB,
    "ocr_text" TEXT,
    "confidence" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processed_at" TIMESTAMP(3),

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "processes" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" "ProcessCategory" NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'ES',
    "region" TEXT,
    "city" TEXT,
    "titles" JSONB NOT NULL,
    "descriptions" JSONB NOT NULL,
    "steps" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "processes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "dependent_id" TEXT,
    "process_id" TEXT,
    "document_id" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "due_date" TIMESTAMP(3),
    "status" "TaskStatus" NOT NULL DEFAULT 'pending',
    "priority" "TaskPriority" NOT NULL DEFAULT 'medium',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_messages" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" "ChatRole" NOT NULL,
    "content" TEXT NOT NULL,
    "language" "Language" NOT NULL,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "stripe_customer_id" TEXT NOT NULL,
    "stripe_subscription_id" TEXT,
    "plan" "SubscriptionPlan" NOT NULL DEFAULT 'free',
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'active',
    "period_start" TIMESTAMP(3),
    "period_end" TIMESTAMP(3),
    "cancel_at_period_end" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "templates" (
    "id" TEXT NOT NULL,
    "type" "TemplateType" NOT NULL,
    "process_id" TEXT,
    "language" "Language" NOT NULL,
    "name" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "placeholders_schema" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "templates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_key" ON "refresh_tokens"("token");

-- CreateIndex
CREATE INDEX "documents_user_id_idx" ON "documents"("user_id");

-- CreateIndex
CREATE INDEX "documents_status_idx" ON "documents"("status");

-- CreateIndex
CREATE INDEX "documents_deadline_date_idx" ON "documents"("deadline_date");

-- CreateIndex
CREATE UNIQUE INDEX "processes_slug_key" ON "processes"("slug");

-- CreateIndex
CREATE INDEX "processes_category_idx" ON "processes"("category");

-- CreateIndex
CREATE INDEX "tasks_user_id_idx" ON "tasks"("user_id");

-- CreateIndex
CREATE INDEX "tasks_status_idx" ON "tasks"("status");

-- CreateIndex
CREATE INDEX "tasks_due_date_idx" ON "tasks"("due_date");

-- CreateIndex
CREATE INDEX "chat_messages_user_id_idx" ON "chat_messages"("user_id");

-- CreateIndex
CREATE INDEX "chat_messages_created_at_idx" ON "chat_messages"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_user_id_key" ON "subscriptions"("user_id");

-- CreateIndex
CREATE INDEX "templates_type_idx" ON "templates"("type");

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dependents" ADD CONSTRAINT "dependents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_dependent_id_fkey" FOREIGN KEY ("dependent_id") REFERENCES "dependents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_process_id_fkey" FOREIGN KEY ("process_id") REFERENCES "processes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_dependent_id_fkey" FOREIGN KEY ("dependent_id") REFERENCES "dependents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_process_id_fkey" FOREIGN KEY ("process_id") REFERENCES "processes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "templates" ADD CONSTRAINT "templates_process_id_fkey" FOREIGN KEY ("process_id") REFERENCES "processes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
