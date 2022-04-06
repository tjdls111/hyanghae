import authReducer from "./authSlice";
import sortReducer from "./sortSlice";
import titleReducer from "./titleSlice";
import { createWrapper } from "next-redux-wrapper";
import { combineReducers, createStore } from "redux";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/lib/persistReducer";
import persistStore from "redux-persist/lib/persistStore";

const rootReducer = combineReducers({ authReducer, sortReducer, titleReducer });

const persistConfig = {
  key: "root",
  blacklist: ["sort", "title"],
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
    persistStore(store);
    return store;
  }
};

export const wrapper = createWrapper(makeStore);
export type RootState = ReturnType<typeof rootReducer>;
