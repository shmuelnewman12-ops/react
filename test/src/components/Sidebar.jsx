import React from 'react';
import { Moon, Sun, Folder } from 'lucide-react';
import { THEME_CLASSES } from '../utils/constants';

/**
 * Sidebar Component
 * @param {Object} props - Component props
 * @param {string} props.theme - Current theme
 * @param {Function} props.onThemeToggle - Theme toggle callback
 * @param {Function} props.onSelectDirectory - Directory select callback
 * @returns {JSX.Element}
 */
const Sidebar = ({ theme, onThemeToggle, onSelectDirectory }) => {
  const themeClass = THEME_CLASSES[theme];

  return (
    <div
      className={`group w-16 hover:w-20 transition-all duration-300 flex flex-col items-center justify-center gap-6 border-r ${themeClass.sidebar}`}
    >
      <button
        onClick={onThemeToggle}
        className={`p-3 rounded-xl transition-all duration-200 hover:scale-110 ${themeClass.hoverBg}`}
        title="Toggle Theme"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <Sun size={24} className="text-amber-500" />
        ) : (
          <Moon size={24} className="text-blue-400" />
        )}
      </button>
      <button
        onClick={onSelectDirectory}
        className={`p-3 rounded-xl transition-all duration-200 hover:scale-110 ${themeClass.hoverBg}`}
        title="Select Music Folder"
        aria-label="Select music folder"
      >
        <Folder size={24} className="text-violet-500" />
      </button>
    </div>
  );
};

export default Sidebar;
