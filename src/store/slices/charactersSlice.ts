import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharacterType } from '../../types';

type CharacterstStateType = {
  characterList: Array<CharacterType>;
  selectedChacharacters: Array<CharacterType>;
};
const initialState: CharacterstStateType = {
  characterList: [],
  selectedChacharacters: [],
};

const charactersSlice = createSlice({
  name: 'charactersData',
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<CharacterType[]>) => {
      state.characterList = action.payload;
    },
  },
});

export const { setCharacters } = charactersSlice.actions;

export default charactersSlice.reducer;
