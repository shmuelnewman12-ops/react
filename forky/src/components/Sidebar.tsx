import React from 'react';
import { Moon, Sun, Folder } from 'lucide-react';
import type { Theme } from '../types';
import { SIDEBAR_STYLES } from '../utils/constants';

interface SidebarProps {
  theme: Theme;
  onCycleTheme: () => void;
  onSelectDirectory: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  theme,
  onCycleTheme,
  onSelectDirectory,
}) => {
  const styles = SIDEBAR_STYLES[theme];

  return (
    <div
      className={`group w-16 hover:w-20 transition-all duration-300 flex flex-col items-center justify-center gap-6 border-r ${styles.bg} ${styles.border}`}
    >
      <button
        onClick={onCycleTheme}
        className={`p-3 rounded-xl transition-all duration-200 hover:scale-110 ${styles.hover}`}
        title="Toggle Theme"
      >
        {theme === 'light' ? (
          <Sun size={24} className="text-amber-500" />
        ) : (
          <Moon size={24} className="text-blue-400" />
        )}
      </button>
      <button
        onClick={onSelectDirectory}
        className={`p-3 rounded-xl transition-all duration-200 hover:scale-110 ${styles.hover}`}
        title="Select Music Folder"
      >
        <Folder size={24} className="text-violet-500" />
      </button>
    </div>
  );
};
