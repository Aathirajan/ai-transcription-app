# FreeTranscriptAI

> **Free, ad-supported AI transcription for audio, video, and YouTube links.** Upload a file or paste a URL — get a full transcript in seconds, export as TXT or SRT, no credit card required.

[![TypeScript](https://img.shields.io/badge/TypeScript-91.6%25-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Deepgram](https://img.shields.io/badge/ASR-Deepgram-13EF93?logoColor=white)](https://deepgram.com/)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

---

## Overview

FreeTranscriptAI is a freemium SaaS web app that removes the barrier to professional transcription. The free tier is sustained by ads shown during processing; users can upgrade to Pro for an ad-free experience. Both authenticated and guest workflows are supported.

**Core user flow:**

```
1. Drop a file (MP4/MP3/WAV/MOV/M4A, up to 500 MB)
   — or paste a YouTube URL
2. Watch processing progress  →  ads displayed here
3. Get the full transcript
4. Export as TXT (readable) or SRT (subtitle-ready)
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 + Framer Motion |
| Auth | NextAuth.js (Google OAuth) + Prisma adapter |
| Database | Prisma — SQLite (dev) / PostgreSQL (prod) |
| Transcription | **Deepgram SDK** (speech-to-text) |
| YouTube audio | **yt-dlp** + ytdl-core |
| Payments | Stripe (Pro subscription) |
| Ads | Google AdSense integration |
| Rate limiting | rate-limiter-flexible (Redis-backed) |
| Error tracking | **Sentry** (client + server + edge configs) |
| Logging | **Pino** (structured JSON logs) |
| Testing | **Vitest** |
| CI | GitHub Actions |
| Containerisation | Docker + Docker Compose |

---

## Architecture

```
ai-transcription-app/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing — hero, file upload, YouTube input
│   │   ├── processing/page.tsx   # Progress screen with ad placements
│   │   ├── result/page.tsx       # Transcript output + export options
│   │   ├── privacy/              # Privacy policy (SSR, structured data)
│   │   ├── terms/                # Terms of service
│   │   └── api/
│   │       ├── auth/             # NextAuth.js endpoints (Google OAuth)
│   │       ├── transcribe/       # Core: file/YouTube → Deepgram → transcript
│   │       ├── stripe/
│   │       │   ├── checkout/     # Create Stripe checkout session
│   │       │   └── webhook/      # Handle subscription lifecycle events
│   │       └── health/           # DB + Redis + Deepgram + Stripe health check
│   ├── components/
│   │   ├── FileUpload.tsx        # Drag-and-drop with validation + progress
│   │   ├── YouTubeInput.tsx      # URL input with thumbnail preview
│   │   ├── ProcessingScreen.tsx  # Animated progress + ad placements
│   │   ├── TranscriptOutput.tsx  # Full transcript display + copy
│   │   └── ExportOptions.tsx     # TXT / SRT download
│   └── lib/
│       ├── auth.ts               # NextAuth config + session helpers
│       ├── prisma.ts             # Prisma client singleton
│       └── logger.ts             # Pino structured logger
├── prisma/schema.prisma
├── scripts/                      # DB utilities, seed scripts
├── Dockerfile
├── docker-compose.yml
├── sentry.client.config.ts
├── sentry.server.config.ts
└── sentry.edge.config.ts
```

---

## API

Base URL: `https://freetranscriptai.com`

### `POST /api/transcribe`

The core endpoint. Accepts a file upload or YouTube URL and returns the full transcript via Deepgram.

**Auth:** Optional — rate limits are tighter for unauthenticated requests.

**Content-Type:** `multipart/form-data`

| Field | Type | Required | Notes |
|---|---|---|---|
| `sourceType` | string | Yes | `"file"` or `"youtube"` |
| `file` | File | Conditional | Max 500 MB — MP4, MOV, WebM, MP3, WAV, M4A, OGG, FLAC |
| `youtubeUrl` | string | Conditional | Full YouTube video URL |

**Success response:**
```json
{
  "success": true,
  "transcript": {
    "id": "ct_abc123",
    "transcript": "Full transcribed text...",
    "wordCount": 150,
    "duration": 120
  }
}
```

**Rate limits:**

| Endpoint | Limit | Window |
|---|---|---|
| `/api/transcribe` | 5 requests | 1 minute |
| `/api/stripe/checkout` | 10 requests | 1 minute |

Rate-limit headers returned: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`.

### `GET /api/health`

Probes all downstream dependencies and returns latency for each:

```json
{
  "status": "ok",
  "timestamp": "2026-03-01T12:00:00.000Z",
  "services": {
    "database": { "status": "healthy", "latency": 5 },
    "redis":    { "status": "healthy", "latency": 2 },
    "deepgram": { "status": "healthy" },
    "stripe":   { "status": "healthy" }
  }
}
```

### Auth endpoints (NextAuth.js)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/auth/signin` | Sign-in page |
| POST | `/api/auth/callback/google` | Google OAuth callback |
| GET | `/api/auth/session` | Current session |
| POST | `/api/auth/signout` | Sign out |

### Stripe webhooks

`POST /api/stripe/webhook` handles `checkout.session.completed`, `customer.subscription.updated`, and `customer.subscription.deleted`.

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Deepgram](https://deepgram.com) API key (free tier: 200,000 sec/month)
- Google OAuth credentials
- `yt-dlp` binary installed for YouTube support

### Local Setup

```bash
git clone https://github.com/Aathirajan/ai-transcription-app.git
cd ai-transcription-app

npm install

cp .env.example .env
# Fill in required values (see below)

npx prisma generate
npx prisma db push     # SQLite for local dev

npm run dev
```

App runs at `http://localhost:3000`.

### Environment Variables

```env
# Database
DATABASE_URL="file:./dev.db"          # SQLite for dev; PostgreSQL URL for prod

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""                     # openssl rand -base64 32
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Transcription (required)
DEEPGRAM_API_KEY=""

# Payments (optional)
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""

# Ads (optional)
NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID=""

# Rate limiting (optional — falls back to in-memory)
REDIS_URL=""

# Error tracking (optional)
SENTRY_DSN=""
SENTRY_ORG=""
SENTRY_PROJECT=""

# YouTube
YTDLP_PATH="/usr/local/bin/yt-dlp"
```

### Docker

```bash
# Full stack (app + PostgreSQL + Redis)
docker-compose up -d

# View logs
docker-compose logs -f app

# Scale app instances
docker-compose up -d --scale app=3
```

```bash
# Build and run standalone
docker build -t freetranscriptai .
docker run -d -p 3000:3000 --env-file .env.production freetranscriptai
```

### Scripts

```bash
npm run dev        # Dev server with hot reload
npm run build      # Production build
npm run start      # Production server
npm run lint       # ESLint
npm run test       # Vitest (watch mode)
npm run test:run   # Vitest (single pass, for CI)
```

---

## Deployment

### Vercel (recommended)

Connect your GitHub repo in the Vercel dashboard or:

```bash
npm i -g vercel
vercel --prod
```

Switch `DATABASE_URL` to a PostgreSQL connection string (Neon, Supabase, or Railway all work). All other env vars map directly.

### Self-hosted

Use the Docker Compose setup. Add a reverse proxy (Nginx/Caddy) in front and point it at port 3000.

---

## Observability

**Error tracking** — Sentry is configured across all three Next.js runtimes (client, server, edge) via `sentry.client.config.ts`, `sentry.server.config.ts`, and `sentry.edge.config.ts`. All unhandled exceptions are captured automatically.

**Structured logging** — Pino outputs JSON logs in production, making them compatible with any log aggregator (Datadog, CloudWatch, Grafana Loki). Development gets pretty-printed output.

**Health endpoint** — `/api/health` probes every downstream dependency with latency so monitoring tools can alert on degraded service before users notice.

---

## Key Design Decisions

**Deepgram over Whisper for latency** — Deepgram's streaming ASR is significantly faster for real-time progress feedback than a self-hosted or API-batched Whisper call. Given the freemium model where ads run during processing, shorter processing time still matters — but the tradeoff here was accuracy + reliability over cost, with Deepgram's free tier covering the load at launch.

**yt-dlp + ytdl-core for YouTube** — Using yt-dlp as the system binary for audio extraction gives much better success rates on age-gated or region-restricted videos than ytdl-core alone. ytdl-core handles the metadata layer (thumbnail preview, title) where it's more reliable.

**Rate limiting backed by Redis, not in-memory** — In-memory rate limiting breaks as soon as you scale to more than one instance (see `docker-compose up --scale app=3`). The Redis-backed `rate-limiter-flexible` approach means rate limits hold correctly across horizontal scaling, with graceful fallback to in-memory in single-instance development.

**Sentry configured at the edge layer** — Most Next.js apps only add Sentry to client and server. Including the edge config catches errors in middleware and edge API routes, which is where auth failures and rate-limit edge cases most often surface.

**SRT export as a first-class output** — Most free transcription tools only offer plain text. Supporting SRT (SubRip subtitle format) with proper timestamp blocks makes the output directly usable in video editors, YouTube's subtitle importer, and accessibility workflows — a meaningful differentiator at zero extra cost.

---

## License

MIT © [Aathirajan](https://github.com/Aathirajan)
