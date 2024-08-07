import React from 'react';
import configureMockStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { CardList } from '../components/cardList/CardList';

import {
  mockInitialState,
  mockTransformCharactersData,
} from './mocks/mocksData';
import { Providers } from '../app/providers';

//vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('Tests for the CardList component', () => {
  const mockStore = configureMockStore();
  const mockDataStore = mockStore(mockInitialState);

  // Мокируем модуль 'next/navigation', чтобы избежать реальной функциональности маршрутизации во время тестов.  
  vi.mock('next/navigation', () => ({  
    useRouter: vi.fn(() => ({ // Мокируем хук useRouter, чтобы он возвращал пустую функцию.  
      push: vi.fn(), // Мокируем метод push для программной навигации.  
    })),  
    useSearchParams: vi.fn(() => ({ // Мокируем хук useSearchParams, обычно используемый для получения параметров запроса.  
      get: vi.fn(), // Мокируем метод get для симуляции получения значений из параметров запроса.  
    })),  
  })); 

  it('Check that an appropriate message is displayed if no cards are present', () => {
    render(
      <Providers>
        <CardList сharacters={[]} />
      </Providers>
    );
    expect(
      screen.getByText('No characters found for your last request!')
    ).toBeInTheDocument();
  });

  it('Verify that the component renders the specified number of cards', async () => {
    render(
      <Provider store={mockDataStore}>
        <CardList сharacters={mockTransformCharactersData} />
      </Provider>
    );
    const cards = await screen.findAllByTestId('card');
    const cardSpanElements = await screen.getAllByText(/Gender -/i);

    expect(cards.length).toBe(mockInitialState.characters.characterList.length);
    expect(cardSpanElements).toHaveLength(
      mockInitialState.characters.characterList.length
    );
  });
});
