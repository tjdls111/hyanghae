/*
findPw.test.jsx
비밀번호 찾기 페이지 테스트
@author wendy
@version 1.0.0
생성일 2022-03-18
마지막 수정일 2022-03-18
*/

import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import FindPw from "../pages/findpw";
import { configure, shallow, ShallowWrapper } from "enzyme";
import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import { apiFindpw } from "../api/user";

configure({ adapter: new Adapter() });

describe("비밀번호 찾기 페이지 렌더링 테스트", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<FindPw />);
  });

  it("성공적으로 페이지 렌더링", () => {
    expect(wrapper.length).toBe(1);
  });

  it("로고가 성공적으로 렌더링", () => {
    expect(wrapper.find(".logoImage").length).toBe(1);
  });

  it("비밀 번호 찾기 폼 렌더링", () => {
    expect(wrapper.find("form").length).toBe(1);
  });
  it("폼 안에 두 개의 input 태그가 렌더링", () => {
    expect(wrapper.find("input").length).toBe(2);
  });
  it("폼 안에 버튼이 렌더링", () => {
    expect(wrapper.find("button").length).toBe(1);
  });
});

describe("폼 동작 테스트", () => {
  beforeEach(() => {
    render(<FindPw />);
  });

  it("아이디,이메일 둘 다 유효하지 않을 때", async () => {
    fireEvent.submit(screen.getByLabelText("findBtn"));
    expect(await screen.findAllByRole("alert")).toHaveLength(2);
  });

  it("아이디는 유효하지 않고, 이메일은 유효할 때", async () => {
    fireEvent.input(screen.getByTestId("id-test"), {
      target: {
        value: "test",
      },
    });

    fireEvent.input(screen.getByTestId("email-test"), {
      target: {
        value: "test@test.com",
      },
    });

    fireEvent.submit(screen.getByLabelText("findBtn"));
    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(screen.getByTestId("id-test").value).toBe("test");
    expect(screen.getByTestId("email-test").value).toBe("test@test.com");
  });

  it("아이디는 유효하고, 이메일은 유효하지 않을 때 때", async () => {
    fireEvent.input(screen.getByTestId("id-test"), {
      target: {
        value: "testtest",
      },
    });

    fireEvent.input(screen.getByTestId("email-test"), {
      target: {
        value: "test",
      },
    });

    fireEvent.submit(screen.getByLabelText("findBtn"));
    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(screen.getByTestId("id-test").value).toBe("testtest");
    expect(screen.getByTestId("email-test").value).toBe("test");
  });

  it("아이디, 이메일 모두 유효할 때", async () => {
    fireEvent.input(screen.getByTestId("id-test"), {
      target: {
        value: "testtest",
      },
    });

    fireEvent.input(screen.getByTestId("email-test"), {
      target: {
        value: "test@test.com",
      },
    });

    fireEvent.submit(screen.getByLabelText("findBtn"));
  });
});
