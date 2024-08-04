'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

type ContextProviderPropsType = {
  children: ReactNode;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = (props: ContextProviderPropsType): JSX.Element => {
  const [theme, setTheme] = useState<Theme>('light');
  const { children } = props;
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ChakraProvider>
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`${theme} base`}>{children}</div>
    </ThemeContext.Provider>
    </ChakraProvider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
