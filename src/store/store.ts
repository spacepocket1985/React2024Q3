import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { potterDbApiSlice } from './slices/apiSlice';
import charactersReducer from './slices/charactersSlice';
import appDataReducer from './slices/appDataSlice';

const rootReducer = combineReducers({
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
export type AppDispatch = typeof store.dispatch;
