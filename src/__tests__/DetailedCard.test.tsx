import { act, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

import {
  responseDataForChar,
  responseDataForCharSecond,
} from './mocs/mocsData';
import { PotterDbApiReturnType } from '../types';
import { CardDetails } from '../components/cardDetails/CardDetails';

describe('Tests for the CardList component', () => {
  const onHideCardDetails = vi.fn();

  it('Check that a loading indicator is displayed while fetching data;', async () => {
    vitest.mock('../../service/potterDbApi', () => ({
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
          cardDetails={'1'}
        />
      </Router>
    );
    expect(screen.getByText('Loading ...')).toBeInTheDocument();
    expect(screen.queryByTestId('spinner')).not.toBeNull();
    expect(screen.queryByTestId('errorMessage')).toBeNull();
  });
  it('Ensure that clicking the close button hides the component', async () => {
    vitest.mock('../../service/potterDbApi', () => ({
      PotterDbApi: vitest.fn(
        (): PotterDbApiReturnType => ({
          getCharacter: vitest
            .fn()
            .mockResolvedValueOnce(responseDataForCharSecond.data),
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
});
