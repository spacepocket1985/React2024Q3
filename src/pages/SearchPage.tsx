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
import { setLoading } from '../store/slices/appDataSlice';
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

export type SearchPagePropsType = {
  response: {
    data: transformApiResponseType;
    error: FetchBaseQueryError | SerializedError | null;
  };
  responseWithDetails: {
    data: TransformCharacterType | null;
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

  const currentPageNum = String(
    useAppSelector((state) => state.appData.pagination.current)
  );
  const cardDetails = useAppSelector((state) => state.appData.cardDetails);


  useEffect(() => {
    if (response.data && response.data.сharacters) {
      dispatch(setLoading(false));
      const query = {
        filter: filterWord,
        pageNumber: currentPageNum,
        details: cardDetails,
      };
      dispatch(setCharacters(response.data.сharacters));
      if (JSON.stringify(router.query) !== JSON.stringify(query)) {
        router.push({ pathname: '/SearchPage', query });
      }
    }
  }, [
    filter,
    details,
    response.data,
    router,
    dispatch,
    filterWord,
    currentPageNum,
    cardDetails,
  ]);
  const errorMsg = response.error ? (
    <ErrorMessage errorMsg={JSON.stringify(response.error)} />
  ) : null;
  const content = !errorMsg ? (
    <>
      <Pagination pagination={response.data.pagination}></Pagination>
      <CardList сharacters={response.data.сharacters} />
      {responseWithDetails?.data && cardDetails && (
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
