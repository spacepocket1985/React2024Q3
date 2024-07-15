import { act, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Card } from '../components/card/Card';
import { responseData } from './mocs/mocsData';

const mockCharacter = responseData.data[0];

describe('Tests for the Card component', () => {
  it('Ensure that the card component renders the relevant card data', async () => {
    render(
      <Router>
        <Card
          character={mockCharacter}
          index={0}
          onCardClick={function (): void {}}
        />
      </Router>
    );

    const title = await screen.findByText(
      '1992 Gryffindor vs Slytherin Quidditch match spectators'
    );
    expect(title).toBeInTheDocument();
  });
  it('Validate that clicking on a card opens a detailed card component', async () => {
    const onCardClick = vi.fn();
    const index = 1;
    render(
      <Router>
        <Card
          character={mockCharacter}
          index={index}
          onCardClick={onCardClick}
        />
      </Router>
    );
    const card = await screen.findByTestId('card');
    await act(async () => {
      await fireEvent.click(card);
    });
    const genderInformation = await screen.findByText('No one knows');
    expect(onCardClick).toHaveBeenCalledTimes(1);
    expect(onCardClick).toHaveBeenCalledWith(index);
    expect(genderInformation).toBeInTheDocument;
  });
});
