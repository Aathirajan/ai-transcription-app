// Utility functions for the AI Transcript Generator

// Valid file extensions for upload
export const ALLOWED_EXTENSIONS = ['mp4', 'mp3', 'wav', 'mov', 'm4a'];
export const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB

// Extract YouTube video ID from various URL formats
export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Validate YouTube URL
export function isValidYouTubeUrl(url: string): boolean {
  return extractYouTubeId(url) !== null;
}

// Get YouTube thumbnail URL
export function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

// Validate file type
export function isValidFileType(filename: string): boolean {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  return ALLOWED_EXTENSIONS.includes(ext);
}

// Format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Generate sample transcript for demo
export function generateSampleTranscript(): string {
  return `Welcome to this video. Today we're going to discuss an exciting topic that I think you'll find really valuable.

First, let me start by explaining the background of this subject. Many people have been asking about this lately, and I wanted to create a comprehensive guide to help everyone understand it better.

The main points I want to cover today are:

One: The fundamental concepts that you need to understand.
Two: Practical applications and how you can use this knowledge.
Three: Common mistakes to avoid.
And Four: Tips and tricks for getting the best results.

Let's dive into the first point. When we're talking about the fundamentals, it's important to remember that this isn't as complicated as it might seem at first. With a little practice, anyone can master these concepts.

Now, for the practical applications - this is where things get really interesting. You can apply what we've discussed in so many different ways. Whether you're working on a personal project or something for your business, the possibilities are endless.

I hope you found this video helpful. If you did, please don't forget to like and subscribe for more content like this. Thanks for watching!`;
}

// Generate SRT format from transcript
export function generateSRT(transcript: string): string {
  const lines = transcript.split('\n').filter(line => line.trim());
  let srt = '';
  let index = 1;

  for (let i = 0; i < lines.length; i += 3) {
    const startTime = formatSRTTime((index - 1) * 3);
    const endTime = formatSRTTime(index * 3);
    const text = lines.slice(i, i + 3).join(' ');

    srt += `${index}\n`;
    srt += `${startTime} --> ${endTime}\n`;
    srt += `${text}\n\n`;
    index++;
  }

  return srt;
}

// Format time for SRT
function formatSRTTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${pad(hrs)}:${pad(mins)}:${pad(secs)},000`;
}

// Pad numbers with zeros
function pad(num: number): string {
  return num.toString().padStart(2, '0');
}

// Count words in text
export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

// Count characters in text
export function countCharacters(text: string): number {
  return text.length;
}

// Download file
export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Copy to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

// Processing status messages
export const PROCESSING_STAGES = [
  { progress: 10, message: 'Uploading file...' },
  { progress: 20, message: 'Extracting audio...' },
  { progress: 40, message: 'Preparing for transcription...' },
  { progress: 60, message: 'Transcribing with AI...' },
  { progress: 80, message: 'Processing results...' },
  { progress: 100, message: 'Complete!' },
];

// SEO Keywords
export const SEO_KEYWORDS = [
  'free transcript generator',
  'free ai transcription',
  'youtube transcript generator free',
  'audio to text free',
  'video to transcript free',
  'transcribe video online free',
  'podcast transcript generator free',
];
