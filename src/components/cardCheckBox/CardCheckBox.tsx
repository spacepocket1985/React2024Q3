import { useRef } from 'react';
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
};

export const CardCheckBox = ({ character }: CardCheckBoxPropsType): JSX.Element => {
  const checkboxRef = useRef<HTMLInputElement>(null);
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
      <input
        type="checkbox"
        ref={checkboxRef}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};
