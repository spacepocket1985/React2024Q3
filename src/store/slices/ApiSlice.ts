import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ApiResponseForCharType,
  ApiResponseType,
  CharacterType,
  transformApiResponseType,
} from '../../types';
import NoImage from '../../assets/no-image.png';

const _ApiBase = 'https://api.potterdb.com/v1/characters';
const _Offset = '?page[size]=';
const _Page = '&page[number]=';
const _Filter = '&filter[name_cont]=';

const _DefaultOffset = '15';
const _DefaultPage = 1;
const _DefaultFilterWord = '';

export const potterDbApiSlice = createApi({
  reducerPath: 'potterDbApi',
  baseQuery: fetchBaseQuery({ baseUrl: _ApiBase }),
  tagTypes: ['Characters'],
  endpoints: (builder) => ({
    getAllCharacters: builder.query<
      transformApiResponseType,
      { pageNum: string; filter: string }
    >({
      query: ({
        
        pageNum = _DefaultPage,
        filter = _DefaultFilterWord,
      }) => {
        let queryString = `${_Offset}${_DefaultOffset}${_Page}${pageNum}`;
        if (filter) {
          queryString += `${_Filter}${filter}`;
        }
        return queryString;
      },
      transformResponse: (response: ApiResponseType) => ({
        сharacters: response.data.map((item) => transformCharacter(item)),
        pagination: response.meta.pagination,
      }),
    }),
    getCharacter: builder.query<CharacterType, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: ApiResponseForCharType) =>
        transformCharacter(response.data),
    }),
  }),
});

function transformCharacter(character: CharacterType): CharacterType {
  const updatedCharacter = { ...character };
  if (character.attributes.gender === null) {
    updatedCharacter.attributes.gender = 'Unknown';
  }
  if (character.attributes.image === null) {
    updatedCharacter.attributes.image = NoImage;
  }
  return updatedCharacter;
}

export const { useGetAllCharactersQuery, useGetCharacterQuery } =
  potterDbApiSlice;
