import { render, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { CardList } from '../components/cardList/CardList';
import { mockInitialState } from './mocks/mocksData';
import { Provider } from 'react-redux';
import { store } from '../store/store';

describe('Tests for the CardList component', () => {
  it('Check that an appropriate message is displayed if no cards are present', () => {
    render(
      <Router>
        <Provider store={store}>
          <CardList />
        </Provider>
      </Router>
    );

    expect(
      screen.getByText('No characters found for your last request!')
    ).toBeInTheDocument();
  });
  it('Verify that the component renders the specified number of cards', async () => {
    const mockStore = configureMockStore();
    const mockDataStore = mockStore(mockInitialState);
    render(
      <Router>
        <Provider store={mockDataStore}>
          <CardList />
        </Provider>
      </Router>
    );
    const cards = await screen.findAllByTestId('card');
    const cardSpanElements = await screen.getAllByText(/Gender -/i);

    expect(cards.length).toBe(mockInitialState.characters.characterList.length);
    expect(cardSpanElements).toHaveLength(
      mockInitialState.characters.characterList.length
    );
  });
});
