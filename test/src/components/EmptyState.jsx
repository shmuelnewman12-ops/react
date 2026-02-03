import React from 'react';
import { Music } from 'lucide-react';
import { THEME_CLASSES } from '../utils/constants';

/**
 * Empty State Component
 * @param {Object} props - Component props
 * @param {string} props.theme - Current theme
 * @returns {JSX.Element}
 */
const EmptyState = ({ theme }) => {
  const themeClass = THEME_CLASSES[theme];

  return (
    <div
      className={`rounded-2xl p-16 text-center backdrop-blur-xl border ${
        themeClass.card
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

export default EmptyState;
