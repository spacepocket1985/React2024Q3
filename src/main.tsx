import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
