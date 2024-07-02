import { Component } from 'react';
import { ErrorMsgPropsType } from '../../types';

import errorImg from './error.gif';
import styles from'./ErrorMessage.module.css';

class ErrorMessage extends Component<ErrorMsgPropsType> {
  constructor(props: ErrorMsgPropsType) {
    super(props);
  }

  render() {
    return (
      <>
        <h2 className={styles.errorTitle}>Error message</h2>
        <img className={styles.errorImg} src={errorImg} alt="Error" />;
        <p className={styles.errorInfo}>{this.props.errorMsg}</p>
      </>
    );
  }
}

export default ErrorMessage;
