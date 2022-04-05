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
  likeCnt: number;
  group: string;
  imgUrl: string;
  note1: string;
  note2: string;
  note3: string;
  reviewCnt: string;
  like: boolean;
}

interface PerfumeData {
  name: string;
  score: string;
  price: string;
  season: string;
  style: string;
  likeCnt: number;
  gender: string;
  imgUrl: string;
  mood: string;
  note1: string;
  note2: string;
  note3: string;
  perfumeBrand: string;
  tpo: string;
  reviewCnt: string;
  like: boolean;
}

const Detail: NextPage = () => {
  const [data, setData] = useState({} as PerfumeData);

  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      (async () => {
        apiPerfumeDetail(router.query.id as string)
          .then((res) => {
            console.log(res);
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
              likeCnt: 0,
              group: "",
              imgUrl: "",
              note1: "",
              note2: "",
              note3: "",
              reviewCnt: "",
              like: false,
            };
            myres = res.data as PerfumeResult;
            setData({
              name: myres.perfumeName,
              score: myres.perfumeScore,
              price: myres.perfumeCost,
              season: myres.season,
              style: myres.tpo,
              likeCnt: myres.likeCnt,
              gender: myres.gender,
              imgUrl: myres.imgUrl,
              mood: myres.mood,
              note1: myres.note1,
              note2: myres.note2,
              note3: myres.note3,
              perfumeBrand: myres.perfumeBrand,
              tpo: myres.tpo,
              reviewCnt: myres.reviewCnt,
              like: myres.like,
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
      <Review isEditMode="false" setEdit={() => {}} star="5" content="" />
      <ReviewList />
    </>
  );
};

export default Detail;
