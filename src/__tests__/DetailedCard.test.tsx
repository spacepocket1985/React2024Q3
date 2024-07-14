import { act, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

import { responseDataForChar } from './mocs/mocsData';

import { CardDetails } from '../components/cardDetails/CardDetails';

describe('Tests for the CardList component', () => {
  const onHideCardDetails = vi.fn();

  const mockResponse = {
    ok: true,
    statusText: 'OK',
    json: async () => responseDataForChar,
  } as Response;
  globalThis.fetch = vi.fn().mockResolvedValue(mockResponse);

  it('Check that a loading indicator is displayed while fetching data;', async () => {
    render(
      <Router>
        <CardDetails
          characterId={responseDataForChar.data.id}
          onHideCardDetails={onHideCardDetails}
          cardDetails={'1'}
        />
      </Router>
    );
    expect(screen.getByText('Loading ...')).toBeInTheDocument();
    expect(screen.queryByTestId('spinner')).not.toBeNull();
    expect(screen.queryByTestId('errorMessage')).toBeNull();
  });
  it('Check detailed info', async () => {
    render(
      <Router>
        <CardDetails
          characterId={responseDataForChar.data.id}
          onHideCardDetails={onHideCardDetails}
          cardDetails={'1'}
        />
      </Router>
    );

    const charName = await screen.findByText(
      /1992 Gryffindor vs Slytherin Quidditch match spectators/
    );
    const detailedCardTitle = await screen.findByText(/Character details - 1/);
    expect(charName).toBeInTheDocument();
    expect(detailedCardTitle).toBeInTheDocument();

    expect(screen.queryByTestId('errorMessage')).toBeNull();
  });
  it('Ensure that clicking the close button hides the component', async () => {
    render(
      <Router>
        <CardDetails
          characterId={responseDataForChar.data.id}
          onHideCardDetails={onHideCardDetails}
          cardDetails={'1'}
        />
      </Router>
    );

    const closeBtn = await screen.findByTestId('closeDetailsBtn');
    await act(async () => {
      await fireEvent.click(closeBtn);
    });

    expect(onHideCardDetails).toHaveBeenCalledTimes(1);
  });
  // it('new test Api',async ()=>{
  //   vitest.mock('../../service/potterDbApi', () => ({
  //     PotterDbApi: vitest.fn(
  //       (): PotterDbApiReturnType => ({
  //         getCharacter: vitest
  //           .fn()
  //           .mockResolvedValueOnce(responseDataForChar.data),
  //         getCharacters: vitest.fn(),
  //         loading: true,
  //         error: '',
  //         clearError: vitest.fn(),
  //         _DefaultFilterWord: '',
  //         _DefaultOffset: '',
  //         _DefaultPage: 1,
  //       })
  //     ),
  //   }));
  //   render(
  //     <Router>
  //       <CardDetails
  //         characterId={responseDataForChar.data.id}
  //         onHideCardDetails={onHideCardDetails}
  //         cardDetails={'1'}
  //       />
  //     </Router>
  //   );
  //   await waitFor(() => {
  //     expect(PotterDbApi().getCharacter).toHaveBeenCalledTimes(2); // Expect the getCharacter function to be called twice

  //   });
  // })
});
