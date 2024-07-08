import { useNavigate } from 'react-router-dom';
import { PaginationPropsType } from '../../types';

import styles from './Pagination.module.css';

const Pagination = (props: PaginationPropsType): JSX.Element => {
  const {
    pagination: { prev, next, current },
    seachTerm,
  } = props;

  const navigate = useNavigate();

  return (
    <div className={styles.paginationWrapper}>
      <div className={styles.pagesBtnsWrapper}>
        <button
          disabled={!(prev - current)}
          onClick={() =>
            navigate(`/searchPage?pageNumber=${prev}&filter=${seachTerm}`)
          }
        >
          Previous page
        </button>
        <div className="page-informer">{current}</div>
        <button
          disabled={!(next - current)}
          onClick={() =>
            navigate(`/searchPage?pageNumber=${next}&filter=${seachTerm}`)
          }
        >
          Next page
        </button>
      </div>
    </div>
  );
};

export default Pagination;
