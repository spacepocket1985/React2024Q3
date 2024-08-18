import { BrowserRouter as Router } from 'react-router-dom';

import Menu from './components/menu/Menu';
import { AppRouter } from './routes/AppRouter';

import './styles/global.css';

const App = (): JSX.Element => {
  return (
    <Router>
      <Menu />
      <AppRouter />
    </Router>
  );
};

export default App;
