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
import ImageSlider from "../components/ui/homePageBanner/imageSlider";

const HomePage: NextPage = () => {
  return (
    <>
      <Navigation />
      <ImageSlider />
    </>
  );
};

export default HomePage;
