'use client';  
import { useState, useEffect } from 'react';  

const storageKey = 'searchTermForHarryPotterDB';  

export const useLocalStorage = (): [  
  string | null,  
  React.Dispatch<React.SetStateAction<string | null>>  
] => {  
  const [searchTerm, setSearchTerm] = useState<string | null>(null);  

  useEffect(() => {  
    const storedValue = localStorage.getItem(storageKey);  
    setSearchTerm(storedValue);  
  }, []);  

  useEffect(() => {  
    if (searchTerm !== null) {  
      localStorage.setItem(storageKey, searchTerm || '');  
    }  
  }, [searchTerm]);  

  return [searchTerm, setSearchTerm];  
};