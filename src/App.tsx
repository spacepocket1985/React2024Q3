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

  const { getCharacters, loading, error } = PotterDbApi();

  const onСharactersListLoaded = useCallback(
    (apiResponse: ApiResponseType): void => {
      setAppData({
        charactersList: apiResponse.data.map((char) => char),
      });
    },
    []
  );

  const onRequest = useCallback(
    (query: string): void => {
      getCharacters(query).then(onСharactersListLoaded);
    },
    [getCharacters, onСharactersListLoaded]
  );

  useEffect(() => {
    const _DefaultFilterWord = '';
    const searchTerm = getSearchTerm();

    onRequest(searchTerm || _DefaultFilterWord);
  }, [onRequest]);

  const onSearchSubmit = (searchTerm: string): void => {
    onRequest(searchTerm);
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
