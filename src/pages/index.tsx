import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { CardList } from '../components/cardList/CardList';
import { SearchBar } from '../components/searchBar/SearchBar';
import { Pagination } from '../components/pagination/Pagination';
import { CardDetails } from '../components/cardDetails/cardDetails';

import { getAllCharacters, potterDbApiSlice } from '../store/slices/apiSlice';
import { ThemeSwitcher } from '../components/themeSwitcher/ThemeSwitcher';
import { useTheme } from '../context/ThemeContext';
import { wrapper } from '../store/store';
import { transformApiResponseType } from '../types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { ErrorMessage } from '../components/errorMessage/ErrorMessage';

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
    // const detailsResponse = details
    //   ? await store.dispatch(
    //       searchByValue.initiate({
    //         pageNumber: 0,
    //         pageSize: 1,
    //         details: details,
    //       })
    //     )
    //   : null;
    await Promise.all(
      store.dispatch(potterDbApiSlice.util.getRunningQueriesThunk())
    );

    return {
      props: { response, details, pageNum, filter },
    };
  }
);

type SearchPagePropsType = {
  response: {
    data: transformApiResponseType;
    error: FetchBaseQueryError | SerializedError;
  };
  details: string;
  filter: string;
  pageNum: string;
};

const SearchPage = (props: SearchPagePropsType): JSX.Element => {
  console.log('Sp Props ', props);
  const { response, details, filter, pageNum } = props;
  const router = useRouter();

  const { theme } = useTheme();

  // useEffect(() => {
  //   dispatch(setLoading(isFetching));
  //   if (!isFetching && results) {
  //     dispatch(setCharacters(results.сharacters));
  //     dispatch(setPagination(results.pagination));
  //   }
  // }, [results, isFetching, dispatch]);

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
    if (response.data && response.data.сharacters) {
      const query = {
        filter,
        pageNumber: String(pageNum),
        details: response.data.сharacters[Number(details)] ? details : '',
      };
      if (JSON.stringify(router.query) !== JSON.stringify(query)) {
        router.push({ pathname: '/', query }, undefined, { shallow: true });
      }
    }
  }, [filter, pageNum, details, response.data, router]);

  return (
    <div className={`${theme} base`}>
      <ThemeSwitcher />

      <SearchBar />
      {response.error && (
        <ErrorMessage errorMsg={JSON.stringify(response.error)} />
      )}
      {/* <Pagination pagination={response.pagination}/> */}
      {!response.error && <CardList сharacters={response.data.сharacters} />}
      {/* {response.сharacters[Number(details) - 1] && details && <CardDetails />} */}
    </div>
  );
};

export default SearchPage;
