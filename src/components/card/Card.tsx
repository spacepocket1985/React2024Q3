'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { useState } from 'react';

import { CardCheckBox } from '../cardCheckBox/CardCheckBox';
import { CardPropsType } from '../../types';
import styles from '../../styles/Card.module.css';
import Image from 'next/image';
import { useAppDispatch } from '../../hooks/storeHooks';
import { setCardDetails } from '../../store/slices/appDataSlice';

export const Card = (props: CardPropsType): JSX.Element => {
  const [ref, setRef] = useState<React.RefObject<HTMLInputElement> | null>(
    null
  );
  const {
    attributes: { image, name, gender },
  } = props.character;

  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') || '';
  const pageNum = searchParams.get('pageNum') || 1;
  const handleRefChange = (ref: React.RefObject<HTMLInputElement>) => {
    setRef(ref);
  };

  const dispatch = useAppDispatch();

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== ref!.current) {
      router.push(
        `/?pageNum=${pageNum}&filter=${filter}&details=${String(props.index)}`
      );
      dispatch(setCardDetails(String(props.index - 1)));
    }
  };

  return (
    <div
      className={styles.characterWrapper}
      onClick={(e) => {
        handleCardClick(e);
      }}
      data-testid="card"
    >
      <CardCheckBox character={props.character} onRefChange={handleRefChange} />
      <div className={styles.characterImgWrapper}>
        <Image
          src={image!}
          alt={name}
          width={150}
          height={150}
          className={styles.characterImg}
          priority
        />
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
