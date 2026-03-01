# AI Transcript Generator - Specification Document

## 1. Project Overview

**Project Name:** FreeTranscriptAI
**Type:** Web Application (SaaS)
**Core Functionality:** Free ad-supported AI transcript generator for audio/video files and YouTube links
**Target Users:** Content creators, YouTubers, podcasters, students, marketers who need free transcription

---

## 2. UI/UX Specification

### 2.1 Layout Structure

**Pages:**
1. **Landing Page** (/) - Hero, features, SEO content
2. **Processing Page** (/processing) - Shows ads during transcription
3. **Result Page** (/result) - Transcript output with export options

**Responsive Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### 2.2 Visual Design

**Color Palette:**
- Primary: `#0D0D0D` (Deep Black)
- Secondary: `#1A1A2E` (Dark Navy)
- Accent: `#E94560` (Vibrant Red)
- Success: `#00D9A5` (Mint Green)
- Warning: `#FFB830` (Amber)
- Text Primary: `#FFFFFF`
- Text Secondary: `#A0A0B0`
- Background: `#0A0A0F`
- Card Background: `#12121A`
- Border: `#2A2A3E`

**Typography:**
- Headings: "Outfit", sans-serif (Google Fonts)
- Body: "DM Sans", sans-serif (Google Fonts)
- Font Sizes:
  - H1: 48px (mobile: 32px)
  - H2: 36px (mobile: 24px)
  - H3: 24px (mobile: 20px)
  - Body: 16px
  - Small: 14px

**Spacing System:**
- Base unit: 8px
- Section padding: 80px vertical (mobile: 48px)
- Card padding: 24px
- Gap: 16px / 24px / 32px

**Visual Effects:**
- Card shadows: `0 8px 32px rgba(233, 69, 96, 0.1)`
- Hover transitions: 0.3s ease
- Gradient accents: `linear-gradient(135deg, #E94560 0%, #FF6B6B 100%)`
- Glass effect: `backdrop-filter: blur(10px)`

### 2.3 Components

**Navigation Bar:**
- Logo (left)
- Nav links: Features, Pricing, Blog
- CTA buttons: Login, Get Pro (accent color)

**Hero Section:**
- Main headline with gradient text
- Subheadline explaining free + ad-supported
- Two input options: File Upload / YouTube Link
- Trust badges (no credit card, instant, etc.)

**Input Cards:**
- File upload zone with drag & drop
- YouTube link input with paste option
- Supported formats list

**Processing Screen:**
- Large progress indicator
- Status updates
- Ad placement (banner + video placeholder)
- Tips section

**Result Screen:**
- Transcript display area
- Copy button
- Download options (TXT, SRT)
- Upgrade banner

**Footer:**
- Links, copyright, social

---

## 3. Functionality Specification

### 3.1 Core Features

**F1: File Upload**
- Accept: MP4, MP3, WAV, MOV, M4A
- Max size: 500MB
- Drag & drop support
- File validation
- Progress indicator

**F2: YouTube Link Input**
- URL validation
- Extract video ID
- Display video thumbnail preview

**F3: Transcription Processing**
- Simulated processing (real implementation ready for API)
- Progress: 0% → 100%
- Status messages: "Extracting audio...", "Transcribing...", "Finalizing..."
- Ad display during processing

**F4: Transcript Output**
- Display full transcript
- Word count
- Character count
- Processing time

**F5: Export Options**
- Download as TXT
- Download as SRT (subtitles format)
- Copy to clipboard

**F6: Ad System**
- Display ads on processing page
- Show upgrade banner on result page

**F7: SEO Pages**
- Dynamic meta tags
- Structured data
- FAQ section for SEO

### 3.2 User Interactions

- Hover effects on all interactive elements
- Loading states for all actions
- Error messages for invalid inputs
- Success confirmations

---

## 4. Technical Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **AdSense:** Google AdSense (placeholder)
- **Deployment:** Ready for Vercel

---

## 5. Acceptance Criteria

### Visual Checkpoints:
- [x] Dark theme with red accent loads correctly
- [x] Hero section displays with both input options
- [x] Processing page shows ads placeholder
- [x] Result page shows transcript with all export options
- [x] Responsive design works on mobile/tablet/desktop

### Functional Checkpoints:
- [x] File upload accepts valid formats
- [x] YouTube link validation works
- [x] Processing progress animates
- [x] Transcript displays after processing
- [x] Copy to clipboard works
- [x] TXT download works
- [x] SRT download works

### SEO Checkpoints:
- [x] Meta tags present
- [x] Semantic HTML
- [x] Fast load (LCP < 2.5s)
- [x] Structured data for rich results

---

## 6. File Structure

```
/app
  /layout.tsx
  /page.tsx
  /processing/page.tsx
  /result/page.tsx
/components
  /Navbar.tsx
  /Hero.tsx
  /FileUpload.tsx
  /YouTubeInput.tsx
  /ProcessingScreen.tsx
  /TranscriptOutput.tsx
  /ExportOptions.tsx
  /UpgradeBanner.tsx
  /Footer.tsx
/lib
  /utils.ts
/public
  /fonts (if needed)
```

---

## 7. SEO Strategy

### Target Keywords:
- "free transcript generator"
- "free ai transcription"
- "youtube transcript generator free"
- "audio to text free"
- "video to transcript free"

### Implementation:
- Server-side rendering for hero content
- Dynamic meta descriptions
- FAQ schema markup
- Breadcrumb structured data
- Open Graph tags
- Twitter Card tags
