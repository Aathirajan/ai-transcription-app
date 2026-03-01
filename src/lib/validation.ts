// Allowed MIME types for audio/video uploads
export const ALLOWED_MIME_TYPES = [
  // Video
  'video/mp4',
  'video/mpeg',
  'video/quicktime',
  'video/webm',
  // Audio
  'audio/mpeg',    // mp3
  'audio/wav',
  'audio/wave',
  'audio/x-wav',
  'audio/x-pn-wav',
  'audio/ogg',
  'audio/webm',
  'audio/mp4',
  'audio/x-m4a',
  'audio/m4a',
  // Additional
  'audio/x-aiff',
  'audio/aiff',
];

// Allowed file extensions
export const ALLOWED_EXTENSIONS = [
  '.mp4',
  '.mp3',
  '.wav',
  '.mov',
  '.m4a',
  '.ogg',
  '.webm',
  '.aiff',
  '.aif',
  '.flac',
];

// Maximum file size (500MB)
export const MAX_FILE_SIZE = 500 * 1024 * 1024;

/**
 * Validates file type based on MIME type
 */
export const isValidMimeType = (mimeType: string): boolean => {
  return ALLOWED_MIME_TYPES.includes(mimeType.toLowerCase());
};

/**
 * Validates file extension
 */
export const isValidExtension = (fileName: string): boolean => {
  const ext = fileName.toLowerCase().slice(fileName.lastIndexOf('.'));
  return ALLOWED_EXTENSIONS.includes(ext);
};

/**
 * Validates file size
 */
export const isValidSize = (size: number): boolean => {
  return size > 0 && size <= MAX_FILE_SIZE;
};

/**
 * Validates a file object
 */
export const validateFile = (file: File): { valid: boolean; error?: string } => {
  // Check size first (fastest)
  if (!isValidSize(file.size)) {
    return {
      valid: false,
      error: `File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`,
    };
  }

  // Check MIME type
  if (!isValidMimeType(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}`,
    };
  }

  return { valid: true };
};

/**
 * Validates YouTube URL
 */
export const isValidYouTubeUrl = (url: string): boolean => {
  if (!url) return false;

  const youtubePatterns = [
    /youtube\.com\/watch\?v=[\w-]+/,
    /youtu\.be\/[\w-]+/,
    /youtube\.com\/embed\/[\w-]+/,
    /youtube\.com\/v\/[\w-]+/,
    /youtube\.com\/shorts\/[\w-]+/,
  ];

  return youtubePatterns.some(pattern => pattern.test(url));
};

/**
 * Sanitize transcript text output
 */
export const sanitizeTranscript = (text: string): string => {
  if (!text) return '';

  return text
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Remove control characters
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
};
