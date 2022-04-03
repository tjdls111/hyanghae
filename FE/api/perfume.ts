/*
향수 관련 api
@author Wendy
@version 1.0.0
생성일 2022-03-22
마지막 수정일 2022-04-02
*/

import axios, { AxiosError, AxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export interface searchResult {
  data: any;
  message: string;
  statusCode: number;
}

export const apiShoppingSearch = async (
  keyword: string
): Promise<searchResult> => {
  try {
    console.log(process.env.EBAY_API_KEY);
    return await axios.get(
      `https://api.ebay.com/buy/browse/v1/item_summary/search?q=perfume ${keyword}&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${process.env.EBAY_API_KEY}`,
        },
      }
    );
  } catch (e) {
    throw new Error("server Error");
  }
};

export interface PerfumeResult {
  message: string;
  statusCode: number;
  data: object;
}

export const apiPerfumeDetail = async (
  perfumeId: string
): Promise<PerfumeResult> => {
  try {
    return await axios.get(`${BASE_URL}/perfume/${perfumeId}/`);
  } catch (e) {
    throw new Error("server error");
  }
};

export const apiPostPerfumeReview = async (
  accessToken: string,
  perfumeId: number,
  reviewContent: string,
  reviewScore: string
): Promise<PerfumeResult> => {
  try {
    return await axios.post(
      `${BASE_URL}/perfume/review`,
      { perfumeId, reviewContent, reviewScore },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (e) {
    throw new Error("server error");
  }
};

export const apiGetPerfumeReview = async (
  perfumeId: string,
  page: number,
  size: number,
  sort: string
) => {
  try {
    return await axios.get(
      `${BASE_URL}/perfume/review/list/${perfumeId}?page=${page}&size=${size}`
    );
  } catch (e) {
    throw new Error("server error");
  }
};

export const apiDeletePerfumeReview = async (
  perfumeId: string,
  token: string
) => {
  try {
    return await axios.delete(`${BASE_URL}/perfume/review/${perfumeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    throw new Error("server error");
  }
};

export const apiPutPerfumeReview = async (
  token: string,
  perfumeId: number,
  reviewContent: string,
  reviewScore: string
) => {
  try {
    return await axios.put(
      `${BASE_URL}/perfume/review`,
      { perfumeId, reviewContent, reviewScore },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {
    throw new Error("server error");
  }
};

export const reviewLike = async (token: string, perfumeId: number) => {
  try {
    return await axios.get(`${BASE_URL}/perfume/like/${perfumeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    throw new Error("server error");
  }
};
