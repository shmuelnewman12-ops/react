import React from 'react';
import { THEME_CLASSES } from '../utils/constants';

/**
 * Header Component
 * @param {Object} props - Component props
 * @param {string} props.theme - Current theme
 * @param {string} props.title - Header title
 * @returns {JSX.Element}
 */
const Header = ({ theme, title = 'webp3' }) => {
  const themeClass = THEME_CLASSES[theme];

  return (
    <div
      className={`rounded-2xl p-8 mb-8 backdrop-blur-xl border ${
        themeClass.card
      }`}
    >
      <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        {title}
      </h1>
    </div>
  );
};

export default Header;
