import { useState, useCallback } from 'react';
import { THEME_LIST } from '../utils/constants';

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
