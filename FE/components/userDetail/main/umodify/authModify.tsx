/*
마이페이지 회원정보 조회를 들어가기위한 비밀번호 입력 컴포넌트
@author scarlet
@version 1.0.0
생성일 2022-03-17
마지막 수정일 2022-03-19
*/

import React, { useRef, useState } from "react";
import styles from "./modify.module.css";

import { apiCheckMod } from "../../../../api/user";
import { useEffect } from "react";
interface stateProps {
  setState: (value: boolean) => void;
}

const AuthModify: React.FC<stateProps> = ({ setState }) => {
  const [isValid, setValid] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const regExp = /^[A-Za-z0-9]+$/;

  const changeInput = () => {
    if (inputRef.current?.value === "") {
      setValid(true);
      return;
    }
    if (inputRef.current?.value) {
      if (regExp.test(inputRef.current?.value)) {
        setValid(false);
      } else {
        setValid(true);
      }
    }
  };

  const onValidsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (inputRef.current?.value === undefined || token === null) {
      return;
    }
    try {
      setValid(false);
      await apiCheckMod(inputRef.current.value, token);
      setState(true);
    } catch (e) {
      alert("유효하지 않은 비밀번호입니다.");
      console.error(e);
      inputRef.current.value = "";
      setValid(true);
    }
  };

  return (
    <>
      <div className={styles.subPw}>비밀번호를 입력하세요</div>
      <form onSubmit={onValidsubmit}>
        <input hidden={true} />
        <div className={styles.pwInput}>
          <input
            className={styles.input}
            autoFocus
            type="password"
            ref={inputRef}
            onChange={changeInput}
          />
        </div>
        <div>
          <button
            className={styles.sbBtn}
            type="submit"
            value="확인"
            disabled={isValid}
            style={
              !isValid
                ? { color: "#777", cursor: "pointer", backgroundColor: "#ffebf0" }
                : { color: "#ccc" }
            }
            aria-label="passwordAuth"
          >
            확인
          </button>
        </div>
      </form>
    </>
  );
};

export default AuthModify;
