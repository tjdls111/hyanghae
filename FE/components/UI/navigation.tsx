/*
내비게이션
내비게이션
@author Jackson
@version 1.0.0
생성일 2022-03-14
마지막 수정일 2022-03-17
*/

import React, { useState } from "react";
import styles from "./navigation.module.css";
import Image from "next/image";
import mainLogo from "../../public/logos/mainLogo.png";
import MagnifyingGlass from "../../public/SVG/magnifying-glass.svg";
import DeleteIcon from "../../public/SVG/circle-with-cross.svg";
import { useRouter } from "next/router";
import Link from "next/link";

const Navigation: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

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
        <Link href="/home">
          <div className={styles.logoWrapper}>
            <Image className={styles.logoImage} layout="fill" src={mainLogo} />
          </div>
        </Link>
        <nav className={styles.navContainer}>
          <ul className={styles.navigation}>
            <li className={styles.navItem}>향수추천</li>
            <li className={styles.navItem}>클래스</li>
          </ul>
        </nav>
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
          />

          <DeleteIcon
            onClick={keywordDeleteHandler}
            className={styles.deleteIcon}
          />
        </form>
        <button onClick={requestLoginHandler} className={styles.loginButton}>
          로그인
        </button>
      </main>
    </div>
  );
};

export default Navigation;
