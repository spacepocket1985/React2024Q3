import { CardList } from '../components/cardList/CardList';
import { transformCharacter } from '../store/slices/apiSlice';
import { ApiResponseType, transformApiResponseType } from '../types';

const _ApiBase = 'https://api.potterdb.com/v1/characters';
const _Offset = '?page[size]=';
const _Page = '&page[number]=';
const _Filter = '&filter[name_cont]=';

const _DefaultOffset = '10';
const _DefaultPage = 1;
const _DefaultFilterWord = '';

export const getAllCharacters = async (
  filterWord = _DefaultFilterWord,
  pageNumber = _DefaultPage
): Promise<transformApiResponseType> => {
  const response = await fetch(
    `${_ApiBase}${_Offset}${_DefaultOffset}${_Page}${pageNumber}${_Filter}${filterWord}`
  );
  if (!response.ok) throw new Error('Unable to fetch');

  const results: Promise<ApiResponseType> = response.json();
  return {
    сharacters: (await results).data.map((item) => transformCharacter(item)),
    pagination: (await results).meta.pagination,
  };
};

export default async function SearchPage(): Promise<JSX.Element> {
  const { сharacters } = await getAllCharacters();
  return (
    <>
      <h2>SearchPage</h2>
      <CardList сharacters={сharacters} />
    </>
  );
}
