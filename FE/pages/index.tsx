/*
랜딩페이지
랜딩페이지
@author Jackson
@version 1.0.0
생성일 2022.03.08$
마지막 수정일 2022.03.14$
*/
import type { NextPage } from "next";
import React from "react";
import Header from "../components/landing/header";
import Tutorial from "../components/landing/tutorial";
import Footer from "../components/landing/footer";
import Link from "next/link";

const LandingPage: NextPage = () => {
  return (
    <>
      <Header />
      <Tutorial />
      <Footer />
    </>
  );
};

export default LandingPage;
