import authReducer from "./authSlice";
import { createWrapper } from "next-redux-wrapper";
import { combineReducers, createStore } from "redux";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/lib/persistReducer";
import persistStore from "redux-persist/lib/persistStore";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({ authReducer });

const persistConfig = {
  key: "root",
  storage,
};

const makeStore = () => {
  const isServer = typeof window === "undefined";

  if (isServer) {
    const store = createStore(rootReducer);
    return store;
  } else {
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = createStore(persistedReducer);
    // store.__persistor = persistStore(store);
    persistStore(store);
    return store;
  }
};

export const wrapper = createWrapper(makeStore);

// RootState의 타입
export type RootState = ReturnType<typeof rootReducer>;
