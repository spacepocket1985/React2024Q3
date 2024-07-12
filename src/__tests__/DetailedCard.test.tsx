import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { CardDetails } from '../components/cardDetails/CardDetails';
import { responseDataForChar } from './mocs/mocsData';
import { PotterDbApiReturnType } from '../types';

describe('Tests for the CardList component', () => {
  it('Check that a loading indicator is displayed while fetching data;', async () => {
    vitest.mock('../service/potterDbApi', () => ({
      PotterDbApi: vitest.fn(
        (): PotterDbApiReturnType => ({
          getCharacter: vitest
            .fn()
            .mockResolvedValueOnce(responseDataForChar.data),
          getCharacters: vitest.fn(),
          loading: true,
          error: '',
          clearError: vitest.fn(),
          _DefaultFilterWord: '',
          _DefaultOffset: '',
          _DefaultPage: 1,
        })
      ),
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
    expect(screen.getByText('Loading ...')).toBeInTheDocument();
  });
  /*it('Ensure that clicking the close button hides the component', async () => {
    const onHideCardDetails = vi.fn();
    vitest.mock('../service/potterDbApi', () => ({
      PotterDbApi: vitest.fn(
        (): PotterDbApiReturnType => ({
          getCharacter: vitest
            .fn()
            .mockResolvedValueOnce(responseDataForChar.data),
          getCharacters: vitest.fn(),
          loading: false,
          error: '',
          clearError: vitest.fn(),
          _DefaultFilterWord: '',
          _DefaultOffset: '',
          _DefaultPage: 1,
        })
      ),
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
   
    const closeBtn = await screen.findByTestId('closeDetailsBtn');
    await act(async () => {
      await fireEvent.click(closeBtn);
    });
    console.log(closeBtn)
    //expect(onHideCardDetails).toHaveBeenCalledTimes(1);
  });*/
});
