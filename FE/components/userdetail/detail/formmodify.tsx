/*
마이페이지 회원정보 조회 컴포넌트
@author scarlet
@version 1.0.0
생성일 2022-03-19
마지막 수정일 2022-03-19
*/

import React, { useState } from "react";
import { useEffect } from "react";
import { apiUserLookUp } from "../../../api/user";
import UserDestroy from "./userdestroy";

const FormModify = () => {
  const [state, setState] = useState({
    id: "",
    nickName: "",
    email: "",
    isShow: false,
  });

  const { isShow, id, nickName, email } = state;
  useEffect(() => {
    const token = localStorage.getItem("token");
    let completed = false;

    async function get() {
      if (token) {
        try {
          const res = await apiUserLookUp(token);
          if (!completed && res.data) {
            setState({
              id: res.data.userId,
              nickName: res.data.userNickName,
              email: res.data.userEmail,
              isShow: false,
            });
          }
        } catch (e) {
          throw new Error("Front logic error");
        }
      }
    }
    get();
    return () => {
      completed = true;
    };
  }, []);

  return (
    <>
      <main>
        <div>아이디</div>
        <div>{id}</div>
        <div>닉네임</div>
        <span>{nickName}</span>
        <span>
          <button>수정</button>
        </span>
        <div>이메일</div>
        <div>{email}</div>
        <strong onClick={() => setState({ ...state, isShow: true })}>회원탈퇴</strong>
        <div>{isShow ? <UserDestroy /> : null}</div>
      </main>
    </>
  );
};

export default FormModify;
