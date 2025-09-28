import { useThemeStore } from '../../src/store/theme-store';
import { act, renderHook } from '@testing-library/react';
import { expect, test } from 'vitest';

test('should set theme', () => {
  const { result } = renderHook(() => useThemeStore());

  act(() => {
    result.current.setTheme('dark');
  });

  expect(result.current.theme).toBe('dark');
});
