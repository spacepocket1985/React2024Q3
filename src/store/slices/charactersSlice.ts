import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TransformCharacterType } from '../../types';

type CharacterstStateType = {
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
  },
});

export const {
  setCharacters,
  selectCharacter,
  addSelectedChar,
  removeSelectedChar,
} = charactersSlice.actions;

export default charactersSlice.reducer;
