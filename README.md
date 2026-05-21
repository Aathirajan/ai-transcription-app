# FreeTranscriptAI

A free, ad-supported AI-powered transcription tool for audio/video files and YouTube links.

## Features

- **Multiple Input Methods**: Upload audio/video files or paste YouTube links
- **AI-Powered Transcription**: Uses Deepgram for accurate speech-to-text
- **YouTube Support**: Extract transcripts directly from YouTube videos
- **Export Options**: Download as TXT or SRT (subtitles) format
- **Ad-Supported**: Free to use with advertisements
- **User Accounts**: Sign up to save transcripts and access premium features
- **Stripe Integration**: Upgrade to premium for ad-free experience

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Authentication**: NextAuth.js with Prisma adapter
- **Database**: Prisma with SQLite (dev) / PostgreSQL (prod)
- **Transcription**: Deepgram SDK
- **YouTube**: yt-dlp + ytdl-core
- **Payments**: Stripe
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Error Tracking**: Sentry
- **Logging**: Pino
- **Rate Limiting**: rate-limiter-flexible
- **Testing**: Vitest

## Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm/bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd p1-transcript-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Initialize the database
npx prisma db push

# Run the development server
npm run dev
```

### Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Deepgram (for transcription)
DEEPGRAM_API_KEY="your-deepgram-api-key"

# Stripe (for payments)
STRIPE_SECRET_KEY="your-stripe-secret-key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"

# YouTube
YTDLP_PATH="path-to-yt-dlp"

# Sentry (optional)
SENTRY_DSN="your-sentry-dsn"
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth endpoints
│   │   ├── stripe/       # Stripe checkout
│   │   └── transcripts/  # Transcript processing
│   ├── processing/       # Processing page
│   ├── result/           # Result page
│   ├── privacy/          # Privacy policy
│   ├── terms/            # Terms of service
│   └── cookies/          # Cookie policy
├── components/           # React components
│   ├── FileUpload.tsx
│   ├── YouTubeInput.tsx
│   ├── ProcessingScreen.tsx
│   ├── TranscriptOutput.tsx
│   ├── ExportOptions.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ...
├── lib/                   # Utility functions
│   ├── utils.ts
│   ├── auth.ts
│   ├── prisma.ts
│   └── logger.ts
└── types/                 # TypeScript types
```

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
npm run test      # Run tests
npm run test:run  # Run tests once
```

## Supported File Formats

- MP4
- MP3
- WAV
- MOV
- M4A

Maximum file size: 500MB

## Pages

- **/** - Landing page with upload/YouTube input
- **/processing** - Shows transcription progress with ads
- **/result** - Display transcript with export options
- **/privacy** - Privacy policy
- **/terms** - Terms of service
- **/cookies** - Cookie policy
- **/contact** - Contact page

## Deployment

This app is optimized for deployment on Vercel:

1. Push to GitHub
2. Import project on Vercel
3. Configure environment variables
4. Deploy

## License

MIT
