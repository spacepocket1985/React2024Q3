import { useState, useEffect } from 'react';  

const storageKey = 'searchTermForHarryPotterDB';  

export const useLocalStorage = (): [  
  string | null,  
  React.Dispatch<React.SetStateAction<string | null>>  
] => {  
  const [searchTerm, setSearchTerm] = useState<string | null>(null);  

  // Effect to initialize the state from localStorage when the component mounts in the browser  
  useEffect(() => {  
    const storedTerm = localStorage.getItem(storageKey);  
    setSearchTerm(storedTerm);  
  }, []);  

  // Effect to update localStorage when searchTerm changes  
  useEffect(() => {  
    if (searchTerm !== null) {  
      localStorage.setItem(storageKey, searchTerm);  
    } else {  
      localStorage.removeItem(storageKey); // Optionally remove the item if searchTerm is null  
    }  
  }, [searchTerm]);  

  return [searchTerm, setSearchTerm];  
};