import { useState } from 'react';

import { PotterDbApi } from '../../service/potterDbApi';
import { SearchBarPropsType, SearchBarStateType } from '../../types';
import { getSearchTerm, setSearchTerm } from '../../utils/localStorageActions';

import HarryPotterImg from './harry_potter.png';
import styles from './SearchBar.module.css';

export const SearchBar = (props: SearchBarPropsType): JSX.Element => {
  const { _DefaultFilterWord } = PotterDbApi();
  const [searchBarData, setSearchBarData] = useState<SearchBarStateType>({
    searchTerm: getSearchTerm() || _DefaultFilterWord,
  });

  const { searchTerm } = searchBarData;

  const onUpdateSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchTerm = event.target.value.trim();
    setSearchBarData({ ...searchBarData, searchTerm });
  };

  const onSubmit = (event: React.MouseEvent): void => {
    event.preventDefault();
    setSearchTerm(searchTerm);
    props.onSearchSubmit();
  };

  return (
    <div className={styles.searhWrapper}>
      <img src={HarryPotterImg} alt="Harry Potter image" />
      <form>
        <input
          type="text"
          placeholder="name for search"
          onChange={onUpdateSearch}
          value={searchTerm}
        />
        <button
          onClick={(event) => {
            onSubmit(event);
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
};
