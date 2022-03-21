/*
findid.test.jsx
아이디 찾기 페이지 테스트
@author wendy
@version 1.0.0
생성일 2022-03-21
마지막 수정일 2022-03-21
*/

import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import FindId from "../pages/findid";
import { configure, shallow } from "enzyme";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { apiFindUserId } from "../api/user";
import { BASE_URL } from "../api/utils";

configure({ adapter: new Adapter() });

describe("아이디 찾기 페이지 렌더링 테스트", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<FindId />);
  });

  it("성공적으로 페이지 렌더링", () => {
    expect(wrapper.length).toBe(1);
  });

  it("로고가 성공적으로 렌더링", () => {
    expect(wrapper.find(".logoImage").length).toBe(1);
  });

  it("아이디 찾기 폼 렌더링", () => {
    expect(wrapper.find("form").length).toBe(1);
  });
  it("폼 안에 한 개의 input 태그가 렌더링", () => {
    expect(wrapper.find("input").length).toBe(1);
  });
  it("폼 안에 버튼이 렌더링", () => {
    expect(wrapper.find("button").length).toBe(1);
  });
});

describe("폼 동작 테스트", () => {
  beforeEach(() => {
    render(<FindId />);
  });

  it("이메일이 유효하지 않을 때", async () => {
    fireEvent.input(screen.getByTestId("email-test"), {
      target: {
        value: "test@",
      },
    });

    fireEvent.submit(screen.getByLabelText("findBtn"));
    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(screen.getByTestId("email-test").value).toBe("test@");
  });

  it("이메일이 유효할 때", async () => {
    fireEvent.input(screen.getByTestId("email-test"), {
      target: {
        value: "test@naver.com",
      },
    });

    fireEvent.submit(screen.getByLabelText("findBtn"));

    await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));

    const resq = { message: "ok", statusCode: 200 };

    axios.get = jest.fn().mockResolvedValue({ message: "ok", statusCode: 200 });

    const result = await apiFindUserId("test@naver.com");

    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/user/finduserid/test@naver.com`
    );
    expect(axios.get).toBeCalledTimes(1);
    expect(result).toEqual(resq);
  });
});
