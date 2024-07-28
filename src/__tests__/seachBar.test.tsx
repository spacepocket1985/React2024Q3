import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';

import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { SearchBar } from '../components/searchBar/SearchBar';
import { store } from '../store/store';

describe('Tests for the Search component', () => {
  const storageKey = 'searchTermForHarryPotterDB';
  it('Clicking the Search button saves the entered value to the local storage', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SearchBar />
        </Provider>
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

  it('Check that the component retrieves the value from the local storage upon mounting.', async () => {
    localStorage.setItem(storageKey, JSON.stringify('BulbaZawr'));

    render(
      <MemoryRouter>
        <Provider store={store}>
          <SearchBar />
        </Provider>
      </MemoryRouter>
    );

    const input: HTMLInputElement = screen.getByTestId('searchInput');
    expect(input.value.replace(/"/g, '')).toBe('BulbaZawr');
  });
});
