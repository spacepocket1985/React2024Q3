import { useEffect, useRef } from 'react';
import { useAppDispatch } from '../../hooks/storeHooks';
import {
  addSelectedChar,
  removeSelectedChar,
  selectCharacter,
} from '../../store/slices/charactersSlice';
useAppDispatch;
import { TransformCharacterType } from '../../types';
import styles from './CardCheckBox.module.css';

type CardCheckBoxPropsType = {
  character: TransformCharacterType;
  onRefChange?: (ref: React.RefObject<HTMLInputElement>) => void;
};

export const CardCheckBox = (props: CardCheckBoxPropsType): JSX.Element => {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const { character, onRefChange } = props;

  useEffect(() => {
    if (onRefChange) onRefChange(checkboxRef);
  }, [onRefChange, checkboxRef]);

  const dispatch = useAppDispatch();
  const handleCheckboxChange = () => {
    if (checkboxRef.current === null) return;
    const isChecked = checkboxRef.current.checked;
    dispatch(selectCharacter(character.id));
    if (isChecked) dispatch(addSelectedChar(character));
    else dispatch(removeSelectedChar(character.id));
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.cardCheckBox}>
        <input
          type="checkbox"
          ref={checkboxRef}
          onChange={handleCheckboxChange}
          checked={props.character.isSelected}
        />
      </label>
    </div>
  );
};
