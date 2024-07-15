import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const storageKey = 'searchTermForHarryPotterDB';

export const useLocalStorage = (): [
  string | null,
  React.Dispatch<React.SetStateAction<string | null>>
] => {
  const [searchParams] = useSearchParams();

  const filterSearchParam = searchParams.get('filter');
  const [searchTerm, setSearchTerm] = useState(() => {
    return filterSearchParam || localStorage.getItem(storageKey);
  });

  useEffect(() => {
    localStorage.setItem(storageKey, searchTerm || '');
  }, [searchTerm]);

  return [searchTerm, setSearchTerm];
};
