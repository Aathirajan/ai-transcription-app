import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://freetranscriptai.com'),
  title: 'Free AI Transcript Generator | Convert Audio/Video to Text',
  description: 'Generate AI-powered transcripts for free. Convert audio and video to text instantly. Supports MP4, MP3, WAV, MOV, M4A and YouTube links.',
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
  openGraph: {
    title: 'FreeTranscriptAI - Free AI Transcript Generator',
    description: 'Generate AI-powered transcripts for free. Convert audio and video to text instantly.',
    url: 'https://freetranscriptai.com',
    siteName: 'FreeTranscriptAI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FreeTranscriptAI - Free AI Transcript Generator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FreeTranscriptAI - Free AI Transcript Generator',
    description: 'Generate AI-powered transcripts for free. Convert audio and video to text instantly.',
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
    <html lang="en">
      <body className="antialiased">
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
