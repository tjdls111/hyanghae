import { NextPage } from "next";
import Navigation from "../components/navigation/navigation";
import Detail from "../components/userDetail/detail";
import Head from "next/head";

/*
마이 페이지
@author Scarlet
@version 1.0.0
생성일 2022-03-16
마지막 수정일 2022-03-16
*/

const UserDetail: NextPage = () => {
  return (
    <>
      <Head>
        <title>마이페이지</title>
        <link rel="icon" href="/logos/iconLogo.png" />
      </Head>
      <Navigation />
      <Detail />
      <footer>
        <footer />
      </footer>
    </>
  );
};

export default UserDetail;
