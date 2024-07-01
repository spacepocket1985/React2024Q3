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
    return (
      <>
        <h2>CardList</h2>
        <div className={styles.charactersWrapper}>
          {charactersList.map((character) => (
            <Card character={character} />
          ))}
        </div>
      </>
    );
  }
}
