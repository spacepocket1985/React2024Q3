import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/storeHooks';
import {
  removeAllSelectedChars,
  unSelectAllCharacters,
} from '../../store/slices/charactersSlice';
import styles from './CardInformer.module.css';
export const CardInformer = (): JSX.Element => {
  const countSelectedCards = useAppSelector(
    (state) => state.characters.selectedChacharacters.length
  );

  const [isInformerAnimated, setIsInformerAnimated] = useState(false);
  const dispatch = useAppDispatch();
  const informerClass = `${styles.informer} ${
    isInformerAnimated ? styles.bump : ''
  }`;

  useEffect(() => {
    if (countSelectedCards === 0) {
      return;
    }
    setIsInformerAnimated(true);

    const timer = setTimeout(() => {
      setIsInformerAnimated(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [countSelectedCards]);

  const handlerUnselectAll = () => {
    dispatch(removeAllSelectedChars());
    dispatch(unSelectAllCharacters());
  };

  const content = (
    <div className={styles.informweWrapper}>
      <div
        className={informerClass}
      >{`Selected - ${countSelectedCards} cards`}</div>
      <button onClick={handlerUnselectAll}>Unselect all</button>
      <button>Download</button>
    </div>
  );

  return <>{countSelectedCards > 0 && content}</>;
};
