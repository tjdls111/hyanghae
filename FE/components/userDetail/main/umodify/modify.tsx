/*
마이페이지 회원정보(비밀번호) 인증에 따른 컴포넌트 분기
@author scarlet
@version 1.0.0
생성일 2022-03-19
마지막 수정일 2022-03-19
*/

import React from "react";
import styles from "./modify.module.css";
import { useState } from "react";
import AuthModify from "./authModify";
import FormModify from "./formModify";

const Modify: React.FC = () => {
  const [state, setState] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <header>
          <div>회원정보 수정</div>
        </header>
        {state ? <FormModify /> : <AuthModify setState={setState} />}
      </div>
    </>
  );
};

export default Modify;
