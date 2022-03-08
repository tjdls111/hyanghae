/*
로그인
로그인 폼
@author Wendy
@version 1.0.0
생성일 2022-03-07
마지막 수정일 2022-03-08
*/
import type { NextPage } from "next";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AxiosError } from "axios";
import styles from "../styles/LoginSignup.module.css";

interface LoginInput {
  result: string;
  id: string;
  password: string;
}

const Login: NextPage = () => {
  const isLoggedIn = false;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    clearErrors,
  } = useForm<LoginInput>({
    mode: "onChange",
  });

  useEffect(() => {
    if (isLoggedIn) {
      // 메인 페이지로 넘기기
    }
  }, [isLoggedIn]);

  const onValidSubmit: SubmitHandler<LoginInput> = async () => {
    const { id, password } = getValues();
    try {
      // api 연결
    } catch (e) {
      const error = e as AxiosError;
      if (error?.response?.status === 401) {
        setError("result", { message: "일치하는 사용자 정보가 없습니다." });
      }
    }
  };

  const clearLoginError = () => {
    clearErrors("result");
  };

  const resultError = errors.result?.message ? (
    <div className={`${styles.message} ${styles.resultMessage}`}>
      {errors.result?.message}
    </div>
  ) : (
    <div />
  );

  const idError = errors.id?.message ? (
    <div className={`${styles.message} ${styles.idMessage}`}>
      {errors.id?.message}
    </div>
  ) : (
    <div />
  );
  const pwError = errors.password?.message ? (
    <div className={`${styles.message} ${styles.pwMessage}`}>
      {errors.password?.message}
    </div>
  ) : (
    <div />
  );

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={`/logo.jpg`} alt="logo" />
      <h1 className={styles.title}>로그인</h1>
      <div className={styles.inputContainer}>
        <form onSubmit={handleSubmit(onValidSubmit)}>
          {resultError}
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
              placeholder="ID"
              onInput={clearLoginError}
            />
          </label>
          {idError}
          <label htmlFor="password">
            <input
              className={`${styles.inputForm} ${styles.pwForm}`}
              {...register("password", {
                required: "비밀번호를 입력하세요.",
                pattern: {
                  value: /^[A-Za-z0-9]+$/,
                  message:
                    "잘못된 비밀번호 형식입니다. 영어, 숫자만 가능합니다.",
                },
                minLength: {
                  value: 8,
                  message: "비밀번호는 8자 이상, 16자 이하입니다.",
                },
                maxLength: {
                  value: 16,
                  message: "비밀번호는 8자 이상, 16자 이하입니다.",
                },
              })}
              type="password"
              placeholder="Password"
              onInput={clearLoginError}
            />
          </label>
          {pwError}
          <input
            className={`${styles.inputForm} ${styles.inputBtn}`}
            type="submit"
            value="로그인"
            disabled={!isValid}
          />
        </form>
        <span className={styles.guide}>향해 회원이 아니신가요?</span>{" "}
        <strong className={styles.guide}>지금 가입하세요</strong>
        <p className={styles.guide}>그냥 둘러 볼게요.</p>
      </div>
    </div>
  );
};

export default Login;
