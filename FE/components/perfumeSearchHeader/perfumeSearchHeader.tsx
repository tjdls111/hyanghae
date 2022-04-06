import React from "react";
import { useAppSelector } from "../../reducers/hooks";
import styles from "./perfumeSearchHeader.module.css";

const PerfumeSearchHeader: React.FC = () => {
  const searchContent = useAppSelector((state) => state.searchReducer.content);

  return (
    <header className={styles.layout}>
      <div className={styles.searchResult}>
        <span className={styles.searchContent}>'{searchContent}'</span>
        <span className={styles.searchContentText}>에 대한 검색 결과</span>
      </div>
    </header>
  );
};

export default PerfumeSearchHeader;
