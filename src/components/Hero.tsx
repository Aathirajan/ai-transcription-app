'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Link2, ArrowRight, Sparkles, Shield, Clock } from 'lucide-react';
import FileUpload from './FileUpload';
import YouTubeInput from './YouTubeInput';
import UpgradeButton from './UpgradeButton';

type InputMode = 'file' | 'youtube' | null;

export default function Hero() {
  const router = useRouter();
  const [inputMode, setInputMode] = useState<InputMode>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [youtubeVideoId, setYoutubeVideoId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setError('');
  };

  const handleYouTubeSubmit = (url: string, videoId: string) => {
    setYoutubeUrl(url);
    setYoutubeVideoId(videoId);
    setError('');
  };

  const handleStartTranscription = async () => {
    if (!selectedFile && !youtubeUrl) return;

    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData();

      if (selectedFile) {
        formData.append('sourceType', 'file');
        formData.append('file', selectedFile);
      } else if (youtubeUrl) {
        formData.append('sourceType', 'youtube');
        formData.append('youtubeUrl', youtubeUrl);
      }

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Transcription failed');
      }

      sessionStorage.setItem('transcribeType', selectedFile ? 'file' : 'youtube');
      sessionStorage.setItem('fileName', selectedFile?.name || '');
      sessionStorage.setItem('youtubeUrl', youtubeUrl);
      sessionStorage.setItem('youtubeVideoId', youtubeVideoId);
      sessionStorage.setItem('transcriptId', data.transcript.id);
      sessionStorage.setItem('transcriptText', data.transcript.transcript);
      sessionStorage.setItem('wordCount', String(data.transcript.wordCount));
      sessionStorage.setItem('duration', String(data.transcript.duration));

      router.push('/processing');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const canProceed = selectedFile || (youtubeUrl && youtubeVideoId);

  return (
    <section className="relative min-h-screen flex flex-col pt-24 md:pt-32 pb-16 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-[var(--accent-light)] via-transparent to-transparent opacity-60 blur-3xl" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[var(--bg-tertiary)] rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--bg-secondary)] rounded-full blur-2xl opacity-60" />
      </div>

      <div className="container-full relative z-10 flex-1 flex flex-col">
        {/* Hero Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-light)] text-[var(--accent-primary)] text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Powered by AI
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="display-xl text-[var(--text-primary)] mb-6"
          >
            Transform audio into
            <br />
            <span className="italic text-[var(--accent-primary)]">accurate text</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="body-lg max-w-2xl mx-auto mb-8 text-pretty"
          >
            Upload audio, video, or paste a YouTube link. Get instant, accurate transcripts — completely free.
          </motion.p>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap justify-center gap-4 md:gap-6"
          >
            {[
              { icon: Shield, label: 'No signup required' },
              { icon: Clock, label: 'Instant processing' },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-[var(--text-tertiary)] text-sm"
              >
                <item.icon className="w-4 h-4 text-[var(--accent-primary)]" />
                {item.label}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Main Input Card */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-2xl mx-auto"
        >
          <div className="card-elevated p-6 md:p-8">
            {/* Input Mode Selector */}
            <div className="flex gap-2 mb-6 p-1 bg-[var(--bg-secondary)] rounded-xl">
              <button
                onClick={() => setInputMode('file')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  inputMode === 'file'
                    ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm'
                    : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
                }`}
              >
                <Upload className="w-5 h-5" />
                <span>Upload File</span>
              </button>
              <button
                onClick={() => setInputMode('youtube')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  inputMode === 'youtube'
                    ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm'
                    : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
                }`}
              >
                <Link2 className="w-5 h-5" />
                <span>YouTube URL</span>
              </button>
            </div>

            {/* Input Content */}
            <AnimatePresence mode="wait">
              {inputMode === 'file' && (
                <motion.div
                  key="file"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <FileUpload onFileSelect={handleFileSelect} />
                </motion.div>
              )}
              {inputMode === 'youtube' && (
                <motion.div
                  key="youtube"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <YouTubeInput onUrlSubmit={handleYouTubeSubmit} />
                </motion.div>
              )}
              {!inputMode && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-[var(--text-muted)]" />
                  </div>
                  <p className="text-[var(--text-tertiary)]">
                    Select an option to get started
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-[var(--error-bg)] border border-[var(--error)]/20"
              >
                <p className="text-[var(--error)] text-sm text-center">{error}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            {inputMode && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="mt-6"
              >
                <button
                  onClick={handleStartTranscription}
                  disabled={!canProceed || isLoading}
                  className={`w-full py-4 rounded-xl font-medium text-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                    canProceed && !isLoading
                      ? 'bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-secondary)] shadow-lg shadow-[var(--accent-primary)]/20'
                      : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)] cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Processing...
                    </>
                  ) : canProceed ? (
                    <>
                      Start Transcription
                      <ArrowRight className="w-5 h-5" />
                    </>
                  ) : (
                    'Select a file or enter URL'
                  )}
                </button>
              </motion.div>
            )}
          </div>

          {/* Supported formats */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="text-center text-[var(--text-muted)] text-sm mt-6"
          >
            Supports MP4, MP3, WAV, MOV, M4A &bull; YouTube videos &bull; Up to 500MB
          </motion.p>
        </motion.div>

        {/* Pro CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-6 py-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-light)]">
            <span className="text-[var(--text-secondary)]">
              Need more features?
            </span>
            <UpgradeButton />
          </div>
        </motion.div>
      </div>
    </section>
  );
}