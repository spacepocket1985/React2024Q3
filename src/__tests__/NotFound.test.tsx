import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';
import NotFound from '../app/not-found';


describe('404 Page component:', () => {
  it('Ensure that the 404 page is displayed', () => {
    render(<NotFound />);

    const messageElement = screen.getByText('page not found');
    expect(messageElement).toBeInTheDocument();
  });
});
