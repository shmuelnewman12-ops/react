import { useState, useCallback } from 'react';
import type { Theme } from '../types';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('amoled');

  const cycleTheme = useCallback(() => {
    setTheme((prev) => {
      const themes: Theme[] = ['light', 'dark', 'amoled'];
      const currentIndex = themes.indexOf(prev);
      return themes[(currentIndex + 1) % themes.length];
    });
  }, []);

  return { theme, cycleTheme };
};
