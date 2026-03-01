'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FileAudio, Link2, Shield, Zap, Clock, Loader2 } from 'lucide-react';
import FileUpload from './FileUpload';
import YouTubeInput from './YouTubeInput';

type InputMode = 'file' | 'youtube' | null;

interface TranscriptResult {
  id: string;
  transcript: string;
  wordCount: number;
  duration: number;
}

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

      // Store the transcript data for result page
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
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-[#E94560]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-[#E94560]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Hero Content */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Free AI Transcript</span>
              <br />
              Generator
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl text-[#A0A0B0] max-w-2xl mx-auto mb-4"
          >
            Convert any audio or video to text — 100% free.
            <span className="block mt-2 text-sm">
              Supported by ads to keep it free for everyone.
            </span>
          </motion.p>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#12121A] border border-[#2A2A3E]">
              <Shield className="w-4 h-4 text-[#00D9A5]" />
              <span className="text-sm text-[#A0A0B0]">No Credit Card</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#12121A] border border-[#2A2A3E]">
              <Zap className="w-4 h-4 text-[#FFB830]" />
              <span className="text-sm text-[#A0A0B0]">Instant Start</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#12121A] border border-[#2A2A3E]">
              <Clock className="w-4 h-4 text-[#E94560]" />
              <span className="text-sm text-[#A0A0B0]">Fast Processing</span>
            </div>
          </motion.div>
        </div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="card p-6 sm:p-8"
        >
          {/* Input Mode Tabs */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setInputMode('file')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                inputMode === 'file'
                  ? 'bg-gradient-to-r from-[#E94560] to-[#FF6B6B] text-white'
                  : 'bg-[#1A1A2E] text-[#A0A0B0] hover:text-white'
              }`}
            >
              <FileAudio className="w-5 h-5" />
              Upload File
            </button>
            <button
              onClick={() => setInputMode('youtube')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                inputMode === 'youtube'
                  ? 'bg-gradient-to-r from-[#E94560] to-[#FF6B6B] text-white'
                  : 'bg-[#1A1A2E] text-[#A0A0B0] hover:text-white'
              }`}
            >
              <Link2 className="w-5 h-5" />
              YouTube Link
            </button>
          </div>

          {/* Input Fields */}
          <AnimatePresence mode="wait">
            {inputMode === 'file' && (
              <motion.div
                key="file"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FileUpload onFileSelect={handleFileSelect} />
              </motion.div>
            )}
            {inputMode === 'youtube' && (
              <motion.div
                key="youtube"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
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
                className="text-center py-8"
              >
                <p className="text-[#A0A0B0]">
                  Choose an option above to get started
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Start Button */}
          {inputMode && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {error && (
                <div className="mb-4 p-3 rounded-lg bg-[#E94560]/10 border border-[#E94560]/30">
                  <p className="text-[#E94560] text-sm text-center">{error}</p>
                </div>
              )}
              <button
                onClick={handleStartTranscription}
                disabled={!canProceed || isLoading}
                className={`w-full mt-2 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
                  canProceed && !isLoading
                    ? 'bg-gradient-to-r from-[#E94560] to-[#FF6B6B] text-white hover:shadow-lg hover:shadow-[#E94560]/30 hover:-translate-y-1'
                    : 'bg-[#2A2A3E] text-[#A0A0B0] cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : canProceed ? (
                  'Start Transcription'
                ) : (
                  'Select a file or enter a URL'
                )}
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Supported Formats */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-[#A0A0B0] text-sm mt-6"
        >
          Supports MP4, MP3, WAV, MOV, M4A • YouTube videos • No login required
        </motion.p>
      </div>
    </section>
  );
}
