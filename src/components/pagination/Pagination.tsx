import { useAppDispatch } from '../../hooks/storeHooks';

import { setCurrentPage } from '../../store/slices/appDataSlice';
import styles from '../../styles/Pagination.module.css';

type PaginationPropsType = {
  pagination: {
    current: number;
    first: number;
    prev: number;
    next: number;
    last: number;
    records: number;
  };
};

export const Pagination = (props: PaginationPropsType): JSX.Element => {
  console.log('Pagination props - ', props)
  const {
    pagination: { current, prev, next },
  } = props;
  const dispatch = useAppDispatch();
  const paginationHandler = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className={styles.paginationWrapper}>
      <div className={styles.pagesBtnsWrapper}>
        <button
          disabled={!(current - prev)}
          onClick={() => paginationHandler(current - 1)}
          data-testid="prevBtn"
        >
          Previous page
        </button>
        <div className={styles.pageInformer} data-testid="informer">
          {current}
        </div>
        <button
          disabled={!(next - current)}
          onClick={() => paginationHandler(current + 1)}
          data-testid="nextBtn"
        >
          Next page
        </button>
      </div>
    </div>
  );
};
