import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormDataType } from '../../types';

const initialState: FormDataType = {
  name: '',
  age: 0,
  gender: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
  country: '',
  picture: '',
};

const formReactSlice = createSlice({
  name: 'formReact',
  initialState,
  reducers: {
    setFormReactData: (state, action: PayloadAction<FormDataType>) =>
      (state = action.payload),
  },
});

export const { setFormReactData } = formReactSlice.actions;

export default formReactSlice.reducer;
