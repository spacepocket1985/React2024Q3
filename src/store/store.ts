import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { potterDbApiSlice } from './slices/ApiSlice';

const rootReducer = combineReducers({
  [potterDbApiSlice.reducerPath]: potterDbApiSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(potterDbApiSlice.middleware),
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
