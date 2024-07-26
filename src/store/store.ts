import { configureStore } from '@reduxjs/toolkit';  
import { combineReducers } from 'redux';  
import { createWrapper } from 'next-redux-wrapper';  

import charactersReducer from './slices/charactersSlice';  
import appDataReducer from './slices/appDataSlice';  
import { potterDbApiSlice } from './slices/apiSlice';  

export type RootState = {  
  [potterDbApiSlice.reducerPath]: ReturnType<typeof potterDbApiSlice.reducer>;  
  characters: ReturnType<typeof charactersReducer>;  
  appData: ReturnType<typeof appDataReducer>;  
};  

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
  });  
};  

export type AppStore = ReturnType<typeof makeStore>;  

export type AppDispatch = AppStore['dispatch'];  

export const wrapper = createWrapper<AppStore>(makeStore);