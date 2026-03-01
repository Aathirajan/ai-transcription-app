'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, FileText, ArrowLeft } from 'lucide-react';
import TranscriptOutput from '@/components/TranscriptOutput';
import ExportOptions from '@/components/ExportOptions';
import UpgradeBanner from '@/components/UpgradeBanner';
import UpgradeButton from '@/components/UpgradeButton';
import AdSense from '@/components/AdSense';

export default function ResultPage() {
  const router = useRouter();
  const [transcript, setTranscript] = useState('');
  const [showBanner, setShowBanner] = useState(true);
  const [transcribeType, setTranscribeType] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const type = sessionStorage.getItem('transcribeType');
    const name = sessionStorage.getItem('fileName');
    const transcriptText = sessionStorage.getItem('transcriptText');
    const wc = sessionStorage.getItem('wordCount');
    const dur = sessionStorage.getItem('duration');

    if (!transcriptText) {
      router.push('/');
      return;
    }

    setTranscribeType(type);
    setFileName(name || '');
    setTranscript(transcriptText);
    setWordCount(wc ? parseInt(wc, 10) : 0);
    setDuration(dur ? parseInt(dur, 10) : 0);
    setIsLoaded(true);
  }, [router]);

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
            Start New Transcription
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#00D9A5]/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-[#00D9A5]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Transcription Complete!
              </h1>
              <p className="text-[#A0A0B0]">
                {transcribeType === 'youtube'
                  ? 'YouTube Video Transcribed'
                  : `File: ${fileName || 'Unknown file'}`}
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <div className="px-3 py-1 rounded-lg bg-[#12121A] border border-[#2A2A3E]">
              <span className="text-[#A0A0B0] text-sm">{wordCount} words</span>
            </div>
            <div className="px-3 py-1 rounded-lg bg-[#12121A] border border-[#2A2A3E]">
              <span className="text-[#A0A0B0] text-sm">{Math.round(duration / 60)}m {duration % 60}s</span>
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
                  <p className="text-sm text-[#A0A0B0]">Upgrade to Pro</p>
                </div>
              </div>
              <UpgradeButton className="w-full" />
            </div>

            {/* Sidebar Ad */}
            <div className="card p-4">
              <AdSense
                adSlot={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_AD_SLOT || '1234567890'}
                adFormat="rectangle"
                className="mx-auto"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Ad */}
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
