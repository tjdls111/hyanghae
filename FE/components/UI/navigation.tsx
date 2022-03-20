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
import Image from "next/image";
import mainLogo from "../../public/logos/mainLogo.png";
import MagnifyingGlass from "../../public/SVG/magnifying-glass.svg";
import DeleteIcon from "../../public/SVG/circle-with-cross.svg";
import { useRouter } from "next/router";
import Link from "next/link";

const navItemData = [
  {
    id: "navItem01",
    name: "Home",
    path: "/home",
  },
  {
    id: "navItem02",
    name: "PERFUMES",
    path: "/perfumes",
  },
  {
    id: "navItem02",
    name: "Recommeded",
    path: "/recommended",
  },
  {
    id: "navItem02",
    name: "About",
    path: "/about",
  },
];

const Navigation: React.FC = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const mobileNavOpenHandler = function () {
    setMobileNav(true);
  };
  const mobileNavCloseHandler = function () {
    setMobileNav(false);
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

  return (
    <div className={styles.container}>
      <main className={styles.layout}>
        {/* 모바일에서만 보이는 햄버거 버튼 */}
        <button onClick={mobileNavOpenHandler} className={styles.hamburger}>
          <span className={styles.hamburgerBar}></span>
          <span className={styles.hamburgerBar}></span>
          <span className={styles.hamburgerBar}></span>
        </button>
        <nav
          className={`${styles.navContainer} ${
            mobileNav && styles.mobileNavActive
          }`}
        >
          {/* 모바일에서 햄버거 버튼을 열었을 때 보이는 X */}
          <button
            onClick={mobileNavCloseHandler}
            className={styles.navCloseButton}
          >
            X
          </button>
          {/* 모바일에서만 보이는 로그인 / 회원가입 */}
          <div className={styles.mobileAuthGuide}>
            <Link href="/login">
              <button className={`${styles.mobileLoginButton}`}>LOG IN</button>
            </Link>
            <Link href="/signup">
              <button className={styles.mobileSignupButton}>JOIN US</button>
            </Link>
          </div>

          <ul className={styles.navigation}>
            {navItemData.map((navItem) => {
              return (
                <li className={styles.navItem}>
                  <Link href={navItem.path}>
                    <a
                      className={`${styles.navLink} ${
                        router.pathname === navItem.path && styles.navLinkActive
                      }`}
                    >
                      {navItem.name}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <Link href="/home">
          <div className={styles.logoWrapper}>
            <Image className={styles.logoImage} layout="fill" src={mainLogo} />
          </div>
        </Link>
        <div className={styles.wrapper}>
          <form
            onSubmit={searchSubmitHandler}
            className={styles.searchBar}
            action=""
          >
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

          {/* <button onClick={requestLoginHandler} className={styles.loginButton}>
          로그인
        </button> */}
          <div className={styles.authGuide}>
            <Link href="/login">
              <a className={`${styles.authText}`}>로그인</a>
            </Link>
            <span>|</span>
            <Link href="/signup">
              <a className={styles.authText}>회원가입</a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Navigation;
