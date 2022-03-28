import React from "react";
import styles from "./mobileHamburger.module.css";

const MobileHamburger: React.FC<{ mobileNavOpenHandler: () => void }> = ({
  mobileNavOpenHandler,
}) => {
  return (
    <button onClick={mobileNavOpenHandler} className={styles.hamburger}>
      <span className={styles.hamburgerBar}></span>
      <span className={styles.hamburgerBar}></span>
      <span className={styles.hamburgerBar}></span>
    </button>
  );
};

export default MobileHamburger;
