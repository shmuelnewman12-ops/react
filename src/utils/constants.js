// Theme constants
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AMOLED: 'amoled',
};

export const THEME_LIST = Object.values(THEMES);

// Audio constants
export const AUDIO_EXTENSIONS = ['.mp3', '.wav', '.ogg', '.m4a', '.flac'];

// Theme styling
export const THEME_CLASSES = {
  light: {
    bg: 'bg-gradient-to-br from-gray-50 to-gray-100',
    text: 'text-gray-900',
    sidebar: 'bg-white/80 backdrop-blur-lg border-gray-200',
    card: 'bg-white/60 border-gray-200 hover:bg-white/80 hover:shadow-xl',
    border: 'border-gray-200',
    hoverBg: 'hover:bg-gray-100',
    innerBg: 'bg-white',
  },
  dark: {
    bg: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
    text: 'text-gray-100',
    sidebar: 'bg-gray-800/50 backdrop-blur-lg border-gray-700',
    card: 'bg-gray-800/40 border-gray-700 hover:bg-gray-800/60 hover:shadow-2xl',
    border: 'border-gray-700',
    hoverBg: 'hover:bg-gray-700',
    innerBg: 'bg-gray-800',
  },
  amoled: {
    bg: 'bg-black',
    text: 'text-gray-100',
    sidebar: 'bg-black/90 backdrop-blur-lg border-gray-900',
    card: 'bg-gray-950/60 border-gray-900 hover:bg-gray-950/80 hover:shadow-2xl',
    border: 'border-gray-900',
    hoverBg: 'hover:bg-gray-900',
    innerBg: 'bg-black',
  },
};
