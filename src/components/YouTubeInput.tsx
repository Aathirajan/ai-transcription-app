'use client';

import { useState } from 'react';
import { Link2, AlertCircle, CheckCircle, Play } from 'lucide-react';
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
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Link2 className="w-5 h-5 text-[#A0A0B0]" />
          </div>
          <input
            type="text"
            value={url}
            onChange={handleChange}
            placeholder="Paste YouTube URL here..."
            className="input pl-12 pr-4"
          />
          {videoId && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <CheckCircle className="w-5 h-5 text-[#00D9A5]" />
            </div>
          )}
        </div>

        {error && (
          <div className="mt-3 p-3 rounded-xl bg-[#E94560]/10 border border-[#E94560]/30 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#E94560] flex-shrink-0" />
            <p className="text-[#E94560] text-sm">{error}</p>
          </div>
        )}
      </form>

      {videoId && (
        <div className="mt-4 card p-4">
          <div className="flex items-center gap-4">
            <div className="relative w-32 h-18 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={getYouTubeThumbnail(videoId)}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://img.youtube.com/vi/default/mqdefault.jpg';
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">YouTube Video</p>
              <p className="text-[#A0A0B0] text-sm">Ready to transcribe</p>
            </div>
            <CheckCircle className="w-5 h-5 text-[#00D9A5] flex-shrink-0" />
          </div>
        </div>
      )}

      <p className="text-xs text-[#A0A0B0] mt-3">
        Supported: youtube.com/watch, youtu.be, youtube.com/embed
      </p>
    </div>
  );
}
