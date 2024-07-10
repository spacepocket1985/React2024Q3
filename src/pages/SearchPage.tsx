import { useState, useEffect, useCallback } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { useLocalStorage } from '../hooks/useLocalStorage';
import { PotterDbApi } from '../service/potterDbApi';
import { CardList } from '../components/cardList/CardList';
import { ErrorMessage } from '../components/errorMessage/ErrorMessage';
import { SearchBar } from '../components/searchBar/SearchBar';
import { Spinner } from '../components/spinner/Spinner';
import { Pagination } from '../components/pagination/Pagination';

import { ApiResponseType, AppStateType } from '../types';

import './App.css';

export const SearchPage = (): JSX.Element => {
  const location = useLocation();

  const [, setSearchParams] = useSearchParams();

  const { getCharacters, loading, error, _DefaultFilterWord, _DefaultPage } =
    PotterDbApi();
  const [searchTerm] = useLocalStorage();

  const [appData, setAppData] = useState<AppStateType>({
    charactersList: [],
    pagination: {
      current: _DefaultPage,
      first: _DefaultPage,
      prev: _DefaultPage,
      next: _DefaultPage,
      last: _DefaultPage,
      records: 0,
    },
    filterWord: searchTerm || _DefaultFilterWord,
  });

  const {
    pagination: { current },
    charactersList,
    pagination,
    filterWord,
  } = appData;

  const onСharactersListLoaded = useCallback(
    (apiResponse: ApiResponseType): void => {
      setAppData((prevAppData) => {
        return {
          ...prevAppData,
          pagination: apiResponse.meta.pagination,
          charactersList: apiResponse.data.map((char) => char),
        };
      });

      setSearchParams({ filter: filterWord, pageNumber: String(current) });
    },
    [setSearchParams, filterWord, current]
  );

  const onRequest = useCallback(() => {
    getCharacters(filterWord, current).then(onСharactersListLoaded);
  }, [filterWord, current, getCharacters, onСharactersListLoaded]);

  const onSearchSubmit = useCallback((searchTerm: string) => {
    setAppData((prevData) => ({
      ...prevData,
      filterWord: searchTerm,
      pagination: { ...prevData.pagination, current: 1 },
    }));
  }, []);

  const onPaginationClick = useCallback((page: number): void => {
    setAppData((prevData) => ({
      ...prevData,
      pagination: { ...prevData.pagination, current: page },
    }));
  }, []);

  useEffect(() => {
    onRequest();
  }, [onRequest]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const filter = searchParams.get('filter');
    const pageNumber = searchParams.get('pageNumber');

    if (filter) {
      setAppData((prevAppData) => ({
        ...prevAppData,
        filterWord: filter,
      }));
    }

    if (pageNumber) {
      setAppData((prevAppData) => ({
        ...prevAppData,
        pagination: {
          ...prevAppData.pagination,
          current: Number(pageNumber),
        },
      }));
    }
  }, [location.search]);

  const content = !(loading || error) ? (
    <div className="contentWrap">
      <CardList charactersList={charactersList} />
    </div>
  ) : null;

  return (
    <div>
      <SearchBar loading={loading} onSearchSubmit={onSearchSubmit} />
      <Pagination
        pagination={pagination}
        onPaginationClick={onPaginationClick}
      />
      {error && <ErrorMessage errorMsg={error} />}
      {loading && <Spinner />}
      {content}
    </div>
  );
};
