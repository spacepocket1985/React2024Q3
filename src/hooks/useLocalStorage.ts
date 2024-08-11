import { useState, useEffect } from 'react';  
import { useRouter } from 'next/router';  

const storageKey = 'searchTermForHarryPotterDB';  

export const useLocalStorage = (): [  
  string | null,  
  React.Dispatch<React.SetStateAction<string | null>>  
] => {  
  const router = useRouter();  
  const { query } = router;  

  const filterSearchParam = query.filter as string;  

  const [searchTerm, setSearchTerm] = useState<string | null>(() => {  
    
    if (typeof window !== 'undefined') {  
      return filterSearchParam || localStorage.getItem(storageKey);  
    }  
    return null; 
  });  

  useEffect(() => {  
    
    if (typeof window !== 'undefined') {  
      localStorage.setItem(storageKey, searchTerm || '');  
    }  
  }, [searchTerm]);  

  return [searchTerm, setSearchTerm];  
};