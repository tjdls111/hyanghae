/*
향수 상세 페이지의 ebay 검색 결과
검색 결과
@author Wendy
@version 1.0.0
생성일 2022-03-24
마지막 수정일 2022-03-24
*/

import React, { useEffect, useState } from "react";
import { apiShoppingSearch } from "../../api/perfume";

interface Props {
  keyword: string;
}

interface Item {
  title: string;
  price: string;
  url: string;
}
function EbayList({ keyword }: Props) {
  const [lists, setLists] = useState([] as Array<Item>);

  useEffect(() => {
    apiShoppingSearch(keyword)
      .then((res) => {
        setLists(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // 이베이 쇼핑 검색 api 로 검색 결과 가져오기

    apiShoppingSearch(keyword)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [keyword]);

  return (
    <section>
      <h1>Lists</h1>
      <ul></ul>
    </section>
  );
}

export default EbayList;
