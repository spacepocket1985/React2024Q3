import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { createWrapper } from 'next-redux-wrapper';

import charactersReducer from './slices/charactersSlice';
import appDataReducer from './slices/appDataSlice';
import { potterDbApiSlice } from './slices/apiSlice';

const makeStore = () => {
  const rootReducer = combineReducers({
    [potterDbApiSlice.reducerPath]: potterDbApiSlice.reducer,
    characters: charactersReducer,
    appData: appDataReducer,
  });

  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(potterDbApiSlice.middleware),
    devTools: true,
  });
};

export type RootState = {
  [potterDbApiSlice.reducerPath]: ReturnType<typeof potterDbApiSlice.reducer>;
  characters: ReturnType<typeof charactersReducer>;
  appData: ReturnType<typeof appDataReducer>;
};

export const storeInstance = makeStore();

export type AppRootState = ReturnType<typeof storeInstance.getState>;

export type AppStore = ReturnType<typeof makeStore>;

export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });
