import { describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';

import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { SearchBar } from '../components/searchBar/SearchBar';
import { storeInstance } from '../store/store';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('Tests for the Search component', () => {
  const storageKey = 'searchTermForHarryPotterDB';
  it('Clicking the Search button saves the entered value to the local storage', async () => {
    render(
      <Provider store={storeInstance}>
        <SearchBar />
      </Provider>
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
      <Provider store={storeInstance}>
        <SearchBar />
      </Provider>
    );

    const input: HTMLInputElement = screen.getByTestId('searchInput');
    expect(input.value.replace(/"/g, '')).toBe('BulbaZawr');
  });
});
