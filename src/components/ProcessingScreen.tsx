'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, Lightbulb } from 'lucide-react';
import { PROCESSING_STAGES, getYouTubeThumbnail } from '@/lib/utils';
import AdSense from './AdSense';

const TIPS = [
  "Transcripts help improve SEO and accessibility for your content",
  "You can export transcripts as TXT, SRT, or DOCX formats",
  "Use transcripts to create blog posts, articles, or social media content",
  "Accurate transcripts can increase viewer engagement",
  "Pro users get faster processing and no ads",
];

export default function ProcessingScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const [transcribeType, setTranscribeType] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [youtubeVideoId, setYoutubeVideoId] = useState('');
  const [transcriptId, setTranscriptId] = useState<string | null>(null);

  useEffect(() => {
    const type = sessionStorage.getItem('transcribeType');
    const name = sessionStorage.getItem('fileName');
    const videoId = sessionStorage.getItem('youtubeVideoId');
    const transcript = sessionStorage.getItem('transcriptId');

    setTranscribeType(type);
    if (name) setFileName(name);
    if (videoId) setYoutubeVideoId(videoId);
    if (transcript) setTranscriptId(transcript);

    if (transcript) {
      const timer = setTimeout(() => {
        router.push('/result');
      }, 2000);
      setProgress(100);
      setCurrentStage(PROCESSING_STAGES.length - 1);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            router.push('/result');
          }, 500);
          return 100;
        }

        const newProgress = prev + Math.random() * 5 + 2;
        const stage = PROCESSING_STAGES.findIndex(
          (s, i) => newProgress >= s.progress && (i === PROCESSING_STAGES.length - 1 || newProgress < PROCESSING_STAGES[i + 1].progress)
        );
        if (stage >= 0) setCurrentStage(stage);

        return Math.min(newProgress, 100);
      });
    }, 800);

    const tipInterval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % TIPS.length);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(tipInterval);
    };
  }, [router]);

  const currentStageMessage = PROCESSING_STAGES[currentStage]?.message || 'Processing...';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-[#E94560]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-[#E94560]/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {progress >= 100 ? (
              <span className="gradient-text">Transcription Complete!</span>
            ) : (
              <>Generating Your Transcript</>
            )}
          </h1>
          <p className="text-[#A0A0B0]">
            {transcribeType === 'youtube' ? 'Transcribing YouTube video...' : `Transcribing: ${fileName || 'your file'}...`}
          </p>
        </div>

        {youtubeVideoId && (
          <div className="flex justify-center mb-8">
            <div className="relative w-64 h-36 rounded-xl overflow-hidden">
              <img
                src={getYouTubeThumbnail(youtubeVideoId)}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://img.youtube.com/vi/default/mqdefault.jpg';
                }}
              />
            </div>
          </div>
        )}

        <div className="card p-8 mb-8">
          <div className="flex items-center justify-center mb-6">
            {progress >= 100 ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-24 h-24 rounded-full bg-[#00D9A5]/20 flex items-center justify-center"
              >
                <CheckCircle className="w-12 h-12 text-[#00D9A5]" />
              </motion.div>
            ) : (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-24 h-24 rounded-full bg-[#1A1A2E] flex items-center justify-center"
              >
                <Loader2 className="w-12 h-12 text-[#E94560]" />
              </motion.div>
            )}
          </div>

          <div className="mb-4">
            <div className="progress-bar">
              <motion.div
                className="progress-bar-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-[#A0A0B0]">{currentStageMessage}</span>
              <span className="text-sm text-white font-medium">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>

        {/* AdSense Ad */}
        <div className="card p-6 mb-8">
          <div className="text-center">
            {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID ? (
              <AdSense
                adSlot={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_AD_SLOT || '1234567890'}
                adFormat="auto"
                className="mx-auto"
              />
            ) : (
              <div className="w-full h-32 sm:h-48 bg-[#1A1A2E] rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-[#2A2A3E]">
                <p className="text-[#A0A0B0] mb-2">Advertisement</p>
                <p className="text-sm text-[#A0A0B0]/60">
                  Google AdSense - Configure in .env
                </p>
              </div>
            )}
          </div>
        </div>

        {progress < 100 && (
          <motion.div
            key={tipIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FFB830]/20 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-[#FFB830]" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Did you know?</h3>
                <p className="text-[#A0A0B0] text-sm">{TIPS[tipIndex]}</p>
              </div>
            </div>
          </motion.div>
        )}

        {progress < 100 && (
          <p className="text-center text-[#A0A0B0] text-sm mt-6">
            Estimated time: 1-2 minutes
          </p>
        )}
      </motion.div>
    </div>
  );
}
