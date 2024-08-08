import { useAppDispatch } from '../../hooks/storeHooks';
import { useState } from 'react';
import { setCardDetails } from '../../store/slices/appDataSlice';
import { CardCheckBox } from '../cardCheckBox/CardCheckBox';
import { CardPropsType } from '../../types';
import styles from './Card.module.css';
import { useSearchParams } from '@remix-run/react';

export const Card = (props: CardPropsType): JSX.Element => {
  const [ref, setRef] = useState<React.RefObject<HTMLInputElement> | null>(
    null
  );
  const {
    attributes: { image, name, gender },
  } = props.character;
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const handleRefChange = (ref: React.RefObject<HTMLInputElement>) => {
    setRef(ref);
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== ref!.current)
      dispatch(setCardDetails(String(props.index)));

    const filter = searchParams.get('filter') || '';
    const pageNum = searchParams.get('pageNum') || '1';
    setSearchParams({ filter, pageNum, details: String(props.index) });
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
