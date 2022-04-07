import React from "react";
import styles from "./mobileSearch.module.css";
import MagnifyingGlass from "../../public/SVG/magnifying-glass.svg";

const MobileSearch: React.FC<{
  mobileSearch: boolean;
  mobileSearchCloseHandler: () => void;
  keyword: string;
  searchSubmitHandler: React.FormEventHandler<HTMLFormElement>;
  keywordChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
  keywordDeleteHandler: () => void;
}> = ({
  mobileSearch,
  mobileSearchCloseHandler,
  keyword,
  searchSubmitHandler,
  keywordChangeHandler,
  keywordDeleteHandler,
}) => {
  return (
    <div
      className={`${styles.mobileSearch} ${
        mobileSearch && styles.mobileSearchActive
      }`}
    >
      <form
        onSubmit={(e) => {
          mobileSearchCloseHandler();
          searchSubmitHandler(e);
        }}
        className={styles.mobileSearchBar}
        action="submit"
      >
        {/*  */}
        <input
          onChange={keywordChangeHandler}
          value={keyword}
          className={styles.mobileSearchInput}
          type="text"
          placeholder="검색어를 입력하세요"
        />
        <button
          disabled={keyword.trim() === ""}
          type="submit"
          className={`${styles.mobileSearchButton} ${
            keyword.trim() === "" && styles.mobileSearchButtonDisabled
          }`}
        >
          <MagnifyingGlass className={styles.mobileSearchIcon} />
        </button>
        <div
          onClick={() => {
            keywordDeleteHandler();
            mobileSearchCloseHandler();
          }}
          className={styles.mobileSearchCancel}
        >
          X
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
