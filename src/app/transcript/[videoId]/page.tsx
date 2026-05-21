import { Metadata } from 'next';
import TranscriptClientPage from './TranscriptClientPage';
import { getYouTubeThumbnail, extractYouTubeId } from '@/lib/utils';

// Dynamic metadata for each video transcript page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ videoId: string }>;
}): Promise<Metadata> {
  const { videoId } = await params;

  // In production, you would fetch video title from YouTube API
  const videoTitle = `YouTube Video ${videoId}`;
  const title = `Transcript of ${videoTitle} - Full Text & AI Summary`;
  const description = `Get the complete transcript of this YouTube video. Read or download the full text, summaries, and key takeaways. Free AI-powered transcription tool.`;
  const thumbnail = getYouTubeThumbnail(videoId);

  return {
    title,
    description,
    keywords: [
      'youtube transcript',
      'video transcript',
      'youtube to text',
      'video transcription',
      'free transcript',
      'ai transcription',
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/transcript/${videoId}`,
      images: [
        {
          url: thumbnail,
          width: 1280,
          height: 720,
          alt: videoTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [thumbnail],
    },
    alternates: {
      canonical: `/transcript/${videoId}`,
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
}

// JSON-LD Schema for HowTo/Article
export async function generateJsonLd({
  params,
}: {
  params: Promise<{ videoId: string }>;
}) {
  const { videoId } = await params;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://freetranscriptai.com/#software',
        'name': 'FreeTranscriptAI',
        'applicationCategory': 'UtilitiesApplication',
        'operatingSystem': 'Web',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD',
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.8',
          'ratingCount': '1250',
        },
      },
      {
        '@type': 'HowTo',
        '@id': `https://freetranscriptai.com/transcript/${videoId}#howto`,
        'name': `Get Transcript for Video ${videoId}`,
        'step': [
          {
            '@type': 'HowToStep',
            'name': 'Enter YouTube URL',
            'text': 'Paste the YouTube video URL in the input field.',
          },
          {
            '@type': 'HowToStep',
            'name': 'Process Video',
            'text': 'Click transcribe and wait for AI to process the video.',
          },
          {
            '@type': 'HowToStep',
            'name': 'Get Transcript',
            'text': 'View, copy, or download the complete transcript.',
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': `https://freetranscriptai.com/transcript/${videoId}#article`,
        'headline': `Transcript for Video ${videoId}`,
        'description': 'Full text transcript of YouTube video',
        'author': {
          '@type': 'Organization',
          'name': 'FreeTranscriptAI',
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'FreeTranscriptAI',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://freetranscriptai.com/logo.png',
          },
        },
      },
    ],
  };
}

interface PageProps {
  params: Promise<{ videoId: string }>;
}

export default async function TranscriptPage({ params }: PageProps) {
  const { videoId } = await params;

  return <TranscriptClientPage videoId={videoId} />;
}
