import { NextPage } from "next";
import React from "react";
import { useAppSelector, useAppDispatch } from "../reducers/hooks";
import { login, logout } from "../reducers/authSlice";

const TestPage: NextPage = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();

  const onLoginHandler = function () {
    dispatch(login());
  };

  const onLogoutHandler = function () {
    dispatch(logout());
  };

  return (
    <div>
      <h1>Testing Reducer</h1>
      <h2>{isAuthenticated && "로그인 되었습니다."}</h2>
      <h2>{isAuthenticated || "로그아웃 되었습니다."}</h2>
      <button onClick={onLoginHandler}>login</button>
      <button onClick={onLogoutHandler}>logout</button>
    </div>
  );
};

export default TestPage;
