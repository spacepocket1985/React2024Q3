import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import charactersReducer from './slices/charactersSlice';
import appDataReducer from './slices/appDataSlice';
import { potterDbApiSlice } from './slices/apiSlice';

export const rootReducer = combineReducers({
  [potterDbApiSlice.reducerPath]: potterDbApiSlice.reducer,
  characters: charactersReducer,
  appData: appDataReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(potterDbApiSlice.middleware),
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
