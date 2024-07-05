import { useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { CardList } from '../components/cardList/CardList';
import { ErrorMessage } from '../components/errorMessage/ErrorMessage';
import { SearchBar } from '../components/searchBar/SearchBar';
import { Spinner } from '../components/spinner/Spinner';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { PotterDbApi } from '../service/potterDbApi';
import { ApiResponseType, AppStateType } from '../types';

import './App.css';

export const SearchPage = (): JSX.Element => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const pageNumber = params.get('pageNumber');
  const filterWord = params.get('filter');

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
    <div>
      <h2>Search Page</h2>
      <p>Page Number: {pageNumber}</p>
      <p>Filter Word: {filterWord}</p>

      <SearchBar onSearchSubmit={onSearchSubmit} />
      {errorMsg}
      {spinner}
      {content}
    </div>
  );
};
