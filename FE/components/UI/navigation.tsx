/*
내비게이션
내비게이션
@author Jackson
@version 1.0.0
생성일 2022-03-14
마지막 수정일 2022-03-15
*/

import React, { useState } from "react";
import styles from "./navigation.module.css";
import Image from "next/image";
import mainLogo from "../../public/logos/mainLogo.png";
import MagnifyingGlass from "../../public/SVG/magnifying-glass.svg";
import DeleteIcon from "../../public/SVG/circle-with-cross.svg";

const Navigation: React.FC = () => {
  const [keyword, setKeyword] = useState("");

  const keywordDeleteHandler = function () {
    setKeyword("");
  };

  const keywordChangeHandler = function (e) {
    setKeyword(e.target.value);
  };

  return (
    <div className={styles.container}>
      <main className={styles.layout}>
        <div className={styles.logoWrapper}>
          <Image className={styles.logoImage} layout="fill" src={mainLogo} />
        </div>
        <nav className={styles.navContainer}>
          <ul className={styles.navigation}>
            <li className={styles.navItem}>향수추천</li>
            <li className={styles.navItem}>클래스</li>
          </ul>
        </nav>
        <form className={styles.searchBar} action="">
          <input
            onChange={keywordChangeHandler}
            value={keyword}
            className={styles.searchInput}
            type="text"
          />
          <MagnifyingGlass className={styles.searchIcon} />
          <DeleteIcon
            onClick={keywordDeleteHandler}
            className={styles.deleteIcon}
          />
        </form>
        <button className={styles.loginButton}>로그인</button>
      </main>
    </div>
  );
};

export default Navigation;
