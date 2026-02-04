import React from 'react';
import { Music } from 'lucide-react';
import type { Theme } from '../types';
import { CARD_STYLES } from '../utils/constants';

interface CardProps {
  name: string;
  onClick: () => void;
  isActive?: boolean;
  theme: Theme;
  isRound?: boolean;
}

export const Card: React.FC<CardProps> = ({
  name,
  onClick,
  isActive,
  theme,
  isRound,
}) => {
  const styles = CARD_STYLES[theme];

  return (
    <div className="flex flex-col items-center">
      <div
        onClick={onClick}
        className={`group cursor-pointer backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
          isRound ? 'rounded-full w-28 h-28' : 'rounded-2xl p-5 w-full'
        } ${
          isActive ? 'ring-2 ring-violet-500 shadow-lg shadow-violet-500/50' : ''
        } ${styles.bg} ${styles.border} ${styles.hover} ${!isRound ? 'aspect-square' : ''} flex items-center justify-center`}
      >
        <div className="relative bg-gradient-to-br from-violet-500 to-purple-600 p-1 rounded-full">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              theme === 'light'
                ? 'bg-white'
                : theme === 'dark'
                  ? 'bg-gray-800'
                  : 'bg-black'
            }`}
          >
            <Music
              size={24}
              className="text-violet-500 group-hover:scale-110 transition-transform"
            />
          </div>
        </div>
      </div>
      <p className="font-bold text-white text-sm text-center mt-3 truncate max-w-28">{name}</p>
    </div>
  );
};
