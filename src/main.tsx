import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './store/store';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

import './index.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <Provider store={store}>
        <App />
    </Provider>
  </ErrorBoundary>
);
