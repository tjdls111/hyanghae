/*
구글로그인 redirect 페이지
구글로그인 후 redirect되는 페이지이다.
localStorage에 토큰을 저장하고, 홈으로 이동한다.
@author user$
@version 1.0.0
생성일 date$
마지막 수정일 lastdate$
*/

import React, { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import { GetServerSideProps, NextPage } from "next";
import { socialLogin } from "../../api/user";

const Redirect: NextPage = (props) => {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("token", router.query.token as string);
  }, [router.isReady]);
  return (
    <div>
      <h1>소셜 로그인 Redirect URL</h1>
    </div>
  );
};

export default Redirect;
