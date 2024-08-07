import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import '@testing-library/jest-dom';
import { Card } from '../components/card/Card';
import { mockTransformCharactersData } from './mocks/mocksData';
import { Providers } from '../app/providers';

const mockCharacter = mockTransformCharactersData[0];
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
  useSearchParams: vi.fn(() => ({
    get: vi.fn(),
  })),
}));

describe('Tests for the Card component', () => {
  it('Ensure that the card component renders the relevant card data', async () => {
    render(
      <Providers>
        <Card character={mockCharacter} index={0} />
      </Providers>
    );

    const title = await screen.findByText(
      '1992 Gryffindor vs Slytherin Quidditch match spectators'
    );
    expect(title).toBeInTheDocument();
  });
  it('Validate that clicking on a card opens a detailed card component', async () => {
    const index = 1;
    render(
      <Providers>
        <Card character={mockCharacter} index={index} />
      </Providers>
    );
    const card = await screen.findByTestId('card');
    await act(async () => {
      await fireEvent.click(card);
    });
    const genderInformation = await screen.findByText('No one knows');
    expect(genderInformation).toBeInTheDocument;
  });
});
