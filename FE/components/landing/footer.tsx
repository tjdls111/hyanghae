import React from "react";
import styles from "./footer.module.css";

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
          <p className={styles.footerContent}>Notion</p>
        </section>
        <section className={styles.footerSection}>
          <p className={styles.footerHeading}>Contact</p>
          <p className={styles.footerContent}>01054130537</p>
          <p className={styles.footerContent}>pcg0537@gmail.com</p>
        </section>
      </main>
    </footer>
  );
};

export default Footer;
