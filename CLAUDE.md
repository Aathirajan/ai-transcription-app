# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**FreeTranscriptAI** - A free ad-supported AI-powered transcription tool for audio/video files and YouTube links. Uses Deepgram for speech-to-text, Stripe for payments, and NextAuth with Google OAuth for authentication.

## Commands

```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests in watch mode
npm run test:run     # Run tests once
npm run test:coverage # Run tests with coverage
npx prisma db push   # Initialize/sync SQLite database (dev)
npx prisma migrate deploy # Apply migrations (production)
npx tsc --noEmit     # Type check without emitting
```

## Architecture

### Database (Prisma)
- **Development**: SQLite (`DATABASE_URL="file:./dev.db"`)
- **Production**: PostgreSQL
- Key models: `User` (with Stripe subscription fields), `Transcript`, `Account`, `Session`
- Prisma client singleton pattern in `src/lib/prisma.ts`

### Authentication
- NextAuth.js with Google OAuth provider
- JWT session strategy
- Custom `session.user.id` added via callbacks in `src/lib/auth.ts`

### Configuration Pattern
- Environment-aware config in `src/lib/config/`:
  - `development.ts`, `staging.ts`, `production.ts`
  - Exported via `src/lib/config/index.ts`

### API Routes (`src/app/api/`)
- `/api/auth/[...nextauth]` - NextAuth endpoints
- `/api/transcripts` - GET (list), DELETE (remove)
- `/api/stripe/checkout` - Stripe checkout session creation
- `/api/subscription` - Subscription status check

### Page Structure
- `/` - Landing page with file upload and YouTube input
- `/processing` - Shows transcription progress with ads
- `/result` - Displays transcript with export options

### External Services
- **Deepgram**: Transcription API (`@deepgram/sdk`)
- **YouTube**: `yt-dlp-exec` and `ytdl-core` for video extraction
- **Stripe**: Payment processing for Pro subscriptions
- **Sentry**: Error tracking (configured in `sentry.*.config.ts`)

## Environment Variables

Copy `.env.example` to `.env`. Required:
- `DATABASE_URL` - SQLite file path (dev) or PostgreSQL URL (prod)
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` - App URL
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` - OAuth credentials
- `DEEPGRAM_API_KEY` - For transcription

Optional: Stripe keys, AdSense IDs, Sentry DSN, Redis URL

## Testing

- Vitest with React Testing Library
- Test setup: `src/__tests__/setup.ts`
- Path alias `@/*` maps to `./src/*`
- Run single test: `npx vitest run path/to/test.test.ts`

## Key Patterns

### Session Access
```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const session = await getServerSession(authOptions);
const userId = session?.user?.id;
```

### Prisma Usage
```typescript
import { prisma } from "@/lib/prisma";

const user = await prisma.user.findUnique({ where: { id } });
```

### Component Styling
- Tailwind CSS v4
- Design system colors in `SPEC.md`: Primary `#0D0D0D`, Accent `#E94560`
- Framer Motion for animations
- Lucide React for icons