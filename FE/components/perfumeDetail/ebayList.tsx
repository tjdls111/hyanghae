/*
향수 상세 페이지의 ebay 검색 결과
검색 결과
@author Wendy
@version 1.0.0
생성일 2022-03-24
마지막 수정일 2022-03-24
*/

import React from "react";

import Link from "next/link";
interface Props {
  itemId: string;
  title: string;
  image: {
    image: string;
  };
  price: {
    value: string;
  };
  itemWebUrl: string;
}

function EbayList({ lists }): Array<Props> {
  return (
    <section>
      <h1>Lists</h1>
      <ul>
        {lists.map((list) => (
          <div key={list.itemId}>
            <h1>{list.title}</h1>
            <h1>price: {list.price.value} $</h1>
            <Link href={list.itemWebUrl}>
              <button>Buy</button>
            </Link>
          </div>
        ))}
      </ul>
    </section>
  );
}

export default EbayList;
