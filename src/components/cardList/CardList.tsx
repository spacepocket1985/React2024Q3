import { CardListPropsType } from '../../types';
import { Card } from '../card/Card';

import styles from './CardList.module.css';

export const CardList = (props: CardListPropsType): JSX.Element => {
  const { charactersList } = props;

  const content =
    charactersList.length > 0 ? (
      charactersList.map((character) => (
        <Card key={character.id} character={character} />
      ))
    ) : (
      <h2>No characters found for your last request!</h2>
    );
  return <div className={styles.charactersWrapper}>{content}</div>;
};
