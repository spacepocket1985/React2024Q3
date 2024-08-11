import { render, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';

import { CardList } from '../components/cardList/CardList';
import { mockInitialState, mockInitialState2 } from './mocks/mocksData';
import { Provider } from 'react-redux';
import { expect, it, describe, vi } from 'vitest';

vi.mock('@remix-run/react', () => ({
  useSearchParams: () => [new URLSearchParams(), vi.fn()],
}));

describe('Tests for the CardList component', () => {
  it('Check that an appropriate message is displayed if no cards are present', () => {
    const mockStore = configureMockStore();
    const mockDataStore = mockStore(mockInitialState2);
    render(
      <Provider store={mockDataStore}>
        <CardList />
      </Provider>
    );

    expect(
      screen.getByText(/No characters found for your last request!/)
    ).toBeInTheDocument();
  });
  it('Verify that the component renders the specified number of cards', async () => {
    const mockStore = configureMockStore();
    const mockDataStore = mockStore(mockInitialState);
    render(
      <Provider store={mockDataStore}>
        <CardList />
      </Provider>
    );
    const cards = await screen.findAllByTestId('card');
    const cardSpanElements = await screen.getAllByText(/Gender -/i);

    expect(cards.length).toBe(mockInitialState.characters.characterList.length);
    expect(cardSpanElements).toHaveLength(
      mockInitialState.characters.characterList.length
    );
  });
});
