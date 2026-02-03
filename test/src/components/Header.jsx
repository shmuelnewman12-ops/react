import React from 'react';
import { THEME_CLASSES } from '../utils/constants';

const Header = ({ theme, title = 'webp3' }) => {
  const themeClass = THEME_CLASSES[theme];

  return (
    <div
      className={`rounded-3xl p-12 mb-12 backdrop-blur-xl border transition-all duration-500 hover:shadow-2xl ${
        themeClass.card
      } animate-fade-in`}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 blur-2xl opacity-20 animate-pulse rounded-2xl"></div>
        <h1 className="relative text-6xl md:text-7xl font-black text-center bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-3 hover:scale-105 transition-transform duration-300">
          {title}
        </h1>
        <p className="text-center text-sm md:text-base font-medium bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
          Your Music, Your Style, Your Way
        </p>
      </div>
    </div>
  );
};

export default Header;
