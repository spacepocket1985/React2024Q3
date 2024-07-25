import React from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';

import { ThemeProvider } from '../context/ThemeContext';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';

import { store } from '../store/store';

import '../styles/globals.css';



const MyApp = ({ Component, pageProps }: AppProps): React.JSX.Element => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default MyApp;
