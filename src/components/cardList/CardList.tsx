'use client';

import { Card } from '../card/Card';
import { CardInformer } from '../cardInformer/CardInformer';
import { Spinner } from '../spinner/Spinner';

import styles from '../../styles/CardList.module.css';
import { TransformCharacterType } from '../../types';
import { useAppSelector, useAppDispatch } from '../../hooks/storeHooks';
import { setLoading } from '../../store/slices/appDataSlice';

type CardListPropsType = {
  сharacters: TransformCharacterType[];
};

export const CardList = (props: CardListPropsType): JSX.Element => {
  const { сharacters } = props;

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.appData.isLoading);
  if (сharacters) dispatch(setLoading(false));

  const content =
    сharacters &&
    сharacters.map((character, index) => (
      <Card key={character.id} character={character} index={index + 1} />
    ));

  return (
    <div className={styles.charactersWrapper}>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          {content}
          <CardInformer />
          {!isLoading && сharacters.length === 0 && (
            <h2>No characters found for your last request!</h2>
          )}
        </>
      )}
    </div>
  );
};
