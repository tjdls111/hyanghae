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
import Link from "next/link";
interface Props {
  keyword: string;
}

interface Item {
  itemId: string;
  title: string;
  image: {
    image: string;
  };
  price: {
    value: string;
    currency: string;
  };
  itemHref: string;
  itemWebUrl: string;
}
interface Item2 {
  itemId: string;
  title: string;
  image: {
    imageUrl: string;
  };
  price: {
    value: string;
    currency: string;
  };
  itemHref: string;
  seller: {
    username: string;
    feedbackPercentage: string;
    feedbackScore: number;
  };
  marketingPrice: {
    originalPrice: {
      value: string;
      currency: string;
    };
    discountPercentage: string;
    discountAmount: {
      value: string;
      currency: string;
    };
  };
  condition: string;
  conditionId: string;
  thumbnailImages: [
    {
      imageUrl: string;
    }
  ];
  shippingOptions: [
    {
      shippingCostType: string;
      shippingCost: {
        value: string;
        currency: string;
      };
    }
  ];
  buyingOptions: string[];
  currentBidPrice: {
    value: string;
    currency: string;
  };
  epid: string;
  itemWebUrl: string;
  itemLocation: {
    postalCode: string;
    country: string;
  };
  categories: [{ categoryId: string }];
  additionalImages: [
    {
      imageUrl: string;
    }
  ];
  adultOnly: boolean;
  availableCoupons: boolean;
  priorityListing: boolean;
  legacyItemId: string;
}

function EbayList({ keyword }: Props) {
  const [lists, setLists] = useState([] as Array<Item>);
  // const [lists, setLists] = useState({});
  // const [lists, setLists] = useState([]);

  console.log(lists);
  useEffect(() => {
    // 이베이 쇼핑 검색 api 로 검색 결과 가져오기
    apiShoppingSearch(keyword)
      .then((res) => {
        setLists(res.data.itemSummaries);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
