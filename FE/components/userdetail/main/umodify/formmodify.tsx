/*
마이페이지 회원정보 조회 컴포넌트
@author scarlet
@version 1.0.0
생성일 2022-03-19
마지막 수정일 2022-03-19
*/

import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { apiCheckNickname, apiNickCh, apiUserLookUp } from "../../../../api/user";
import { useRouter } from "next/router";
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
  const [alertMsg, setAlert] = useState("");
  const distTxtC = "#f382a2";
  const nickRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const nickChange = async () => {
    const value = nickRef.current?.value;
    if (value && value.length > 0 && value.length < 11) {
      try {
        await apiCheckNickname(value);
        setValid(true);
      } catch (e) {
        setValid(false);
        setAlert("중복 된 닉네임입니다.");
        return;
      }
    } else {
      setValid(false);
      setAlert("1글자 이상 10글자 미만");
    }
  };

  const onSubmit = async () => {
    const value = nickRef.current?.value;
    const token = localStorage.getItem("token");
    try {
      if (value && token) {
        await apiNickCh(value, token);
        alert("수정이 완료 되었습니다.");
        setState({ ...state, nickName: value });
        router.replace("/home");
      }
    } catch (e) {
      console.error(e);
    }
  };

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
            <button onClick={onSubmit} disabled={!isValid}>
              수정
            </button>
          </span>
          <div className={styles.validTxt}>{!isValid ? alertMsg : ""}</div>
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
