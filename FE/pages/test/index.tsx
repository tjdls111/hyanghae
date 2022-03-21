import React from "react";
import type { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/index";

const test: NextPage = () => {
  const counter: number = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();

  const handleIncrement = function () {
    dispatch({ type: "increment" });
  };
  const handleDecrement = function () {
    dispatch({ type: "decrement" });
  };
  const handleIncrease = function () {
    dispatch({ type: "increase", amount: 10 });
  };

  return (
    <>
      <div>{counter}</div>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      <button onClick={handleIncrease}>Increase By 10</button>
    </>
  );
};

export default test;
