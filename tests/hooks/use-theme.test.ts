import { useTheme } from '../../src/hooks/use-theme';
import { act, renderHook } from '@testing-library/react';
import { expect, test, afterEach } from 'vitest';

afterEach(() => {
  localStorage.clear();
  document.cookie.split(';').forEach(function(c) { document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/'); });
});

test('should set theme and persist to local storage', () => {
  const { result } = renderHook(() => useTheme());

  act(() => {
    result.current.setTheme('dark');
  });

  expect(result.current.theme).toBe('dark');
  expect(localStorage.getItem('theme')).toBe('dark');
});
