import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Page404 } from 'src/pages/Page404';

import { describe, expect, it } from 'vitest';



describe('404 Page component:', () => {
  it('Ensure that the 404 page is displayed', () => {
    render(<Page404 />);

    const messageElement = screen.getByText('page not found');
    expect(messageElement).toBeInTheDocument();
  });
});