import { useState, useCallback } from 'react';
import { THEME_LIST } from '../utils/constants';

/**
 * Hook to manage theme state
 * @returns {Object} Theme state and setter
 */
export const useTheme = () => {
  const [theme, setTheme] = useState('dark');

  const cycleTheme = useCallback(() => {
    setTheme((currentTheme) => {
      const currentIndex = THEME_LIST.indexOf(currentTheme);
      return THEME_LIST[(currentIndex + 1) % THEME_LIST.length];
    });
  }, []);

  return { theme, cycleTheme };
};
