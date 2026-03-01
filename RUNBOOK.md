# FreeTranscriptAI - Operations Runbook

## Table of Contents
1. [Quick Start](#quick-start)
2. [Environment Setup](#environment-setup)
3. [Deployment](#deployment)
4. [Monitoring](#monitoring)
5. [Troubleshooting](#troubleshooting)
6. [Backup & Recovery](#backup--recovery)

---

## Quick Start

### Local Development
```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your values

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# Start development server
npm run dev
```

### Docker Development
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f app
```

---

## Environment Setup

### Required Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_SECRET` | Auth secret (generate with `openssl rand -base64 32`) | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | Yes |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | Yes |
| `DEEPGRAM_API_KEY` | Deepgram API key for transcription | Yes |
| `STRIPE_SECRET_KEY` | Stripe API key | No |
| `NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID` | AdSense Client ID | No |
| `REDIS_URL` | Redis connection string | No |

### Setting Up External Services

#### 1. Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create OAuth 2.0 Client ID
3. Add authorized redirect URIs: `{NEXTAUTH_URL}/api/auth/callback/google`
4. Copy Client ID and Secret to .env

#### 2. Deepgram
1. Sign up at [Deepgram](https://deepgram.com)
2. Create API key in dashboard
3. Free tier includes 200,000 seconds/month

#### 3. Stripe (Optional)
1. Sign up at [Stripe](https://stripe.com)
2. Get API keys from Developers > API keys
3. Create a Pro subscription product ($9.99/month)
4. Set up webhook: `{BASE_URL}/api/stripe/webhook`

#### 4. Google AdSense (Optional)
1. Sign up at [AdSense](https://adsense.google.com)
2. Create ad units
3. Get Client ID and ad slot IDs

---

## Deployment

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect GitHub repository in Vercel dashboard.

**Required Vercel Environment Variables:**
- All variables from .env.example
- Set `DATABASE_URL` to PostgreSQL (not SQLite)

### Option 2: Docker
```bash
# Build image
docker build -t freetranscriptai:latest .

# Run container
docker run -d \
  --name freetranscriptai \
  -p 3000:3000 \
  --env-file .env.production \
  freetranscriptai:latest
```

### Option 3: Docker Compose
```bash
# Start production stack
docker-compose -f docker-compose.yml up -d

# Scale for production
docker-compose -f docker-compose.yml up -d --scale app=3
```

---

## Monitoring

### Health Check
```bash
curl https://your-domain.com/api/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2026-03-01T12:00:00.000Z",
  "services": {
    "database": { "status": "healthy", "latency": 5 },
    "redis": { "status": "healthy", "latency": 2 },
    "deepgram": { "status": "healthy" },
    "stripe": { "status": "healthy" }
  }
}
```

### Sentry Integration
1. Create Sentry project
2. Add `SENTRY_ORG` and `SENTRY_PROJECT` to environment
3. Errors will automatically be captured

### Log Aggregation
- Development: Logs to console
- Production: Configure external logging (Datadog, CloudWatch, etc.)

---

## Troubleshooting

### Common Issues

#### 1. "Database connection failed"
```bash
# Check DATABASE_URL
echo $DATABASE_URL

# Test connection
npx prisma db execute --sql "SELECT 1"
```

#### 2. "Too many requests" (429)
- Rate limited - wait 60 seconds
- Check if Redis is connected: `/api/health`
- Increase rate limit in environment (not recommended for production)

#### 3. YouTube transcription fails
- Check if Invidious instances are accessible
- Verify YouTube URL is valid
- Try uploading file directly as alternative

#### 4. Stripe webhook not working
```bash
# Verify webhook endpoint
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

#### 5. AdSense not showing
- Verify Client ID is correct
- AdSense approval can take 24-48 hours
- Check browser console for errors

### Performance Issues

#### High memory usage
- Check file upload size limits
- Enable streaming for large files
- Consider using external storage (S3)

#### Slow transcription
- Deepgram API latency (typically 10-30 seconds)
- Check network connection
- Consider upgrading Deepgram plan

---

## Backup & Recovery

### Database Backup
```bash
# PostgreSQL
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Restore
psql $DATABASE_URL < backup-20260301.sql
```

### Automated Backups
```bash
# Add to crontab (daily at 2 AM)
0 2 * * * pg_dump $DATABASE_URL > /backups/transcriptai-$(date +\%Y\%m\%d).sql
```

### Disaster Recovery
1. **Database lost**: Restore from latest backup
2. **App down**: Rollback to previous version or deploy fresh
3. **Secrets compromised**: Rotate all secrets immediately
4. **Region outage**: Deploy to alternate region using Docker image

---

## Security Checklist

- [ ] NEXTAUTH_SECRET is strong (32+ random characters)
- [ ] Database is not publicly accessible
- [ ] Redis is secured or not exposed
- [ ] HTTPS enforced in production
- [ ] CSP headers configured
- [ ] Rate limiting enabled
- [ ] Input validation enabled
- [ ] Sentry error tracking active

---

## Support

- Email: support@freetranscriptai.com
- GitHub Issues: [Link to repo]
- Status Page: [Link to status page]
