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
import AccountIcon from "../../public/SVG/account_circle.svg";
import { useRouter } from "next/router";
import ResponsiveNav from "./responsiveNav";
import LinkedLogo from "./linkedLogo";
import MobileHamburger from "./mobileHamburger";
import DesktopSearch from "./desktopSearch";
import MobileSearch from "./mobileSearch";
import Link from "next/link";

const Navigation: React.FC = () => {
  const [mobileSearch, setMobileSearch] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [profileMenuOpen, toggleProfileMenu] = useState(false);
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

  const requestLoginHandler: React.MouseEventHandler<HTMLButtonElement> =
    function () {
      router.push("/login");
    };

  const searchSubmitHandler: React.FormEventHandler<HTMLFormElement> =
    function (e) {
      e.preventDefault();

      // 검색 api
    };

  const toggleProfileHandler = function () {
    toggleProfileMenu((prev) => !prev);
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
          <div className={styles.profileContainer}>
            <AccountIcon
              onClick={toggleProfileHandler}
              className={styles.accountIcon}
            />
            {/* profile menu */}
            <div
              className={`${styles.profileMenu} ${
                profileMenuOpen && styles.active
              }`}
            >
              <p className={styles.profileMenuItem}>Logout</p>
              <p className={styles.profileMenuItem}>MyPage</p>
            </div>
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
