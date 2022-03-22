import axios, { AxiosError, AxiosRequestConfig } from "axios";

import { BASE_URL } from "./utils";

export interface searchResult {
  message: string;
  statusCode: number;
}

export const apiShoppingSearch = async (
  keyword: string
): Promise<searchResult> => {
  try {
    return await axios.get(
      `https://openapi.naver.com/v1/search/shop.json?query=${keyword}`,
      {
        headers: {
          // "X-Naver-Client-Id": "",
          // "X-Naver-Client-Secret": "",
        },
      }
    );
  } catch (e) {
    throw new Error("server Error");
  }
};
