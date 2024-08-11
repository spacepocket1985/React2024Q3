import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import configureMockStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import { Card } from '../components/card/Card';
import { mockInitialState, mockTransformCharactersData } from './mocks/mocksData';
import { Provider } from 'react-redux';

const mockCharacter = mockTransformCharactersData[0];
vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('Tests for the Card component', () => {
  const mockStore = configureMockStore();
  const mockDataStore = mockStore(mockInitialState);
  it('Ensure that the card component renders the relevant card data', async () => {
    render(
      <Provider store={mockDataStore}>
        <Card character={mockCharacter} index={0} />
      </Provider>
    );

    const title = await screen.findByText(
      '1992 Gryffindor vs Slytherin Quidditch match spectators'
    );
    expect(title).toBeInTheDocument();
  });
  it('Validate that clicking on a card opens a detailed card component', async () => {
    const index = 1;
    render(
      <Provider store={mockDataStore}>
        <Card character={mockCharacter} index={index} />
      </Provider>
    );
    const card = await screen.findByTestId('card');
    await act(async () => {
      await fireEvent.click(card);
    });
    const genderInformation = await screen.findByText('No one knows');
    expect(genderInformation).toBeInTheDocument;
  });
});


