Developer Instructions for Claude Code
======================================================================
# CLAUDE.md – Coding Guidelines for Gestoría Copilot

This file defines how you (Claude) will write and maintain code for the Gestoría Copilot project.

Follow all rules strictly.

---

# 1. Tech Stack

## Frontend
- Next.js (React + TypeScript)
- Tailwind CSS
- next-i18next for translations
- React Query for server state
- Axios or Fetch for API calls

## Backend
- NestJS (TypeScript)
- PostgreSQL with Prisma or TypeORM
- Redis for queues
- REST API
- S3-compatible storage
- Stripe billing

Use TypeScript everywhere.

---

# 2. Repository Structure



frontend/
src/
components/
app/ or pages/
lib/
hooks/
styles/
i18n/
public/locales/en/.json
public/locales/es/.json
public/locales/ca/*.json

backend/
src/
modules/
auth/
users/
dependents/
documents/
tasks/
chat/
processes/
billing/
admin/
notifications/
common/
config/
prisma/ or migrations/

shared/
types/
schemas/

prompts/
infra/
scripts/


Do not create random new top-level folders.

---

# 3. Coding Principles

- Always return **complete** code files when asked.  
- Always use **TypeScript strict**.  
- Validate all input using DTOs or Zod.  
- Never hard-code user-visible text in components. Use translation keys.  
- Extract reusable logic into services.  
- Avoid duplication.  
- Write clean, predictable APIs.

---

# 4. Frontend Rules

- Use functional components + hooks.  
- Responsiveness required (mobile-first).  
- Use translation hooks everywhere.  
- Use React Query for:
  - GET endpoints  
  - document/task lists  
- Use mutations for POST/PATCH.  
- Always type API responses.  
- Keep file upload components simple and robust.

---

# 5. Backend Rules

### Controllers
- Thin: only mapping routes to service methods  
- Validate inputs with DTOs  
- Use guards for authentication

### Services
- Contain business logic  
- Call repositories/ORM  
- Call external services (LLM/OCR/Stripe)

### Modules
- One module per domain area  
- import/export services correctly

### DB
- Use migrations  
- Never break backwards compatibility without explaining

---

# 6. LLM & OCR Integration

- All LLM calls go through a `LLMService` interface
- Centralize prompts in `/prompts`
- Always return structured JSON
- Validate JSON output
- Implement retry logic

LLM methods:
- summarizeDocument
- extractFields
- classifyProcess
- generateChecklist
- chatReply
- fillTemplate

OCR:
- Use `OCRService`
- Accept PDFs, JPGs, PNGs
- Return text, boxes, confidence scores

---

# 7. i18n Rules

- All UI strings in translation JSON files
- Never embed language logic in components
- Supported locales in V1:
  - en
  - es
  - ca
- All dates formatted locale-aware

---

# 8. API Design

REST conventions:
- `/api/documents`
- `/api/family`
- `/api/tasks`

Response format:



{
data: {...},
error: null
}

or



{
data: null,
error: { code, message }
}


Include pagination where needed.

---

# 9. Security

- Do not log PII
- Do not log full documents
- Use HTTPS in production
- Use JWT with proper expiry
- Protect admin routes
- Sanitize file uploads
- Enforce per-user and per-dependent access

---

# 10. Local Development

Commands to use:
- `npm run dev:frontend`
- `npm run dev:backend`
- `npm run migrate`
- `npm run lint`
- `npm run test`

Before returning code:
- Ensure it compiles
- Ensure it’s typed
- Ensure exports/imports are correct

---

# 11. How Claude Should Respond to Prompts

When user requests code:
1. Read SPEC.md and this file.  
2. Infer correct folder and module.  
3. Output complete code files.  
4. Add comments to explain assumptions.  
5. Never leave stubs unless asked.  
6. Keep everything consistent with architecture.

When modifying existing code:
- Show full file with modifications  
- Explain briefly in comments  

When creating new components/services:
- Include imports  
- Include exports  
- Include DTOs  
- Include interfaces  
- Include schemas  
- Include comments describing logic

---

# 12. QA Process

## Testing Strategy

### Unit Tests
- **Frontend**: Jest + React Testing Library
- **Backend**: Jest
- Minimum 80% coverage for business logic
- Test file naming: `*.spec.ts` or `*.test.ts`
- Run with: `npm run test`

### Integration Tests
- Test API endpoints with supertest
- Test database operations with test database
- Mock external services (Stripe, S3, LLM, OCR)
- Run with: `npm run test:integration`

### E2E Tests
- Playwright for frontend E2E
- Test critical user flows:
  - Authentication (login, register, password reset)
  - Dependent management (add, edit, delete)
  - Document upload/download/classification
  - Task creation and completion
  - Chat with LLM assistant
  - Payment flows (Stripe checkout)
- Run with: `npm run test:e2e`

## Code Review Checklist

Before approving a PR, verify:

### Functionality
- [ ] Code works as intended
- [ ] Edge cases are handled
- [ ] Error states are handled gracefully
- [ ] No regressions introduced
- [ ] Translations added for new UI text

### Code Quality
- [ ] Follows project conventions
- [ ] No code duplication
- [ ] Functions are small and focused
- [ ] Types are properly defined (no `any`)
- [ ] DTOs/Zod schemas for all inputs

### Security
- [ ] No secrets in code
- [ ] Input validation present
- [ ] SQL injection prevention (Prisma parameterized)
- [ ] XSS prevention (proper escaping)
- [ ] Auth guards on protected routes
- [ ] Per-user/per-dependent access enforced

### Performance
- [ ] No N+1 queries
- [ ] Proper pagination for lists
- [ ] React Query used for caching
- [ ] No memory leaks

### Testing
- [ ] Unit tests for new logic
- [ ] Tests pass locally and in CI
- [ ] Edge cases are tested

## CI/CD Pipeline

### On Pull Request
1. `npm run lint` - ESLint + Prettier check
2. `npm run typecheck` - TypeScript compilation
3. `npm run test` - Unit tests
4. `npm run test:integration` - Integration tests
5. `npm run build` - Build verification

### On Merge to Main
1. All PR checks pass
2. `npm run test:e2e` - E2E tests
3. Deploy to staging
4. Smoke tests on staging
5. Manual QA sign-off (see checklist below)
6. Deploy to production
7. Post-deploy smoke test

## Manual QA Checklist

Before production deployment:

### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Testing
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] Responsive breakpoints work

### Localization
- [ ] Spanish (es) translations complete
- [ ] Catalan (ca) translations complete
- [ ] English (en) translations complete
- [ ] Date/number formatting correct per locale

### Core Flows
- [ ] User registration and login
- [ ] Add/edit/delete dependent
- [ ] Upload document (PDF, JPG, PNG)
- [ ] Document classification by LLM
- [ ] Create and complete tasks
- [ ] Chat assistant responds correctly
- [ ] Stripe payment flow works
- [ ] Email notifications sent

### Security Verification
- [ ] Cannot access other users' data
- [ ] Cannot access other users' dependents
- [ ] Admin routes protected
- [ ] JWT expiry works correctly
- [ ] File upload restrictions enforced

### Monitoring
- [ ] Error tracking active (Sentry or similar)
- [ ] Analytics events firing
- [ ] API response times acceptable (<500ms)

---

# 13. Error Handling

## Frontend
- Use error boundaries for component errors
- Show user-friendly error messages (translated)
- Log errors to monitoring service
- Provide retry options where applicable

## Backend
- Use NestJS exception filters
- Return consistent error response format:
```json
{
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      { "field": "email", "message": "Invalid email format" }
    ]
  }
}
```
- Log all errors with context (request ID, user ID)
- Never expose stack traces in production

---

# END OF CLAUDE.md