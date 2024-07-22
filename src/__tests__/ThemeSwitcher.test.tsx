import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../context/ThemeContext';
import { ThemeSwitcher } from '../components/themeSwitcher/ThemeSwitcher';

describe('Tests for ThemeSwitcher component', () => {
  it('checks some temp tests', async () => {
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
