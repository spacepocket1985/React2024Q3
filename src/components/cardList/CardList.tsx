import { useAppSelector } from '../../hooks/storeHooks';

import { Card } from '../card/Card';
import { CardInformer } from '../cardInformer/CardInformer';
import { Spinner } from '../spinner/Spinner';

import styles from './CardList.module.css';

export const CardList = (): JSX.Element => {
  const results = useAppSelector((state) => state.characters.characterList);
  const isLoading = useAppSelector((state) => state.appData.isLoading);

  const content =
    results &&
    results.map((character, index) => (
      <Card key={character.id} character={character} index={index + 1} />
    ));

  return (
    <div className={styles.charactersWrapper}>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          {content}
          <CardInformer />
        </>
      )}

      {!isLoading && results.length === 0 && (
        <h2>No characters found for your last request!</h2>
      )}
    </div>
  );
};
