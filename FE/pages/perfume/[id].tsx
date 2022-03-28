/*
향수 상세 페이지
@author Wendy
@version 1.0.0
생성일 2022-03-16
마지막 수정일 2022-03-22
*/
import { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import type { NextPage } from "next";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";
import { AxiosError } from "axios";
import Navigation from "../../components/navigation/navigation";
import Link from "next/link";
import Review from "../../components/perfumeDetail/review";
import Item from "../../components/perfumeDetail/item";
import { apiPerfumeDetail, apiShoppingSearch } from "../../api/perfume";
import { rmSync } from "fs";

interface PerfumeResult {
  dayNight: string;
  gender: string;
  mood: string;
  perfumeBrand: string;
  perfumeCost: string;
  perfumeDate: string;
  perfumeId: string;
  perfumeName: string;
  perfumeScore: string;
  perfumeUrl: string;
  season: string;
  tpo: string;
}

interface PerfumeData {
  name: string;
  score: string;
  price: string;
  note: string;
  imgPath: string;
  season: string;
  style: string;
}

const Detail: NextPage = () => {
  const [data, setData] = useState({} as PerfumeData);
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      (async () => {
        apiPerfumeDetail(router.query.id as string)
          .then((res) => {
            let myres: PerfumeResult = {
              dayNight: "",
              gender: "",
              mood: "",
              perfumeBrand: "",
              perfumeCost: "",
              perfumeDate: "",
              perfumeId: "",
              perfumeName: "",
              perfumeScore: "",
              perfumeUrl: "",
              season: "",
              tpo: "",
            };
            myres = res.data as PerfumeResult;
            setData({
              name: myres.perfumeName,
              score: myres.perfumeScore,
              price: myres.perfumeCost,
              note: "",
              imgPath:
                "https://photo.akmall.com/image4/goods/78/58/60/94/78586094_M_350.jpg",
              season: myres.season,
              style: myres.tpo,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })();

      // 이베이/ 네이버 등 쇼핑 검색 api 로 검색 결과 가져오기 -> 결과가 있으면 연결되도록!
      // apiShoppingSearch()
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
  }, [router.isReady]);

  return (
    <>
      <Navigation />
      <Item data={data} />
      <Review />
    </>
  );
};

export default Detail;
