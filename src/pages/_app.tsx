import React from 'react';  
import type { AppProps } from 'next/app';  
import { wrapper } from '../store/store';   
import { ThemeProvider } from '../context/ThemeContext';  
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';  
import '../styles/globals.css';  

const MyApp = ({ Component, pageProps }: AppProps): React.JSX.Element => {  
  
  return (  
    <ErrorBoundary>  
      <ThemeProvider>  
        <Component {...pageProps} />  
      </ThemeProvider>  
    </ErrorBoundary>  
  );  
};  

export default wrapper.withRedux(MyApp);