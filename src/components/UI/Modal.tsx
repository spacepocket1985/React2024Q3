import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Modal.module.css';

type ModalPropsType = {
  children: ReactNode;
};

type ModalWindowPropsType = {
  children: ReactNode;
};

const BackDrop = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.backdrop}
      onClick={() => {
        navigate('/');
      }}
    ></div>
  );
};

const ModalWindow = (props: ModalWindowPropsType): JSX.Element => {
  const { children } = props;
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export const Modal = (props: ModalPropsType): JSX.Element => {
  const { children } = props;
  return (
    <>
      <BackDrop />
      <ModalWindow>{children}</ModalWindow>
    </>
  );
};
