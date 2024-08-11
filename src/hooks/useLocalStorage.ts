import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from '@remix-run/react';

const storageKey = 'searchTermForHarryPotterDB';

export const useLocalStorage = (): [
  string | null,
  React.Dispatch<React.SetStateAction<string | null>>
] => {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [hasNavigated, setHasNavigated] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const storedTerm = localStorage.getItem(storageKey);
    setSearchTerm(storedTerm);
  }, []);

  useEffect(() => {
    if (searchTerm !== null && !hasNavigated) {
      const filter = searchParams.get('filter');
      const pageNum = searchParams.get('pageNum');
      setSearchParams({
        filter: filter || searchTerm,
        pageNum: pageNum || '1',
      });

      setHasNavigated(true);
    }
  }, [searchTerm, hasNavigated, searchParams]);


  useEffect(() => {
    if (searchTerm !== null) {
      localStorage.setItem(storageKey, searchTerm);
    }
  }, [searchTerm]);

  return [searchTerm, setSearchTerm];
};
