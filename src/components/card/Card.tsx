'use client'

import { useRouter,useSearchParams } from 'next/navigation';
import { useAppDispatch } from '../../hooks/storeHooks';
import { useState } from 'react';
import { setCardDetails } from '../../store/slices/appDataSlice';
import { CardCheckBox } from '../cardCheckBox/CardCheckBox';
import { CardPropsType } from '../../types';
import styles from '../../styles/Card.module.css';
import Image from 'next/image';

export const Card = (props: CardPropsType): JSX.Element => {  
  const [ref, setRef] = useState<React.RefObject<HTMLInputElement> | null>(null);  
  const {  
    attributes: { image, name, gender },  
  } = props.character;  
  const dispatch = useAppDispatch();  
  const router = useRouter()
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') || '';
  const pageNum = searchParams.get('pageNum') || 1;
  const handleRefChange = (ref: React.RefObject<HTMLInputElement>) => {  
    setRef(ref);  
  };  

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {  
    if (e.target !== ref!.current)  
      dispatch(setCardDetails(String(props.index - 1))); 
    router.push(`/?pageNum=${pageNum}&filter=${filter}&details=${String(props.index)}`) 
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
        <Image src={image!} alt={name} width={150} height={150} className={styles.characterImg} priority />  
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
