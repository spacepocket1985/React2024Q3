import { useSearchParams } from '@remix-run/react';

import { useAppSelector} from '../../hooks/storeHooks';

import styles from './Pagination.module.css';

export const Pagination = (): JSX.Element => {
  const { prev, next, current } = useAppSelector(
    (state) => state.appData.pagination
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('filter') || '';

  const paginationHandler = (page: number) => {
    setSearchParams({ filter, pageNum: String(page) });
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
