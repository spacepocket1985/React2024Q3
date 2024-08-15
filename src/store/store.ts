import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import selectDataReducer from './slices/selectDataSlice';
import appDataReducer from './slices/appDataSlice';
import formReactReducer from './slices/formReactSlice'

export const rootReducer = combineReducers({

  selectData: selectDataReducer,
  appData: appDataReducer,
  formReact: formReactReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }),
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
