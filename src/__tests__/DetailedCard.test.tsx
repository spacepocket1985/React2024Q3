import React from 'react';

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';

import { mockTransformCharactersData } from './mocks/mocksData';
import { CardDetails } from '../components/cardDetails/cardDetails';

import { Providers } from '../app/providers';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
  useSearchParams: vi.fn(() => ({
    get: vi.fn(),
  })),
}));

describe('Tests for the CardDetails component', () => {
  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    render(
      <Providers>
        <CardDetails character={mockTransformCharactersData[2]} />
      </Providers>
    );
    const characterCardTitle = await screen.findByText(/Character details/);
    expect(characterCardTitle).toBeInTheDocument;
    expect(characterCardTitle).toBeInTheDocument;
    const characterName = await screen.findByText(
      mockTransformCharactersData[2].attributes.name
    );
    expect(characterName).toBeInTheDocument;
  });
});
