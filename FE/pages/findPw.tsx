/*
비밀번호 찾기
비밀번호 찾기
@author Wendy
@version 1.0.0
생성일 2022-03-15
마지막 수정일 2022-03-16
*/
import type { NextPage } from "next";
import { useEffect, useRef } from "react";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";
import { AxiosError } from "axios";
import styles from "../components/loginSignup/loginSignup.module.css";
import { SettingsInputAntennaTwoTone } from "@mui/icons-material";
import Link from "next/link";
import { apiFindpw } from "../api/user";
import Router from "next/router";
import logo from "../public/logo.jpg";
import Image from "next/image";

interface FindPwInput {
  result: string;
  email: string;
  id: string;
}

const FindPw: NextPage = () => {
  const isLoggedIn = false;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    clearErrors,
  } = useForm<FindPwInput>({
    mode: "onChange",
  });

  const emailError = errors.email?.message ? (
    <div className={`${styles.message}`} role="alert">
      {errors.email.message}
    </div>
  ) : (
    <div />
  );
  const idError = errors.id?.message ? (
    <div className={`${styles.message}`} role="alert">
      {errors.id.message}
    </div>
  ) : (
    <div />
  );

  const onValidSubmit: SubmitHandler<FindPwInput> = async () => {
    const { email, id } = getValues();

    apiFindpw(email, id)
      .then((res) => {
        alert("이메일로 새로운 비밀번호를 보냈습니다. 메일을 확인해주세요~");
        Router.push("/login");
      })
      .catch((err) => {
        alert("잘못된 정보입니다. 다시 한번 확인해주세요.");
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper2}>
        <Image
          className={styles.logoImage}
          alt="logo"
          src="/logo.jpg"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <h1 className={styles.title}>비밀번호 찾기</h1>
      <div className={styles.inputContainer}>
        <form onSubmit={handleSubmit(onValidSubmit)}>
          <label htmlFor="id">
            <input
              className={`${styles.inputForm} ${styles.idForm}`}
              {...register("id", {
                required: "아이디를 입력하세요.",
                pattern: {
                  value: /^[a-z0-9]+$/,
                  message:
                    "잘못된 아이디 형식입니다. 영소문자나 숫자만 가능합니다.",
                },
                minLength: {
                  value: 8,
                  message: "아이디는 8자 이상, 16자 이하입니다.",
                },
                maxLength: {
                  value: 16,
                  message: "아이디는 8자 이상, 16자 이하입니다.",
                },
              })}
              type="text"
              placeholder="아이디를 입력하세요."
              aria-label="id"
              data-testid="id-test"
            />
          </label>
          {idError}
          <label htmlFor="email">
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
              aria-label="email"
              data-testid="email-test"
            ></input>
          </label>
          {emailError}
          <label htmlFor="findBtn">
            <button
              className={`${styles.inputForm} ${styles.inputBtn}  ${
                isValid && styles.canClick
              }`}
              type="submit"
              value="비밀번호 찾기"
              aria-label="findBtn"
            >
              찾기
            </button>
          </label>
        </form>
        <span className={styles.guide}>향해 회원이 아니신가요?</span>{" "}
        <Link href="/signup">
          <strong className={`${styles.guide} ${styles.signup}`}>
            지금 가입하세요
          </strong>
        </Link>
        <p className={`${styles.guide} ${styles.main}`}>그냥 둘러 볼게요.</p>
        <div className={styles.find}>
          <Link href="/findId">
            <span className={`${styles.guide} ${styles.signup}`}>
              아이디 찾기
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FindPw;
