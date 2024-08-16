import { Link } from 'react-router-dom';
import { RoutePaths } from '../routes/routePaths';

import styles from './Page404.module.css';

export const Page404 = (): JSX.Element => {
  return (
    <>
      <h2 className={styles.page404Title}>404</h2>
      <h3 className={styles.page404Title}>page not found</h3>

      <Link to={RoutePaths.MainPage}>
        <button className="buttonError">Go home</button>
      </Link>
    </>
  );
};
