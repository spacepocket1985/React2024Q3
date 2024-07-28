import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { CardList } from '../components/cardList/CardList';
import { SearchBar } from '../components/searchBar/SearchBar';
import { Pagination } from '../components/pagination/Pagination';
import { CardDetails } from '../components/cardDetails/cardDetails';

import {
  getAllCharacters,
  potterDbApiSlice,
  getCharacter,
} from '../store/slices/apiSlice';
import { ThemeSwitcher } from '../components/themeSwitcher/ThemeSwitcher';
import { useTheme } from '../context/ThemeContext';
import { wrapper } from '../store/store';
import { transformApiResponseType, TransformCharacterType } from '../types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { ErrorMessage } from '../components/errorMessage/ErrorMessage';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import {
  setFilterWord,
  setLoading,
  setPagination,
} from '../store/slices/appDataSlice';
import { setCharacters } from '../store/slices/charactersSlice';
import { Spinner } from '../components/spinner/Spinner';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const pageNum = context.query.pageNumber?.toString() || '1';
    const filter = context.query.filter?.toString() || '';
    const details = context.query.details?.toString() || '';

    const response = await store.dispatch(
      getAllCharacters.initiate({
        pageNum,
        filter,
      })
    );

    let responseWithDetails = null;

    if (response.data && response.data.сharacters && details) {
      const index = Number(details);
      if (index >= 0 && index < response.data.сharacters.length) {
        const characterId = response.data.сharacters[index].id;

        responseWithDetails = await store.dispatch(
          getCharacter.initiate(characterId)
        );
      }
    }

    await Promise.all(
      store.dispatch(potterDbApiSlice.util.getRunningQueriesThunk())
    );

    return {
      props: { response, details, pageNum, filter, responseWithDetails },
    };
  }
);

type SearchPagePropsType = {
  response: {
    data: transformApiResponseType;
    error: FetchBaseQueryError | SerializedError;
  };
  responseWithDetails: {
    data: TransformCharacterType;
  };
  details: string;
  filter: string;
  pageNum: string;
};

const SearchPage = (props: SearchPagePropsType): JSX.Element => {
  
  const { response, details, filter, responseWithDetails } = props;

  const router = useRouter();

  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const filterWord = useAppSelector((state) => state.appData.filterWord);
  const isLoading = useAppSelector((state) => state.appData.isLoading);
  const currentPageNum = String(
    useAppSelector((state) => state.appData.pagination.current)
  );
  const cardDetails = useAppSelector((state) => state.appData.cardDetails);


  useEffect(() => {
    let filterSearchParam = '';

    if (typeof window !== 'undefined') {
      const storageKey = 'searchTermForHarryPotterDB';
      filterSearchParam = localStorage.getItem(storageKey) || '';
      dispatch(setFilterWord( filterSearchParam));    
    }
    
    dispatch(setFilterWord(filter || filterSearchParam || ''));
    dispatch(setLoading(false));
    dispatch(setPagination(response.data.pagination));
  }, [dispatch, filter, response.data.pagination]);

  useEffect(() => {
    if (!isLoading && response.data && response.data.сharacters) {
      
      
      const query = {
        filter: filterWord,
        pageNumber: currentPageNum,
        details:  cardDetails ,
      };

      dispatch(setCharacters(response.data.сharacters));
      if (JSON.stringify(router.query) !== JSON.stringify(query)) {
        router.push({ pathname: '/SearchPage', query });
      }
    }
  }, [filter, details, response.data, router, dispatch, filterWord, isLoading, currentPageNum, cardDetails]);
  const errorMsg = response.error ? (
    <ErrorMessage errorMsg={JSON.stringify(response.error)} />
  ) : null;
  const content = !(errorMsg || isLoading) ? (
    <>
      <Pagination pagination={response.data.pagination}></Pagination>
      <CardList сharacters={response.data.сharacters} />
      {responseWithDetails?.data && cardDetails && (
        <CardDetails character={responseWithDetails.data} />
      )}
    </>
  ) : null;

  const loading = isLoading ? <Spinner /> : null;
  return (
    <div className={`${theme} base`}>
      <ThemeSwitcher />
      <SearchBar />
      {errorMsg}
      {loading}
      {content}
    </div>
  );
};

export default SearchPage;
