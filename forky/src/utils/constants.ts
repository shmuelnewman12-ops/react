import type { Theme } from '../types';

export const AUDIO_EXTENSIONS = ['.mp3', '.wav', '.ogg', '.m4a', '.flac'];

export const THEME_CLASSES: Record<Theme, string> = {
  light: 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900',
  dark: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100',
  amoled: 'bg-black text-gray-100',
};

export const SIDEBAR_STYLES: Record<
  Theme,
  { bg: string; border: string; hover: string }
> = {
  light: {
    bg: 'bg-white/80 backdrop-blur-lg',
    border: 'border-gray-200',
    hover: 'hover:bg-gray-100',
  },
  dark: {
    bg: 'bg-gray-800/50 backdrop-blur-lg',
    border: 'border-gray-700',
    hover: 'hover:bg-gray-700',
  },
  amoled: {
    bg: 'bg-black/90 backdrop-blur-lg',
    border: 'border-gray-900',
    hover: 'hover:bg-gray-900',
  },
};

export const CARD_STYLES: Record<
  Theme,
  { bg: string; border: string; hover: string }
> = {
  light: {
    bg: 'bg-white/60',
    border: 'border-gray-200',
    hover: 'hover:bg-white/80 hover:shadow-xl',
  },
  dark: {
    bg: 'bg-gray-800/40',
    border: 'border-gray-700',
    hover: 'hover:bg-gray-800/60 hover:shadow-2xl',
  },
  amoled: {
    bg: 'bg-gray-950/60',
    border: 'border-gray-900',
    hover: 'hover:bg-gray-950/80 hover:shadow-2xl',
  },
};

export const PLAYER_STYLES: Record<
  Theme,
  { bg: string; border: string }
> = {
  light: {
    bg: 'bg-white/80',
    border: 'border-gray-200',
  },
  dark: {
    bg: 'bg-gray-800/80',
    border: 'border-gray-700',
  },
  amoled: {
    bg: 'bg-black/90',
    border: 'border-gray-900',
  },
};
