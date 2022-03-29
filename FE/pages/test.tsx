import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/authSlice";

const test = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

  const loginHandler = function () {
    dispatch(login());
  };
  const logoutHandler = function () {
    dispatch(logout());
  };

  return (
    <div>
      <h1>Redux-test</h1>
      <h2>{isAuthenticated && "loggedIn"}</h2>
      <h2>{isAuthenticated || "loggedOut"}</h2>
      <button onClick={loginHandler}>login</button>
      <button onClick={logoutHandler}>logout</button>
    </div>
  );
};

export default test;
