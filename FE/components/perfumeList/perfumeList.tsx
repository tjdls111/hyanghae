import React, { useState, useCallback, useEffect } from "react";
import { product } from "perfume";
import styles from "./perfumeList.module.css";
import ProductCard from "../ui/productCard/productCard";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { useAppSelector } from "../../reducers/hooks";

const PerfumeList: React.FC<{ search: boolean; content: string }> = ({
  search,
  content,
}) => {
  const [perfumes, setPerfumes] = useState<product[]>([]);
  const [page, setPage] = useState(0);
  const [ref, inView] = useInView();
  const [loading, setLoading] = useState(false);
  const sort = useAppSelector((state) => state.sortReducer.sort);
  const [isLastPage, setIsLastPage] = useState(false);
  // 필터 혹은 검색어가 바뀔경우
  // 1. 리스트 비우기
  // 2. 페이지 0으로 재설정
  // 3. 데이터 가져오기
  useEffect(() => {
    setPerfumes([]);
    setPage(0);
    setIsLastPage(false);
  }, [sort, content]);

  console.log(perfumes);

  // 서버에서 데이터를 가져오는 함수
  // useCallback을 이용하여 page가 바뀔 때 마다 새로 생성
  const fetchPerfumes = useCallback(async () => {
    setLoading(true);

    if (search) {
      await axios
        .get(process.env.NEXT_PUBLIC_BASE_URL + "/perfume/search", {
          params: {
            page,
            size: 10,
            keyword: "perfumeName",
            content,
          },
        })
        .then((res) => {
          setPerfumes((prev) => [...prev, ...res.data.perfumeList]);
          // 마지막 페이지 체크
          setIsLastPage(res.data.last);
        })
        .catch(console.log);
      setLoading(false);
    } else {
      await axios
        .get(process.env.NEXT_PUBLIC_BASE_URL + "/perfume/list", {
          params: { page, size: 10, sort },
        })
        .then((res) => {
          setPerfumes((prev) => [...prev, ...res.data.perfumeList]);
          // 마지막 페이지 체크
          setIsLastPage(res.data.last);
        })
        .catch(console.log);
      setLoading(false);
    }
  }, [page]);

  // 함수가 새로 생성되면 실행
  useEffect(() => {
    fetchPerfumes();
  }, [fetchPerfumes]);

  useEffect(() => {
    if (inView && !loading && !isLastPage) {
      setPage((prev) => prev + 1);
    }
  }, [inView, loading]);

  return (
    <div className={styles.grid}>
      {perfumes.map((perfume, idx) =>
        perfumes.length - 1 === idx ? (
          <div ref={ref}>
            <ProductCard key={perfume.perfumeName} product={perfume} />
          </div>
        ) : (
          <div>
            <ProductCard key={perfume.perfumeName} product={perfume} />
          </div>
        )
      )}
    </div>
  );
};

export default PerfumeList;
