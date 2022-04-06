import React from "react";
import styles from "./paging.module.css";

const Paging = ({ limit, page, setPage }) => {
  const numPages = limit;

  return (
    <>
      <nav className={styles.nav}>
        <button type="button" onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </button>
        {Array(numPages)
          .fill("")
          .map((_, i) => (
            <button
              type="button"
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </button>
          ))}
        <button type="button" onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </button>
      </nav>
    </>
  );
};
export default Paging;
