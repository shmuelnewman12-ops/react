import { AUDIO_EXTENSIONS } from './constants';

export const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const removeFileExtension = (filename: string): string => {
  return filename.replace(/\.(mp3|wav|ogg|m4a|flac)$/i, '');
};

export const isAudioFile = (filename: string): boolean => {
  const ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();
  return AUDIO_EXTENSIONS.includes(ext);
};

export const sortByName = <T extends { name: string }>(items: T[]): T[] => {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
};
