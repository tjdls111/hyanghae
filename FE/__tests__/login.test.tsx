import React from "react";
import Login from "../pages/login";
import { configure, shallow, ShallowWrapper } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
/*
index.test.tsx
@author scarlet
@version 1.0.0
생성일 2022-03-08
마지막 수정일 2022-03-08
*/

configure({ adapter: new Adapter() });

describe("로그인 페이지 렌더링 테스트", () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(<Login />);
  });

  it("성공적으로 로그인 페이지가 렌더링", () => {
    expect(wrapper.length).toBe(1);
  });
  it("logo가 성공적으로 렌더링", () => {
    expect(wrapper.find(".logo").length).toEqual(1);
  });

  it("로그인 form이 렌더링", () => {
    expect(wrapper.find("form").length).toEqual(1);
  });

  it("로그인form 안의 input태그 2개가 정상적으로 렌더링", () => {
    expect(wrapper.find("input").length).toEqual(2);
  });
});

const mockLogin = jest.fn((email, password) => {
  return Promise.resolve({ email, password });
});

describe("react Hook Form", () => {
  beforeEach(() => {
    render(<Login />);
  });

  it("should display required error when value is invalid", async () => {
    fireEvent.submit(screen.getByRole("button"));
  });
});
