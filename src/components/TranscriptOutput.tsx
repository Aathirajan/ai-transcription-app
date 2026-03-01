'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, CheckCircle, Clock, FileText, Hash } from 'lucide-react';
import { generateSampleTranscript, countWords, countCharacters, copyToClipboard } from '@/lib/utils';

interface TranscriptOutputProps {
  transcript?: string;
}

export default function TranscriptOutput({ transcript: initialTranscript }: TranscriptOutputProps) {
  const [transcript, setTranscript] = useState(initialTranscript || '');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Generate sample transcript if none provided
    if (!transcript) {
      setTranscript(generateSampleTranscript());
    }
  }, [transcript]);

  const handleCopy = async () => {
    const success = await copyToClipboard(transcript);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const wordCount = countWords(transcript);
  const charCount = countCharacters(transcript);

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#2A2A3E] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E94560]/20 flex items-center justify-center">
            <FileText className="w-5 h-5 text-[#E94560]" />
          </div>
          <div>
            <h3 className="text-white font-medium">Your Transcript</h3>
            <p className="text-sm text-[#A0A0B0]">
              {wordCount} words • {charCount} characters
            </p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
            copied
              ? 'bg-[#00D9A5]/20 text-[#00D9A5]'
              : 'bg-[#1A1A2E] text-white hover:bg-[#2A2A3E]'
          }`}
        >
          {copied ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Transcript Content */}
      <div className="p-6 max-h-[500px] overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="prose prose-invert max-w-none"
        >
          {transcript.split('\n').map((paragraph, index) => (
            <p key={index} className="text-[#A0A0B0] leading-relaxed mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </motion.div>
      </div>

      {/* Stats Footer */}
      <div className="p-4 border-t border-[#2A2A3E] flex flex-wrap gap-4">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1A1A2E]">
          <FileText className="w-4 h-4 text-[#E94560]" />
          <span className="text-sm text-[#A0A0B0]">{wordCount} words</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1A1A2E]">
          <Hash className="w-4 h-4 text-[#E94560]" />
          <span className="text-sm text-[#A0A0B0]">{charCount} chars</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1A1A2E]">
          <Clock className="w-4 h-4 text-[#E94560]" />
          <span className="text-sm text-[#A0A0B0]">~{Math.ceil(wordCount / 150)} min read</span>
        </div>
      </div>
    </div>
  );
}
