📘 Gestoría Copilot – Full Specification (V1)

Your AI-powered gestoría for Spain.

The app helps expats and residents handle Spanish bureaucracy by automatically interpreting official letters, guiding them through administrative procedures, managing family cases, generating checklists, and automating reminders.

This document is exhaustive and designed for direct ingestion by Claude Code.

-------------------------------------------------------
1. Product Vision
-------------------------------------------------------

Vision:
A fully AI-driven “digital gestoría” focused on bureaucracy in Spain. Users upload letters or forms, the AI interprets them, and generates explanations, checklists, deadlines, and action steps for the user and their entire family.

Core principle:
Everything must be automated by AI. No human case handling in V1.

-------------------------------------------------------
2. Target Users
-------------------------------------------------------
2.1 Expat Residents

Do not speak Spanish/Catalan well

Get letters they can’t understand

Need help with padrón, NIE, health card, fines, taxes

2.2 Spanish Residents

Need reminders for Renta

Need guidance on Beckham law

Have families with minors to register

2.3 Families

Households needing padrón familiar

Parents needing reminders for children’s bureaucracy

-------------------------------------------------------
3. V1 Scope
-------------------------------------------------------
V1 MUST deliver:
Document AI

Upload PDF/JPG/PNG or take photo

OCR → clean → classify document type

Extract structured data:

Sender authority

Deadlines

Amounts

Reference numbers

Process type

Summarize and explain in plain language (EN/ES/CA)

Multi-language extraction (Spanish/Catalan/English)

Core Workflows Supported
3.1 Padrón (individual) – full flow

City-specific steps

Appointment guidance

Required documents

Renewal reminders

3.2 Padrón Familiar (household) – full flow

Select family members

Different document requirements for adults/minors

Consent rules

Shared address proof

Generate checklists per person

3.3 Beckham Law (Impatriate Tax Regime)

Eligibility check

Creation/submission checklist (Modelo 149)

Deadlines based on job start date

Template letters to employers

Recognize official notifications

Post-acceptance guidance (Modelo 151 info)

3.4 Traffic fines (DGT)

Deadline extraction

Amounts, discounts

Appeal vs pay logic

Checklist + payment instructions

3.5 Generic Tax Letters

Agencia Tributaria notices

Required action classification

Deadlines

Checklist + email templates

3.6 Tax Filing Reminders

Annual cycle:

March (pre-campaign)

April (start)

May (mid-campaign)

June (final)

Tasks created automatically

Users may add personal tax obligations

Chat Assistant (central feature)

Fully multi-language (user chooses: EN/ES/CA)

Context-aware:

User profile

Location

Family members

Uploaded documents

Active tasks

Process KB

User may:

Ask about any document

Request translations

Ask for templates

Clarify steps

Ask “what happens if…?”

Ask “what should I do next?”

Family Management

Main user manages a full household

Add dependents:

spouse, partner, children, other

Each dependent can:

Upload documents

Have their own tasks

Have residency dates tracked

Have padron status tracked

Receive process checklists

Tasks & Reminders

All extracted deadlines → tasks

Padrón renewal reminders

Beckham law deadlines

Annual Renta reminders

Dependent-specific tasks

Billing (Subscription SaaS)

Stripe

Free trial with doc limits

Paid tiers:

Basic (1 user)

Family (up to 5 dependents)

Languages

UI languages: English, Spanish, Catalan

AI responses also controlled by user setting

Architecture fully i18n-ready

-------------------------------------------------------
4. Non-Goals for V1
-------------------------------------------------------

Direct integration to gov portals (no auto-submission)

Payroll accounting

Company incorporation

Complex tax filing (only reminders + doc understanding)

-------------------------------------------------------
5. System Architecture
-------------------------------------------------------
Frontend (Next.js + TypeScript)

Tailwind CSS

React Query for server state

next-i18next for multi-language

Responsible for:

Document upload UI

Chat interface

Task dashboard

Family management UI

Padrón/Beckham/tax process visualizations

Backend (NestJS + TypeScript)

Modules:

Auth

Users

Dependents

Documents

Processes

Tasks

Chat

Billing

Notifications

Admin

Provides REST API consumed by frontend.

Database (PostgreSQL)

Core tables:

users

dependents

documents

processes

tasks

chat_messages

subscriptions

templates

Background Workers

OCR jobs

LLM extraction jobs

Reminder notifications

Stripe webhook handling

File Storage

S3-compatible bucket

Store:

raw documents

processed OCR output

LLM Layer

Abstraction for any LLM provider

Single unified interface:

summarizeDocument()

extractFields()

classifyProcess()

generateChecklist()

chatReply()

generateTemplates()

Prompts versioned in /prompts/.

-------------------------------------------------------
6. Functional Requirements
-------------------------------------------------------
6.1 Authentication

Email/password

JWT + refresh tokens

Email verification

Password reset

6.2 User Profile

Fields:

name

email

preferred_language

region/city

residency status

NIE/passport

tax residency date

beckham eligibility info (optional)

6.3 Family Management
Dependent fields

name

birthdate

relationship

NIE/passport

padron status

residency status

padron date

key dates (JSON)

preferred language

Dependent actions

Upload documents

Generate checklists

Generate padrón familiar workflows

Track expiries

6.4 Document Processing Pipeline

Upload starts document record

OCR worker extracts text

Language detection

LLM performs:

summary

extraction

classification

deadline/amount detection

Map to process(s)

Generate tasks

Present to user

6.5 Process Knowledge Base

Stored in DB, editable.

Process Categories (V1):

padron_individual

padron_familiar

beckham

traffic_fine

tax_notice

tax_filing

Each process contains:

localized titles/descriptions

steps with:

required documents

appointment rules

deadlines

city/region variations

6.6 Checklist Generation

Checklist per:

User

Dependent

Document

Process

AI merges:

Process KB

Extracted values

User context

Each step:

title

description

due date

required docs

location/URL

6.7 Chat Assistant

Context includes:

latest documents

tasks

dependents

residency data

padrón status

tax dates

process KB

Features:

Ask anything

Translate

Explain laws

Derive instructions

Help with templates

Provide probabilities (“likely”, “unlikely”)

Warn when uncertain

6.8 Template Generation

Prebuilt templates:

Padrón request email

Padrón familiar consent email

Modelo 149 employer letter

Traffic fine appeal letter

Tax info request email

Templates stored with:

placeholders

multi-language bodies

LLM may personalize but cannot break structure.

6.9 Tasks & Reminders
Task triggers:

document deadlines

padrón renewal

dependent expiries

beckham deadlines

annual Renta calendar

Reminder channels:

email

(push later)

6.10 Billing

Stripe:

Checkout

Portal

Webhooks

Subscription status stored in DB

Enforce usage limits on frontend and backend

6.11 Admin Dashboard

View users

View documents (redacted)

Retry OCR

Manage processes

Feature flags

-------------------------------------------------------
7. Data Model
-------------------------------------------------------
User
id
email
password_hash
name
preferred_language (en/es/ca)
region
city
residency_status
nie_or_passport
tax_residency_date
created_at
updated_at

Dependent
id
user_id
name
relationship
birthdate
nie_or_passport
residency_status
padron_status
padron_date
key_dates (JSON)
preferred_language
created_at
updated_at

Document
id
user_id
dependent_id (nullable)
storage_path_raw
storage_path_processed
status (pending_ocr, processing, processed, error)
language
sender_authority
reference_numbers (JSON)
amount_eur
deadline_date
tax_year
is_beckham_related (bool)
is_padron_familiar (bool)
doc_type
process_id (nullable)
summary_by_language (JSON)
structured_data (JSON)
created_at
processed_at

Process
id
slug
category
country
region
city
titles (JSON)
descriptions (JSON)
steps (JSON)
created_at
updated_at

Task
id
user_id
dependent_id (nullable)
process_id (nullable)
document_id (nullable)
title
description
due_date
status
priority
created_at
completed_at

ChatMessage
id
user_id
role
content
language
metadata (JSON)
created_at

Subscription
id
user_id
stripe_customer_id
stripe_subscription_id
plan
status
period_start
period_end
cancel_at_period_end
created_at
updated_at

Template
id
type
process_id (nullable)
language
name
body
placeholders_schema
created_at
updated_at

-------------------------------------------------------
8. API Endpoints (outline)
-------------------------------------------------------
Auth

POST /api/auth/signup

POST /api/auth/login

POST /api/auth/logout

POST /api/auth/refresh

Users

GET /api/me

PATCH /api/me

Dependents

POST /api/family

GET /api/family

PATCH /api/family/:id

DELETE /api/family/:id

POST /api/family/:id/documents

Documents

POST /api/documents

GET /api/documents

GET /api/documents/:id

PATCH /api/documents/:id

POST /api/documents/:id/reprocess

Processes

GET /api/processes

GET /api/processes/:id

Tasks

GET /api/tasks

PATCH /api/tasks/:id

Chat

POST /api/chat/messages

GET /api/chat/messages

Tax

POST /api/tax/settings

GET /api/tax/reminders

Billing

POST /api/billing/create-checkout-session

POST /api/billing/portal-session

POST /api/billing/webhooks

Admin

GET /api/admin/users

GET /api/admin/users/:id

GET /api/admin/documents

PATCH /api/admin/processes/:id

-------------------------------------------------------
9. LLM Pipeline
-------------------------------------------------------
Steps:

OCR

Clean text

LLM extraction

JSON schema validation

Retry if fail

Classification

Checklist generation

LLM abstractions:

summarizeDocument

extractFields

classifyProcess

generateChecklist

chatReply

fillTemplate

Safety rules:

Avoid fabricating deadlines

If unsure → mark as LOW CONFIDENCE

Suggest contacting authority with template

-------------------------------------------------------
10. Performance & Security
-------------------------------------------------------

HTTPS everywhere

AuthZ: user can only access own & dependents

Encrypt sensitive fields

Don’t store raw images unencrypted

Rate limiting on chat and uploads

Logs redacted

SLA:

Documents processed < 60s

Chat < 10s