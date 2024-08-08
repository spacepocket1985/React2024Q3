import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';

import { CardList } from '../components/cardList/CardList';
import { SearchBar } from '../components/searchBar/SearchBar';
import { Pagination } from '../components/pagination/Pagination';
import { CardDetails } from '../components/cardDetails/cardDetails';

import { setCharacters } from '../store/slices/charactersSlice';
import { setLoading, setPagination } from '../store/slices/appDataSlice';
import {
  useLoaderData,
  useNavigation,
  useSearchParams,
} from '@remix-run/react';
import { transformApiResponseType } from 'src/types';

export const SearchPage = (): JSX.Element => {
  const { data}: { data: transformApiResponseType } =
    useLoaderData();

  const { state } = useNavigation();
  const dispatch = useAppDispatch();

  const cardDetails = useAppSelector((state) => state.appData.cardDetails);
  const charactersList = useAppSelector(
    (state) => state.characters.characterList
  );

  useEffect(() => {
    if (state === 'loading') {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [state]);

  useEffect(() => {
    if (data) {
      dispatch(setCharacters(data.сharacters));
      dispatch(setPagination(data.pagination));
    }
  }, [dispatch, data]);

  return (
    <div>
      <SearchBar />
      <Pagination />
      <CardList />
      {charactersList[Number(cardDetails) - 1] && cardDetails && (
        <CardDetails />
      )}
    </div>
  );
};
