import { act, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

import { responseData } from './mocs/mocsData';
import { PotterDbApiReturnType } from '../types';
import { SearchPage } from '../pages/SearchPage';

describe('Tests for the SearchPage component', () => {
  it('Check that component updates URL query parameter when page changes', async () => {
    vitest.mock('../service/potterDbApi', () => ({
      PotterDbApi: vitest.fn(
        (): PotterDbApiReturnType => ({
          getCharacters: vitest.fn().mockResolvedValueOnce(responseData),
          getCharacter: vitest.fn(),
          loading: false,
          error: '',
          clearError: vitest.fn(),
          _DefaultFilterWord: 'RingoStar',
          _DefaultOffset: '',
          _DefaultPage: 1,
        })
      ),
    }));

    render(
      <Router>
        <SearchPage />
      </Router>
    );

    const nextBtn = await screen.findByTestId('nextBtn');
    expect(nextBtn).toBeInTheDocument();

    act(() => {
      fireEvent.click(nextBtn);
    });

    expect(window.location.search).toBe(
      '?filter=RingoStar&pageNumber=3&details='
    );
  });
});
