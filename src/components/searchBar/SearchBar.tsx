import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import { setFilterWord } from '../../store/slices/appDataSlice';

import HarryPotterImg from './harry_potter.png';
import styles from './SearchBar.module.css';

export const SearchBar = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useLocalStorage();
  const isLoading = useAppSelector((state) => state.appData.isLoading);
  const onUpdateSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchTerm = event.target.value.trim();
    setSearchTerm(searchTerm);
  };

  const onSubmitHandler = (event: React.MouseEvent): void => {
    event.preventDefault();
    dispatch(setFilterWord(searchTerm || ''));
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
          data-testid="searchInput"
        />
        <button
          data-testid="serachSubmit"
          onClick={(event) => {
            onSubmitHandler(event);
          }}
          disabled={isLoading}
        >
          Search
        </button>
      </form>
    </div>
  );
};
