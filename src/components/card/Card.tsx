import { CardPropsType } from '../../types';
import styles from './Card.module.css';

export const Card = (props: CardPropsType): JSX.Element => {
  const { image, name, gender } = props.character.attributes;
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
};
