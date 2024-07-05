import { useState, useEffect, useCallback } from 'react';

import { SearchBar } from './components/searchBar/SearchBar';
import { CardList } from './components/cardList/CardList';
import { Spinner } from './components/spinner/Spinner';
import { ErrorMessage } from './components/errorMessage/ErrorMessage';
import { AppStateType, ApiResponseType } from './types';
import { PotterDbApi } from './service/potterDbApi';

import './App.css';
import { useLocalStorage } from './hooks/useLocalStorage';

const App = (): JSX.Element => {
  const [appData, setAppData] = useState<AppStateType>({
    charactersList: [],
  });

  const [searchTerm, setSearchTerm] = useLocalStorage();
  const { getCharacters, loading, error, _DefaultFilterWord } = PotterDbApi();

  const onСharactersListLoaded = useCallback(
    (apiResponse: ApiResponseType): void => {
      setAppData({
        charactersList: apiResponse.data.map((char) => char),
      });
    },
    []
  );

  const onRequest = useCallback(() => {
    getCharacters(searchTerm || _DefaultFilterWord).then(
      onСharactersListLoaded
    );
  }, [getCharacters, onСharactersListLoaded, _DefaultFilterWord, searchTerm]);

  useEffect(() => {
    onRequest();
  }, [onRequest]);

  const onSearchSubmit = (query: string): void => {
    setSearchTerm(query);
    onRequest();
  };

  const { charactersList } = appData;
  const errorMsg = error ? <ErrorMessage errorMsg={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <CardList charactersList={charactersList} />
  ) : null;

  return (
    <>
      <SearchBar onSearchSubmit={onSearchSubmit} />
      {errorMsg}
      {spinner}
      {content}
    </>
  );
};

export default App;
