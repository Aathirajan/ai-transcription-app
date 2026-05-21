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
      <div className="p-4 sm:p-5 border-b border-[var(--border-light)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-light)] flex items-center justify-center">
            <FileText className="w-5 h-5 text-[var(--accent-primary)]" />
          </div>
          <div>
            <h3 className="text-[var(--text-primary)] font-medium">Your Transcript</h3>
            <p className="text-sm text-[var(--text-tertiary)]">
              {wordCount.toLocaleString()} words • {charCount.toLocaleString()} characters
            </p>
          </div>
        </div>

        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
            copied
              ? 'bg-[var(--success-bg)] text-[var(--success)]'
              : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
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
        </motion.button>
      </div>

      {/* Transcript Content */}
      <div className="p-5 sm:p-6 max-h-[500px] overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="prose max-w-none"
        >
          {transcript.split('\n').map((paragraph, index) => (
            <p key={index} className="text-[var(--text-secondary)] leading-relaxed mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </motion.div>
      </div>

      {/* Stats Footer */}
      <div className="p-4 sm:p-5 border-t border-[var(--border-light)] flex flex-wrap gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-secondary)]">
          <FileText className="w-4 h-4 text-[var(--accent-primary)]" />
          <span className="text-sm text-[var(--text-secondary)]">{wordCount.toLocaleString()} words</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-secondary)]">
          <Hash className="w-4 h-4 text-[var(--accent-primary)]" />
          <span className="text-sm text-[var(--text-secondary)]">{charCount.toLocaleString()} chars</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-secondary)]">
          <Clock className="w-4 h-4 text-[var(--accent-primary)]" />
          <span className="text-sm text-[var(--text-secondary)]">~{Math.ceil(wordCount / 150)} min read</span>
        </div>
      </div>
    </div>
  );
}