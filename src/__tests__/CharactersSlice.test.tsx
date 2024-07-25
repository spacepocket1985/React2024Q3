import charactersReducer, {
  setCharacters,
  addSelectedChar,
  removeSelectedChar,
  removeAllSelectedChars,
  unSelectAllCharacters,
  CharacterstStateType,
} from '../store/slices/charactersSlice';
import { mockTransformCharactersData } from './mocks/mocksData';

const initialState: CharacterstStateType = {
  characterList: [],
  selectedChacharacters: [],
};

const characters = mockTransformCharactersData;
const character = mockTransformCharactersData[3];

describe('Tests for CharactersSlice', () => {
  it('should handle setCharacters', () => {
    const action = setCharacters(characters);
    const state = charactersReducer(initialState, action);

    expect(state.characterList[1]).toEqual(characters[1]);
    expect(state.characterList[0]).not.toEqual(characters[0]);
  });

  it('should handle addSelectedChar', () => {
    const action = addSelectedChar(character);
    const state = charactersReducer(initialState, action);

    expect(state.selectedChacharacters).toEqual([character]);
  });

  it('should handle removeSelectedChar', () => {
    const stateWithCharacter = charactersReducer(
      initialState,
      addSelectedChar(character)
    );
    const action = removeSelectedChar(mockTransformCharactersData[3].id);
    const state = charactersReducer(stateWithCharacter, action);

    expect(state.selectedChacharacters).toEqual([]);
  });

  it('should handle removeAllSelectedChars', () => {
    const stateWithCharacter = charactersReducer(
      initialState,
      addSelectedChar(character)
    );
    const action = removeAllSelectedChars();
    const state = charactersReducer(stateWithCharacter, action);

    expect(state.selectedChacharacters).toEqual([]);
  });

  it('should handle unSelectAllCharacters', () => {
    const action = setCharacters(characters);
    let state = charactersReducer(initialState, action);

    const unselectAction = unSelectAllCharacters();
    state = charactersReducer(state, unselectAction);

    expect(state.characterList.every((char) => !char.isSelected)).toBe(true);
  });
});
