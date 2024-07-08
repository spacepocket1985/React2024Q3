import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import { PotterDbApi } from '../../service/potterDbApi';
import { SearchBarPropsType } from '../../types';

import HarryPotterImg from './harry_potter.png';
import styles from './SearchBar.module.css';

export const SearchBar = (props: SearchBarPropsType): JSX.Element => {
  const { _DefaultPage } = PotterDbApi();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useLocalStorage();

  const onUpdateSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchTerm = event.target.value.trim();
    setSearchTerm(searchTerm);
  };

  const onSubmit = (event: React.MouseEvent): void => {
    event.preventDefault();

    navigate(`/searchPage?pageNumber=${_DefaultPage}&filter=${searchTerm}`);
  };

  return (
    <div className={styles.searhWrapper}>
      <img src={HarryPotterImg} alt="Harry Potter image" />
      <form>
        <input
          type="text"
          placeholder="name for search"
          onChange={onUpdateSearch}
          value={searchTerm || ''}
        />
        <button
          disabled={!!props.loading}
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
