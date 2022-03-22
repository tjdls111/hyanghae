/*
_app.tsx
글로벌 css 적용
@author Jackson
@version 1.0.0
생성일 2022-03-07
마지막 수정일2022-03-14
*/

import "../styles/global.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store/index";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
