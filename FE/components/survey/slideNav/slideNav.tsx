import React from "react";
import styles from "./slideNav.module.css";

interface propType {
  state: number;
  limit: number;
}

const Paging = ({ state, limit }: propType) => {
  const numPages = limit;

  return (
    <>
      <nav className={styles.nav}>
        {Array(numPages)
          .fill("")
          .map((_, i) => (
            <button key={i + 1} type="button" aria-current={i === state ? "page" : undefined}>
              <div className={styles.hidden}></div>
            </button>
          ))}
      </nav>
    </>
  );
};
export default Paging;
