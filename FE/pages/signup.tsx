/*
회원가입
회원가입 폼, 회원 가입 api 연결 중
@author Wendy
@version 1.0.0
생성일 2022-03-07
마지막 수정일 2022-03-14
*/
import type { NextPage } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AxiosError, AxiosResponse } from "axios";
import styles from "../components/loginSignup/loginSignup.module.css";
import {
  apiSignup,
  apiCheckId,
  apiCheckNickname,
  apiSendEmailNum,
} from "../api/user";
import { LocationSearchingOutlined } from "@mui/icons-material";
import Image from "next/image";
import logo from "../public/logo.jpg";

interface SignupInput {
  result: string;
  id: string;
  password: string;
  passwordConfirmation: string;
  nickname: string;
  emailPartOne: string;
  emailPartTwo: string;
  validationCode: string;
}

const Signup: NextPage = () => {
  const isLoggedIn = false;
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isNicknameChecked, setisNicknameChecked] = useState(false);
  const [isEmailClicked, setisEmailClicked] = useState(false);
  const [isEmailChecked, setisEmailChecked] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState("");

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
      Router.push("/");
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

    if (isIdChecked) {
      if (isNicknameChecked) {
        if (password === passwordConfirmation) {
          try {
            await apiSignup(
              `${emailPartOne}@${emailPartTwo}`,
              id,
              nickname,
              password
            );

            Router.push("/login");
          } catch (e) {
            const error = e as AxiosError;
            if (error?.response?.status === 401) {
              setError("result", {
                message: "일치하는 사용자 정보가 없습니다.",
              });
            }
          }
        } else {
          setError("passwordConfirmation", {
            message: "비밀번호가 일치하지 않습니다. 다시 확인해주세요.",
          });
        }
      } else {
        setError("result", {
          message: "닉네임 중복 검사를 해주세요!",
        });
      }
    } else {
      setError("result", {
        message: "아이디 중복 검사를 해주세요!",
      });
    }
  };

  const idValidation = () => {
    const { id } = getValues();

    try {
      apiCheckId(id)
        .then((res: AxiosResponse) => {
          setIsIdChecked(true);
        })
        .catch((err) => {
          setError("id", { message: "해당 아이디가 이미 존재합니다." });
        });
    } catch (e) {
      const error = e as AxiosError;
    }
  };

  const nicknameValidation = () => {
    const { nickname } = getValues();

    try {
      apiCheckNickname(nickname)
        .then((res) => {
          setisNicknameChecked(true);
        })
        .catch((err) => {
          setError("nickname", { message: "해당 닉네임이 이미 존재합니다." });
        });
    } catch (e) {
      const error = e as AxiosError;
    }
  };

  const submitEmail = () => {
    const { emailPartOne, emailPartTwo } = getValues();

    apiSendEmailNum(`${emailPartOne}@${emailPartTwo}`)
      .then((res) => {
        setisEmailClicked(true);
        setConfirmationNumber(res.data.number);
      })
      .catch(console.log);
  };

  const checkValidationCode = () => {
    const { validationCode } = getValues();
    if (confirmationNumber === validationCode) {
      setisEmailChecked(true);
    } else {
      setisEmailChecked(false);
    }
  };

  const clearLoginError = () => {
    clearErrors("result");
  };

  const resultError = errors.result?.message ? (
    <div className={`${styles.message} ${styles.resultMessage}`} role="alert">
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
  const pwConfirmationError = errors.passwordConfirmation?.message ? (
    <div
      className={`${styles.message} ${styles.pwConfirmationMessage}`}
      role="alert"
    >
      {errors.passwordConfirmation?.message}
    </div>
  ) : (
    <div />
  );

  const nicknameError = errors.nickname?.message ? (
    <div className={`${styles.message} ${styles.nicknameMessage}`} role="alert">
      {errors.nickname?.message}
    </div>
  ) : (
    <div />
  );
  const emailPartOneError = errors.emailPartOne?.message ? (
    <div className={`${styles.message} ${styles.emailOneMessage}`} role="alert">
      {errors.emailPartOne?.message}
    </div>
  ) : (
    <div />
  );

  const emailPartTwoError = errors.emailPartTwo?.message ? (
    <div className={`${styles.message} ${styles.emailTwoMessage}`} role="alert">
      {errors.emailPartTwo?.message}
    </div>
  ) : (
    <div />
  );
  const validationError = errors.validationCode?.message ? (
    <div className={`${styles.message} ${styles.validationCode}`} role="alert">
      {errors.validationCode?.message}
    </div>
  ) : (
    <div />
  );

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
      <h1 className={styles.title}>회원가입</h1>
      <div className={styles.inputContainer}>
        <form onSubmit={handleSubmit(onValidSubmit)}>
          {resultError}
          <label htmlFor="id">
            <input
              onKeyUp={() => {
                setIsIdChecked(false);
              }}
              className={`${styles.smallInputForm} ${styles.idForm}`}
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
            <span>
              <button
                type="button"
                onClick={idValidation}
                className={styles.smallInputBtn}
              >
                {isIdChecked ? "완료" : " 검사"}
              </button>
            </span>
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
          <label htmlFor="passwordConfirmation">
            <input
              className={`${styles.inputForm} ${styles.pwConfirmationForm}`}
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
              aria-label="passwordConfirmation"
            />
          </label>
          {pwConfirmationError}
          <label htmlFor="nickname">
            <input
              className={`${styles.smallInputForm} ${styles.nicknameForm}`}
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
              aria-label="nickname"
            />
            <span>
              <button
                type="button"
                onClick={nicknameValidation}
                className={styles.smallInputBtn}
              >
                {isNicknameChecked ? "완료" : " 검사"}
              </button>
            </span>
          </label>
          {nicknameError}
          <label htmlFor="emailPartOne">
            <input
              className={`${styles.emailInputForm} ${styles.emailOneForm}`}
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
              aria-label="emailPartOne"
            />
          </label>
          <span className={styles.guide}>@</span>

          <select
            className={`${styles.selectInput} ${styles.mailForm}`}
            {...register("emailPartTwo")}
          >
            <option value="naver.com">네이버</option>
            <option value="kakao.com">카카오</option>
            <option value="gmail.com">지메일</option>
          </select>
          <span>
            <button
              onClick={submitEmail}
              type="button"
              className={styles.smallInputBtn}
            >
              보내기
            </button>
          </span>

          {emailPartOneError}
          {emailPartTwoError}
          {isEmailClicked && (
            <div>
              <label htmlFor="validationInput">
                <input
                  className={`${styles.smallInputForm} ${styles.validationForm}`}
                  {...register("validationCode", {
                    required: "인증 번호를 입력하세요.",
                    minLength: {
                      value: 1,
                      message: "인증번호는 1글자 이상입니다",
                    },
                  })}
                  type="text"
                  placeholder="인증번호를 입력하세요."
                  onInput={clearLoginError}
                  aria-label="code"
                />
              </label>
              <button
                onClick={checkValidationCode}
                type="button"
                className={styles.smallInputBtn}
              >
                {isEmailChecked ? "완료" : " 검사"}
              </button>
            </div>
          )}

          {validationError}
          <button
            className={`${styles.inputForm} ${styles.inputBtn} ${
              isValid &&
              isIdChecked &&
              isNicknameChecked &&
              isEmailChecked &&
              styles.canClick
            }`}
            type="submit"
            value="회원가입"
            disabled={!isValid}
            aria-label="signupBtn"
          >
            회원가입
          </button>
        </form>
        <p className={styles.guide}>그냥 둘러 볼게요.</p>
      </div>
    </div>
  );
};

export default Signup;
