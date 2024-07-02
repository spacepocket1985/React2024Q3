import { Component } from 'react';

import { _DefaultFilterWord } from '../../service/potterDbApi';
import { SearchBarPropsType, SearchBarStateType } from '../../types';
import { getSearchTerm, setSearchTerm } from '../../utils/localStorageActions';
import { ErrorButton } from '../errorButton/ErrorButton';

import HarryPotterImg from './harry_potter.png';
import styles from './SearchBar.module.css';

export class SearchBar extends Component<
  SearchBarPropsType,
  SearchBarStateType
> {
  constructor(props: SearchBarPropsType) {
    super(props);
  }

  state: SearchBarStateType = {
    searchTerm: getSearchTerm() || _DefaultFilterWord,
  };

  onUpdateSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchTerm = event.target.value.trim();
    this.setState({ searchTerm });
  };

  onSubmit = (event: React.MouseEvent): void => {
    event.preventDefault();
    setSearchTerm(this.state.searchTerm);
    this.props.onSearchSubmit(this.state.searchTerm);
  };

  render(): JSX.Element {
    const { searchTerm } = this.state;

    return (
      <div className={styles.searhWrapper}>
        <img src={HarryPotterImg} alt="Harry Potter image" />
        <form>
          <input
            type="text"
            placeholder="name for search"
            onChange={this.onUpdateSearch}
            value={searchTerm}
          />
          <button
            onClick={(event) => {
              this.onSubmit(event);
            }}
          >
            Search
          </button>
          <ErrorButton />
        </form>
      </div>
    );
  }
}
