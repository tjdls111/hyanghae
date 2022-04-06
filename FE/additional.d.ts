/// <reference types="redux-persist" />

declare module "perfume" {
  export interface product {
    perfumeName: string;
    imgUrl: string;
    note1: string;
    note2: string;
    note3: string;
    perfumeBrand: { brandName: string; korName: string };
    perfumeId: number;
    perfumeScore: number;
  }
  export interface reviewType {
    imgUrl: string;
    perfumeBrand: string;
    perfumeId: number;
    perfumeName: string;
    reviewContent: string;
    reviewScore: number;
    userNickname: string;
  }
}
