import React from 'react';
import { Music } from 'lucide-react';
import type { Theme } from '../types';

interface EmptyStateProps {
  theme: Theme;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ theme }) => {
  return (
    <div
      className={`rounded-2xl p-16 text-center backdrop-blur-xl border transition-all ${
        theme === 'light'
          ? 'bg-white/60 border-gray-200 shadow-lg'
          : theme === 'dark'
            ? 'bg-gray-800/40 border-gray-700 shadow-2xl'
            : 'bg-gray-950/60 border-gray-900 shadow-2xl'
      }`}
    >
      <div className="relative inline-block mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 blur-2xl opacity-30 animate-pulse"></div>
        <Music size={80} className="relative text-violet-500" />
      </div>
      <h2 className="text-3xl font-bold mb-3">No Music Folder Selected</h2>
      <p className="text-gray-500">Click the folder icon to browse your music library</p>
    </div>
  );
};
