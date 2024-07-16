import { useAppSelector, useAppDispatch } from '../../hooks/storeHooks';

import { setCurrentPage } from '../../store/slices/appDataSlice';
import styles from './Pagination.module.css';

export const Pagination = (): JSX.Element => {
  const { prev, next, current } = useAppSelector(
    (state) => state.appData.pagination
  );
  const dispatch = useAppDispatch();
  const paginationHandler = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className={styles.paginationWrapper}>
      <div className={styles.pagesBtnsWrapper}>
        <button
          disabled={!(prev - current)}
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
