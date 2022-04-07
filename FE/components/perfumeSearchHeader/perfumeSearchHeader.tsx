import React from "react";
import styles from "./perfumeSearchHeader.module.css";

const PerfumeSearchHeader: React.FC<{ content: string }> = ({ content }) => {
  return (
    <header className={styles.layout}>
      <div className={styles.searchResult}>
        <span className={styles.searchContent}>'{content}'</span>
        <span className={styles.searchContentText}>에 대한 검색 결과</span>
      </div>
    </header>
  );
};

export default PerfumeSearchHeader;
