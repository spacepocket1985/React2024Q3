import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';

import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { CardDetails } from '../components/cardDetails/cardDetails';
import {
  mockUseGetCharacterQuery,
  mockUseGetAllCharactersQuery,
  mockUseGetCharacterQueryLoading,
  mockStoreQueryData,
} from './mocks/mocksData';

import { ReduxApiMockType } from '../types';
import { useGetCharacterQuery } from '../store/slices/apiSlice';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../store/store';

describe('Tests for the CardList component', () => {
  beforeAll(() => {
    vi.mock('../store/slices/apiSlice', async () => {
      const actual: { apiSlice: ReduxApiMockType } = (await vi.importActual(
        '../store/slices/apiSlice'
      )) as { apiSlice: ReduxApiMockType };
      return {
        ...actual,
        useGetCharacterQuery: vi.fn(() => mockUseGetCharacterQuery),
        useGetAllCharactersQuery: vi.fn(() => mockUseGetAllCharactersQuery),
      };
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });
  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    const mockStore = configureStore({
      reducer: rootReducer,
      preloadedState: mockStoreQueryData,
    });
    render(
      <Router>
        <Provider store={mockStore}>
          <CardDetails />
        </Provider>
      </Router>
    );
    const characterCardTitle = await screen.findByText(/Character details/g);
    expect(characterCardTitle).toBeInTheDocument;
    const characterName = await screen.findByText(
      mockUseGetCharacterQuery.data.attributes.name
    );
    expect(characterName).toBeInTheDocument;
  });

  it('Check that a loading indicator is displayed while fetching data;', async () => {
    vi.mocked(useGetCharacterQuery).mockReturnValue(
      mockUseGetCharacterQueryLoading
    );
    const mockStore = configureStore({
      reducer: rootReducer,
      preloadedState: mockStoreQueryData,
    });
    render(
      <Router>
        <Provider store={mockStore}>
          <CardDetails />
        </Provider>
      </Router>
    );
    expect(screen.getByText('Loading ...')).toBeInTheDocument();
    const spinner = await screen.findByTestId('spinner');
    expect(spinner).toBeInTheDocument;
  });
});
