import React from "react";
import styles from "./perfumeListHeader.module.css";
import PerfumeListFilter from "../ui/perfumeListFilter/perfumeListFilter";

const PerfumeListHeader: React.FC = () => {
  return (
    <header className={styles.container}>
      <h2 className={styles.text}>
        전체 <span className={styles.totalNumber}>1110개</span>
      </h2>
      <PerfumeListFilter />
    </header>
  );
};

export default PerfumeListHeader;
