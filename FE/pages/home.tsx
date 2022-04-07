/*
홈페이지
개발중: 내비게이션, 배너
@author Jackson
@version 1.0.0
생성일 2022-03-14
마지막 수정일 2022-03-22
*/

import React from "react";
import { NextPage } from "next";
import Navigation from "../components/navigation/navigation";
import NewHomePageBanner from "../components/ui/homePageBanner/newHomePageBanner";
import BestProduct from "../components/bestProduct/bestProducts";
import SeasonalProduct from "../components/seasonalProduct/seasonalProduct";
import Footer from "../components/landing/footer";
import RecentReviews from "../components/recentReviews/recentReviews";
import Head from "next/head";

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>향해</title>
        <link rel="icon" href="/logos/iconLogo.png" />
      </Head>
      <Navigation />
      <NewHomePageBanner />
      <BestProduct />
      <SeasonalProduct />
      <RecentReviews />
      <Footer />
    </>
  );
};

export default HomePage;
