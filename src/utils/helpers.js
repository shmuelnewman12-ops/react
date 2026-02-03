import { AUDIO_EXTENSIONS } from './constants';

/**
 * Format seconds to MM:SS format
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted time string
 */
export const formatTime = (seconds) => {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Remove file extension from filename
 * @param {string} filename - Filename with extension
 * @returns {string} Filename without extension
 */
export const removeFileExtension = (filename) => {
  return filename.replace(/\.(mp3|wav|ogg|m4a|flac)$/i, '');
};

/**
 * Check if file is an audio file
 * @param {string} filename - File name to check
 * @returns {boolean} True if file is audio
 */
export const isAudioFile = (filename) => {
  const ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();
  return AUDIO_EXTENSIONS.includes(ext);
};

/**
 * Sort array of items alphabetically by name
 * @param {Array} items - Items to sort
 * @returns {Array} Sorted items
 */
export const sortByName = (items) => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
};
