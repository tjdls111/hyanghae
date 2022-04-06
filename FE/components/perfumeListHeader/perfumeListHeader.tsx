import React from "react";
import styles from "./perfumeListHeader.module.css";
import PerfumeListFilter from "../ui/perfumeListFilter/perfumeListFilter";

const PerfumeListHeader: React.FC = () => {
  return (
    <header className={styles.container}>
      <h2 className={styles.totalNumber}>전체 1110개</h2>
      <PerfumeListFilter />
    </header>
  );
};

export default PerfumeListHeader;
