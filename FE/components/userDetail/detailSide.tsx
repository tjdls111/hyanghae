/*
마이페이지 왼쪽 슬라이드 컴포넌트
@author scarlet
@version 1.0.0
생성일 2022-03-12
마지막 수정일 2022-03-17
*/

import React, { useState } from "react";
import DetailMain from "./detailmain";
import styles from "./detail.module.css";
const DetailSide: React.FC = () => {
  const [state, setState] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.listwrapper}>
        <ul className={styles.mylist}>
          <li onClick={() => setState("usertest")} className={styles.usertest}>
            나의 테스트 내역
          </li>
          <li onClick={() => setState("usermodify")} className={styles.usermodify}>
            회원 정보
          </li>
          <li onClick={() => setState("userpurchase")} className={styles.userpurchase}>
            구매 내역
          </li>
          <li onClick={() => setState("userpwchange")} className={styles.userpwchange}>
            비밀번호 변경
          </li>
        </ul>
      </div>
      <div className={styles.demain}>
        <DetailMain state={state} />
      </div>
    </div>
  );
};

export default DetailSide;
