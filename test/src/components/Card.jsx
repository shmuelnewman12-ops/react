import React from 'react';
import { THEME_CLASSES } from '../utils/constants';

const Card = ({ theme, onClick, children, isActive = false }) => {
  const themeClass = THEME_CLASSES[theme];

  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer rounded-2xl p-6 backdrop-blur-xl border transition-all duration-300 hover:scale-110 card-hover ${
        isActive 
          ? 'ring-2 ring-violet-500 shadow-lg shadow-violet-500/50 animate-pulse-soft' 
          : 'hover:shadow-2xl'
      } ${themeClass.card}`}
    >
      {children}
    </div>
  );
};

export default Card;
