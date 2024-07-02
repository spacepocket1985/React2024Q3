import { Component } from 'react';

import { PotterDbApi, _DefaultFilterWord } from './service/potterDbApi';
import { SearchBar } from './components/searchBar/SearchBar';
import { CardList } from './components/cardList/CardList';
import { AppStateType, ApiResponseType } from './types';


import './App.css';

class App extends Component<object, AppStateType> {
  constructor(props: object) {
    super(props);
    this.state = {
      charactersList: [],
      isLoading: true,
      error: '',
      searchTerm: _DefaultFilterWord,
    };
  }
  potterDbApi = new PotterDbApi();

  componentDidMount() {
    this.onRequest();
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
      error: ''
    });
  };

  onError = (error: Error) => {
    this.setState({
      isLoading: false,
      error: error.message,
      searchTerm: _DefaultFilterWord,
    });
  };

  render() {
    const { charactersList } = this.state;
    return (
      <div>
        <SearchBar />
        <CardList charactersList={charactersList} />
      </div>
    );
  }
}

export default App;
