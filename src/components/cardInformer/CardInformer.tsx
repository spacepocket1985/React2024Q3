import { useAppSelector } from '../../hooks/storeHooks';
import styles from './CardInformer.module.css';
export const CardInformer = (): JSX.Element => {
  const countSelectedCards = useAppSelector(
    (state) => state.characters.selectedChacharacters.length
  );

  const content = (
    <div
      className={styles.informweWrapper}
    >{`Selected - ${countSelectedCards} cards`}</div>
  );

  return <>{countSelectedCards && content}</>;
};
