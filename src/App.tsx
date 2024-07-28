import { BrowserRouter as Router } from 'react-router-dom';

import { AppRouter } from './routes/AppRouter';
import { ThemeSwitcher } from './components/themeSwitcher/ThemeSwitcher';

import { useTheme } from './context/ThemeContext';
import './index.css';

const App = (): JSX.Element => {
  const { theme } = useTheme();
  return (
    <Router>
      <div className={`${theme} base`}>
        <ThemeSwitcher />
        <AppRouter />
      </div>
    </Router>
  );
};

export default App;
