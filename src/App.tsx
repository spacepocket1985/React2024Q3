import { Component } from 'react';

import { PotterDbApi } from './service/potterDbApi';
import { SearchBar } from './components/searchBar/SearchBar';
import { CardList } from './components/cardList/CardList';
import { AppStateType } from './types/AppStateType';
import { ApiResponseType } from './types/ApiResponseType';

import './App.css';


class App extends Component<object, AppStateType> {
  constructor(props: object) {
    super(props);
    this.state = {
      charactersList: [],
    };
  }
  potterDbApi = new PotterDbApi();

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (offset?: string, page?: string, filter = '') => {
    this.potterDbApi
      .getCharacters(offset, page, filter)
      .then(this.onСharactersListLoaded);
  };

  onСharactersListLoaded = (apiResponse: ApiResponseType): void => {
    this.setState({
      charactersList: apiResponse.data.map((char) => char),
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
