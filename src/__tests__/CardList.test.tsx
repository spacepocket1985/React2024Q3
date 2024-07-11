import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { CardList } from '../components/cardList/CardList';
import { responseData } from './mocs/responseData';

describe('Tests for the CardList component', () => {
  it('Check that an appropriate message is displayed if no cards are present', () => {
    render(
      <Router>
        <CardList charactersList={[]} onCardClick={function (): void {}} />
      </Router>
    );

    expect(
      screen.getByText('No characters found for your last request!')
    ).toBeInTheDocument();
  });
  it('Verify that the component renders the specified number of cards', async () => {
    const mockCharacters = responseData.data;
    render(
      <Router>
        <CardList
          charactersList={mockCharacters}
          onCardClick={function (): void {}}
        />
      </Router>
    );
    const cards = await screen.findAllByTestId('card');
    const cardSpanElements = await screen.getAllByText(/Gender -/i);

    expect(cards.length).toBe(mockCharacters.length);
    expect(cardSpanElements).toHaveLength(mockCharacters.length);
  });
});
