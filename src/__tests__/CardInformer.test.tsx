import { fireEvent, render, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

import { mockInitialState } from './mocks/mocksData';
import { Provider } from 'react-redux';
import { CardInformer } from '../components/cardInformer/CardInformer';

describe('Tests for the CardInformer component', () => {
  const mockStore = configureMockStore();
  const mockDataStore = mockStore(mockInitialState);

  it('Checks that the component is rendered when there are cards selected', async () => {
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

  it('should trigger download when Download button is clicked', async () => {
    window.URL.createObjectURL = vitest.fn();
    window.URL.revokeObjectURL = vitest.fn();
    HTMLAnchorElement.prototype.click = vitest.fn();

    render(
      <Router>
        <Provider store={mockDataStore}>
          <CardInformer />
        </Provider>
      </Router>
    );

    const downloadButton = await screen.findByText('Download');
    await fireEvent.click(downloadButton);

    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalled();
  });
});
