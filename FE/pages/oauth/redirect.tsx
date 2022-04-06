/*
구글로그인 redirect 페이지
구글로그인 후 redirect되는 페이지이다.
localStorage에 토큰을 저장하고, 홈으로 이동한다.
@author user$
@version 1.0.0
생성일 date$
마지막 수정일 lastdate$
*/

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/authSlice";

const Redirect: NextPage = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(login(router.query.token));
    router.replace("/home");
  }, [router.isReady]);
  return <></>;
};

export default Redirect;
