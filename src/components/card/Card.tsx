import { useAppDispatch } from '../../hooks/storeHooks';
import { useState } from 'react';
import { setCardDetails } from '../../store/slices/appDataSlice';
import { CardCheckBox } from '../cardCheckBox/CardCheckBox';
import { CardPropsType } from '../../types';
import styles from '../../styles/Card.module.css';

export const Card = (props: CardPropsType): JSX.Element => {
  const [ref, setRef] = useState<React.RefObject<HTMLInputElement> | null>(
    null
  );
  const {
    attributes: { image, name, gender },
  } = props.character;
  const dispatch = useAppDispatch();

  const handleRefChange = (ref: React.RefObject<HTMLInputElement>) => {
    setRef(ref);
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== ref!.current)
      dispatch(setCardDetails(String(props.index-1)));
  };

  return (
    <div
      className={styles.characterWrapper}
      onClick={(e) => {
        handleCardClick(e);
      }}
      data-testid="card"
    >
      <div>
        <CardCheckBox
          character={props.character}
          onRefChange={handleRefChange}
        />
      </div>
      <div className={styles.characterImgWrapper}>
        <img src={image!} alt={name} />
      </div>
      <div className={styles.characterContentWrapper}>
        <div className={styles.characterName}>{name}</div>
        <div>
          <span className={styles.heading}>Gender - </span> {gender}
        </div>
      </div>
    </div>
  );
};
