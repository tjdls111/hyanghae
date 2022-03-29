/*
내비게이션
내비게이션
@author Jackson
@version 1.0.0
생성일 2022-03-14
마지막 수정일 2022-03-18
*/

import React, { useState } from "react";
import styles from "./navigation.module.css";
import MagnifyingGlass from "../../public/SVG/magnifying-glass.svg";
// import AccountIcon from "../../public/SVG/account_circle.svg";
import { useRouter } from "next/router";
import ResponsiveNav from "./responsiveNav";
import LinkedLogo from "./linkedLogo";
import MobileHamburger from "./mobileHamburger";
import DesktopSearch from "./desktopSearch";
import MobileSearch from "./mobileSearch";
import { useAppSelector } from "../../reducers/hooks";
import { logout } from "../../reducers/authSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

const Navigation: React.FC = () => {
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated
  );
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
      e.preventDefault();
      // 검색 api
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
                <p className={styles.profileMenuItem}>마이페이지</p>
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
          mobileSearch={mobileSearch}
          mobileSearchCloseHandler={mobileSearchCloseHandler}
        />
      </main>
    </div>
  );
};

export default Navigation;
