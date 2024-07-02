import { CharacterType } from './CharacterType';

export type AppStateType = {
  charactersList: CharacterType[];
  isLoading: boolean;
  error: string;
  searchTerm: string;
};
