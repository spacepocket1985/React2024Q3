import { useState, useEffect, useCallback } from 'react';

import { SearchBar } from './components/searchBar/SearchBar';
import { CardList } from './components/cardList/CardList';
import { Spinner } from './components/spinner/Spinner';
import { ErrorMessage } from './components/errorMessage/ErrorMessage';
import { AppStateType, ApiResponseType } from './types';
import { PotterDbApi } from './service/potterDbApi';
import { getSearchTerm } from './utils/localStorageActions';

import './App.css';

const App = (): JSX.Element => {
  const [appData, setAppData] = useState<AppStateType>({
    charactersList: [],
  });

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
    const searchTerm = getSearchTerm() || _DefaultFilterWord;
    getCharacters(searchTerm).then(onСharactersListLoaded);
  }, [getCharacters, onСharactersListLoaded, _DefaultFilterWord]);

  useEffect(() => {
    onRequest();
  }, [onRequest]);

  const onSearchSubmit = (): void => {
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
