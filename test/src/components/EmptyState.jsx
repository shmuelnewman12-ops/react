import React from 'react';
import { Music } from 'lucide-react';
import { THEME_CLASSES } from '../utils/constants';

const EmptyState = ({ theme }) => {
  const themeClass = THEME_CLASSES[theme];

  return (
    <div
      className={`rounded-3xl p-20 text-center backdrop-blur-xl border transition-all duration-500 hover:scale-105 ${
        themeClass.card
      } animate-fade-in`}
    >
      <div className="relative inline-block mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 blur-3xl opacity-40 animate-pulse-glow"></div>
        <div className="relative">
          <Music size={100} className="text-violet-500 drop-shadow-lg animate-float" />
        </div>
      </div>
      <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
        No Music Selected
      </h2>
      <p className="text-lg text-gray-500 mb-6">
        Click the folder icon in the sidebar to browse and select your music library
      </p>
      <div className="flex justify-center gap-2">
        <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></div>
        <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-100"></div>
        <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse delay-200"></div>
      </div>
    </div>
  );
};

export default EmptyState;
