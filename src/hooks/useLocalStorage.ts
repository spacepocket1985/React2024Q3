import { useState, useEffect } from 'react';

const storageKey = 'searchTermForHarryPotterDB';

export const useLocalStorage = (): [
  string | null,
  React.Dispatch<React.SetStateAction<string | null>>
] => {
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem(storageKey);
  });

  useEffect(() => {
    localStorage.setItem(storageKey, searchTerm || '');
  }, [searchTerm]);

  return [searchTerm, setSearchTerm];
};
