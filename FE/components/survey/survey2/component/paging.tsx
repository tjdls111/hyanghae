import React from "react";
import styles from "./paging.module.css";

const Paging = ({ limit, page, setPage }) => {
  return (
    <>
      <nav className={styles.nav}>
        <button type="button" onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </button>
        <div className={styles.paging}>{`${page}/${limit}`}</div>
        <button type="button" onClick={() => setPage(page + 1)} disabled={page === limit}>
          &gt;
        </button>
      </nav>
    </>
  );
};
export default Paging;
