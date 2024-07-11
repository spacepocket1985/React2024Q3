import { CardListPropsType } from '../../types';
import { Card } from '../card/Card';

import styles from './CardList.module.css';

export const CardList = (props: CardListPropsType): JSX.Element => {
  const { charactersList, onCardClick } = props;

  const content =
    charactersList.length > 0 ? (
      charactersList.map((character, index) => (
        <Card
          key={character.id}
          character={character}
          index={index + 1}
          onCardClick={onCardClick}
        />
      ))
    ) : (
      <h2>No characters found for your last request!</h2>
    );
  return <div className={styles.charactersWrapper}>{content}</div>;
};
