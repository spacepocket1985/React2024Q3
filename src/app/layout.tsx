import React from 'react';
import { Providers } from './providers';
import '../styles/globals.css';
import { SearchBar } from '../components/searchBar/SearchBar';
import { ThemeSwitcher } from '../components/themeSwitcher/ThemeSwitcher';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <Providers>
            <SearchBar />
            <ThemeSwitcher />
            {children}
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
