import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import { useLocalStorage } from '../hooks/useLocalStorage';
import { PotterDbApi } from '../service/potterDbApi';
import { CardList } from '../components/cardList/CardList';
import { ErrorMessage } from '../components/errorMessage/ErrorMessage';
import { SearchBar } from '../components/searchBar/SearchBar';
import { Spinner } from '../components/spinner/Spinner';
import { Pagination } from '../components/pagination/Pagination';
import { CardDetails } from '../components/cardDetails/cardDetails';

import { ApiResponseType, AppStateType } from '../types';

import './App.css';

export const SearchPage = (): JSX.Element => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const pageNumber = params.get('pageNumber');
  const details = params.get('details');
  const filter = params.get('filter');

  const navigate = useNavigate();

  const { getCharacters, loading, error, _DefaultFilterWord, _DefaultPage } =
    PotterDbApi();
  const [searchTerm] = useLocalStorage();

  const [appData, setAppData] = useState<AppStateType>({
    charactersList: [],
    pagination: {
      current: pageNumber ? Number(pageNumber) : _DefaultPage,
      first: _DefaultPage,
      prev: _DefaultPage,
      next: _DefaultPage,
      last: _DefaultPage,
      records: 0,
    },
    filterWord: filter || searchTerm || _DefaultFilterWord,
  });

  const {
    filterWord,
    pagination: { current },
    charactersList,
    pagination,
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
      const filterParam = filterWord === '' ? '' : `&filter=${filterWord}`;
      const detailsParam =
        !details || !apiResponse.data[Number(details)]
          ? ''
          : `&details=${details}`;

      navigate(
        `/searchPage?pageNumber=${current}${filterParam}${detailsParam}`
      );
    },
    [navigate, current, filterWord, details]
  );

  const onRequest = useCallback(() => {
    getCharacters(filterWord, current).then(onСharactersListLoaded);
  }, [getCharacters, onСharactersListLoaded, filterWord, current]);

  const onSearchSubmit = (searchTerm: string) => {
    setAppData({ ...appData, filterWord: searchTerm });
  };

  const onPaginationClick = (page: number): void => {
    setAppData({
      ...appData,
      pagination: { ...appData.pagination, current: page },
    });
  };

  useEffect(() => {
    if (details && charactersList.length > 0) return;
    onRequest();
  }, [onRequest, details, charactersList.length]);

  const content = !(loading || error) ? (
    <div className="contentWrap">
      <CardList charactersList={charactersList} />
      {details && charactersList[Number(details)] && (
        <CardDetails characterId={charactersList[Number(details) - 1].id} />
      )}
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
