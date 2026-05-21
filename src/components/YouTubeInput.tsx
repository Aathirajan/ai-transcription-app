'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, CheckCircle, Play } from 'lucide-react';
import { extractYouTubeId, isValidYouTubeUrl, getYouTubeThumbnail } from '@/lib/utils';

interface YouTubeInputProps {
  onUrlSubmit: (url: string, videoId: string) => void;
}

export default function YouTubeInput({ onUrlSubmit }: YouTubeInputProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!url.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }

    if (!isValidYouTubeUrl(url)) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    const id = extractYouTubeId(url);
    if (id) {
      setVideoId(id);
      onUrlSubmit(url, id);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setError(null);
    setVideoId(null);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <Link2 className="w-5 h-5 text-[var(--text-muted)]" />
          </div>
          <input
            type="text"
            value={url}
            onChange={handleChange}
            placeholder="Paste YouTube URL here..."
            className="input input-lg pl-12 pr-4"
          />
          {videoId && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <CheckCircle className="w-5 h-5 text-[var(--success)]" />
            </motion.div>
          )}
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-3 p-3 rounded-xl bg-[var(--error-bg)] border border-[var(--error)]/20 flex items-center gap-2"
            >
              <div className="w-4 h-4 rounded-full bg-[var(--error)] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <p className="text-[var(--error)] text-sm">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      <AnimatePresence>
        {videoId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="mt-4 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-light)]"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-32 aspect-video rounded-xl overflow-hidden flex-shrink-0 bg-[var(--bg-secondary)]">
                <img
                  src={getYouTubeThumbnail(videoId)}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://img.youtube.com/vi/default/mqdefault.jpg';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="w-5 h-5 text-[var(--text-primary)] fill-[var(--text-primary)] ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[var(--text-primary)] font-medium mb-1">YouTube Video</p>
                <p className="text-[var(--text-tertiary)] text-sm">Ready to transcribe</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--success-bg)]">
                <CheckCircle className="w-4 h-4 text-[var(--success)]" />
                <span className="text-sm font-medium text-[var(--success)]">Ready</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-xs text-[var(--text-muted)] mt-3">
        Supported: youtube.com/watch, youtu.be, youtube.com/embed
      </p>
    </div>
  );
}