# FreeTranscriptAI - API Documentation

## Overview

Base URL: `https://freetranscriptai.com`

All API endpoints return JSON responses.

---

## Authentication

### NextAuth.js Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/signin` | Show sign-in page |
| POST | `/api/auth/callback/google` | Google OAuth callback |
| GET | `/api/auth/session` | Get current session |
| POST | `/api/auth/signout` | Sign out |

---

## Public Endpoints

### Health Check

**GET** `/api/health`

Check service health status.

**Response:**
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

---

### Transcription

**POST** `/api/transcribe`

Transcribe audio/video file or YouTube video.

**Authentication:** Optional (rate limits apply)

**Content-Type:** `multipart/form-data`

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `sourceType` | string | Yes | `"file"` or `"youtube"` |
| `file` | File | Yes* | Audio/video file (max 500MB) |
| `youtubeUrl` | string | Yes* | YouTube video URL |

*Either `file` or `youtubeUrl` required based on `sourceType`

**Supported Formats:**
- Video: MP4, MOV, WebM
- Audio: MP3, WAV, M4A, OGG, FLAC

**Example Request:**
```bash
curl -X POST https://freetranscriptai.com/api/transcribe \
  -H "Authorization: Bearer YOUR_SESSION_TOKEN" \
  -F "sourceType=file" \
  -F "file=@audio.mp3"
```

**Success Response (200):**
```json
{
  "success": true,
  "transcript": {
    "id": "ct_abc123",
    "transcript": "Transcribed text here...",
    "wordCount": 150,
    "duration": 120
  }
}
```

**Error Responses:**

- 400: Invalid request / File too large / Unsupported format
- 429: Rate limit exceeded
- 500: Transcription failed

---

### Stripe Integration

#### Create Checkout Session

**POST** `/api/stripe/checkout`

Create a Stripe checkout session for Pro subscription.

**Authentication:** Required

**Response:**
```json
{
  "url": "https://checkout.stripe.com/..."
}
```

#### Stripe Webhook

**POST** `/api/stripe/webhook`

Handle Stripe webhook events.

**Events Handled:**
- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`

---

## Rate Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/transcribe` | 5 requests | 1 minute |
| `/api/stripe/checkout` | 10 requests | 1 minute |

Rate limit headers:
- `X-RateLimit-Limit`: Maximum requests
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Unix timestamp when limit resets

---

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Invalid or missing session |
| 413 | Payload Too Large - File exceeds limit |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

---

## SDK Examples

### JavaScript/TypeScript
```typescript
const formData = new FormData();
formData.append('sourceType', 'file');
formData.append('file', audioFile);

const response = await fetch('/api/transcribe', {
  method: 'POST',
  body: formData,
  credentials: 'include', // Include cookies
});

const { transcript } = await response.json();
```

### cURL
```bash
# File transcription
curl -X POST https://freetranscriptai.com/api/transcribe \
  -F "sourceType=file" \
  -F "file=@video.mp4"

# YouTube transcription
curl -X POST https://freetranscriptai.com/api/transcribe \
  -F "sourceType=youtube" \
  -F "youtubeUrl=https://youtube.com/watch?v=..."
```

---

## Support

For API issues: api@freetranscriptai.com
