'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-24">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-[var(--accent-light)] via-transparent to-transparent opacity-40 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[var(--bg-tertiary)] rounded-full blur-2xl opacity-50" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {progress >= 100 ? (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--success-bg)] text-[var(--success)] text-sm font-medium mb-4">
                <CheckCircle className="w-4 h-4" />
                Transcription Complete
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-light)] text-[var(--accent-primary)] text-sm font-medium mb-4">
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing
              </span>
            )}
          </motion.div>

          <h1 className="display-lg text-[var(--text-primary)] mb-3">
            {progress >= 100 ? (
              <>All done!</>
            ) : (
              <>Generating your transcript</>
            )}
          </h1>
          <p className="body-md">
            {transcribeType === 'youtube' ? 'Transcribing YouTube video...' : `Transcribing: ${fileName || 'your file'}...`}
          </p>
        </div>

        {/* Video Thumbnail */}
        {youtubeVideoId && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="relative w-64 aspect-video rounded-xl overflow-hidden bg-[var(--bg-secondary)]">
              <img
                src={getYouTubeThumbnail(youtubeVideoId)}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://img.youtube.com/vi/default/mqdefault.jpg';
                }}
              />
            </div>
          </motion.div>
        )}

        {/* Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-8 mb-6"
        >
          <div className="flex items-center justify-center mb-6">
            {progress >= 100 ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 rounded-full bg-[var(--success-bg)] flex items-center justify-center"
              >
                <CheckCircle className="w-10 h-10 text-[var(--success)]" />
              </motion.div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Loader2 className="w-10 h-10 text-[var(--accent-primary)]" />
                </motion.div>
              </div>
            )}
          </div>

          <div className="mb-4">
            <div className="h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[var(--accent-primary)] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            <div className="flex justify-between mt-3">
              <span className="text-sm text-[var(--text-tertiary)]">{currentStageMessage}</span>
              <span className="text-sm font-medium text-[var(--text-primary)]">{Math.round(progress)}%</span>
            </div>
          </div>
        </motion.div>

        {/* AdSense Ad */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6 mb-6"
        >
          <div className="text-center">
            {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID ? (
              <AdSense
                adSlot={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_AD_SLOT || '1234567890'}
                adFormat="auto"
                className="mx-auto"
              />
            ) : (
              <div className="w-full h-32 sm:h-48 bg-[var(--bg-secondary)] rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-[var(--border-light)]">
                <p className="text-[var(--text-tertiary)] mb-2">Advertisement</p>
                <p className="text-xs text-[var(--text-muted)]">
                  Configure Google AdSense in .env
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Tip Card */}
        <AnimatePresence mode="wait">
          {progress < 100 && (
            <motion.div
              key={tipIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="card p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--warning-bg)] flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-[var(--warning)]" />
                </div>
                <div>
                  <h3 className="text-[var(--text-primary)] font-medium mb-1">Did you know?</h3>
                  <p className="text-[var(--text-secondary)] text-sm">{TIPS[tipIndex]}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {progress < 100 && (
          <p className="text-center text-[var(--text-muted)] text-sm mt-6">
            Estimated time: 1-2 minutes
          </p>
        )}
      </motion.div>
    </div>
  );
}