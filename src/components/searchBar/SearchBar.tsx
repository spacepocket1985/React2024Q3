import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import { PotterDbApi } from '../../service/potterDbApi';
import { SearchBarPropsType } from '../../types';

import HarryPotterImg from './harry_potter.png';
import styles from './SearchBar.module.css';

export const SearchBar = (props: SearchBarPropsType): JSX.Element => {
  const { _DefaultFilterWord, _DefaultPage } = PotterDbApi();
  const navigate = useNavigate();

  const [searchTerm] = useLocalStorage();
  const [searchBarData, setSearchBarData] = useState(
    searchTerm || _DefaultFilterWord
  );

  const onUpdateSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchTerm = event.target.value.trim();
    setSearchBarData(searchTerm);
  };

  const onSubmit = (event: React.MouseEvent): void => {
    event.preventDefault();
    props.onSearchSubmit(searchBarData);
    navigate(`/searchPage?pageNumber=${_DefaultPage}&filter=${searchBarData}`);
  };

  return (
    <div className={styles.searhWrapper}>
      <img src={HarryPotterImg} alt="Harry Potter image" />
      <form>
        <input
          type="text"
          placeholder="name for search"
          onChange={onUpdateSearch}
          value={searchBarData}
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
