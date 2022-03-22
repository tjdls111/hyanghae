/*
향수 상세 페이지
@author Wendy
@version 1.0.0
생성일 2022-03-16
마지막 수정일 2022-03-17
*/
import { useState } from "react";
import type { NextPage } from "next";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";
import { AxiosError } from "axios";
import Navigation from "../../components/navigation/navigation";
import Review from "../../components/perfumedetail/review";
import Item from "../../components/perfumedetail/item";

const Detail: NextPage = () => {
  return (
    <>
      <Navigation />
      <Item />
      <Review />
    </>
  );
};

export default Detail;
