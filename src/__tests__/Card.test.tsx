import { act, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Card } from '../components/card/Card';
import { responseData } from './mocks/mocksData';
import { Provider } from 'react-redux';
import { store } from '../store/store';

const mockCharacter = responseData.data[0];

describe('Tests for the Card component', () => {
  it('Ensure that the card component renders the relevant card data', async () => {
    render(
      <Router>
        <Provider store={store}>
          <Card character={mockCharacter} index={0} />
        </Provider>
      </Router>
    );

    const title = await screen.findByText(
      '1992 Gryffindor vs Slytherin Quidditch match spectators'
    );
    expect(title).toBeInTheDocument();
  });
  it('Validate that clicking on a card opens a detailed card component', async () => {
    const index = 1;
    render(
      <Router>
        <Provider store={store}>
          <Card character={mockCharacter} index={index} />
        </Provider>
      </Router>
    );
    const card = await screen.findByTestId('card');
    await act(async () => {
      await fireEvent.click(card);
    });
    const genderInformation = await screen.findByText('No one knows');
    expect(genderInformation).toBeInTheDocument;
  });
});
