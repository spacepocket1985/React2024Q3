import React from 'react';
import { Providers } from './providers';
import '../styles/globals.css';
import { SearchBar } from '../components/searchBar/SearchBar';



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {

  return (
    <html lang="en">
      <body>
        <Providers>
          <SearchBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
