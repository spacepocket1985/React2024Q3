import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../routes/AppRouter';

describe('AppRouter Component', () => {
  it('renders Navigate component on / route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});
