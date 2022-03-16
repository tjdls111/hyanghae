/*
아이디 찾기
아이디 찾기
@author Wendy
@version 1.0.0
생성일 2022-03-14
마지막 수정일 2022-03-15
*/
import type { NextPage } from "next";
import { useEffect, useRef } from "react";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";
import { AxiosError } from "axios";
import styles from "../components/loginSignup/loginsignup.module.css";
import { SettingsInputAntennaTwoTone } from "@mui/icons-material";
import Link from "next/link";
import { apiFindUserId } from "../api/user";
import Router from "next/router";
import googleLogo from "../public/images/googleLogo.png";
import logo from "../public/logo.jpg";
import Image from "next/image";

interface FindIdInput {
  result: string;
  email: string;
}

const FindId: NextPage = () => {
  const isLoggedIn = false;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    clearErrors,
  } = useForm<FindIdInput>({
    mode: "onChange",
  });

  const emailError = errors.email?.message ? (
    <div className={`${styles.message}`}>{errors.email.message}</div>
  ) : (
    <div />
  );

  const onValidSubmit: SubmitHandler<FindIdInput> = async () => {
    const { email } = getValues();

    apiFindUserId(email)
      .then((res) => {
        alert("이메일로 아이디를 보냈습니다. 메일을 확인해주세요~");
        Router.push("/login");
      })
      .catch((err) => {
        alert("잘못된 이메일입니다. 다시 한번 확인해주세요.");
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper2}>
        <Image className={styles.logoImage} src={logo} layout="fill" />
      </div>
      <h1 className={styles.title}>아이디 찾기</h1>
      <div className={styles.inputContainer}>
        <form onSubmit={handleSubmit(onValidSubmit)}>
          <input
            className={`${styles.inputForm}`}
            {...register("email", {
              required: "이메일을 입력하세요.",
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/,
                message: "잘못된 이메일 형식입니다. ",
              },
              minLength: {
                value: 1,
                message: "이메일은 한 글자 이상입니다.",
              },
              maxLength: {
                value: 100,
                message: "이메일은 백 글자 미만 입니다.",
              },
            })}
            type="email"
            placeholder="이메일을 입력하세요"
            area-aria-label="email"
          ></input>
          {emailError}
          <button
            className={`${styles.inputForm} ${styles.inputBtn}  ${
              isValid && styles.canClick
            }`}
            type="submit"
            value="아이디 찾기"
            aria-label="findBtn"
          >
            찾기
          </button>
        </form>
        <span className={styles.guide}>향해 회원이 아니신가요?</span>{" "}
        <Link href="/signup">
          <strong className={`${styles.guide} ${styles.signup}`}>
            지금 가입하세요
          </strong>
        </Link>
        <p className={`${styles.guide} ${styles.main}`}>그냥 둘러 볼게요.</p>
        <div className={styles.find}>
          <Link href="/findpw">
            <span className={`${styles.guide} ${styles.signup}`}>
              비밀번호 찾기
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FindId;
