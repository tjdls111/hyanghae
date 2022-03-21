import React from "react";
import styles from "./mobilesearch.module.css";
import MagnifyingGlass from "../../public/SVG/magnifying-glass.svg";

const MobileSearch: React.FC<{
  mobileSearch: boolean;
  mobileSearchCloseHandler: any;
}> = ({ mobileSearch, mobileSearchCloseHandler }) => {
  return (
    <div
      className={`${styles.mobileSearch} ${
        mobileSearch && styles.mobileSearchActive
      }`}
    >
      <form className={styles.mobileSearchBar} action="submit">
        <MagnifyingGlass className={styles.mobileSearchIcon} />
        <input className={styles.mobileSearchInput} type="text" />
        <div
          onClick={mobileSearchCloseHandler}
          className={styles.mobileSearchCancel}
        >
          취소
        </div>
      </form>
      <div className={styles.mobileRecent}>
        <header className={styles.mobileRecentHeader}>
          <p className={styles.mobileRecentHeading}>최근 검색어</p>
          <p className={styles.mobileRecentDeleteAll}>전체 삭제</p>
        </header>
        <ul className={styles.mobileRecentBox}>
          <li className={styles.mobileRecentItem}>
            <p className={styles.mobileRecentTitle}>샤넬 넘버5</p>
            <button className={styles.mobileRecentDelete}>X</button>
          </li>
          <li className={styles.mobileRecentItem}>
            <p className={styles.mobileRecentTitle}>조말론</p>
            <button className={styles.mobileRecentDelete}>X</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileSearch;
