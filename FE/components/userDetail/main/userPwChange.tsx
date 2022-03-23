import React, { useRef, useState } from "react";
import styles from "./userPwChange.module.css";
import { apiCheckMod, apiPwCh } from "../../../api/user";
import { useRouter } from "next/router";
const UserPwChange = () => {
  const [isValid, setValid] = useState(false);
  const [isMsg1, setMsg1] = useState("");
  const [isMsg2, setMsg2] = useState("");
  // 세개 인풋 값 확인할 ref
  const pwRef = useRef<HTMLInputElement>(null);
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const router = useRouter();
  
  const bool1 = useRef(false);
  const txt1 = useRef("");
  const txt2 = useRef("");
  const bool2 = useRef(false);

  const onValid = (domNum: number) => {
    const regExp = new RegExp(/^[A-Za-z0-9]+$/);
    if (domNum === 1) {
      const pw = ref1.current?.value;
      if (pw) {
        if (!regExp.test(pw)) {
          if (domNum === 1) {
            bool1.current = false;
            setMsg1("영문과 숫자만 입력할 수 있습니다.");
            return;
          } else {
            bool1.current = false;
            setMsg1("영문과 숫자만 입력할 수 있습니다.");
            return;
          }
        } else if (pw.length < 8 || pw.length > 16) {
          bool1.current = false;
          setMsg1("8자 이상 16자 이하");
          return;
        } else {
          setMsg1("");
          setMsg2("");
          txt1.current = pw;
          bool1.current = true;
        }
      }
    } else if (domNum === 2) {
      const pw = ref2.current?.value;
      if (pw) {
        if (!regExp.test(pw)) {
          if (domNum === 2) {
            bool2.current = false;
            setMsg2("영문과 숫자만 입력할 수 있습니다.");
            return;
          } else {
            bool2.current = false;
            setMsg2("영문과 숫자만 입력할 수 있습니다.");
            return;
          }
        } else if (pw.length < 8 || pw.length > 16) {
          setMsg2("8자 이상 16자 이하");
          bool2.current = false;
          return;
        } else {
          setMsg1("");
          setMsg2("");
          txt2.current = pw;
          bool2.current = true;
        }
      }
    }

    if (txt1.current !== txt2.current) {
      setValid(false);
      setMsg2("패스워드 확인이 틀렸습니다.");
      return;
    }

    if (bool1.current && bool2.current) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const onSubmit = async () => {
    const token = localStorage.getItem("token");
    const currentPw = pwRef.current?.value;
    const changePw = ref2.current?.value;
    if (currentPw === changePw) {
      alert("현재 비밀번호와 바꾸려는 비밀번호가 같습니다");
      return;
    }
    if (currentPw === "") {
      alert("현재 비밀번호를 입력해주세요");
      return;
    }

    if (confirm("변경하시겠습니까?")) {
      try {
        if (token && currentPw) {
          await apiCheckMod(currentPw, token);
        }
      } catch (e) {
        alert("현재 비밀번호와 일치 하지않습니다.");
        return;
      }
      try {
        if (token && changePw) {
          // 비밀번호 변경
          await apiPwCh(changePw, token);
          alert("변경 완료되었습니다.");
          router.replace("/home");
        }
      } catch (e) {
        console.error(e);
        alert("알 수없는 오류가 발생하였습니다.");
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        <header>비밀번호 변경</header>
        <input autoFocus type="password" placeholder="현재 비밀번호" ref={pwRef} />
        <input type="password" placeholder="새 비밀번호" onChange={() => onValid(1)} ref={ref1} />
        <div>{isMsg1}</div>
        <input
          type="password"
          placeholder="새 비밀번호 확인"
          ref={ref2}
          onChange={() => onValid(2)}
        />
        <div>{isMsg2}</div>
        <button disabled={!isValid} onClick={onSubmit}>
          변경
        </button>
      </div>
    </>
  );
};

export default UserPwChange;
