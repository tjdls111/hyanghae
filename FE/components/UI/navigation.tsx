/*
내비게이션
내비게이션
@author Jackson
@version 1.0.0
생성일 2022-03-14
마지막 수정일 2022-03-15
*/

import React from "react";
import styles from "./navigation.module.css";
import Image from "next/image";
import mainLogo from "../../public/logos/mainLogo.png";

const Navigation: React.FC = () => {
  return (
    <div className={styles.container}>
      <main className={styles.layout}>
        <div className={styles.logoWrapper}>
          <Image className={styles.logoImage} layout="fill" src={mainLogo} />
        </div>
        <nav className={styles.navContainer}>
          <ul className={styles.navigation}>
            <li className={styles.navItem}>메뉴1</li>
            <li className={styles.navItem}>메뉴2</li>
            <li className={styles.navItem}>메뉴3</li>
          </ul>
        </nav>
        <input className={styles.searchBar} type="text" />
        <button className={styles.loginButton}></button>
      </main>
    </div>
  );
};

export default Navigation;
