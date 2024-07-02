import { Component } from 'react';

import {
  PotterDbApi,
  _DefaultFilterWord,
  _DefaultOffset,
  _DefaultPage,
} from './service/potterDbApi';
import { SearchBar } from './components/searchBar/SearchBar';
import { CardList } from './components/cardList/CardList';
import { AppStateType, ApiResponseType, EmptyPropsType } from './types';

import './App.css';
import { getSearchTerm } from './utils/localStorageActions';
import Spinner from './components/spinner/Spinner';

class App extends Component<EmptyPropsType, AppStateType> {
  constructor(props: EmptyPropsType) {
    super(props);
    this.state = {
      charactersList: [],
      isLoading: false,
      error: '',
    };
  }
  potterDbApi = new PotterDbApi();

  componentDidMount() {
    const searchTerm = getSearchTerm();
    this.onRequest(
      _DefaultOffset,
      _DefaultPage,
      searchTerm || _DefaultFilterWord
    );
  }

  onRequest = (offset?: string, page?: string, filter = ''): void => {
    this.setState({ isLoading: true });
    this.potterDbApi
      .getCharacters(offset, page, filter)
      .then(this.onСharactersListLoaded)
      .catch(this.onError);
  };

  onСharactersListLoaded = (apiResponse: ApiResponseType): void => {
    this.setState({
      charactersList: apiResponse.data.map((char) => char),
      isLoading: false,
      error: '',
    });
  };

  onError = (error: Error) => {
    this.setState({
      isLoading: false,
      error: error.message,
    });
  };

  onSearchSubmit = (searchTerm: string): void => {
    this.onRequest(_DefaultOffset, _DefaultPage, searchTerm);
  };

  render() {
    const { charactersList, error, isLoading } = this.state;
    const errorMsg = error ? <h3>{error}</h3> : null;
    const spinner = isLoading ? <Spinner /> : null;
    const content = !(isLoading || error) ? (
      <CardList charactersList={charactersList} />
    ) : null;

    return (
      <div>
        <SearchBar onSearchSubmit={this.onSearchSubmit} />
        {errorMsg}
        {spinner}
        {content}
      </div>
    );
  }
}

export default App;
