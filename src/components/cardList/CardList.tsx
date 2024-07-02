import { Component } from 'react';
import { CardListPropsType } from '../../types/CardListPropsType';
import { Card } from '../card/Card';

import styles from './CardList.module.css';

export class CardList extends Component<CardListPropsType> {
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
        <h2>Sorry, we dont have any data</h2>
      );
    return (
      <>
        <h2>CardList</h2>
        <div className={styles.charactersWrapper}>{content}</div>
      </>
    );
  }
}
