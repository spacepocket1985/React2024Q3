import { useLocalStorage } from '../../hooks/useLocalStorage';

import { PotterDbApi } from '../../service/potterDbApi';
import { SearchBarPropsType } from '../../types';

import HarryPotterImg from './harry_potter.png';
import styles from './SearchBar.module.css';

export const SearchBar = (props: SearchBarPropsType): JSX.Element => {
  const { _DefaultFilterWord } = PotterDbApi();

  const { loading, onSearchSubmit } = props;

  const [searchTerm, setSearchTerm] = useLocalStorage();

  const onUpdateSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchTerm = event.target.value.trim();
    setSearchTerm(searchTerm);
  };

  const onSubmitHandler = (event: React.MouseEvent): void => {
    event.preventDefault();
    onSearchSubmit(searchTerm || _DefaultFilterWord);
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
          disabled={!!loading}
          onClick={(event) => {
            onSubmitHandler(event);
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
};
