import { ApiResponseType } from '../types';

const _ApiBase = 'https://api.potterdb.com/v1/characters';
const _Offset = '?page[size]=';
const _Page = '&page[number]=';
const _Filter = '&filter[name_cont]=';

export const _DefaultOffset = '15'; 
export const _DefaultPage = '1'; 
export const _DefaultFilterWord = ''; 

export class PotterDbApi {
  getResource = async (url: string): Promise<ApiResponseType> => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

    return await response.json();
  };

  getCharacters = async (
    offsetNumber = _DefaultOffset,
    pageNumber = _DefaultPage,
    filterWord = _DefaultFilterWord
  ): Promise<ApiResponseType> =>
    this.getResource(
      _ApiBase +
        _Offset +
        offsetNumber +
        _Page +
        pageNumber +
        _Filter +
        filterWord
    );
}
