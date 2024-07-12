import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

import { responseData } from './mocs/mocsData';
import { PotterDbApiReturnType } from '../types';
import { SearchPage } from '../pages/SearchPage';

describe('Tests for the SearchPage component', () => {
  it('Some tests for seach compomemt', async () => {
    vitest.mock('../service/potterDbApi', () => ({
      PotterDbApi: vitest.fn(
        (): PotterDbApiReturnType => ({
          getCharacters: vitest.fn().mockResolvedValueOnce(responseData),
          getCharacter: vitest.fn(),
          loading: false,
          error: '',
          clearError: vitest.fn(),
          _DefaultFilterWord: '',
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

    await fireEvent.click(nextBtn);

    //expect(location.pathname).toBe('/asdasd');
  });
});
