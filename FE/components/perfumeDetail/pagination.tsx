import React from "react";
import styles from "./pagination.module.css";

interface Props {
  total: number;
  limit: number;
  page: number;
  setPage: Function;
}

const Pagination = ({ total, limit, page, setPage }: Props) => {
  const numPages = Math.ceil(total / limit);

  return (
    <nav className={styles.pagNav}>
      <button
        className={styles.pagBtn}
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        &lt;
      </button>
      {Array(numPages)
        .fill(page)
        .map((_, i) => (
          <button
            className={styles.pagBtn}
            type="button"
            // eslint-disable-next-line react/no-array-index-key
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? "page" : undefined}
          >
            {i + 1}
          </button>
        ))}
      <button
        className={styles.pagBtn}
        onClick={() => setPage(page + 1)}
        disabled={page === numPages}
      >
        &gt;
      </button>
    </nav>
  );
};

export default Pagination;
