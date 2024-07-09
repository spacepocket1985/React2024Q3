import { Link, useLocation } from 'react-router-dom';
import { CardPropsType } from '../../types';
import styles from './Card.module.css';

export const Card = (props: CardPropsType): JSX.Element => {
  const {
    attributes: { image, name, gender },
  } = props.character;

  const location = useLocation();
  const { search } = location;

  return (
    <Link to={`${search}&details=${props.index + 1}`}>
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
    </Link>
  );
};
