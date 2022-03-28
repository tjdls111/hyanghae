import counterReducer from "./counterSlice";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import authReducer from "./authSlice";
import { useDispatch } from "react-redux";

const dispatch = useDispatch();

dispatch({ type: "login" });

const store = configureStore({
  reducer: { counter: counterReducer, auth: authReducer },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
