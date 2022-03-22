/*
향수 상세 페이지
@author Wendy
@version 1.0.0
생성일 2022-03-16
마지막 수정일 2022-03-17
*/
import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";
import { AxiosError } from "axios";
import styles from "../components/perfumedetail/perfumedetail.module.css";
import Navigation from "../../components/ui/navigation";
import Link from "next/link";
import Review from "../../components/perfumedetail/reviewlist";
import Item from "../../components/perfumedetail/item";
import { apiShoppingSearch } from "../../api/perfume";

const Detail: NextPage = () => {
  const [data, setData] = useState(Object);

  useEffect(() => {
    // api로 향수 상세 정보를 가져오기
    setData({
      name: "Coco madmoajel o de parpe enti",
      score: 4.3,
      price: 242000,
      note: "woody",
      imgPath:
        "https://photo.akmall.com/image4/goods/78/58/60/94/78586094_M_350.jpg",
      season: "spring",
      style: "lovely",
    });

    // 검색 api 로 검색 결과 가져오기 -> 결과가 있으면 연결되도록!
    // apiShoppingSearch()
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  return (
    <>
      <Navigation />
      <Item data={data} />
      <Review />
    </>
  );
};

export default Detail;
