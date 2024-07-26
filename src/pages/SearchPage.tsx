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
import { useAppDispatch } from '../hooks/storeHooks';
import { setCardDetails } from '../store/slices/appDataSlice';
import { setCharacters } from '../store/slices/charactersSlice';

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
  console.log('Sp Props ', props);
  const { response, details, filter, pageNum, responseWithDetails } = props;
  const router = useRouter();

  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(setLoading(isFetching));
  //   if (!isFetching && results) {
  //     dispatch(setCharacters(results.сharacters));
  //     dispatch(setPagination(results.pagination));
  //   }
  // }, [results, isFetching, dispatch]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;

    //   const filterWord = searchParams.get('filter') || '';
    const cardDetails = searchParams.get('details') || '';

    //   if (typeof window !== 'undefined') {
    //     const storageKey = 'searchTermForHarryPotterDB';
    //     const filterSearchParam = localStorage.getItem(storageKey) || '';
    //     dispatch(setFilterWord(filterSearchParam));
    //   }

    //   if (filterWord) {
    //     dispatch(setFilterWord(filterWord));
    //   }

    if (cardDetails) {
      dispatch(setCardDetails(cardDetails));
    }
  }, [dispatch]);

  useEffect(() => {
    if (response.data && response.data.сharacters) {
      const query = {
        filter,
        pageNumber: String(pageNum),
        details: response.data.сharacters[Number(details)] ? details : '',
      };
      dispatch(setCharacters(response.data.сharacters));
      if (JSON.stringify(router.query) !== JSON.stringify(query)) {
        router.push({ pathname: '/SearchPage', query }, undefined, {
          shallow: true,
        });
      }
    }
  }, [filter, pageNum, details, response.data, router]);
  const errorMsg = response.error ? (
    <ErrorMessage errorMsg={JSON.stringify(response.error)} />
  ) : null;
  const content = !errorMsg ? (
    <>
      <Pagination pagination={response.data.pagination}></Pagination>
      <CardList сharacters={response.data.сharacters} />
      {response.data.сharacters[Number(details) - 1] && details && (
        <CardDetails character={responseWithDetails.data} />
      )}
    </>
  ) : null;
  return (
    <div className={`${theme} base`}>
      <ThemeSwitcher />
      <SearchBar />
      {errorMsg}
      {content}
    </div>
  );
};

export default SearchPage;
