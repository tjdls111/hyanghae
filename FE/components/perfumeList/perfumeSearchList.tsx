import React, { useState, useCallback, useEffect } from "react";
import { product } from "perfume";
import styles from "./perfumeSearchList.module.css";
import ProductCard from "../ui/productCard/productCard";
import { useInView } from "react-intersection-observer";
import axios from "axios";

const PerfumeSearchList: React.FC<{ content: string }> = ({ content }) => {
  const [perfumes, setPerfumes] = useState<product[]>([]);
  const [page, setPage] = useState(0);
  const [ref, inView] = useInView();
  const [loading, setLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  // 필터 혹은 검색어가 바뀔경우
  // 1. 리스트 비우기
  // 2. 페이지 0으로 재설정
  // 3. 데이터 가져오기
  useEffect(() => {
    setPerfumes([]);
    setPage(0);
  }, [content]);

  // 서버에서 데이터를 가져오는 함수
  // useCallback을 이용하여 page가 바뀔 때 마다 새로 생성
  const fetchPerfumes = useCallback(async () => {
    setLoading(true);
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
        if (page === 0) {
          setPerfumes([...res.data.perfumeList]);
        } else {
          setPerfumes((prev) => [...prev, ...res.data.perfumeList]);
        }
        setIsLastPage(res.data.last);
      })
      .catch(console.log);
    setLoading(false);
  }, [page, content]);

  // 함수가 새로 생성되면 실행
  useEffect(() => {
    fetchPerfumes();
  }, [fetchPerfumes]);

  useEffect(() => {
    if (inView && !loading && !isLastPage) {
      setPage((prev) => prev + 1);
    }
  }, [inView, loading, isLastPage]);

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

export default PerfumeSearchList;
