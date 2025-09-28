import { useEffect } from 'react';
import { useThemeStore } from '../store/theme-store';

const THEME_KEY = 'theme';

function setCookie(name: string, value: string, days: number) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '')  + expires + '; path=/';
}

function getCookie(name: string): string | null {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function useTheme() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_KEY) as 'light' | 'dark' | null;
    const cookieTheme = getCookie(THEME_KEY) as 'light' | 'dark' | null;

    if (storedTheme) {
      setTheme(storedTheme);
    } else if (cookieTheme) {
      setTheme(cookieTheme);
    }
  }, [setTheme]);

  const handleSetTheme = (newTheme: 'light' | 'dark') => {
    try {
      localStorage.setItem(THEME_KEY, newTheme);
    } catch (e) {
      setCookie(THEME_KEY, newTheme, 365);
    }
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return { theme, setTheme: handleSetTheme };
}
