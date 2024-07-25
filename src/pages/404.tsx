import React from 'react';
import Image from 'next/image';
import errorImg from '../assets/error.gif'
import styles from '../styles/Page404.module.css';

export const Page404 = (): JSX.Element => {
  return (
    <>
      <h2 className={styles.page404Title}>404</h2>
      <h3 className={styles.page404Title}>page not found</h3>
      <Image className={styles.pafe404Img} src={errorImg} alt="Error"/>
      {/* <Link to={RoutePaths.SEARCHPAGE}> */}
      <button className="buttonError">Go home</button>
      {/* </Link> */}
    </>
  );
};
