import React from "react";
import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import styles from "./loginSignup.module.css";
import Link from "next/link";
import { apiLogin } from "../../api/user";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../reducers/hooks";
import { login } from "../../reducers/authSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface LoginInput {
  result: string;
  id: string;
  password: string;
}

const LoginComponent = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
  const dispatch = useDispatch();
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/home");
    }
  }, []);

  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const onValidSubmit: SubmitHandler<LoginInput> = async () => {
    const { id, password } = getValues();
    try {
      const res = await apiLogin(id, password);
      if (res.data?.token) {
        dispatch(login(res.data.token));
      }
      router.replace("/home");
    } catch (e) {
      const error = e as AxiosError;
      window.alert("아이디, 비밀번호 정보가 없습니다. 확인해주세요.");
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
    <div className={`${styles.message} ${styles.idMessage}`} role="alert">
      {errors.id?.message}
    </div>
  ) : (
    <div />
  );
  const pwError = errors.password?.message ? (
    <div className={`${styles.message} ${styles.pwMessage}`} role="alert">
      {errors.password?.message}
    </div>
  ) : (
    <div />
  );
  // console.log(`${url}/oauth2/authorization/google`);

  // const requestSocialLogin = function () {
  //   axios
  //     .get(`${BASE_URL}/oauth2/authorization/google`)
  //     .then((res) => console.log(res.request.responseURL));
  // };
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
              aria-label="id"
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
              aria-label="password"
            />
          </label>
          {pwError}
          <button
            className={`${styles.inputForm} ${styles.inputBtn}`}
            type="submit"
            value="로그인"
            disabled={!isValid}
            aria-label="loginBtn"
          >
            로그인
          </button>
        </form>
        <span className={styles.guide}>향해 회원이 아니신가요?</span>{" "}
        <Link href="/signup">
          <strong className={`${styles.guide} ${styles.signup}`}>
            지금 가입하세요
          </strong>
        </Link>
        <Link href="/home">
          <p className={`${styles.guide} ${styles.main}`}>그냥 둘러 볼게요.</p>
        </Link>
        <div className={styles.find}>
          <Link href="/findId">
            <span className={`${styles.guide} ${styles.signup}`}>
              아이디 찾기
            </span>
          </Link>{" "}
          |{" "}
          <Link href="/findPw">
            <span className={`${styles.guide} ${styles.signup}`}>
              비밀번호 찾기
            </span>
          </Link>
        </div>
        <a href="https://j6d104.p.ssafy.io:8443/oauth2/authorization/google">
          <button className={styles.socialLogin} aria-label="socialBtn">
            <div className={styles.imageWrapper}>
              <Image
                className={styles.logoImage}
                alt="googleLogo"
                src="/images/login_files/googleLogo.png"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <p className={styles.socialLoginText}>구글 로그인</p>
          </button>
        </a>
      </div>
    </div>
  );
};

export default LoginComponent;
