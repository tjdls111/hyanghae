import React, { useState, useRef } from "react";
import MagnifyingGlass from "../../public/SVG/magnifying-glass.svg";
import styles from "./desktopSearch.module.css";
import DeleteIcon from "../../public/SVG/circle-with-cross.svg";
import { useAppSelector } from "../../reducers/hooks";

const DesktopSearch: React.FC<{
  keyword: any;
  searchSubmitHandler: React.FormEventHandler<HTMLFormElement>;
  keywordChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
  keywordDeleteHandler: () => void;
  searchHistoryDeleteHandler: (itemCreatedAt: string) => void;
  deleteEntireSearchHistory: () => void;
  selectHistoryItemHandler: (searchWord: string) => void;
}> = ({
  keyword,
  searchSubmitHandler,
  keywordChangeHandler,
  keywordDeleteHandler,
  searchHistoryDeleteHandler,
  deleteEntireSearchHistory,
  selectHistoryItemHandler,
}) => {
  const searchHistory = useAppSelector((state) => state.searchHistoryReducer);
  const [openHistory, setOpenHistory] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const blurInput = function () {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <>
      <div
        onClick={() => {
          setOpenHistory(false);
        }}
        className={`${styles.backDrop} ${openHistory && styles.backDropActive}`}
      ></div>
      <form
        onSubmit={(e) => {
          searchSubmitHandler(e);
          blurInput();
          setOpenHistory(false);
        }}
        className={styles.searchBar}
      >
        <MagnifyingGlass className={styles.searchIcon} />
        <input
          onFocus={() => {
            if (searchHistory.length > 0) {
              setOpenHistory(true);
            }
          }}
          ref={inputRef}
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
        <ul
          className={`${styles.recentSearchHistory} ${
            openHistory && styles.showRecentSearchHistory
          }`}
        >
          <header className={styles.desktopRecentHeader}>
            <p className={styles.desktopRecentHeading}>최근 검색어</p>
            <p
              onClick={deleteEntireSearchHistory}
              className={styles.DesktopRecentDeleteAll}
            >
              전체 삭제
            </p>
          </header>
          {searchHistory.map((item, idx) => {
            if (idx < 5) {
              return (
                <li
                  onClick={() => {
                    selectHistoryItemHandler(item.searchWord);
                    setOpenHistory(false);
                  }}
                  key={item.created_at}
                  className={styles.recentSearchItem}
                >
                  <p className={styles.desktopRecentTitle}>{item.searchWord}</p>
                  <button
                    type="button"
                    onClick={() => {
                      searchHistoryDeleteHandler(item.created_at);
                    }}
                    className={styles.desktopRecentDelete}
                  >
                    X
                  </button>
                </li>
              );
            }
          })}
        </ul>
      </form>
    </>
  );
};

export default DesktopSearch;
