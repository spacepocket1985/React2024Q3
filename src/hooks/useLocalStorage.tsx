'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const storageKey = 'searchTermForHarryPotterDB';

export const useLocalStorage = (): [
  string | null,
  React.Dispatch<React.SetStateAction<string | null>>
] => {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const router = useRouter();
  const [hasNavigated, setHasNavigated] = useState(false); // Флаг для отслеживания навигации

  useEffect(() => {
    const storedValue = localStorage.getItem(storageKey);
    setSearchTerm(storedValue);
  }, []);

  // Навигация при первом рендере на основе searchTerm
  useEffect(() => {
    if (searchTerm !== null && !hasNavigated) {
      router.push(`/?pageNum=1&filter=${searchTerm}`);
      setHasNavigated(true); // Установите флаг после навигации
    }
  }, [searchTerm, hasNavigated, router]);

  useEffect(() => {
    if (searchTerm !== null) {
      localStorage.setItem(storageKey, searchTerm || '');
    }
  }, [searchTerm]);

  return [searchTerm, setSearchTerm];
};
