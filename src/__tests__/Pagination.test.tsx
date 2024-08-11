import { fireEvent, render, screen } from '@testing-library/react';
import { it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

import { Pagination } from '../components/pagination/Pagination';
import { Providers } from '../../app/providers';

const setSearchParamsMock = vi.fn();
vi.mock('@remix-run/react', () => ({
  useSearchParams: () => [new URLSearchParams(), setSearchParamsMock],
}));

it('Check for the presence of pagination elements ', async () => {
  render(
    <Providers>
      <Pagination />
    </Providers>
  );

  const prevBtn = await screen.findByTestId('prevBtn');
  const nextBtn = await screen.findByTestId('nextBtn');
  const informer = await screen.findByTestId('informer');

  expect(prevBtn).toBeInTheDocument;
  expect(nextBtn).toBeInTheDocument;
  expect(informer).toBeInTheDocument;

  await expect(informer.textContent).toBe('1');

  await fireEvent.click(nextBtn);
  expect(setSearchParamsMock).toHaveBeenCalledWith({
    filter: '',
    pageNum: '2',
  });
});
