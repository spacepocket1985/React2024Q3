import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const storageKey = 'searchTermForHarryPotterDB';

const searchParam = new URLSearchParams(window.location.search);
const pageNumberSearchParam = Number(searchParam.get('pageNumber')) || 1;
const detailsSearchParam = searchParam.get('details') || '';
const filterSearchParam =
  searchParam.get('filter') || localStorage.getItem(storageKey) || '';

type PaginationType = {
  current: number;
  first: number;
  prev: number;
  next: number;
  last: number;
  records: number;
};

type AppDataStateType = {
  filterWord: string;
  cardDetails: string;
  pagination: PaginationType;
  offset: string;
  isLoading: boolean;
};

const initialState: AppDataStateType = {
  filterWord: filterSearchParam,
  cardDetails: detailsSearchParam,
  pagination: {
    current: pageNumberSearchParam,
    first: 1,
    prev: pageNumberSearchParam > 1 ? pageNumberSearchParam - 1 : 1,  
    next: pageNumberSearchParam + 1,  
    last: 1,
    records: 0,
  },
  offset: '15',
  isLoading: false,
};

const appDataSlice = createSlice({
  name: 'appData',
  initialState,
  reducers: {
    setPagination: (state, action: PayloadAction<PaginationType>) => {
      state.pagination = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.current = action.payload;  
      state.pagination.prev = action.payload > 1 ? action.payload - 1 : 1;  
      state.pagination.next = action.payload + 1;  
    },
    setFilterWord: (state, action: PayloadAction<string>) => {
      state.filterWord = action.payload;
    },
    setCardDetails: (state, action: PayloadAction<string>) => {
      state.cardDetails = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setCardDetails,
  setFilterWord,
  setPagination,
  setLoading,
  setCurrentPage,
} = appDataSlice.actions;

export default appDataSlice.reducer;
