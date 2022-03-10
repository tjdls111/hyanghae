import React from "react";
import styles from "./header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoBox}></div>
      <div className={styles.textBox}>
        <p className={styles.bigText}>향수를 해석하다</p>
        <p className={styles.smallText}>당신만의 향수를 찾아보세요</p>
      </div>
      <Link href="/login">
        <button className={styles.button}>나만의 향수 찾으러 가기</button>
      </Link>
    </header>
  );
};

export default Header;
