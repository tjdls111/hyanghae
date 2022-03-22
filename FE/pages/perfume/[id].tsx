/*
향수 상세 페이지
@author Wendy
@version 1.0.0
생성일 2022-03-16
마지막 수정일 2022-03-22
*/
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";
import { AxiosError } from "axios";
import Navigation from "../../components/navigation/navigation";
import Link from "next/link";
import Review from "../../components/perfumeDetail/review";
import Item from "../../components/perfumeDetail/item";
import { apiPerfumeDetail, apiShoppingSearch } from "../../api/perfume";

interface PerfumeData {
  dayNight: string;
  gender: string;
  mood: string;
  perfumeBrand: string;
  perfumeCost: string;
  perfumeData: string;
  perfumeId: string;
  perfumeName: string;
  perfumeScore: string;
  perfumeUrl: string;
  season: string;
  tpo: string;
}

const Detail: NextPage = () => {
  const [data, setData] = useState(Object);
  const [perfumeId, setPerfumeId] = useState(null);
  const router = useRouter();
  console.log(router.query.id);

  useEffect(() => {
    setPerfumeId(router.query.id);
    console.log(router.query.id);
    // api로 향수 상세 정보를 가져오기
    apiPerfumeDetail(perfumeId)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setData(
      {
        name: "Coco madmoajel o de parpe enti",
        score: 4.3,
        price: 242000,
        note: "woody",
        imgPath:
          "https://photo.akmall.com/image4/goods/78/58/60/94/78586094_M_350.jpg",
        season: "spring",
        style: "lovely",
      },
      []
    );

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
