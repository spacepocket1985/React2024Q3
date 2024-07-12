import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { CardDetails } from '../components/cardDetails/CardDetails';
import { responseData } from './mocs/responseData';
import { PotterDbApi } from '../service/potterDbApi';
import { PotterDbApiReturnType } from '../types';

describe('Tests for the CardList component', () => {
  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    const mockCharacter = responseData.data[0];
    vitest.mock('../../service/potterDbApi', () => ({
      PotterDbApi: vitest.fn(),
    }));
    const mockPotterDbApi: PotterDbApiReturnType = PotterDbApi();
    mockPotterDbApi.getCharacter = vitest
      .fn()
      .mockResolvedValue({ data: mockCharacter });
    //mockPotterDbApi.loading = vitest.fn().mockResolvedValue({loading: false})

    vitest.mock('../../service/potterDbApi', () => mockPotterDbApi);
    render(
      <Router>
        <CardDetails
          characterId={mockCharacter.id}
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
