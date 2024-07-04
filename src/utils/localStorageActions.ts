const storageKey = 'searchTermForHarryPotterDB';

const setSearchTerm = (searchTerm: string): void => {
  searchTerm !== ''
    ? localStorage.setItem(storageKey, searchTerm)
    : localStorage.removeItem(storageKey);
};

const getSearchTerm = (): string | null => localStorage.getItem(storageKey);

export { storageKey, setSearchTerm, getSearchTerm };
