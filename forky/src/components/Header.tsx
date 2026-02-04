import React from 'react';
import type { Theme } from '../types';

interface HeaderProps {
  theme: Theme;
}

export const Header: React.FC<HeaderProps> = ({ theme }) => {
  return (
    <div
      className={`rounded-2xl p-8 mb-8 backdrop-blur-xl border transition-all ${
        theme === 'light'
          ? 'bg-white/60 border-gray-200 shadow-lg'
          : theme === 'dark'
            ? 'bg-gray-800/40 border-gray-700 shadow-2xl'
            : 'bg-gray-950/60 border-gray-900 shadow-2xl'
      }`}
    >
      <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        forky
      </h1>
      <p className="text-center text-sm mt-2 text-gray-500">
        musicy
      </p>
    </div>
  );
};
