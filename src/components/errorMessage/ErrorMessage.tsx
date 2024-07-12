import { ErrorMsgPropsType } from '../../types';

import errorImg from './error.gif';
import styles from './ErrorMessage.module.css';

export const ErrorMessage = (props: ErrorMsgPropsType): JSX.Element => {
  return (
    <div data-testid="errorMessage">
      <h2 className={styles.errorTitle}>Error message</h2>
      <img className={styles.errorImg} src={errorImg} alt="Error" />;
      <p className={styles.errorInfo}>{props.errorMsg}</p>
    </div>
  );
};
