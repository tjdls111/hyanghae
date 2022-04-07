import React from "react";
import styles from "./footer.module.css";
import NotionIcon from "../../public/SVG/notion.svg";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <main className={styles.layout}>
        <section className={styles.footerSection}>
          <p className={styles.footerHeading}>&copy; COPYRIGHT</p>
          <p className={styles.footerContent}>SSAFY-6TH-GUMI</p>
          <p className={styles.footerContent}>아이들의 반란</p>
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
