import Image from 'next/image';

import { ErrorMsgPropsType } from '../../types';
import errorImg from '../../assets/error.gif';
import styles from '../../styles/ErrorMessage.module.css';

export const ErrorMessage = (props: ErrorMsgPropsType): JSX.Element => {
  return (
    <div data-testid="errorMessage">
      <h2 className={styles.errorTitle}>Error message</h2>
      <Image className={styles.errorImg} src={errorImg} alt="Error" />
      <p className={styles.errorInfo}>{props.errorMsg}</p>
    </div>
  );
};
