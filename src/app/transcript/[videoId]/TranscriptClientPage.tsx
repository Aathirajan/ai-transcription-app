'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, FileText } from 'lucide-react';
import TranscriptOutput from '@/components/TranscriptOutput';
import ExportOptions from '@/components/ExportOptions';
import UpgradeBanner from '@/components/UpgradeBanner';
import UpgradeButton from '@/components/UpgradeButton';
import AdSense from '@/components/AdSense';
import { getYouTubeThumbnail } from '@/lib/utils';

interface TranscriptClientPageProps {
  videoId: string;
}

export default function TranscriptClientPage({ videoId }: TranscriptClientPageProps) {
  const router = useRouter();
  const [transcript, setTranscript] = useState('');
  const [showBanner, setShowBanner] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedTranscript = sessionStorage.getItem('transcriptText');
    const storedVideoId = sessionStorage.getItem('youtubeVideoId');

    if (!storedTranscript || storedVideoId !== videoId) {
      router.push('/');
      return;
    }

    setTranscript(storedTranscript);
    setIsLoaded(true);
  }, [router, videoId]);

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-[#E94560]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-[#00D9A5]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-[#A0A0B0] hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </button>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-3xl overflow-hidden border border-[#2A2A3E]">
                <img
                  src={getYouTubeThumbnail(videoId)}
                  alt={`Thumbnail for video ${videoId}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  YouTube transcript
                </h1>
                <p className="text-sm text-[#A0A0B0] mt-2">
                  Video ID: {videoId}
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-[#0F1724] border border-[#2A2A3E] px-4 py-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#00D9A5]/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-[#00D9A5]" />
                </div>
                <div>
                  <p className="text-sm text-[#A0A0B0]">Transcript ready</p>
                  <p className="font-medium text-white">Saved from your most recent YouTube request</p>
                </div>
              </div>
              <p className="text-sm text-[#A0A0B0]">Use the export panel to download or copy the text instantly.</p>
            </div>
          </div>
        </motion.div>

        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <UpgradeBanner onClose={() => setShowBanner(false)} />
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <TranscriptOutput transcript={transcript} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <ExportOptions transcript={transcript} />

            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#E94560]/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#E94560]" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Need DOCX or PDF?</h3>
                  <p className="text-sm text-[#A0A0B0]">Upgrade to Pro for premium exports.</p>
                </div>
              </div>
              <UpgradeButton className="w-full" />
            </div>

            <div className="card p-4">
              <AdSense
                adSlot={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_AD_SLOT || '1234567890'}
                adFormat="rectangle"
                className="mx-auto"
              />
            </div>
          </motion.div>
        </div>

        <div className="mt-8">
          <AdSense
            adSlot={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_AD_SLOT || '1234567890'}
            adFormat="horizontal"
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
