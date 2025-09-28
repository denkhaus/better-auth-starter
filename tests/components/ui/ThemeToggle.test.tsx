import { ThemeToggle } from '../../../src/components/ui/ThemeToggle';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { ThemeProvider } from '../../../src/components/ui/ThemeProvider';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

test('should toggle theme on click', () => {
  renderWithProvider(<ThemeToggle />);

  const button = screen.getByRole('button');
  fireEvent.click(button);

  // After a click, the theme should be dark.
  // We can check this by asserting that the `dark` class is present on the html element.
  expect(document.documentElement).toHaveClass('dark');

  fireEvent.click(button);

  // After another click, the theme should be light again.
  expect(document.documentElement).not.toHaveClass('dark');
});
