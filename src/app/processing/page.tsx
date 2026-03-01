import { Metadata } from 'next';
import ProcessingScreen from '@/components/ProcessingScreen';

export const metadata: Metadata = {
  title: 'Processing Transcript | FreeTranscriptAI',
  description: 'Your transcript is being generated. Please wait while our AI processes your audio or video.',
  robots: 'noindex, nofollow',
};

export default function ProcessingPage() {
  return <ProcessingScreen />;
}
