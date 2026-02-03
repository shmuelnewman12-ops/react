import { AUDIO_EXTENSIONS } from './constants';

export const formatTime = (seconds) => {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const removeFileExtension = (filename) => {
  return filename.replace(/\.(mp3|wav|ogg|m4a|flac)$/i, '');
};

export const isAudioFile = (filename) => {
  const ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();
  return AUDIO_EXTENSIONS.includes(ext);
};

export const sortByName = (items) => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
};
