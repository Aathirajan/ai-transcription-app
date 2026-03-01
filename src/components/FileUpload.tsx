'use client';

import { useState, useCallback } from 'react';
import { Upload, FileAudio, FileVideo, AlertCircle, CheckCircle } from 'lucide-react';
import { isValidFileType, formatFileSize, MAX_FILE_SIZE } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

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

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (['mp3', 'wav', 'm4a'].includes(ext || '')) {
      return <FileAudio className="w-8 h-8 text-[#E94560]" />;
    }
    return <FileVideo className="w-8 h-8 text-[#E94560]" />;
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
            dragActive
              ? 'border-[#E94560] bg-[#E94560]/10'
              : 'border-[#2A2A3E] hover:border-[#E94560]/50 hover:bg-[#12121A]'
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
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
              dragActive ? 'bg-[#E94560]/20 scale-110' : 'bg-[#1A1A2E]'
            }`}>
              <Upload className={`w-8 h-8 ${dragActive ? 'text-[#E94560]' : 'text-[#A0A0B0]'}`} />
            </div>

            <div>
              <p className="text-white font-medium mb-1">
                {dragActive ? 'Drop your file here' : 'Drag & drop your audio/video'}
              </p>
              <p className="text-[#A0A0B0] text-sm">
                or click to browse
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {['MP4', 'MP3', 'WAV', 'MOV', 'M4A'].map((format) => (
                <span
                  key={format}
                  className="px-2 py-1 text-xs rounded-lg bg-[#1A1A2E] text-[#A0A0B0]"
                >
                  {format}
                </span>
              ))}
            </div>

            <p className="text-xs text-[#A0A0B0] mt-2">
              Maximum file size: 500MB
            </p>
          </div>
        </div>
      ) : (
        <div className="card p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#1A1A2E] flex items-center justify-center">
              {getFileIcon(selectedFile.name)}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{selectedFile.name}</p>
              <p className="text-[#A0A0B0] text-sm">{formatFileSize(selectedFile.size)}</p>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#00D9A5]" />
              <span className="text-[#00D9A5] text-sm font-medium">Ready</span>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedFile(null);
              setError(null);
            }}
            className="mt-4 text-sm text-[#A0A0B0] hover:text-white transition-colors"
          >
            Remove file
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 rounded-xl bg-[#E94560]/10 border border-[#E94560]/30 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-[#E94560] flex-shrink-0" />
          <p className="text-[#E94560] text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
