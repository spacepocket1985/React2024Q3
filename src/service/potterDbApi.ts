import { ApiResponseType } from '../types';
import NoImage from '../assets/no-image.png';

export const PotterDbApi = (): {
  getCharacters: (
    offsetNumber?: string,
    pageNumber?: string,
    filterWord?: string
  ) => Promise<ApiResponseType>;
  getCharacter: (id: string) => Promise<ApiResponseType>;
  _DefaultPage: string;
  _DefaultOffset: string;
  _DefaultFilterWord: string;
} => {
  const _ApiBase = 'https://api.potterdb.com/v1/characters';
  const _Offset = '?page[size]=';
  const _Page = '&page[number]=';
  const _Filter = '&filter[name_cont]=';

  const _DefaultOffset = '15';
  const _DefaultPage = '1';
  const _DefaultFilterWord = '';

  const getResource = async (url: string): Promise<ApiResponseType> => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

    return await response.json();
  };

  const getCharacters = async (
    offsetNumber = _DefaultOffset,
    pageNumber = _DefaultPage,
    filterWord = _DefaultFilterWord
  ): Promise<ApiResponseType> => {
    const res = await getResource(
      _ApiBase +
        _Offset +
        offsetNumber +
        _Page +
        pageNumber +
        _Filter +
        filterWord
    );
    return updateResponseData(res);
  };

  const getCharacter = async (id: string): Promise<ApiResponseType> => {
    const res = await getResource(`${_ApiBase}/${id}`);
    return updateResponseData(res);
  };

  const updateResponseData = (
    responseData: ApiResponseType
  ): ApiResponseType => {
    return {
      data: responseData.data.map((character) => {
        const updatedCharacter = { ...character };
        if (character.attributes.gender === null) {
          updatedCharacter.attributes.gender = 'Unknown';
        }
        if (character.attributes.image === null) {
          updatedCharacter.attributes.image = NoImage;
        }
        return updatedCharacter;
      }),
      meta: responseData.meta,
      links: responseData.links,
    };
  };

  return {
    getCharacters,
    getCharacter,
    _DefaultPage,
    _DefaultOffset,
    _DefaultFilterWord,
  };
};
