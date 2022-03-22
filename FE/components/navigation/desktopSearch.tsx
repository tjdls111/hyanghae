import React from "react";
import MagnifyingGlass from "../../public/SVG/magnifying-glass.svg";
import styles from "./desktopSearch.module.css";
import DeleteIcon from "../../public/SVG/circle-with-cross.svg";

const DesktopSearch: React.FC<{
  keyword: any;
  searchSubmitHandler: React.FormEventHandler<HTMLFormElement>;
  keywordChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
  keywordDeleteHandler: () => void;
}> = ({
  keyword,
  searchSubmitHandler,
  keywordChangeHandler,
  keywordDeleteHandler,
}) => {
  return (
    <form onSubmit={searchSubmitHandler} className={styles.searchBar} action="">
      <MagnifyingGlass className={styles.searchIcon} />
      <input
        onChange={keywordChangeHandler}
        value={keyword}
        className={styles.searchInput}
        type="text"
        placeholder="향해 통합검색"
      />

      <DeleteIcon
        onClick={keywordDeleteHandler}
        className={styles.deleteIcon}
      />
    </form>
  );
};

export default DesktopSearch;
