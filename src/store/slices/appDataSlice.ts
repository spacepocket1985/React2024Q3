import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const storageKey = 'searchTermForHarryPotterDB';  
let pageNumberSearchParam = 1;

let filterSearchParam = '';

if (typeof window !== 'undefined') {
  const searchParam = new URLSearchParams(window.location.search);
  pageNumberSearchParam = Number(searchParam.get('pageNumber')) || 1;
  filterSearchParam = searchParam.get('filter') || localStorage.getItem(storageKey) || '';
  
}
type PaginationType = {
  current: number;
  first: number;
  prev: number;
  next: number;
  last: number;
  records: number;
};

export type AppDataStateType = {
  filterWord: string;
  cardDetails: string;
  pagination: PaginationType;
  isLoading: boolean;
};

const initialState: AppDataStateType = {
  filterWord: filterSearchParam,
  cardDetails: '',
  pagination: {
    current: pageNumberSearchParam,
    first: 1,
    prev: 1,
    next: 2,
    last: 1,
    records: 0,
  },
  isLoading: true,
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
    initializeState: (state, action: PayloadAction<AppDataStateType>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setCardDetails,
  setFilterWord,
  setPagination,
  setLoading,
  setCurrentPage,
  initializeState,
} = appDataSlice.actions;

export default appDataSlice.reducer;
