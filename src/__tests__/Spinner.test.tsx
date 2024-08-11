import { render, screen } from '@testing-library/react';

import { CardList } from '../components/cardList/CardList';
import {store} from '../store/store'
import { Provider } from 'react-redux';
import { expect, it, describe, vi } from 'vitest';

vi.mock('@remix-run/react', () => ({
  useSearchParams: () => [new URLSearchParams(), vi.fn()],
}));

describe('Test for spinner', () => {
  it('Make sure that spinner renders correctly', async() => {

    render(
      <Provider store={store}>
        <CardList />
      </Provider>
    );

    expect(
      screen.getByText(/Loading .../)
    ).toBeInTheDocument();
    const spinner = await screen.findByTestId('spinner');
    expect(spinner).toBeInTheDocument;
  });

});
