import { render, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

import { mockInitialState } from './mocks/mocksData';
import { Provider } from 'react-redux';
import { CardInformer } from '../components/cardInformer/CardInformer';

describe('Tests for the CardInformer component', () => {
  it('Checks that the component is rendered when there are cards selected', async () => {
    const mockStore = configureMockStore();
    const mockDataStore = mockStore(mockInitialState);
    render(
      <Router>
        <Provider store={mockDataStore}>
          <CardInformer />
        </Provider>
      </Router>
    );
    const textInformer = await screen.getByText(
      `Selected - ${mockInitialState.characters.selectedChacharacters.length} cards`
    );
    const downloadBtn = await screen.getByText('Download');
    const unselectBtn = await screen.getByText('Unselect all');
    expect(textInformer).toBeInTheDocument();
    expect(downloadBtn).toBeInTheDocument();
    expect(unselectBtn).toBeInTheDocument();
  });
});
