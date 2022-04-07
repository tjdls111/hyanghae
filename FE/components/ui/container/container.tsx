import React from "react";
import styles from "./container.module.css";

const Container: React.FC<{ isTop: boolean }> = ({ isTop, children }) => {
  return (
    <div className={isTop ? styles.topContainer : styles.regularContainer}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Container;
