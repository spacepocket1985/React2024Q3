import React from 'react';
import configureMockStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';

import {
  mockInitialState,
  mockTransformCharactersData,
} from './mocks/mocksData';
import { CardDetails } from '../components/cardDetails/cardDetails';
import { storeInstance } from '../store/store';
import { CardList } from '../components/cardList/CardList';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('Tests for the CardDetails component', () => {
  const mockStore = configureMockStore();
  const mockDataStore = mockStore(mockInitialState);
  it('Make sure the detailed card component correctly displays the detailed card data', async() => {
    render(
      <Provider store={mockDataStore}>
        <CardDetails character={mockTransformCharactersData[2]} />
      </Provider>
    );
    const characterCardTitle = await screen.findByText(/Character details/);
    expect(characterCardTitle).toBeInTheDocument;
    expect(characterCardTitle).toBeInTheDocument;
    const characterName = await screen.findByText(mockTransformCharactersData[2].attributes.name);
    expect(characterName).toBeInTheDocument;
  });

  it('Check that a loading indicator is displayed while fetching data;', async () => {


    render(
    
        <Provider store={storeInstance}>
          <CardList сharacters={[]}/>
        </Provider>
    
    );
    expect(screen.getByText('Loading ...')).toBeInTheDocument();
    const spinner = await screen.findByTestId('spinner');
    expect(spinner).toBeInTheDocument;
  });
});
