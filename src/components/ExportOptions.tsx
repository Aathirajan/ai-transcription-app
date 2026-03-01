'use client';

import { useState } from 'react';
import { Download, FileText, Subtitles, File, CheckCircle } from 'lucide-react';
import { generateSRT, downloadFile } from '@/lib/utils';

interface ExportOptionsProps {
  transcript: string;
}

type DownloadFormat = 'txt' | 'srt' | null;

export default function ExportOptions({ transcript }: ExportOptionsProps) {
  const [downloading, setDownloading] = useState<DownloadFormat>(null);
  const [downloaded, setDownloaded] = useState<DownloadFormat>(null);

  const handleDownload = async (format: 'txt' | 'srt') => {
    setDownloading(format);

    // Simulate download delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (format === 'txt') {
      downloadFile(transcript, 'transcript.txt', 'text/plain');
    } else if (format === 'srt') {
      const srtContent = generateSRT(transcript);
      downloadFile(srtContent, 'transcript.srt', 'text/plain');
    }

    setDownloading(null);
    setDownloaded(format);
    setTimeout(() => setDownloaded(null), 2000);
  };

  const formats = [
    {
      id: 'txt',
      name: 'Plain Text',
      extension: '.txt',
      description: 'Simple text file, works everywhere',
      icon: FileText,
    },
    {
      id: 'srt',
      name: 'Subtitles',
      extension: '.srt',
      description: 'SRT format for video subtitles',
      icon: Subtitles,
    },
  ];

  return (
    <div className="card p-6">
      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
        <Download className="w-5 h-5 text-[#E94560]" />
        Download Transcript
      </h3>

      <div className="space-y-3">
        {formats.map((format) => {
          const Icon = format.icon;
          const isDownloading = downloading === format.id;
          const isDownloaded = downloaded === format.id;

          return (
            <button
              key={format.id}
              onClick={() => handleDownload(format.id as 'txt' | 'srt')}
              disabled={!!downloading}
              className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                isDownloaded
                  ? 'bg-[#00D9A5]/10 border border-[#00D9A5]/30'
                  : 'bg-[#1A1A2E] hover:bg-[#2A2A3E] border border-transparent'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                isDownloaded ? 'bg-[#00D9A5]/20' : 'bg-[#12121A]'
              }`}>
                {isDownloaded ? (
                  <CheckCircle className="w-6 h-6 text-[#00D9A5]" />
                ) : isDownloading ? (
                  <div className="w-6 h-6 border-2 border-[#E94560] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Icon className={`w-6 h-6 ${isDownloaded ? 'text-[#00D9A5]' : 'text-[#E94560]'}`} />
                )}
              </div>

              <div className="flex-1 text-left">
                <p className="text-white font-medium">
                  {format.name}
                  <span className="text-[#A0A0B0] ml-2">{format.extension}</span>
                </p>
                <p className="text-sm text-[#A0A0B0]">{format.description}</p>
              </div>

              {!isDownloading && !isDownloaded && (
                <Download className="w-5 h-5 text-[#A0A0B0]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
