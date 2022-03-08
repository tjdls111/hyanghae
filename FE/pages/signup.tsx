/*
회원가입
회원가입 폼
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

interface SignupInput {
  result: string;
  id: string;
  password: string;
  passwordConfirmation: string;
  nickname: string;
  emailPartOne: string;
  emailPartTwo: string;
}

const Signup: NextPage = () => {
  const isLoggedIn = false;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    clearErrors,
  } = useForm<SignupInput>({
    mode: "onChange",
  });

  useEffect(() => {
    if (isLoggedIn) {
      // 메인 페이지로 넘기기
    }
  }, [isLoggedIn]);

  const onValidSubmit: SubmitHandler<SignupInput> = async () => {
    const {
      id,
      password,
      passwordConfirmation,
      nickname,
      emailPartOne,
      emailPartTwo,
    } = getValues();
    try {
      // api 연결
    } catch (e) {
      const error = e as AxiosError;
      if (error?.response?.status === 401) {
        setError("result", { message: "일치하는 사용자 정보가 없습니다." });
      }
    }
  };

  const idValidation = () => {
    console.log("아이디 존재 에러");
    try {
      // api 연결 - 아이디 중복 검사
    } catch (e) {
      const error = e as AxiosError; //결과를 받아서 메시지 보여주기
      if (error?.response?.status === 401) {
        setError("result", { message: "해당 아이디가 이미 존재합니다." });
      }
    }
  };

  const nicknameValidation = () => {
    console.log("닉네임 존재 에러");
    try {
      // api 연결 - 닉네임 중복 검사
    } catch (e) {
      const error = e as AxiosError; //결과를 받아서 메시지 보여주기
      if (error?.response?.status === 401) {
        setError("result", { message: "해당 닉네임이 이미 존재합니다." });
      }
    }
  };

  const clearLoginError = () => {
    clearErrors("result");
  };

  const resultError = errors.result?.message ? (
    <div className={styles.message}>{errors.result?.message}</div>
  ) : (
    <div />
  );

  const idError = errors.id?.message ? (
    <div className={styles.message}>{errors.id?.message}</div>
  ) : (
    <div />
  );
  const pwError = errors.password?.message ? (
    <div className={styles.message}>{errors.password?.message}</div>
  ) : (
    <div />
  );
  const pwConfirmationError = errors.passwordConfirmation?.message ? (
    <div className={styles.message}>{errors.passwordConfirmation?.message}</div>
  ) : (
    <div />
  );
  const nicknameError = errors.nickname?.message ? (
    <div className={styles.message}>{errors.nickname?.message}</div>
  ) : (
    <div />
  );
  const emailPartOneError = errors.emailPartOne?.message ? (
    <div className={styles.message}>{errors.emailPartOne?.message}</div>
  ) : (
    <div />
  );

  const emailPartTwoError = errors.emailPartTwo?.message ? (
    <div className={styles.message}>{errors.emailPartTwo?.message}</div>
  ) : (
    <div />
  );

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={`/logo.jpg`} alt="logo" />
      <h1 className={styles.title}>회원가입</h1>
      <div className={styles.inputContainer}>
        <form onSubmit={handleSubmit(onValidSubmit)}>
          {resultError}
          <label htmlFor="id">
            <input
              className={styles.smallInputForm}
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
            <span>
              <button
                type="button"
                onClick={idValidation}
                className={styles.smallInputBtn}
              >
                검사
              </button>
            </span>
          </label>
          {idError}
          <label htmlFor="password">
            <input
              className={styles.inputForm}
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
          <label htmlFor="passwordConfirmation">
            <input
              className={styles.inputForm}
              {...register("passwordConfirmation", {
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
              placeholder="비밀번호를 다시 한번 입력해주세요"
              onInput={clearLoginError}
            />
          </label>
          {pwConfirmationError}
          <label htmlFor="nickname">
            <input
              className={styles.smallInputForm}
              {...register("nickname", {
                required: "닉네임을 입력하세요.",
                minLength: {
                  value: 1,
                  message: "닉네임은 1글자 이상 10글자 미만입니다.",
                },
                maxLength: {
                  value: 10,
                  message: "닉네임은 1글자 이상 10글자 미만입니다.",
                },
              })}
              type="text"
              placeholder="닉네임"
              onInput={clearLoginError}
            />
            <span>
              <button
                type="button"
                onClick={nicknameValidation}
                className={styles.smallInputBtn}
              >
                검사
              </button>
            </span>
          </label>
          {nicknameError}
          <label htmlFor="emailPartOne">
            <input
              className={styles.emailInputForm}
              {...register("emailPartOne", {
                required: "이메일을 입력하세요.",
                minLength: {
                  value: 1,
                  message: "이메일은 1글자 이상입니다.",
                },
              })}
              type="text"
              placeholder="이메일"
              onInput={clearLoginError}
            />
          </label>
          <span className={styles.guide}>@</span>

          <select className={styles.selectInput} {...register("emailPartTwo")}>
            <option value="naver.com">네이버</option>
            <option value="kakao.com">카카오</option>
            <option value="gmail.com">지메일</option>
          </select>
          <span>
            <button type="button" className={styles.smallInputBtn}>
              검사
            </button>
          </span>

          {emailPartOneError}
          {emailPartTwoError}
          <input
            className={styles.inputBtn}
            type="submit"
            value="회원가입"
            disabled={!isValid}
          />
        </form>
        <p className={styles.guide}>그냥 둘러 볼게요.</p>
      </div>
    </div>
  );
};

export default Signup;
