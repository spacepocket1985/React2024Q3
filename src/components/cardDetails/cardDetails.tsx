import { ErrorMessage } from '../errorMessage/ErrorMessage';
import { Spinner } from '../spinner/Spinner';

import { CharacterType } from '../../types';
import styles from './cardDetails.module.css';
import { useGetCharacterQuery } from '../../store/slices/apiSlice';
import { useAppSelector } from '../../hooks/storeHooks';
import { useDispatch } from 'react-redux';
import { setCardDetails } from '../../store/slices/appDataSlice';

export const CardDetails = (): JSX.Element => {
  const dispatch = useDispatch();

  const cardDetails = useAppSelector((state) => state.appData.cardDetails);
  const characterList = useAppSelector(
    (state) => state.characters.characterList
  );
  const characterId = characterList[Number(cardDetails) - 1].id;
  const {
    data: character,
    isFetching,
    isError,
  } = useGetCharacterQuery(characterId);

  const handleHideCardDetails = () => {
    dispatch(setCardDetails(''));
  };

  const content = !(isFetching || isError || !character) ? (
    <View character={character} cardDetails={cardDetails} />
  ) : null;

  return (
    <div className={styles.cardMainContainer}>
      {isError && <ErrorMessage errorMsg={isError.toString()} />}
      {isFetching && <Spinner />}

      <div>
        <div className={styles.backdrop} onClick={handleHideCardDetails}></div>
        <div className={styles.characterWrapper}>
          <button
            className={styles.characterTitleButton}
            onClick={handleHideCardDetails}
            data-testid="closeDetailsBtn"
          >
            X
          </button>

          {content}
        </div>
      </div>
    </div>
  );
};

type CharacterViewPropsType = {
  character: CharacterType;
  cardDetails: string | null;
};

const View = (props: CharacterViewPropsType) => {
  const { name, gender, image, species, born, blood_status, eye_color } =
    props.character.attributes;
  return (
    <>
      <div className={styles.characterTitle}>
        <h2>Character details - {props.cardDetails}</h2>
      </div>
      <div className={styles.characterImgWrapper}>
        <img src={image!} alt={name} />
      </div>
      <div className={styles.characterContentWrapper}>
        <h3 className={styles.characterName}>{name}</h3>
        <div className={styles.characterContentDetail}>
          <div>
            <span className={styles.detailTitle}>Gender</span> - {gender}
          </div>
          <div>
            <span className={styles.detailTitle}>born</span> - {born}
          </div>
          <div>
            <span className={styles.detailTitle}>Blood status</span> -{' '}
            {blood_status}
          </div>
          <div>
            <span className={styles.detailTitle}>Species</span> - {species}
          </div>
          <div>
            <span className={styles.detailTitle}>Eye color</span> -{eye_color}
          </div>
        </div>
      </div>
    </>
  );
};
