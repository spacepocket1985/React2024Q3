"use client"
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { setFilterWord } from '../../store/slices/appDataSlice';

import HarryPotterImg from '../../assets/harry_potter.png';
import styles from '../../styles/SearchBar.module.css';

export const SearchBar = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useLocalStorage();
  //const isLoading = useAppSelector((state) => state.appData.isLoading);
  const onUpdateSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchTerm = event.target.value.trim();
    setSearchTerm(searchTerm);
  };

  const onSubmitHandler = (event: React.MouseEvent): void => {
    event.preventDefault();
    dispatch(setFilterWord(searchTerm || ''));
    router.push(`/?page[size]=10&filter[name_cont]=${searchTerm}`)
  };

  return (
    <div className={styles.searhWrapper}>
      <Image
        src={HarryPotterImg}
        alt="Harry Potter image"
        className={styles.searhWrapperImg}
        priority
        height={135}
        width={250}
     
      />
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
        >
          Search
        </button>
      </form>
    </div>
  );
};
