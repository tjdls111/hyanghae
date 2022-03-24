/*
향수 상세 페이지의 ebay 검색 결과로 가는 버튼
@author Wendy
@version 1.0.0
생성일 2022-03-24
마지막 수정일 2022-03-24
*/

import React from "react";
import Link from "next/link";

interface Props {
  keyword: string;
}

function EbayBtn({ keyword }: Props) {
  return (
    <Link
      href={`https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2334524.m570.l1313&_nkw=perfume ${keyword}&_sacat=0&LH_TitleDesc=0&_odkw=ddd&_osacat=0`}
    >
      <button>Buy now</button>
    </Link>
  );
}

export default EbayBtn;
