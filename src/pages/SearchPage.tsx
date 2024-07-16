import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useLocalStorage } from '../hooks/useLocalStorage';
import { PotterDbApi } from '../service/potterDbApi';
import { CardList } from '../components/cardList/CardList';
import { ErrorMessage } from '../components/errorMessage/ErrorMessage';
import { SearchBar } from '../components/searchBar/SearchBar';
import { Spinner } from '../components/spinner/Spinner';
import { Pagination } from '../components/pagination/Pagination';

import { ApiResponseType, AppStateType } from '../types';

import styles from './SearchPage.module.css';
import { CardDetails } from '../components/cardDetails/cardDetails';
import {
  useGetAllCharactersQuery,
  useGetCharacterQuery,
} from '../store/slices/ApiSlice';

export const SearchPage = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumberSearchParam = searchParams.get('pageNumber');
  const detailsSearchParam = searchParams.get('details');

  const { data } = useGetCharacterQuery('17333532-5d00-4b71-b8b1-8e762a12c793');
  console.log(data);

  const { getCharacters, loading, error, _DefaultFilterWord, _DefaultPage } =
    PotterDbApi();
  const [searchTerm] = useLocalStorage();

  const [appData, setAppData] = useState<AppStateType>({
    charactersList: [],
    pagination: {
      current: Number(pageNumberSearchParam) || _DefaultPage,
      first: _DefaultPage,
      prev: _DefaultPage,
      next: _DefaultPage,
      last: _DefaultPage,
      records: 0,
    },
    filterWord: searchTerm || _DefaultFilterWord,
    cardDetails: detailsSearchParam || '',
  });

  const {
    pagination: { current },
    charactersList,
    pagination,
    filterWord,
    cardDetails,
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
    },
    []
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

  const onCardClick = useCallback((index: number) => {
    setAppData((prevData) => ({
      ...prevData,
      cardDetails: String(index),
    }));
  }, []);

  const onHideCardDetails = () => {
    setAppData((prevData) => ({
      ...prevData,
      cardDetails: _DefaultFilterWord,
    }));
  };

  useEffect(() => {
    onRequest();
  }, [onRequest]);

  useEffect(() => {
    setSearchParams({
      filter: filterWord,
      pageNumber: String(current),
      details: charactersList[Number(cardDetails) - 1]
        ? String(cardDetails)
        : '',
    });
  }, [
    filterWord,
    current,
    cardDetails,
    setSearchParams,
    charactersList,
    _DefaultFilterWord,
  ]);

  const content = !(loading || error) ? (
    <div className={styles.contentWrap}>
      <CardList charactersList={charactersList} onCardClick={onCardClick} />
      {charactersList[Number(cardDetails) - 1] && cardDetails && (
        <CardDetails
          characterId={charactersList[Number(cardDetails) - 1].id}
          onHideCardDetails={onHideCardDetails}
          cardDetails={cardDetails}
        />
      )}
    </div>
  ) : null;

  return (
    <div>
      <SearchBar onSearchSubmit={onSearchSubmit} />
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
