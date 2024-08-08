import { transformCharacter } from 'src/store/slices/apiSlice';
import {
  transformApiResponseType,
  ApiResponseType,
  TransformCharacterType,
  ApiResponseForCharType,
} from 'src/types';

const _ApiBase = 'https://api.potterdb.com/v1/characters';
const _Offset = '?page[size]=';
const _Page = '&page[number]=';
const _Filter = '&filter[name_cont]=';

const _DefaultOffset = '10';
const _DefaultPage = 1;
const _DefaultFilterWord = '';

export const getAllCharacters = async (
  filter: string,
  pageNum: number
): Promise<transformApiResponseType> => {
  const response = await fetch(
    `${_ApiBase}${_Offset}${_DefaultOffset}${_Page}${pageNum}${_Filter}${filter}`
  );
  if (!response.ok) throw new Error('Unable to fetch');

  const results: ApiResponseType = await response.json();
  return {
    сharacters: results.data.map((item) => transformCharacter(item)),
    pagination: results.meta.pagination,
  };
};

export const getCharacter = async (
  id: string
): Promise<TransformCharacterType> => {
  const response = await fetch(`${_ApiBase}/${id}`);
  if (!response.ok) throw new Error('Unable to fetch');

  const results: ApiResponseForCharType = await response.json();
  return transformCharacter(results.data);
};
