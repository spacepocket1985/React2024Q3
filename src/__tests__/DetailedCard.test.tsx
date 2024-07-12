import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { CardDetails } from '../components/cardDetails/CardDetails';
import { responseDataForChar } from './mocs/responseData';

describe('Tests for the CardList component', () => {
  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    vitest.mock('../service/potterDbApi', () => ({
      PotterDbApi: vitest.fn(() => ({
        getCharacter: vitest.fn().mockResolvedValue(responseDataForChar),
        getCharacters: vitest.fn(),
        loading: false,
        error: '',
        clearError: vitest.fn(),
        _DefaultFilterWord: '',
        _DefaultOffset: '',
        _DefaultPage: 1,
      })),
    }));

    render(
      <Router>
        <CardDetails
          characterId={responseDataForChar.data.id}
          onHideCardDetails={function (): void {}}
          cardDetails={'0'}
        />
      </Router>
    );

    expect(
      screen.getByText(
        '1992 Gryffindor vs Slytherin Quidditch match spectators'
      )
    ).toBeInTheDocument();
  });
});
