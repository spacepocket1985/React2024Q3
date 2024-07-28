import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import * as useGetRtkQuery from '../store/slices/apiSlice';
import { SearchPage } from '../pages/SearchPage';

describe('Tests for the SearchPage component', () => {
  it('checks that the component contains an RTK query call when rendering', async () => {
    const spyAPIcall = vi.spyOn(useGetRtkQuery, 'useGetAllCharactersQuery');
    render(
      <Router>
        <Provider store={store}>
          <SearchPage />
        </Provider>
      </Router>
    );
    expect(spyAPIcall).toHaveBeenCalled();
  });
});
