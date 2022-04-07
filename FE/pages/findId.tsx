/*
아이디 찾기
아이디 찾기
@author Wendy
@version 1.0.0
생성일 2022-03-14
마지막 수정일 2022-03-15
*/

import type { NextPage } from "next";
import FindIdComponent from "../components/find/findIdComponent";
import Head from "next/head";

const FindId: NextPage = () => {
  return (
    <>
      <Head>
        <title>아이디 찾기</title>
        <link rel="icon" href="/logos/iconLogo.png" />
      </Head>
      <FindIdComponent />
    </>
  );
};

export default FindId;
