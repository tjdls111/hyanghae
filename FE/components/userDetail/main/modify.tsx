/*
마이페이지 회원정보(비밀번호) 인증에 따른 컴포넌트 분기
@author scarlet
@version 1.0.0
생성일 2022-03-19
마지막 수정일 2022-03-19
*/

import React from "react";
import styles from "./usermodify.module.css";
import { useState } from "react";
import AuthModify from "./umodify/authModify";
import FormModify from "./umodify/formModify";

const Modify: React.FC = () => {
  const [state, setState] = useState(false);

  return (
    <>
      <header>회원정보 수정</header>
      <div className={styles.container}>
        {state ? <FormModify /> : <AuthModify setState={setState} />}
      </div>
    </>
  );
};

export default Modify;
