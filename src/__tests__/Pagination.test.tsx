import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Pagination } from '../components/pagination/Pagination';
import { paginationMockState } from './mocs/mocsData';

describe('Tests for the Pagination  component', () => {
  const onPaginationClick = vi.fn();
  it('Check the status of the pagnation buttons, depending on whether there is a next or previous page.', async () => {
    render(
      <BrowserRouter>
        <Pagination
          onPaginationClick={onPaginationClick}
          pagination={paginationMockState}
        />
      </BrowserRouter>
    );

    const prevBtn = await screen.findByTestId('prevBtn');
    const nextBtn = await screen.findByTestId('nextBtn');

    fireEvent.click(nextBtn);

    expect(prevBtn).toBeInTheDocument;
    expect(nextBtn).toBeInTheDocument;
    expect(prevBtn).toBeDisabled();
    expect(nextBtn).not.toBeDisabled();
  });
  it('Check that function onPaginationClick is called when the pagination button is clicked.', async () => {
    render(
      <BrowserRouter>
        <Pagination
          onPaginationClick={onPaginationClick}
          pagination={paginationMockState}
        />
      </BrowserRouter>
    );

    const nextBtn = await screen.findByTestId('nextBtn');

    await fireEvent.click(nextBtn);

    expect(onPaginationClick).toHaveBeenCalled();
  });
});
