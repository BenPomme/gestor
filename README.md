# Gestoría Copilot

AI-powered assistant for Spanish bureaucracy. Helps expats and residents handle padrón, NIE, Beckham law, traffic fines, tax notices, and more.

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, React Query
- **Backend**: NestJS, TypeScript, Prisma, PostgreSQL
- **AI**: LLM integration (OpenAI compatible), OCR
- **Payments**: Stripe
- **Storage**: S3-compatible

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 15+
- Redis (optional, for queues)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# Edit the .env files with your configuration

# Generate Prisma client
cd backend && npm run prisma:generate

# Run database migrations
npm run migrate:dev

# Start development servers
npm run dev
```

### Development Commands

```bash
# Root level
npm run dev           # Start both frontend and backend
npm run build         # Build all packages
npm run lint          # Lint all packages
npm run test          # Run all tests

# Frontend (from /frontend)
npm run dev           # Start Next.js dev server (port 3000)
npm run test          # Run Jest tests
npm run test:e2e      # Run Playwright E2E tests

# Backend (from /backend)
npm run dev           # Start NestJS dev server (port 3001)
npm run test          # Run Jest tests
npm run migrate:dev   # Create and run migrations
```

## Project Structure

```
gestorapp/
├── frontend/           # Next.js application
│   ├── src/
│   │   ├── app/        # App router pages
│   │   ├── components/ # React components
│   │   ├── hooks/      # Custom hooks
│   │   ├── lib/        # Utilities (api, i18n, etc.)
│   │   └── services/   # API service layer
│   ├── public/locales/ # i18n translations (en, es, ca)
│   └── e2e/            # Playwright tests
│
├── backend/            # NestJS application
│   ├── src/
│   │   ├── modules/    # Feature modules
│   │   ├── common/     # Shared utilities
│   │   ├── config/     # Configuration
│   │   └── prisma/     # Database service
│   ├── prisma/         # Schema and migrations
│   └── test/           # E2E tests
│
├── shared/             # Shared TypeScript types
│   └── types/
│
├── prompts/            # LLM prompt templates
├── docs/               # Documentation
└── infra/              # Infrastructure config
```

## Features (V1)

- **Document AI**: Upload PDFs/images, OCR extraction, LLM analysis
- **Process Workflows**: Padrón, Beckham Law, Traffic Fines, Tax Notices
- **Family Management**: Track dependents and their documents
- **Chat Assistant**: Context-aware AI help in EN/ES/CA
- **Tasks & Reminders**: Deadline tracking, email notifications
- **Billing**: Stripe subscriptions (Free, Basic, Family)

## Documentation

- [SPEC2.md](./SPEC2.md) - Full product specification
- [CLAUDE.md](./CLAUDE.md) - Coding guidelines and QA process

## License

Private - All rights reserved
