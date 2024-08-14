import { Link } from 'react-router-dom';
import { RoutePaths } from '../../routes/routePaths';
import styles from '../../styles/Menu.module.css';

const Menu = (): JSX.Element => {
  return (
    <nav>
      <Link to={RoutePaths.MainPage} className={styles.menuLink}>Home</Link>
      <Link to={RoutePaths.ReactFrom} className={styles.menuLink}>ReactForm</Link>
      <Link to={RoutePaths.SimpleForm} className={styles.menuLink}>SimpleForm</Link>

    </nav>
  );
};

export default Menu;
