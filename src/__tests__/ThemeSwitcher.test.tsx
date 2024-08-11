import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ThemeProvider } from '../context/ThemeContext';
import { ThemeSwitcher } from '../components/themeSwitcher/ThemeSwitcher';

describe('Tests for ThemeSwitcher component', () => {
  it('toggles theme when button is clicked', async () => {
    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>
    );
    const button = await screen.getByRole('button');
    const themeText = screen.getByText('light');

    expect(await screen.getByText('Theme')).toBeInTheDocument();

    await expect(themeText).toBeInTheDocument();

    await fireEvent.click(button);

    await expect(screen.getByText('dark')).toBeInTheDocument();
  });
});