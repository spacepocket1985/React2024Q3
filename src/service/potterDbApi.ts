import {
  ApiResponseForCharType,
  ApiResponseType,
  CharacterType,
  PotterDbApiReturnType,
} from '../types';
import NoImage from '../assets/no-image.png';
import { useHttp } from '../hooks/useHttp';
import { useCallback } from 'react';

export const PotterDbApi = (): PotterDbApiReturnType => {
  const _ApiBase = 'https://api.potterdb.com/v1/characters';
  const _Offset = '?page[size]=';
  const _Page = '&page[number]=';
  const _Filter = '&filter[name_cont]=';

  const _DefaultOffset = '15';
  const _DefaultPage = 1;
  const _DefaultFilterWord = '';

  const { loading, request, error, clearError } = useHttp();

  const getCharacters = useCallback(
    async (
      filterWord = _DefaultFilterWord,
      pageNumber = _DefaultPage,
      offsetNumber = _DefaultOffset
    ): Promise<ApiResponseType> => {
      const res = (await request(
        _ApiBase +
          _Offset +
          offsetNumber +
          _Page +
          pageNumber +
          _Filter +
          filterWord
      )) as ApiResponseType;
      const updateData = {
        ...res,
        data: res.data.map((item) => transformCharacter(item)),
      };
      return updateData;
    },
    [request]
  );

  const getCharacter = useCallback(
    async (id: string): Promise<ApiResponseForCharType> => {
      const res = (await request(
        `${_ApiBase}/${id}`
      )) as ApiResponseForCharType;

      const updateData = {
        ...res,
        data: transformCharacter(res.data),
      };

      return updateData;
    },
    [request]
  );

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
