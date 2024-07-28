import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TransformCharacterType } from '../../types';

export type CharacterstStateType = {
  characterList: Array<TransformCharacterType>;
  selectedChacharacters: Array<TransformCharacterType>;
};
const initialState: CharacterstStateType = {
  characterList: [],
  selectedChacharacters: [],
};

const charactersSlice = createSlice({
  name: 'charactersData',
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<TransformCharacterType[]>) => {
      state.characterList = action.payload;
      state.characterList = state.characterList.map((character) => {
        const isSelected = state.selectedChacharacters.some(
          (selected) => selected.id === character.id
        );
        return { ...character, isSelected };
      });
    },
    selectCharacter: (state, action: PayloadAction<string>) => {
      const indexForUpdate = state.characterList.findIndex(
        (char) => char.id === action.payload
      );
      state.characterList[indexForUpdate].isSelected =
        !state.characterList[indexForUpdate].isSelected;
    },
    addSelectedChar: (state, action: PayloadAction<TransformCharacterType>) => {
      if (
        !state.selectedChacharacters.find(
          (item) => item.id === action.payload.id
        )
      )
        state.selectedChacharacters.push(action.payload);
    },
    removeSelectedChar: (state, action: PayloadAction<string>) => {
      state.selectedChacharacters = state.selectedChacharacters.filter(
        (item) => item.id !== action.payload
      );
    },
    removeAllSelectedChars: (state) => {
      state.selectedChacharacters = [];
    },
    unSelectAllCharacters: (state) => {
      state.characterList.forEach((item) => {
        item.isSelected = false;
      });
    },
  },
});

export const {
  setCharacters,
  selectCharacter,
  addSelectedChar,
  removeSelectedChar,
  removeAllSelectedChars,
  unSelectAllCharacters,
} = charactersSlice.actions;

export default charactersSlice.reducer;
