import { ApiResponseType, CharacterType } from '../types';
import NoImage from '../assets/no-image.png';
import { useHttp } from '../hooks/useHttp';

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
  loading: boolean;
  error: string;
  clearError: () => void;
} => {
  const _ApiBase = 'https://api.potterdb.com/v1/characters';
  const _Offset = '?page[size]=';
  const _Page = '&page[number]=';
  const _Filter = '&filter[name_cont]=';

  const _DefaultOffset = '15';
  const _DefaultPage = '1';
  const _DefaultFilterWord = '';

  const { loading, request, error, clearError } = useHttp();

  const getCharacters = async (
    filterWord = _DefaultFilterWord,
    offsetNumber = _DefaultOffset,
    pageNumber = _DefaultPage
  ): Promise<ApiResponseType> => {
    const res = await request(
      _ApiBase +
        _Offset +
        offsetNumber +
        _Page +
        pageNumber +
        _Filter +
        filterWord
    );
    const updateData = {
      ...res,
      data: res.data.map((item) => transformCharacter(item)),
    };
    return updateData;
  };

  const getCharacter = async (id: string): Promise<ApiResponseType> => {
    const res = await request(`${_ApiBase}/${id}`);
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

  const transformCharacter = (character: CharacterType): CharacterType => {
    const updatedCharacter = { ...character };
    if (character.attributes.gender === null) {
      updatedCharacter.attributes.gender = 'Unknown';
    }
    if (character.attributes.image === null) {
      updatedCharacter.attributes.image = NoImage;
    }
    return updatedCharacter;
  };

  return {
    loading,
    error,
    clearError,
    getCharacters,
    getCharacter,
    _DefaultPage,
    _DefaultOffset,
    _DefaultFilterWord,
  };
};
