import { Card } from '../card/Card';
import { CardInformer } from '../cardInformer/CardInformer';
import { Spinner } from '../spinner/Spinner';

import styles from '../../styles/CardList.module.css';
import { TransformCharacterType } from '../../types';

type CardListPropsType = {
  сharacters: TransformCharacterType[];
};

export const CardList = (props: CardListPropsType): JSX.Element => {
  console.log('CardList props - ', props)
  const { сharacters } = props;
  //const isLoading = useAppSelector((state) => state.appData.isLoading);
  const isLoading = false;

  const content =
    сharacters &&
    сharacters.map((character, index) => (
      <Card key={character.id} character={character} index={index + 1} />
    ));

  return (
    <div className={styles.charactersWrapper}>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          {content}
          <CardInformer />
        </>
      )}

      {/* {!isLoading && сharacters.length === 0 && (
        <h2>No characters found for your last request!</h2>
      )} */}
    </div>
  );
};
