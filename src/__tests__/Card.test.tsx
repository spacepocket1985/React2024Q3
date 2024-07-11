import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Card } from '../components/card/Card';
import { responseData } from './mocs/responseData';
import { SearchPage } from '../pages/SearchPage';

describe('Tests for the Card component', () => {
  it('Ensure that the card component renders the relevant card data', async () => {
    const mockCharacter = responseData.data[0];
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
    // const initialState = {
    //   appData: {
    //     charactersList: responseData.data,
    //     pagination: {
    //       current: 1,
    //       first: 1,
    //       prev: 1,
    //       next: 1,
    //       last: 1,
    //       records: 15,
    //     },
    //     filterWord: '',
    //     cardDetails: '',
    //   },
    // };
    render(
      <Router>
        <SearchPage />
      </Router>
    );
  });
});
