'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileAudio, FileVideo, X, CheckCircle } from 'lucide-react';
import { isValidFileType, formatFileSize, MAX_FILE_SIZE } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const ACCEPTED_FORMATS = ['MP4', 'MP3', 'WAV', 'MOV', 'M4A'];

export default function FileUpload({ onFileSelect }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const validateAndSetFile = (file: File) => {
    setError(null);

    if (!isValidFileType(file.name)) {
      setError('Invalid file type. Please upload MP4, MP3, WAV, MOV, or M4A files.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('File too large. Maximum size is 500MB.');
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setError(null);
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (['mp3', 'wav', 'm4a'].includes(ext || '')) {
      return <FileAudio className="w-6 h-6 text-[var(--accent-primary)]" />;
    }
    return <FileVideo className="w-6 h-6 text-[var(--accent-primary)]" />;
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!selectedFile ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 cursor-pointer group ${
              dragActive
                ? 'border-[var(--accent-primary)] bg-[var(--accent-light)] scale-[1.02]'
                : 'border-[var(--border-medium)] hover:border-[var(--accent-primary)]/50 bg-[var(--bg-secondary)]/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept=".mp4,.mp3,.wav,.mov,.m4a"
              onChange={handleChange}
            />

            <div className="flex flex-col items-center gap-4">
              <motion.div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                  dragActive
                    ? 'bg-[var(--accent-primary)]/10 scale-110'
                    : 'bg-[var(--bg-tertiary)] group-hover:bg-[var(--accent-light)]'
                }`}
                animate={dragActive ? { scale: 1.1 } : { scale: 1 }}
              >
                <Upload
                  className={`w-7 h-7 transition-colors duration-200 ${
                    dragActive
                      ? 'text-[var(--accent-primary)]'
                      : 'text-[var(--text-muted)] group-hover:text-[var(--accent-primary)]'
                  }`}
                />
              </motion.div>

              <div>
                <p className="text-[var(--text-primary)] font-medium mb-1">
                  {dragActive ? 'Drop your file here' : 'Drag and drop your file'}
                </p>
                <p className="text-[var(--text-tertiary)] text-sm">
                  or click to browse from your device
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {ACCEPTED_FORMATS.map((format) => (
                  <span
                    key={format}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--bg-card)] border border-[var(--border-light)] text-[var(--text-tertiary)]"
                  >
                    {format}
                  </span>
                ))}
              </div>

              <p className="text-xs text-[var(--text-muted)]">
                Maximum file size: 500MB
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="selected"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-light)]"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0">
                {getFileIcon(selectedFile.name)}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[var(--text-primary)] font-medium truncate">
                  {selectedFile.name}
                </p>
                <p className="text-[var(--text-tertiary)] text-sm">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--success-bg)]">
                <CheckCircle className="w-4 h-4 text-[var(--success)]" />
                <span className="text-sm font-medium text-[var(--success)]">Ready</span>
              </div>

              <button
                onClick={handleRemove}
                className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all"
                title="Remove file"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-4 p-4 rounded-xl bg-[var(--error-bg)] border border-[var(--error)]/20 flex items-start gap-3"
          >
            <div className="w-5 h-5 rounded-full bg-[var(--error)] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <p className="text-[var(--error)] text-sm">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}