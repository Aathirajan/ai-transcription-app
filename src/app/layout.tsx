import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAFAF8",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://freetranscriptai.com'),
  title: {
    default: 'FreeTranscriptAI — Transform Audio to Text',
    template: '%s | FreeTranscriptAI'
  },
  description: 'Transform any audio or video into accurate text transcripts. Upload files or paste YouTube links. Free, instant, and powered by AI.',
  keywords: [
    'free transcript generator',
    'free ai transcription',
    'youtube transcript generator',
    'audio to text',
    'video to transcript',
    'speech to text',
    'transcribe video',
    'transcribe audio',
    'podcast transcription',
  ],
  authors: [{ name: 'FreeTranscriptAI' }],
  creator: 'FreeTranscriptAI',
  openGraph: {
    title: 'FreeTranscriptAI — Transform Audio to Text',
    description: 'Transform any audio or video into accurate text transcripts. Upload files or paste YouTube links.',
    url: 'https://freetranscriptai.com',
    siteName: 'FreeTranscriptAI',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FreeTranscriptAI — Transform Audio to Text',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FreeTranscriptAI — Transform Audio to Text',
    description: 'Transform any audio or video into accurate text transcripts.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <Providers>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}