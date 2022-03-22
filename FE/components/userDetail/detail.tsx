/*
마이페이지 왼쪽 슬라이드 컴포넌트
@author scarlet
@version 1.0.0
생성일 2022-03-12
마지막 수정일 2022-03-17
*/

import React, { useState } from "react";
import DetailMain from "./detailMain";
import styles from "./detail.module.css";

const Detail: React.FC = () => {
  const [state, setState] = useState("");
  const userTest = "usertest";
  const userModify = "usermodify";
  const userPurchase = "userpurchase";
  const userPwChange = "userpwchange";
  const listColor = "#f382a2";

  return (
    <div className={styles.container}>
      <div className={styles.listwrapper}>
        <ul className={styles.mylist}>
          <li
            onClick={() => setState(userTest)}
            className={styles.usertest}
            style={
              state === userTest
                ? {
                    color: listColor,
                    cursor: "default",
                  }
                : {}
            }
          >
            나의 테스트 내역
          </li>
          <li
            onClick={() => setState(userModify)}
            className={styles.usermodify}
            style={
              state === userModify
                ? {
                    color: listColor,
                    cursor: "default",
                  }
                : {}
            }
          >
            회원 정보 수정
          </li>
          <li
            onClick={() => setState(userPurchase)}
            className={styles.userpurchase}
            style={
              state === userPurchase
                ? {
                    color: listColor,
                    cursor: "default",
                  }
                : {}
            }
          >
            구매 내역
          </li>
          <li
            onClick={() => setState(userPwChange)}
            className={styles.userpwchange}
            style={
              state === userPwChange
                ? {
                    color: listColor,
                    cursor: "default",
                  }
                : {}
            }
          >
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

export default Detail;
