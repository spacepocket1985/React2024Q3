import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { Spinner } from '@chakra-ui/react';

describe('Test for spinner', () => {
  it('Make sure that spinner renders correctly', () => {
    render(<Spinner/>);

    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });
});