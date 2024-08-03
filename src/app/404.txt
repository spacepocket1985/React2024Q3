import React from 'react';
import Image from 'next/image';
import errorImg from '../assets/error.gif';
import styles from '../styles/Page404.module.css';
import Link from 'next/link';

const Page404 = (): JSX.Element => {
  return (
    <>
      <h2 className={styles.page404Title}>404</h2>
      <h3 className={styles.page404Title}>page not found</h3>
      <Image width={100} height={100} className={styles.pafe404Img} src={errorImg} alt="Error" />
      <Link href="/">
        <button className="buttonError">Go home</button>
      </Link>
    </>
  );
};

export default Page404;
