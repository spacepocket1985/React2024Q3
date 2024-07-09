import { useCallback, useEffect, useState } from 'react';

import { PotterDbApi } from '../../service/potterDbApi';
import { ErrorMessage } from '../errorMessage/ErrorMessage';
import { Spinner } from '../spinner/Spinner';
import { RoutePaths } from '../../routes/routePaths';

import { ApiResponseForCharType, CharacterType } from '../../types';
import styles from './cardDetails.module.css';
import { Link } from 'react-router-dom';

type cardDetailsType = {
  characterId: string;
};

export const CardDetails = (props: cardDetailsType): JSX.Element => {
  const [character, setCharacter] = useState<null | CharacterType>(null);

  const { characterId } = props;

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

  const errorMessage = error ? (
    <ErrorMessage errorMsg={error.toString()} />
  ) : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !character) ? (
    <View character={character} />
  ) : null;

  return (
    <div className={styles.characterWrapper}>
      <Link to={RoutePaths.SEARCHPAGE}>
        <button className={styles.characterTitleButton}>X</button>
      </Link>

      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

type CharacterViewPropsType = {
  character: CharacterType;
};
const View = (props: CharacterViewPropsType) => {
  const { name, gender, image, species, born, blood_status, eye_color } =
    props.character.attributes;
  return (
    <>
      <div className={styles.characterTitle}>
        <h2>Character info</h2>
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
