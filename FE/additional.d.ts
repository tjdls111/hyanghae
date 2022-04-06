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
}
