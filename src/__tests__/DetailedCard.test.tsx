import React from 'react';
import configureMockStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';

import {
  mockInitialState,
  mockTransformCharactersData,
  responseData2,
} from './mocks/mocksData';
import { CardDetails } from '../components/cardDetails/cardDetails';
import { Provider } from 'react-redux';

vi.mock('@remix-run/react', () => ({
  useLoaderData: () => ({
    responseWithDetails: mockTransformCharactersData[2],
    data: responseData2
  }),
  useSearchParams: () => [new URLSearchParams(), () => {}],
}));

describe('Tests for the CardDetails component', () => {
  const mockStore = configureMockStore();
  const mockDataStore = mockStore(mockInitialState);
  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    render(
      <Provider store={mockDataStore}>
        <CardDetails />
      </Provider>
    );
    const characterCardTitle = await screen.findByText(/Character details/);
    expect(characterCardTitle).toBeInTheDocument;
    expect(characterCardTitle).toBeInTheDocument;
    const characterName = await screen.findByText(
      mockTransformCharactersData[2].attributes.name
    );
    expect(characterName).toBeInTheDocument;
  });
});
