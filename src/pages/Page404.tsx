import errorImg from '../components/errorMessage/error.gif';
import styles from './Page404.module.css';

export const Page404 = (): JSX.Element => {
  return (
    <>
      <h2 className={styles.page404Title}>404</h2>
      <h3 className={styles.page404Title}>page not found</h3>
      <img className={styles.pafe404Img} src={errorImg} alt="Error" />;
    </>
  );
};
