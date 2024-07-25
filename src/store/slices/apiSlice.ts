import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import {
  ApiResponseForCharType,
  ApiResponseType,
  CharacterType,
  transformApiResponseType,
  TransformCharacterType,
} from '../../types';
import NoImage from '../../assets/no-image.png';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

const _ApiBase = 'https://api.potterdb.com/v1/characters';
const _Offset = '?page[size]=';
const _Page = '&page[number]=';
const _Filter = '&filter[name_cont]=';

const _DefaultOffset = '10';
const _DefaultPage = 1;
const _DefaultFilterWord = '';

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE
}

export const potterDbApiSlice = createApi({
  reducerPath: 'potterDbApi',
  baseQuery: fetchBaseQuery({ baseUrl: _ApiBase }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: ['Characters'],
  endpoints: (builder) => ({
    getAllCharacters: builder.query<
      transformApiResponseType,
      { pageNum: string; filter: string }
    >({
      query: ({ pageNum = _DefaultPage, filter = _DefaultFilterWord }) => {
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
    getCharacter: builder.query<TransformCharacterType, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: ApiResponseForCharType) =>
        transformCharacter(response.data),
    }),
  }),
});

function transformCharacter(character: CharacterType): TransformCharacterType {
  const updatedCharacter = { ...character, isSelected: false };
  if (character.attributes.gender === null) {
    updatedCharacter.attributes.gender = 'Unknown';
  }
  if (character.attributes.image === null) {
    updatedCharacter.attributes.image = NoImage.src;
  }
  return updatedCharacter;
}

export const { useGetAllCharactersQuery, useGetCharacterQuery } =
  potterDbApiSlice;

  export const { getAllCharacters } = potterDbApiSlice.endpoints; 
