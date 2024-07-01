import { Component } from 'react';

import './App.css';
import { AppStateType } from './types/AppStateType';
import { ApiResponseType } from './types/ApiResponseType';
import { PotterDbApi } from './service/potterDbApi';
import { SearchBar } from './components/searchBar/SearchBar';

class App extends Component<object, AppStateType> {
  constructor(props: object) {
    super(props);
    this.state = {
      charactersList: [],
    };
  }
  potterDbApi = new PotterDbApi();

  componentDidMount() {
    //this.onRequest();
  }

  onRequest = (offset?: string, page?: string, filter = '') => {
    this.potterDbApi
      .getCharacters(offset, page, filter)
      .then(this.onСharactersListLoaded);
  };

  onСharactersListLoaded = (ApiResponse: ApiResponseType): void => {
    this.setState({
      charactersList: ApiResponse.data.map((char) => char),
    });
  };
  render() {
    return (
      <div>
        <SearchBar />
      </div>
    );
  }
}

export default App;
