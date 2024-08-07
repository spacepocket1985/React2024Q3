'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const storageKey = 'searchTermForHarryPotterDB';

export const useLocalStorage = (): [
  string | null,
  React.Dispatch<React.SetStateAction<string | null>>
] => {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const router = useRouter();
  const [hasNavigated, setHasNavigated] = useState(false); // Флаг для отслеживания навигации

  const searchParams = useSearchParams();

  useEffect(() => {
    const storedValue = localStorage.getItem(storageKey);
    setSearchTerm(storedValue);
  }, []);

  useEffect(() => {
    if (searchTerm !== null && !hasNavigated) {
      const filter = searchParams.get('filter');
      const pageNum = searchParams.get('pageNum');
      router.push(`/?pageNum=${pageNum || 1}&filter=${filter || searchTerm}`);
      setHasNavigated(true);
    }
  }, [searchTerm, hasNavigated, router, searchParams]);

  useEffect(() => {
    if (searchTerm !== null) {
      localStorage.setItem(storageKey, searchTerm || '');
    }
  }, [searchTerm]);

  return [searchTerm, setSearchTerm];
};
