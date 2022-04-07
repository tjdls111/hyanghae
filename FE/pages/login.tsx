/*
로그인
로그인 폼, 기능
@author Wendy
@version 1.0.0
생성일 2022-03-07
마지막 수정일 2022-03-22
*/
import type { NextPage } from "next";
import LoginComponent from "../components/loginSignup/loginComponent";
import Head from "next/head";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>로그인</title>
        <link rel="icon" href="/logos/iconLogo.png" />
      </Head>
      <LoginComponent />
    </>
  );
};

export default Login;
