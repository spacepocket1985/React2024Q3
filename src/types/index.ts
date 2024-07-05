export type CharacterType = {
  id: string;
  attributes: {
    slug: string;
    alias_names: string[];
    animagus: string | null;
    blood_status: string | null;
    boggart: string | null;
    born: string | null;
    died: string | null;
    eye_color: string | null;
    family_members: string[];
    gender: string | null;
    hair_color: string | null;
    height: string | null;
    house: string | null;
    image: string | null;
    jobs: string[];
    marital_status: string | null;
    name: string;
    nationality: string | null;
    patronus: string | null;
    romances: string[];
    skin_color: string | null;
    species: string | null;
    titles: string[];
    wands: string[];
    weight: string | null;
    wiki: string;
  };
};

export type ApiResponseType = {
  data: CharacterType[];
  meta: {
    pagination: {
      current: number;
      first: number;
      prev: number;
      next: number;
      last: number;
      records: number;
    };
  };
  links: {
    first: string;
    last: string;
    next: string;
    prev: string;
  };
};

export type ApiResponseForCharType = {
  data: CharacterType;
  meta: {
    copyright: string;
    generated_at: string;
  };
  links: {
    self: string;
  };
};

export type PotterDbApiReturnType = {
  getCharacters: (
    offsetNumber?: string,
    pageNumber?: string,
    filterWord?: string
  ) => Promise<ApiResponseType>;
  getCharacter: (id: string) => Promise<ApiResponseForCharType>;
  _DefaultPage: string;
  _DefaultOffset: string;
  _DefaultFilterWord: string;
  loading: boolean;
  error: string;
  clearError: () => void;
};

export type AppStateType = {
  charactersList: CharacterType[];
};

export type CardListPropsType = {
  charactersList: CharacterType[];
};

export type CardPropsType = {
  character: CharacterType;
};

export type SearchBarPropsType = {
  onSearchSubmit: () => void;
};

export type SearchBarStateType = {
  searchTerm: string;
};

export type ErrorMsgPropsType = {
  errorMsg: string;
};

export type EmptyPropsType = object;

export type EmptyStateType = object;
