import { Provider } from 'react-redux';
import ErrorBoundary from 'src/components/errorBoundary/ErrorBoundary';
import { ThemeProvider } from 'src/context/ThemeContext';
import { store } from 'src/store/store';




export function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>{children}</ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
