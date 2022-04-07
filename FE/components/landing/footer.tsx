/*
랜딩페이지 푸터
랜딩페이지 푸터의 tsx파일
@author Jackson
@version 1.0.0
생성일 2022-03-11
마지막 수정일 2022-03-14
*/

import React from "react";
import styles from "./footer.module.css";
import NotionIcon from "../../public/SVG/notion.svg";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <main className={styles.layout}>
        <section className={styles.footerSection}>
          <p className={styles.footerHeading}>&copy; COPYRIGHT</p>
          <p className={styles.footerContent}>SSAFY-6TH-GUMI 아이들의 반란</p>
        </section>
        <section className={styles.footerSection}>
          <p className={styles.footerHeading}>Dev Team</p>
          <a
            className={styles.footerLink}
            href="https://www.notion.so/19a527a3f924466f9d3154969c78695c"
          >
            <NotionIcon width="32" height="32" className={styles.footerIcon} />
            <p className={styles.footerContent}>Notion</p>
          </a>
        </section>
        <section className={styles.footerSection}>
          <p className={styles.footerHeading}>Contact</p>
          <p className={styles.footerContent}>idles.company@gmail.com</p>
        </section>
      </main>
    </footer>
  );
};

export default Footer;
