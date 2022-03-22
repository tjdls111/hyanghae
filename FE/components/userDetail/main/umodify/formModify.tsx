/*
마이페이지 회원정보 조회 컴포넌트
@author scarlet
@version 1.0.0
생성일 2022-03-19
마지막 수정일 2022-03-19
*/

import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { apiUserLookUp } from "../../../../api/user";
import UserDestroy from "../userDestroy";
import styles from "./modify.module.css";

const FormModify = () => {
  const [state, setState] = useState({
    id: "",
    nickName: "",
    email: "",
    isShow: false,
  });
  const [isValid, setValid] = useState(false);
  const distTxtC = "#f382a2";
  const nickRef = useRef<HTMLInputElement>(null);

  const nickChange = () => {
    const value = nickRef.current?.value;
    if (value && value.length > 0 && value.length < 11) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const onSubmit = () => {};

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
      <div className={styles.form}>
        <section>
          <span>아이디 : </span>
          <span>{id}</span>
        </section>
        <section>
          <span>닉네임 : </span>
          <span>
            <input
              autoFocus
              className={styles.input}
              type="text"
              placeholder={nickName}
              ref={nickRef}
              onChange={nickChange}
            />
          </span>
          <span>
            <button
              style={{
                marginLeft: "1em",
                borderRadius: "10px",
              }}
              onClick={onSubmit}
              disabled={!isValid}
            >
              수정
            </button>
          </span>
          <div>{}</div>
        </section>
        <section>
          <span>이메일 : </span>
          <span>{email}</span>
        </section>
        <div className={styles.distTxt}>
          <strong
            onClick={() => setState({ ...state, isShow: true })}
            style={isShow ? { color: distTxtC } : {}}
          >
            회원탈퇴
          </strong>
        </div>

        <div>{isShow ? <UserDestroy /> : null}</div>
      </div>
    </>
  );
};

export default FormModify;
