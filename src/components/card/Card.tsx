import { useAppDispatch } from '../../hooks/storeHooks';
import { useRef } from 'react';
import { setCardDetails } from '../../store/slices/appDataSlice';
import { CardCheckBox } from '../cardCheckBox/CardCheckBox';
import { CardPropsType } from '../../types';
import styles from './Card.module.css';
import {
  addSelectedChar,
  removeSelectedChar,
  selectCharacter,
} from '../../store/slices/charactersSlice';

export const Card = (props: CardPropsType): JSX.Element => {
  const {
    attributes: { image, name, gender },
  } = props.character;
  const dispatch = useAppDispatch();
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== checkboxRef.current)
      dispatch(setCardDetails(String(props.index)));
  };

  const checkboxRef = useRef<HTMLInputElement>(null);

  const handleCheckboxChange = () => {
    if (checkboxRef.current === null) return;
    const isChecked = checkboxRef.current.checked;
    dispatch(selectCharacter(props.character.id));
    if (isChecked) dispatch(addSelectedChar(props.character));
    else dispatch(removeSelectedChar(props.character.id));
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
        <input
          type="checkbox"
          ref={checkboxRef}
          onChange={handleCheckboxChange}
        />
        <CardCheckBox character={props.character} />
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
