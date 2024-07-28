import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';

describe('ErrorBoundary Component', () => {
  const spyError = vi.spyOn(console, 'error');
  spyError.mockImplementation(() => {});

  const ProblematicComponent = () => {
    throw new Error('Test Error');
  };

  it('should display ErrorMessage when there is an error', async () => {
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <ProblematicComponent />
        </ErrorBoundary>
      </MemoryRouter>
    );
    expect(await screen.getByText(/Error message/));
    expect(spyError).toHaveBeenCalled();
    spyError.mockRestore();
  });

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
