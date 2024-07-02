import { Component } from 'react';
import { CardListPropsType, EmptyStateType } from '../../types';
import { Card } from '../card/Card';

import styles from './CardList.module.css';

export class CardList extends Component<CardListPropsType, EmptyStateType> {
  constructor(props: CardListPropsType) {
    super(props);
  }
  render() {
    const { charactersList } = this.props;
    
    const content =
      charactersList.length > 0 ? (
        charactersList.map((character) => (
          <Card key={character.id} character={character} />
        ))
      ) : (
        <h2>No characters found for your last request!</h2>
      );
    return (
      <>
        <div className={styles.charactersWrapper}>{content}</div>
      </>
    );
  }
}
