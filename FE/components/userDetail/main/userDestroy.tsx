/*
마이페이지 회원정보 탈퇴 컴포넌트
@author scarlet
@version 1.0.0
생성일 2022-03-19
마지막 수정일 2022-03-19
*/

import React from "react";
import { useRef, useState } from "react";
import { apiDist } from "../../../api/user";
import router from "next/router";
import styles from "./userDestroy.module.css";
const UserDestroy = () => {
  const [state, setState] = useState({
    isValid: true,
  });
  const dangerString = "개인 정보 및 모든 정보를 삭제합니다";
  const alertString = "정말로 탈퇴하시겠습니까?";
  const { isValid } = state;
  const distMsg = "#eb2f64";

  const changeInput = () => {
    if (!ref.current?.value) {
      setState({
        isValid: true,
      });
      return;
    }

    if (ref.current?.value === dangerString) {
      setState({
        isValid: false,
      });
    }
  };
  const ref = useRef<HTMLInputElement>(null);
  const onValidSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (ref.current?.value !== dangerString) {
      setState({
        isValid: true,
      });
      return;
    }

    if (ref.current?.value === dangerString) {
      if (confirm(alertString)) {
        try {
          if (token) {
            await apiDist(token);
            alert("회원탈퇴가 완료되었습니다.");
            localStorage.removeItem("token");
            router.push("/landing");
          }
        } catch (e) {
          throw new Error("client error");
        }
      }
    }
  };
  return (
    <>
      <strong style={{ color: distMsg, fontSize: "0.8em" }}>
        밑 글을 입력하고 탈퇴 버튼을 누르시면 탈퇴가 완료됩니다.
      </strong>
      <form className={styles.distForm} onSubmit={onValidSubmit}>
        <div style={{ textAlign: "center" }}>개인 정보 및 모든 정보를 삭제합니다</div>
        <input hidden={true} />
        <input autoFocus type="text" ref={ref} onChange={changeInput} />
        <div>
          <button className={styles.distBtn} type="submit" disabled={isValid} aria-label="distBtn">
            탈퇴
          </button>
        </div>
      </form>
    </>
  );
};

export default UserDestroy;
