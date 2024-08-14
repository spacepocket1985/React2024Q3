import { createSlice } from '@reduxjs/toolkit';
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

const datatSlice = createSlice({
  name: 'dataFromForms',
  initialState,
  reducers: {
    addData(state) {
      state.dataFromForms.unshift(state.dataFromLastSubmit);
    },
    setData: (state, action) => (state.dataFromLastSubmit = action.payload),
    setPicture: (state, action) =>
      (state.dataFromLastSubmit.picture = action.payload),
  },
});

export const { addData, setData, setPicture } = datatSlice.actions;

export default datatSlice.reducer;
