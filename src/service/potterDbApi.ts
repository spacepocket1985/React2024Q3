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
  ): Promise<ApiResponseType> => {
    const res = await this.getResource(
      _ApiBase +
        _Offset +
        offsetNumber +
        _Page +
        pageNumber +
        _Filter +
        filterWord
    );
    return this.updateResponseData(res);
  };

  updateResponseData(responseData: ApiResponseType): ApiResponseType {
    return {
      data: responseData.data.map((character) => {
        const updatedCharacter = character;
        if (character.attributes.gender === null) {
          updatedCharacter.attributes.gender = "Unknown";
        }
        if (character.attributes.image === null) {
          updatedCharacter.attributes.image = "src/assets/no-image.png";
        }
        return updatedCharacter;
      }),
      meta: responseData.meta,
      links: responseData.links,
    };
  }
}
