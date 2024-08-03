// app/providers.tsx
'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../context/ThemeContext';
import { store } from '../store/store';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';

export function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ChakraProvider>
      <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>{children}</ThemeProvider>
      </Provider>
      </ErrorBoundary>
    </ChakraProvider>
  );
}
