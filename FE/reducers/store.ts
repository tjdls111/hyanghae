import authReducer from "./authSlice";
import sortReducer from "./sortSlice";
import titleReducer from "./titleSlice";
import searchHistoryReducer from "./searchHistorySlice";
import { createWrapper } from "next-redux-wrapper";
import { combineReducers, createStore } from "redux";
import persistReducer from "redux-persist/lib/persistReducer";
import persistStore from "redux-persist/lib/persistStore";
import storageSession from "redux-persist/lib/storage/session";

const rootReducer = combineReducers({
  authReducer,
  sortReducer,
  titleReducer,
  searchHistoryReducer,
});

const persistConfig = {
  key: "root",
  storage: storageSession,
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
