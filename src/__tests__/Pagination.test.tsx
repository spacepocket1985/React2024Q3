import { render, screen } from '@testing-library/react';
import { it, expect } from 'vitest';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

import { Pagination } from '../components/pagination/Pagination';
import { storeInstance } from '../store/store';

it('Check for the presence of pagination elements ', async () => {
  render(
    <Provider store={storeInstance}>
      <Pagination
        pagination={{
          current: 3,
          first: 1,
          prev: 1,
          next: 4,
          last: 4,
          records: 400,
        }}
      />
    </Provider>
  );

  const prevBtn = await screen.findByTestId('prevBtn');
  const nextBtn = await screen.findByTestId('nextBtn');
  const informer = await screen.findByTestId('informer');

  expect(prevBtn).toBeInTheDocument;
  expect(nextBtn).toBeInTheDocument;
  expect(informer).toBeInTheDocument;

  await expect(informer.textContent).toBe('3');
});
