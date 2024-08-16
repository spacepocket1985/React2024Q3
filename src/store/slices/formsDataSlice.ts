import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormDataType } from '../../types';

type IDataList = {
  dataFromForms: FormDataType[];
  dataFromLastSubmit: FormDataType;
};

const initialState: IDataList = {
  dataFromForms: [],
  dataFromLastSubmit: {
    name: '',
    age: 0,
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    country: '',
    picture: '',
  },
};

const formsDatatSlice = createSlice({
  name: 'dataFromForms',
  initialState,
  reducers: {
    addData(state) {
      state.dataFromForms.unshift(state.dataFromLastSubmit);
    },
    setData(state, action: PayloadAction<FormDataType>) {
      state.dataFromLastSubmit = action.payload;
      state.dataFromForms.unshift(action.payload);
    },
    setPicture(state, action: PayloadAction<string>) {
      state.dataFromLastSubmit.picture = action.payload;
    },
  },
});

export const { addData, setData, setPicture } = formsDatatSlice.actions;

export default formsDatatSlice.reducer;
