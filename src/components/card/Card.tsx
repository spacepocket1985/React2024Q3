import { Component } from 'react';

import { CardPropsType, EmptyStateType } from '../../types';
import styles from './Card.module.css';

export class Card extends Component<CardPropsType, EmptyStateType> {
  constructor(props: CardPropsType) {
    super(props);
  }
  render(): JSX.Element {
    const { image, name, gender } = this.props.character.attributes;
    return (
      <div className={styles.characterWrapper}>
        <div className={styles.characterImgWrapper}>
          <img src={image!} alt={name} />
        </div>
        <div className={styles.characterContentWrapper}>
          <div className={styles.characterName}>{name}</div>
          <div>
            <span className={styles.heading}>Gender - </span> {gender}
          </div>
        </div>
      </div>
    );
  }
}
