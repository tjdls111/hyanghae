import React from "react";
import { useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import styles from "../loginSignup/loginSignup.module.css";
import Link from "next/link";
import { apiFindUserId } from "../../api/user";
import Image from "next/image";

interface FindIdInput {
  result: string;
  email: string;
}
function FindIdComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [idList, setIdList] = useState([] as Array<string>);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<FindIdInput>({
    mode: "onChange",
  });

  const emailError = errors.email?.message ? (
    <div className={`${styles.message}`} role="alert">
      {errors.email.message}
    </div>
  ) : (
    <div />
  );
  console.log(idList);
  const onValidSubmit: SubmitHandler<FindIdInput> = async () => {
    const { email } = getValues();
    setIsLoading(true);
    apiFindUserId(email)
      .then((res) => {
        console.log(res);
        setIdList(res.data.idList);
      })
      .catch((err) => {
        alert("회원가입 정보가 없습니다. 다시 한번 확인해주세요.");
        setIsLoading(false);
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

      <h1 className={styles.title}>
        {idList.length == 1 ? "아이디 찾기" : "찾은 아이디들"}
      </h1>
      {idList.length == 0 && (
        <div className={styles.inputContainer}>
          <form onSubmit={handleSubmit(onValidSubmit)}>
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
                area-aria-label="email"
                data-testid="email-test"
              ></input>
            </label>
            {emailError}
            <button
              className={`${styles.inputForm} ${styles.inputBtn}  ${
                isValid && !isLoading && styles.canClick
              }`}
              type="submit"
              value="아이디 찾기"
              aria-label="findBtn"
              disabled={isLoading}
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
            <Link href="/findPw">
              <span className={`${styles.guide} ${styles.signup}`}>
                비밀번호 찾기
              </span>
            </Link>
          </div>
        </div>
      )}
      <ul>
        {idList.map((id) => (
          <li className={styles.liItem}>{id}</li>
        ))}
      </ul>
      {idList.length > 0 && (
        <div className={styles.goToLogin}>
          <Link href="/login">
            <strong className={`${styles.guide} ${styles.signup}`}>
              로그인하러 가기
            </strong>
          </Link>
        </div>
      )}
    </div>
  );
}

export default FindIdComponent;
