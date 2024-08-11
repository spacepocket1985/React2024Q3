import { describe, expect, it, vi } from 'vitest';

import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { SearchBar } from '../components/searchBar/SearchBar';
import { Providers } from '../../app/providers';

vi.mock('@remix-run/react', () => ({
  useSearchParams: () => [new URLSearchParams(), vi.fn()],
}));

describe('Tests for the Search component', () => {
  const storageKey = 'searchTermForHarryPotterDB';
  it('Clicking the Search button saves the entered value to the local storage', async () => {
    render(
      <Providers>
        <SearchBar />
      </Providers>
    );

    fireEvent.change(screen.getByTestId('searchInput'), {
      target: { value: 'WhiteRabbit' },
    });
    fireEvent.click(screen.getByTestId('serachSubmit'));
    expect(localStorage.getItem(storageKey)).toBe('WhiteRabbit');
    fireEvent.change(screen.getByTestId('searchInput'), {
      target: { value: 'RedTiger' },
    });
    fireEvent.submit(screen.getByTestId('serachSubmit'));
    expect(localStorage.getItem(storageKey)).toBe('RedTiger');
  });

  it('Check that the component retrieves the value from the local storage upon mounting.', async () => {
    localStorage.setItem(storageKey, JSON.stringify('BulbaZawr'));

    render(
      <Providers>
        <SearchBar />
      </Providers>
    );

    const input: HTMLInputElement = screen.getByTestId('searchInput');
    expect(input.value.replace(/"/g, '')).toBe('BulbaZawr');
  });
});