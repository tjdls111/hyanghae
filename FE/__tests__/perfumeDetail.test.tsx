/*
perfumeDetail.test.jsx
향수 상세 페이지 테스트
@author wendy
@version 1.0.0
생성일 2022-03-25
마지막 수정일 2022-03-25
*/

import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Detail from "../pages/perfume/[id]";
import { configure, shallow } from "enzyme";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { apiPerfumeDetail, apiShoppingSearch } from "../api/perfume";

configure({ adapter: new Adapter() });

describe("향수 상세 페이지 렌더링 테스트", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Detail />);
  });

  it("성공적으로 페이지 렌더링", () => {
    expect(wrapper.length).toBe(1);
  });

  it("향수 이미지가 성공적으로 렌더링", () => {
    expect(wrapper.find("Image").length).toBe(1);
  });

  it("이베이 버튼과 리뷰 쓰기 버튼이 성공적으로 렌더링", () => {
    expect(wrapper.find("button").length).toBe(2);
  });

  it("리뷰 쓰기 인풋이 성공적으로 렌더링", () => {
    expect(wrapper.find("textarea").length).toBe(1);
  });
});
