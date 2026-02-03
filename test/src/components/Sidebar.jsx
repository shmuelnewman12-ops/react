import React from 'react';
import { Moon, Sun, Folder } from 'lucide-react';
import { THEME_CLASSES } from '../utils/constants';

const Sidebar = ({ theme, onThemeToggle, onSelectDirectory }) => {
  const themeClass = THEME_CLASSES[theme];

  return (
    <div
      className={`group w-16 hover:w-20 transition-all duration-300 flex flex-col items-center justify-center gap-8 border-r ${themeClass.sidebar} shadow-xl`}
    >
      <div className="flex-1 flex items-center justify-center">
        <button
          onClick={onThemeToggle}
          className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${themeClass.hoverBg} btn-glow shadow-lg hover:shadow-glow`}
          title="Toggle Theme"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Sun size={24} className="text-amber-500 icon-rotate" />
          ) : (
            <Moon size={24} className="text-blue-400 icon-rotate" />
          )}
        </button>
      </div>
      <div className="flex-1 flex items-end justify-center pb-8">
        <button
          onClick={onSelectDirectory}
          className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${themeClass.hoverBg} btn-glow shadow-lg hover:shadow-glow`}
          title="Select Music Folder"
          aria-label="Select music folder"
        >
          <Folder size={24} className="text-violet-500 hover:animate-bounce" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
