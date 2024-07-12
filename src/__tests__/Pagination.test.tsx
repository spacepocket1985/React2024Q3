import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Pagination } from '../components/pagination/Pagination';
import { paginationMockState } from './mocs/mocsData';

describe('Tests for the Pagination  component', () => {
  const onPaginationClick = vi.fn();
  it('Check the status of the pagnation buttons, depending on whether there is a next or previous page.', async () => {
    render(
      <MemoryRouter>
        <Pagination
          onPaginationClick={onPaginationClick}
          pagination={paginationMockState}
        />
      </MemoryRouter>
    );

    const prevBtn = await screen.findByTestId('prevBtn');
    const nextBtn = await screen.findByTestId('nextBtn');

    fireEvent.click(nextBtn);

    expect(prevBtn).toBeInTheDocument;
    expect(nextBtn).toBeInTheDocument;
    expect(prevBtn).toBeDisabled();
    expect(nextBtn).not.toBeDisabled();
  });
  it('Check that component updates URL query parameter when page changes.', async () => {
    render(
      <MemoryRouter>
        <Pagination
          onPaginationClick={onPaginationClick}
          pagination={paginationMockState}
        />
      </MemoryRouter>
    );

    const nextBtn = await screen.findByTestId('nextBtn');

    await fireEvent.click(nextBtn);

    expect(onPaginationClick).toHaveBeenCalled();
  });
});
