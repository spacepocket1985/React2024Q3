import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchBar } from '../components/searchBar/SearchBar';

describe('Tests for the Search component', () => {
  const storageKey = 'searchTermForHarryPotterDB';
  it('Clicking the Search button saves the entered value to the local storage', async () => {
    render(
      <MemoryRouter>
        <SearchBar onSearchSubmit={function (): void {}} />
      </MemoryRouter>
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

  it('The component retrieves the value from the local storage upon mounting.', async () => {
    const localStorageValue = localStorage.getItem(storageKey);
    render(
      <MemoryRouter>
        <SearchBar onSearchSubmit={function (): void {}} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('searchInput')).toHaveValue(localStorageValue);
  });
});
