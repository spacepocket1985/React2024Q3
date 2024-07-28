import { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { useGetAllCharactersQuery } from '../store/slices/apiSlice';

import { CardList } from '../components/cardList/CardList';
import { SearchBar } from '../components/searchBar/SearchBar';
import { Pagination } from '../components/pagination/Pagination';
import { CardDetails } from '../components/cardDetails/cardDetails';

import { setCharacters } from '../store/slices/charactersSlice';
import { setLoading, setPagination } from '../store/slices/appDataSlice';

export const SearchPage = (): JSX.Element => {
  const [, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const filter = useAppSelector((state) => state.appData.filterWord);
  const cardDetails = useAppSelector((state) => state.appData.cardDetails);
  const charactersList = useAppSelector(
    (state) => state.characters.characterList
  );
  const pageNum = String(
    useAppSelector((state) => state.appData.pagination.current)
  );

  const { data: results, isFetching } = useGetAllCharactersQuery({
    pageNum,
    filter,
  });

  useEffect(() => {
    dispatch(setLoading(isFetching));
    if (!isFetching && results) {
      dispatch(setCharacters(results.сharacters));
      dispatch(setPagination(results.pagination));
    }
  }, [results, isFetching, dispatch]);

  useEffect(() => {
    setSearchParams({
      filter,
      pageNumber: String(pageNum),
      details: charactersList[Number(cardDetails)] ? cardDetails : '',
    });
  }, [filter, pageNum, cardDetails, setSearchParams, charactersList]);

  return (
    <div>
      <SearchBar />
      <Pagination />
      <CardList />
      {charactersList[Number(cardDetails) - 1] && cardDetails && (
        <CardDetails />
      )}
      <Outlet />
    </div>
  );
};
