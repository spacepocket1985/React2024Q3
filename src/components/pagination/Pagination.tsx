import { PaginationPropsType } from '../../types';

import styles from './Pagination.module.css';

export const Pagination = (props: PaginationPropsType): JSX.Element => {
  const {
    pagination: { prev, next, current },
    onPaginationClick,
  } = props;

  const paginationHandler = (page: number) => {
    onPaginationClick(page);
  };

  return (
    <div className={styles.paginationWrapper}>
      <div className={styles.pagesBtnsWrapper}>
        <button
          disabled={!(prev - current)}
          onClick={() => paginationHandler(prev)}
          data-testid="prevBtn"
        >
          Previous page
        </button>
        <div className={styles.pageInformer}>{current}</div>
        <button
          disabled={!(next - current)}
          onClick={() => paginationHandler(next)}
          data-testid="nextBtn"
        >
          Next page
        </button>
      </div>
    </div>
  );
};
