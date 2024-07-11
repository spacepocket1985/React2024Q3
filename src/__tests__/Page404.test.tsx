import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Page404 } from '../pages/Page404';

describe('404 Page component:', () => {
  it('Ensure that the 404 page is displayed when navigating to an invalid route', () => {
    render(
      <MemoryRouter initialEntries={['/invalid-route']}>
        <Page404 />
      </MemoryRouter>
    );

    const messageElement = screen.getByText('page not found');
    expect(messageElement).toBeInTheDocument();
  });
});
