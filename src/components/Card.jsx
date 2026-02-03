import React from 'react';
import { THEME_CLASSES } from '../utils/constants';

/**
 * Reusable Card Component
 * @param {Object} props - Component props
 * @param {string} props.theme - Current theme
 * @param {Function} props.onClick - Click handler
 * @param {React.ReactNode} props.children - Card content
 * @param {boolean} props.isActive - Whether card is currently selected
 * @returns {JSX.Element}
 */
const Card = ({ theme, onClick, children, isActive = false }) => {
  const themeClass = THEME_CLASSES[theme];

  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer rounded-2xl p-5 backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
        isActive ? 'ring-2 ring-violet-500 shadow-lg shadow-violet-500/50' : ''
      } ${themeClass.card}`}
    >
      {children}
    </div>
  );
};

export default Card;
