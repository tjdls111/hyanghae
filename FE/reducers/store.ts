import counterReducer from "./counterSlice";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import authReducer from "./authSlice";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

// reducer 합치기
const rootReducer = combineReducers({ counterReducer, authReducer });

// redux-persist 설정
const persistConfig = {
  key: "root", // reducer 객체의 어디부터 스토리지에 저장할지 설정
  storage, // localStorage로 설정
};

persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
