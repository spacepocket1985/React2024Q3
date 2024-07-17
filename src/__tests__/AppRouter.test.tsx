import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../routes/AppRouter';
import { store } from '../store/store';

describe('AppRouter Component', () => {
  it('renders Navigate component on / route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});
