'use client';

import { Card } from '../card/Card';
import { CardInformer } from '../cardInformer/CardInformer';
import { TransformCharacterType } from '../../types';
import { useAppDispatch } from '../../hooks/storeHooks';
import { setLoading } from '../../store/slices/appDataSlice';
import { setCharacters } from '../../store/slices/charactersSlice';

import styles from '../../styles/CardList.module.css';

type CardListPropsType = {
  сharacters: TransformCharacterType[];
};

export const CardList = (props: CardListPropsType): JSX.Element => {
  const { сharacters } = props;

  const dispatch = useAppDispatch();
  if (сharacters) {
    dispatch(setLoading(false));
    dispatch(setCharacters(сharacters));
  }

  const content =
    сharacters &&
    сharacters.map((character, index) => (
      <Card key={character.id} character={character} index={index + 1} />
    ));

  return (
    <div className={styles.charactersWrapper}>
      {content}
      <CardInformer />
    </div>
  );
};
