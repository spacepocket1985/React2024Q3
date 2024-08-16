import { ReactNode } from 'react';
import { useAppSelector } from '../hooks/storeHooks';
import { FormDataType } from '../types';
import styles from '../styles/MainPage.module.css';

export const MainPage = (): JSX.Element => {
  const dataFromForms = useAppSelector(
    (state) => state.formsData.dataFromForms
  );

  const renderData = (data: FormDataType[]): ReactNode => {
    return data.map((item, index) => {
      const { name, email, country, gender, age, password, picture } = item;
      return (
        
          <div className={styles.wrapperData} key={index}>
            <img src={String(picture)} alt="picture" />
            <h2 className={styles.formTitle}>{'Form data'}</h2>
            <div className={styles.formPic}></div>
            <div className={styles.dataLine}>
              <div className={styles.lineTitle}>Name</div>
              <div className={styles.lineValue}>{name}</div>
              <div className={styles.dataLine}>
                <div className={styles.lineTitle}>Gender</div>
                <div className={styles.lineValue}>{gender}</div>
              </div>
              <div className={styles.dataLine}>
                <div className={styles.lineTitle}>Age</div>
                <div className={styles.lineValue}>{age}</div>
              </div>
            </div>
            <div className={styles.dataLine}>
              <div className={styles.lineTitle}>Country</div>
              <div className={styles.lineValue}>{country}</div>
            </div>
            <div className={styles.dataLine}>
              <div className={styles.lineTitle}>Email</div>
              <div className={styles.lineValue}>{email}</div>
            </div>
            <div className={styles.dataLine}>
              <div className={styles.lineTitle}>Password</div>
              <div className={styles.lineValue}>{password}</div>
            </div>

            <div></div>
          </div>
        
      );
    });
  };

  return (
    <>
      <div className="wrapper-home">
      <h1>MainPage</h1>
        {dataFromForms.length > 0 ? (
          renderData(dataFromForms)
        ) : (
          <h2>There are no completed forms yet</h2>
        )}
      </div>
    </>
  );
};
