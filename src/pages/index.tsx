import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { CardList } from '../components/cardList/CardList';
import { SearchBar } from '../components/searchBar/SearchBar';
import { Pagination } from '../components/pagination/Pagination';
import { CardDetails } from '../components/cardDetails/cardDetails';

import { setCharacters } from '../store/slices/charactersSlice';
import {
  setCardDetails,
  setFilterWord,
  setLoading,
  setPagination,
} from '../store/slices/appDataSlice';
import { useGetAllCharactersQuery } from '../store/slices/apiSlice';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { ThemeSwitcher } from '../components/themeSwitcher/ThemeSwitcher';
import { useTheme } from '../context/ThemeContext';
import { GetServerSideProps } from 'next';

const SearchPage = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { theme } = useTheme();

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

  // useEffect(() => {

  //   const url = new URL(window.location.href);
  //   const searchParams = url.searchParams;

  //   const filterWord = searchParams.get('filter') || '';
  //   const cardDetails = searchParams.get('details') || '';

  //   if (typeof window !== 'undefined') {
  //     const storageKey = 'searchTermForHarryPotterDB';
  //     const filterSearchParam = localStorage.getItem(storageKey) || '';
  //     dispatch(setFilterWord(filterSearchParam));
  //   }

  //   if (filterWord) {
  //     dispatch(setFilterWord(filterWord));
  //   }

  //   if (cardDetails) {
  //     dispatch(setCardDetails(cardDetails));
  //   }
  // }, [dispatch]);

  useEffect(() => {
    const query = {
      filter,
      pageNumber: String(pageNum),
      details: charactersList[Number(cardDetails)] ? cardDetails : '',
    };
    if (JSON.stringify(router.query) !== JSON.stringify(query)) {
      router.push({ pathname: '/', query }, undefined, { shallow: true });
    }
  }, [filter, pageNum, cardDetails, charactersList, router]);

  return (
    <div className={`${theme} base`}>
      <ThemeSwitcher />

      <SearchBar />
      <Pagination />
      <CardList />
      {charactersList[Number(cardDetails) - 1] && cardDetails && <CardDetails />}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  // Создаем экземпляр URLSearchParams
  const searchParams = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    // Добавляем параметры запроса в URLSearchParams
    searchParams.append(key, Array.isArray(value) ? value[0] : value || '');
  });

  // Извлекаем параметры из URL
  const pageNum = Number(searchParams.get('pageNumber')) || 1;
  const details = searchParams.get('details') || '';
  const filter = searchParams.get('filter') || '';

  return {
    props: { filter, details, pageNum },
  };
};

export default SearchPage;
