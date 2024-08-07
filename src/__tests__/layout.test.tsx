import React from 'react';
import RootLayout from '../app/layout';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';

describe('Test for app layout', () => {
  vi.mock('next/navigation', () => ({
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })), //
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
    })),
  }));
  it('Make sure that children renders correctly', async () => {
    render(
      <RootLayout>
        <h2>Hello world!</h2>
      </RootLayout>
    );

    expect(screen.getByText('Hello world!')).toBeInTheDocument();
  });
});
