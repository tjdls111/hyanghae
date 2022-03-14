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
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <main className={styles.layout}>
        <section className={styles.footerSection}>
          {/* 로고 이미지 삽입 예정 */}
        </section>
        <section className={styles.footerSection}>
          <p className={styles.footerHeading}>Dev Team</p>
          <p className={styles.footerContent}>"다람쥐"</p>
          <Link href="https://www.notion.so/Git-bf4a33130cc14529a1f10a55536e2b64">
            <p className={styles.footerLink}>Notion</p>
          </Link>
        </section>
        <section className={styles.footerSection}>
          <p className={styles.footerHeading}>Contact</p>
          <p className={styles.footerContent}>010-5413-0537</p>
          <p className={styles.footerContent}>pcg0537@gmail.com</p>
        </section>
      </main>
    </footer>
  );
};

export default Footer;
