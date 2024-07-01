import { CharacterType } from './CharacterType';

export type ApiResponseType = {
  data: CharacterType [];
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
