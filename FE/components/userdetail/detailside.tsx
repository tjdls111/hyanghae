import React from "react";
import styles from "./detailside.module.css";
const DetailSide = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.mylist}>
        <li className={styles.mytest}>나의 테스트 내역</li>
        <li className={styles.modify}>회원 정보 수정</li>
        <li className={styles.purchase}>구매 내역</li>
      </ul>
    </div>
  );
};

export default DetailSide;
