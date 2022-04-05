/*
login.test.tsx
@author scarlet
@version 1.0.0
생성일 2022-03-08
마지막 수정일 2022-03-16
*/
import React from "react";
import LoginComponent from "../components/loginSignup/loginComponent";
import { configure, shallow, ShallowWrapper } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { apiLogin } from "../api/user";
import { BASE_URL } from "../api/utils";

configure({ adapter: new Adapter() });
describe("로그인 페이지 렌더링 테스트", () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(<LoginComponent />);
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
    render(<LoginComponent />);
  });

  it("아이디와 비밀번호 둘다 유효하지 않을때", async () => {
    fireEvent.submit(screen.getByLabelText("loginBtn"));
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

    fireEvent.submit(screen.getByLabelText("loginBtn"));
    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect((screen.getByLabelText("id") as HTMLInputElement).value).toBe(
      "test"
    );
    expect((screen.getByLabelText("password") as HTMLInputElement).value).toBe(
      "password"
    );
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

    fireEvent.submit(screen.getByLabelText("loginBtn"));
    expect(await screen.findAllByRole("alert")).toHaveLength(1);

    expect((screen.getByLabelText("id") as HTMLInputElement).value).toBe(
      "test12345"
    );
    expect((screen.getByLabelText("password") as HTMLInputElement).value).toBe(
      "pass"
    );
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

    fireEvent.submit(screen.getByLabelText("loginBtn"));

    await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));

    const res = {
      message: "ok",
      statusCode: 0,
      token: "star",
    };

    axios.post = jest.fn().mockResolvedValue({
      message: "ok",
      statusCode: 0,
      token: "star",
    });
    const result = await apiLogin("sdfsdfds", "Sdfdsfsd");
    expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/user/login`, {
      userId: "sdfsdfds",
      userPw: "Sdfdsfsd",
    });
    expect(axios.post).toBeCalledTimes(1);
    expect(result).toEqual(res);
  });
});
