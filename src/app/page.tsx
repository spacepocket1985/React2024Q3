import { CardDetails } from '../components/cardDetails/cardDetails';

import { CardList } from '../components/cardList/CardList';
import { Pagination } from '../components/pagination/Pagination';
import { transformCharacter } from '../store/slices/apiSlice';
import {
  ApiResponseForCharType,
  ApiResponseType,
  transformApiResponseType,
  TransformCharacterType,
} from '../types';

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

export default async function SearchPage({
  searchParams = {},
}: {
  searchParams?: { filter?: string; pageNum?: string; details?: string };
}): Promise<JSX.Element> {
  const filter = searchParams.filter || '';
  const pageNum = Number(searchParams.pageNum || '1');
  const details = searchParams.details || null;

  const { сharacters, pagination } = await getAllCharacters(
    filter || _DefaultFilterWord,
    pageNum || _DefaultPage
  );
  const сharacterDetails =
    сharacters &&
    details &&
    Number(details) >= 0 &&
    Number(details) <= сharacters.length
      ? await getCharacter(сharacters[Number(details) - 1].id)
      : null;

  return (
    <>
      <Pagination pagination={pagination} />
      <CardList сharacters={сharacters} />
      <CardDetails character={сharacterDetails} />
    </>
  );
}
