/*
login.test.tsx
@author scarlet
@version 1.0.0
생성일 2022-03-08
마지막 수정일 2022-03-14
*/
import React from "react";
import Login from "../pages/login";
import { configure, shallow, ShallowWrapper } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { apiLogin } from "../api/user";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

configure({ adapter: new Adapter() });
jest.mock("axios");
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

describe("react Hook Form", () => {
  beforeEach(() => {
    render(<Login />);
  });

  it("아이디와 비밀번호 둘다 유효하지 않을때", async () => {
    fireEvent.submit(screen.getByRole("button"));
    expect(await screen.findAllByRole("alert")).toHaveLength(2);
  });

  it("아이디가 유효하지 않을때 에러 메시지", async () => {
    fireEvent.input(screen.getByLabelText("id"), {
      target: {
        value: "test",
      },
    });

    fireEvent.input(screen.getByLabelText("password"), {
      target: {
        value: "password",
      },
    });

    fireEvent.submit(screen.getByRole("button"));
    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect((screen.getByLabelText("id") as HTMLInputElement).value).toBe("test");
    expect((screen.getByLabelText("password") as HTMLInputElement).value).toBe("password");
  });

  it("비밀번호가 유효하지 않을때 에러 메시지", async () => {
    fireEvent.input(screen.getByLabelText("id"), {
      target: {
        value: "test12345",
      },
    });

    fireEvent.input(screen.getByLabelText("password"), {
      target: {
        value: "pass",
      },
    });

    fireEvent.submit(screen.getByRole("button"));
    expect(await screen.findAllByRole("alert")).toHaveLength(1);

    expect((screen.getByLabelText("id") as HTMLInputElement).value).toBe("test12345");
    expect((screen.getByLabelText("password") as HTMLInputElement).value).toBe("pass");
  });
  it("아이디와 비밀번호 둘다 유효할 때", async () => {
    expect(await screen.findByLabelText("loginBtn")).toBeDisabled();

    fireEvent.input(screen.getByLabelText("id"), {
      target: {
        value: "test12345",
      },
    });

    fireEvent.input(screen.getByLabelText("password"), {
      target: {
        value: "password12",
      },
    });

    expect(await screen.findByLabelText("loginBtn")).toBeEnabled();

    fireEvent.submit(screen.getByRole("button"));

    await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));

    axios.post = jest.fn().mockResolvedValue({
      response: "OK",
    });

    const sign = await apiLogin("now20412041", "now20412041");

    expect(sign).toHaveProperty("response", "OK");
  });
});
