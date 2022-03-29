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
import Navigation from "../../components/navigation/navigation";
import Review from "../../components/perfumeDetail/review";
import Item from "../../components/perfumeDetail/item";
import { apiPerfumeDetail, apiShoppingSearch } from "../../api/perfume";
import ReviewList from "../../components/perfumeDetail/reviewList";

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
  season: string;
  tpo: string;
}

interface PerfumeData {
  name: string;
  score: string;
  price: string;
  note: string;
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
              season: "",
              tpo: "",
            };
            myres = res.data as PerfumeResult;
            setData({
              name: myres.perfumeName,
              score: myres.perfumeScore,
              price: myres.perfumeCost,
              note: "",
              season: myres.season,
              style: myres.tpo,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })();
    }
  }, [router]);

  return (
    <>
      <Navigation />
      <Item data={data} />
      <Review isEditMode='false' setEdit={()=>{}} star="5" content="" />
      <ReviewList />
    </>
  );
};

export default Detail;
