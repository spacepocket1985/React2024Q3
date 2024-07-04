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
    isLoading: false,
    error: '',
  });

  const { _DefaultOffset, _DefaultFilterWord, _DefaultPage, getCharacters } =
    PotterDbApi();

  const onСharactersListLoaded = useCallback(
    (apiResponse: ApiResponseType): void => {
      setAppData({
        ...appData,
        charactersList: apiResponse.data.map((char) => char),
        isLoading: false,
        error: '',
      });
    },
    [appData]
  );

  const onError = useCallback(
    (error: Error): void => {
      setAppData({ ...appData, isLoading: false, error: error.message });
    },
    [appData]
  );

  const onRequest = useCallback(
    (offset?: string, page?: string, filter = ''): void => {
      setAppData({ ...appData, isLoading: true });

      getCharacters(offset, page, filter)
        .then(onСharactersListLoaded)
        .catch(onError);
    },
    [appData, getCharacters, onError, onСharactersListLoaded]
  );

  useEffect(() => {
    const searchTerm = getSearchTerm();
    onRequest(_DefaultOffset, _DefaultPage, searchTerm || _DefaultFilterWord);
  }, [_DefaultFilterWord, _DefaultOffset, _DefaultPage, onRequest]);

  const onSearchSubmit = (searchTerm: string): void => {
    onRequest(_DefaultOffset, _DefaultPage, searchTerm);
  };

  const { charactersList, error, isLoading } = appData;
  const errorMsg = error ? <ErrorMessage errorMsg={error} /> : null;
  const spinner = isLoading ? <Spinner /> : null;
  const content = !(isLoading || error) ? (
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
