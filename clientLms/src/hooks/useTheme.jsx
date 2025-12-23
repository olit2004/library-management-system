import { useState, useEffect } from 'react';

export function useTheme() {
  
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') { 
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme;
      }
     
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light'; 
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
   
      root.classList.remove('light', 'dark');
     
      root.classList.add(theme);
     
      localStorage.setItem('theme', theme);
    }
  }, [theme]); // Re-run effect when theme changes

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
}