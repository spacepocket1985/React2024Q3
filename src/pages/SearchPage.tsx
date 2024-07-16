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
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { useGetAllCharactersQuery } from '../store/slices/apiSlice';
import { useDispatch } from 'react-redux';
import { setCharacters } from '../store/slices/charactersSlice';
import { setLoading, setPagination } from '../store/slices/appDataSlice';

export const SearchPage = (): JSX.Element => {
  const [, setSearchParams] = useSearchParams();

  // const [appData, setAppData] = useState<AppStateType>({
  //   charactersList: [],
  //   pagination: {
  //     current: Number(pageNumberSearchParam) || _DefaultPage,
  //     first: _DefaultPage,
  //     prev: _DefaultPage,
  //     next: _DefaultPage,
  //     last: _DefaultPage,
  //     records: 0,
  //   },
  //   filterWord: searchTerm || _DefaultFilterWord,
  //   cardDetails: detailsSearchParam || '',
  // });

  // const {
  //   pagination: { current },
  //   charactersList,
  //   pagination,
  //   filterWord,
  //   cardDetails,
  // } = appData;

  // const onСharactersListLoaded = useCallback(
  //   (apiResponse: ApiResponseType): void => {
  //     setAppData((prevAppData) => {
  //       return {
  //         ...prevAppData,
  //         pagination: apiResponse.meta.pagination,
  //         charactersList: apiResponse.data.map((char) => char),
  //       };
  //     });
  //   },
  //   []
  // );

  // const onRequest = useCallback(() => {
  //   getCharacters(filterWord, current).then(onСharactersListLoaded);
  // }, [filterWord, current, getCharacters, onСharactersListLoaded]);

  // const onSearchSubmit = useCallback((searchTerm: string) => {
  //   setAppData((prevData) => ({
  //     ...prevData,
  //     filterWord: searchTerm,
  //     pagination: { ...prevData.pagination, current: 1 },
  //   }));
  // }, []);

  // const onPaginationClick = useCallback((page: number): void => {
  //   setAppData((prevData) => ({
  //     ...prevData,
  //     pagination: { ...prevData.pagination, current: page },
  //   }));
  // }, []);

  // const onCardClick = useCallback((index: number) => {
  //   setAppData((prevData) => ({
  //     ...prevData,
  //     cardDetails: String(index),
  //   }));
  // }, []);

  // const onHideCardDetails = () => {
  //   setAppData((prevData) => ({
  //     ...prevData,
  //     cardDetails: _DefaultFilterWord,
  //   }));
  // };

  // useEffect(() => {
  //   onRequest();
  // }, [onRequest]);

  const dispatch = useDispatch();
  const offset = useAppSelector((state) => state.appData.offset);
  const pageNum = String(
    useAppSelector((state) => state.appData.pagination.current)
  );
  const filter = useAppSelector((state) => state.appData.filterWord);
  const cardDetails = useAppSelector((state) => state.appData.cardDetails);

  const { data: results, isFetching } = useGetAllCharactersQuery({
    offset,
    pageNum,
    filter,
  });

  useEffect(() => {
    dispatch(setLoading(isFetching));
    if (results) {
      dispatch(setCharacters(results.сharacters));
      dispatch(setPagination(results.pagination));
    }
  }, [results, isFetching]);

  useEffect(() => {
    setSearchParams({
      filter,
      pageNumber: String(pageNum),
      details: cardDetails,
    });
  }, [filter, pageNum, cardDetails, setSearchParams]);

  // const content = !(loading || error) ? (
  //   <div className={styles.contentWrap}>
  //     <CardList charactersList={charactersList} onCardClick={onCardClick} />
  //     { {charactersList[Number(cardDetails) - 1] && cardDetails && (
  //       <CardDetails
  //         characterId={charactersList[Number(cardDetails) - 1].id}
  //         onHideCardDetails={onHideCardDetails}
  //         cardDetails={cardDetails}
  //       />
  //     )} }
  //   </div>
  // ) : null;

  return (
    <div>
      <SearchBar />
      <Pagination />
      <CardList />

      {/* 
      <Pagination
        pagination={pagination}
        onPaginationClick={onPaginationClick}
      />
      {error && <ErrorMessage errorMsg={error} />}
      {loading && <Spinner />}
      {content} */}
    </div>
  );
};
