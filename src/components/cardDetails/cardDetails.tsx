import { useCallback, useEffect, useState } from 'react';

import { PotterDbApi } from '../../service/potterDbApi';
import { ErrorMessage } from '../errorMessage/ErrorMessage';
import { Spinner } from '../spinner/Spinner';

import { ApiResponseForCharType, CharacterType } from '../../types';
import styles from './cardDetails.module.css';

type cardDetailsPropsType = {
  characterId: string;
  onHideCardDetails: () => void;
  cardDetails: string;
};

export const CardDetails = (props: cardDetailsPropsType): JSX.Element => {
  const [character, setCharacter] = useState<null | CharacterType>(null);

  const { characterId, onHideCardDetails, cardDetails } = props;
  const { getCharacter, error, loading } = PotterDbApi();

  const showCharacter = useCallback(() => {
    if (!characterId) {
      return;
    }

    getCharacter(characterId).then(onCharacterLoaded);
  }, [characterId, getCharacter]);

  useEffect(() => {
    showCharacter();
  }, [showCharacter, characterId]);

  const onCharacterLoaded = (apiResponse: ApiResponseForCharType) => {
    setCharacter(apiResponse.data);
  };

  const handleHideCardDetails = () => {
    setCharacter(null);
    onHideCardDetails();
  };

  const errorMessage = error ? (
    <ErrorMessage errorMsg={error.toString()} />
  ) : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !character) ? (
    <View character={character} cardDetails={cardDetails} />
  ) : null;

  return (
    <>
      {character && (
        <div>
          <div
            className={styles.backdrop}
            onClick={handleHideCardDetails}
          ></div>
          <div className={styles.characterWrapper}>
            <button
              className={styles.characterTitleButton}
              onClick={handleHideCardDetails}
            >
              X
            </button>

            {errorMessage}
            {spinner}
            {content}
          </div>
        </div>
      )}
    </>
  );
};

type CharacterViewPropsType = {
  character: CharacterType;
  cardDetails: string;
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
