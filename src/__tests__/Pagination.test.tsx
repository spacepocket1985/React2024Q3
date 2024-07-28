import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { store } from '../store/store';
import { Pagination } from '../components/pagination/Pagination';

it('Check for the presence of pagination elements and update the informer after clicking the NextButton/PrevButton', async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Pagination />
      </Provider>
    </BrowserRouter>
  );

  const prevBtn = await screen.findByTestId('prevBtn');
  const nextBtn = await screen.findByTestId('nextBtn');
  const informer = await screen.findByTestId('informer');

  expect(prevBtn).toBeInTheDocument;
  expect(nextBtn).toBeInTheDocument;
  expect(informer).toBeInTheDocument;

  await fireEvent.click(nextBtn);
  expect(informer.textContent).toBe('2');

  await fireEvent.click(prevBtn);
  expect(informer.textContent).toBe('1');
});
