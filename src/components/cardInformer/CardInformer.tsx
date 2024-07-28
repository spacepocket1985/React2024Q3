import { useEffect, useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/storeHooks';
import {
  removeAllSelectedChars,
  unSelectAllCharacters,
} from '../../store/slices/charactersSlice';
import styles from './CardInformer.module.css';
import InformerImg from '../../assets/informer.png';
export const CardInformer = (): JSX.Element => {
  const selectedCards = useAppSelector(
    (state) => state.characters.selectedChacharacters
  );

  const [isInformerAnimated, setIsInformerAnimated] = useState(false);
  const dispatch = useAppDispatch();
  const informerClass = `${styles.informer} ${
    isInformerAnimated ? styles.bump : ''
  }`;

  useEffect(() => {
    if (selectedCards.length === 0) {
      return;
    }
    setIsInformerAnimated(true);

    const timer = setTimeout(() => {
      setIsInformerAnimated(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [selectedCards]);

  const handlerUnselectAll = () => {
    dispatch(removeAllSelectedChars());
    dispatch(unSelectAllCharacters());
  };

  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  const convertToCSV = () => {
    const header = [
      'Name',
      'Gender',
      'Born',
      'Blood status',
      'Eye color',
      'Wiki',
    ];
    const rows = selectedCards.map((item) => [
      item.attributes.name,
      item.attributes.gender,
      item.attributes.born,
      item.attributes.blood_status,
      item.attributes.eye_color,
      item.attributes.wiki,
    ]);

    let csvContent = header.join(',') + '\n';
    rows.forEach((row) => {
      csvContent += row.join(',') + '\n';
    });

    return csvContent;
  };

  const handleDownload = () => {
    const csvContent = convertToCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const downloadLink = downloadLinkRef.current;
    const filename = `${selectedCards.length}_characters.csv`;

    if (downloadLink) {
      downloadLink.href = url;
      downloadLink.download = filename;
      downloadLink.click();
    }

    URL.revokeObjectURL(url);
  };

  const content = (
    <div className={styles.informweWrapper}>
      <div className={informerClass}>
        <div className={styles.informerLIne}>
          <img src={InformerImg} alt="" />
          <span>{`Selected - ${selectedCards.length} cards`}</span>
        </div>
      </div>
      <button onClick={handlerUnselectAll}>Unselect all</button>
      <a ref={downloadLinkRef} style={{ display: 'none' }}></a>
      <button onClick={handleDownload}>Download</button>
    </div>
  );

  return <>{selectedCards.length > 0 && content}</>;
};
