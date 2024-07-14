import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';

describe('ErrorBoundary Component', () => {
  it('should render children when there is no error', () => {
    const childrenContent = 'Children Content';

    const { getByText } = render(
      <MemoryRouter>
        <ErrorBoundary>{childrenContent}</ErrorBoundary>
      </MemoryRouter>
    );

    const childrenElement = getByText(childrenContent);
    expect(childrenElement).toBeInTheDocument();
  });
});
