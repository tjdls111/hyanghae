/*
비밀번호 찾기
비밀번호 찾기
@author Wendy
@version 1.0.0
생성일 2022-03-15
마지막 수정일 2022-03-16
*/
import type { NextPage } from "next";
import FindPwComponent from "../components/find/findPwComponent";
import Head from "next/head";

const FindPw: NextPage = () => {
  return (
    <>
      <Head>
        <title>비밀번호 찾기</title>
        <link rel="icon" href="/logos/iconLogo.png" />
      </Head>
      <FindPwComponent />
    </>
  );
};

export default FindPw;
