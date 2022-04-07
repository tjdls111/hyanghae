import React, { useState } from "react";
import styles from "./navigation.module.css";
import MagnifyingGlass from "../../public/SVG/magnifying-glass.svg";
import { useRouter } from "next/router";
import ResponsiveNav from "./responsiveNav";
import LinkedLogo from "./linkedLogo";
import MobileHamburger from "./mobileHamburger";
import DesktopSearch from "./desktopSearch";
import MobileSearch from "./mobileSearch";
import { useAppSelector } from "../../reducers/hooks";
import { logout } from "../../reducers/authSlice";
import Link from "next/link";
import { useDispatch } from "react-redux";
import {
  addHistory,
  deleteLastHistory,
  deleteItem,
  deleteEntireHistory,
  deleteItembyKeyword,
} from "../../reducers/searchHistorySlice";

const Navigation: React.FC = () => {
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const searchHistory = useAppSelector((state) => state.searchHistoryReducer);
  const dispatch = useDispatch();

  const [mobileSearch, setMobileSearch] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const mobileNavOpenHandler = function () {
    setMobileNavOpen(true);
  };
  const mobileNavCloseHandler = function () {
    setMobileNavOpen(false);
  };

  const mobileSearchCloseHandler = function () {
    setMobileSearch(false);
  };

  const mobileSearchOpenHandler = function () {
    setMobileSearch(true);
  };

  const keywordDeleteHandler = function () {
    setKeyword("");
  };

  const keywordChangeHandler: React.ChangeEventHandler<HTMLInputElement> =
    function (e) {
      setKeyword(e.target.value);
    };

  const searchSubmitHandler: React.FormEventHandler<HTMLFormElement> =
    function (e) {
      // 공백인 경우 submit 막기
      e.preventDefault();
      if (!keyword.trim()) {
        return;
      }
      // 기존 검색어와 겹치는 경우 삭제
      dispatch(deleteItembyKeyword(keyword));

      // 기존 검색어가 10개인 경우 한 개 삭제
      if (searchHistory.length === 10) {
        dispatch(deleteLastHistory());
      }

      // redux state에 추가
      const now = new Date().toString();
      dispatch(addHistory({ searchWord: keyword, created_at: now }));
      router.push(`/search/${keyword}`);
      setKeyword("");
    };

  const searchHistoryDeleteHandler = function (itemCreatedAt: string) {
    dispatch(deleteItem(itemCreatedAt));
  };

  const deleteEntireSearchHistory = function () {
    dispatch(deleteEntireHistory());
  };

  const selectHistoryItemHandler = function (searchWord: string) {
    router.push(`/search/${searchWord}`);
  };

  const onLogoutHandler = function () {
    dispatch(logout());
  };

  return (
    <div className={styles.container}>
      <main className={styles.layout}>
        <MobileHamburger mobileNavOpenHandler={mobileNavOpenHandler} />
        <ResponsiveNav
          mobileNavOpen={mobileNavOpen}
          mobileNavCloseHandler={mobileNavCloseHandler}
        />
        <LinkedLogo />
        <div className={styles.wrapper}>
          <DesktopSearch
            keyword={keyword}
            searchSubmitHandler={searchSubmitHandler}
            keywordChangeHandler={keywordChangeHandler}
            keywordDeleteHandler={keywordDeleteHandler}
            searchHistoryDeleteHandler={searchHistoryDeleteHandler}
            deleteEntireSearchHistory={deleteEntireSearchHistory}
            selectHistoryItemHandler={selectHistoryItemHandler}
          />
          <div className={styles.profileMenu}>
            {/* <AccountIcon
              onClick={toggleProfileHandler}
              className={styles.accountIcon}
            /> */}
            {isAuthenticated && (
              <>
                <p onClick={onLogoutHandler} className={styles.profileMenuItem}>
                  로그아웃
                </p>
                <span>|</span>
                <Link href="/userDetail">
                  <p className={styles.profileMenuItem}>마이페이지</p>
                </Link>
              </>
            )}
            {isAuthenticated || (
              <>
                <Link href="/login">
                  <p className={styles.profileMenuItem}>로그인</p>
                </Link>
                <span>|</span>
                <Link href="/signup">
                  <p className={styles.profileMenuItem}>회원가입</p>
                </Link>
              </>
            )}
          </div>
          <MagnifyingGlass
            onClick={mobileSearchOpenHandler}
            className={styles.mobileSearchToggle}
          />
        </div>
        <MobileSearch
          selectHistoryItemHandler={selectHistoryItemHandler}
          mobileSearch={mobileSearch}
          mobileSearchCloseHandler={mobileSearchCloseHandler}
          keyword={keyword}
          searchSubmitHandler={searchSubmitHandler}
          keywordChangeHandler={keywordChangeHandler}
          keywordDeleteHandler={keywordDeleteHandler}
          searchHistoryDeleteHandler={searchHistoryDeleteHandler}
          deleteEntireSearchHistory={deleteEntireSearchHistory}
        />
      </main>
    </div>
  );
};

export default Navigation;
