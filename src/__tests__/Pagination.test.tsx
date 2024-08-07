import { fireEvent, render, screen } from '@testing-library/react';
import { it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

import { Pagination } from '../components/pagination/Pagination';
import { Providers } from '../app/providers';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: mockPush,
  })),
  useSearchParams: vi.fn(() => ({
    get: vi.fn(),
  })),
}));
it('Check for the presence of pagination elements ', async () => {
  render(
    <Providers>
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
    </Providers>
  );

  const prevBtn = await screen.findByTestId('prevBtn');
  const nextBtn = await screen.findByTestId('nextBtn');
  const informer = await screen.findByTestId('informer');

  expect(prevBtn).toBeInTheDocument;
  expect(nextBtn).toBeInTheDocument;
  expect(informer).toBeInTheDocument;

  await expect(informer.textContent).toBe('3');

  await fireEvent.click(nextBtn);
  expect(mockPush).toHaveBeenCalledWith('/?pageNum=4&filter=');
});
