import { BrowserRouter as Router } from 'react-router-dom';

import { AppRouter } from './routes/AppRouter';

import './index.css';

const App = (): JSX.Element => {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
};

export default App;
