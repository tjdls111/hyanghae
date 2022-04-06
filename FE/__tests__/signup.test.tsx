/*
signup.test.tsx
@author scarlet
@version 1.0.0
생성일 2022-03-08
마지막 수정일 2022-03-16
*/

import React from "react";
import SignUp from "../pages/signup";
import { configure, shallow, ShallowWrapper } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { render, fireEvent, screen, waitFor, cleanup } from "@testing-library/react";
import axios from "axios";
import { apiSignup } from "../api/user";
import { BASE_URL } from "../api/utils";
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

const useRouter = jest.spyOn(require("next/router"), "useRouter");
configure({ adapter: new Adapter() });
describe("회원가입 페이지 렌더링 테스트", () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(<SignUp />);
  });

  it("성공적으로 로그인 페이지가 렌더링", () => {
    expect(wrapper.length).toBe(1);
  });
  it("logo가 성공적으로 렌더링", () => {
    expect(wrapper.find(".logoImage").length).toEqual(1);
  });

  it("로그인 form이 렌더링", () => {
    expect(wrapper.find("form").length).toEqual(1);
  });

  it("로그인form 안의 input태그 5개가 정상적으로 렌더링", () => {
    expect(wrapper.find("input").length).toEqual(5);
  });

  it("로그인form 안의 select태그 1개가 정상적으로 렌더링", () => {
    expect(wrapper.find("select").length).toEqual(1);
  });

  it("로그인form 안의 버튼 4개가 정상적으로 렌더링", () => {
    expect(wrapper.find("button").length).toEqual(4);
  });
  afterEach(cleanup);
});
describe("react Hook Form", () => {
  beforeEach(async () => {
    render(<SignUp />);
  });

  it("전부 유효하지않을때(에러메시지 렌더링)", async () => {
    fireEvent.submit(screen.getByLabelText("signupBtn"));
    expect(await screen.findAllByRole("alert")).toHaveLength(5);
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

    fireEvent.input(screen.getByLabelText("passwordConfirmation"), {
      target: {
        value: "password",
      },
    });

    fireEvent.input(screen.getByLabelText("nickname"), {
      target: {
        value: "nickname",
      },
    });

    fireEvent.input(screen.getByLabelText("emailPartOne"), {
      target: {
        value: "email",
      },
    });

    fireEvent.submit(screen.getByLabelText("signupBtn"));
    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect((screen.getByLabelText("id") as HTMLInputElement).value).toBe("test");
    expect((screen.getByLabelText("password") as HTMLInputElement).value).toBe("password");

    expect((screen.getByLabelText("passwordConfirmation") as HTMLInputElement).value).toBe(
      "password"
    );
    expect((screen.getByLabelText("nickname") as HTMLInputElement).value).toBe("nickname");

    expect((screen.getByLabelText("emailPartOne") as HTMLInputElement).value).toBe("email");
  });
  it("비밀번호가 유효하지 않을때 에러 메시지", async () => {
    fireEvent.input(screen.getByLabelText("id"), {
      target: {
        value: "test12312",
      },
    });

    fireEvent.input(screen.getByLabelText("password"), {
      target: {
        value: "pass",
      },
    });

    fireEvent.input(screen.getByLabelText("passwordConfirmation"), {
      target: {
        value: "password",
      },
    });

    fireEvent.input(screen.getByLabelText("nickname"), {
      target: {
        value: "nickname",
      },
    });

    fireEvent.input(screen.getByLabelText("emailPartOne"), {
      target: {
        value: "email",
      },
    });

    fireEvent.submit(screen.getByLabelText("signupBtn"));
    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect((screen.getByLabelText("id") as HTMLInputElement).value).toBe("test12312");
    expect((screen.getByLabelText("password") as HTMLInputElement).value).toBe("pass");

    expect((screen.getByLabelText("passwordConfirmation") as HTMLInputElement).value).toBe(
      "password"
    );

    expect((screen.getByLabelText("nickname") as HTMLInputElement).value).toBe("nickname");

    expect((screen.getByLabelText("emailPartOne") as HTMLInputElement).value).toBe("email");
  });

  it("비밀번호와 비밀번호 확인이 유효하지만 다를 때", async () => {
    fireEvent.input(screen.getByLabelText("id"), {
      target: {
        value: "test12312",
      },
    });

    fireEvent.input(screen.getByLabelText("password"), {
      target: {
        value: "password1",
      },
    });

    fireEvent.input(screen.getByLabelText("passwordConfirmation"), {
      target: {
        value: "password",
      },
    });

    fireEvent.input(screen.getByLabelText("nickname"), {
      target: {
        value: "nickname",
      },
    });

    fireEvent.input(screen.getByLabelText("emailPartOne"), {
      target: {
        value: "email",
      },
    });

    fireEvent.submit(screen.getByLabelText("signupBtn"));
    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect((screen.getByLabelText("id") as HTMLInputElement).value).toBe("test12312");
    expect((screen.getByLabelText("password") as HTMLInputElement).value).toBe("password1");

    expect((screen.getByLabelText("passwordConfirmation") as HTMLInputElement).value).toBe(
      "password"
    );

    expect((screen.getByLabelText("nickname") as HTMLInputElement).value).toBe("nickname");

    expect((screen.getByLabelText("emailPartOne") as HTMLInputElement).value).toBe("email");
  });

  it("닉네임을 입력안했을 때", async () => {
    fireEvent.input(screen.getByLabelText("id"), {
      target: {
        value: "test12312",
      },
    });

    fireEvent.input(screen.getByLabelText("password"), {
      target: {
        value: "password1",
      },
    });

    fireEvent.input(screen.getByLabelText("passwordConfirmation"), {
      target: {
        value: "password",
      },
    });

    fireEvent.input(screen.getByLabelText("nickname"), {
      target: {
        value: "",
      },
    });

    fireEvent.input(screen.getByLabelText("emailPartOne"), {
      target: {
        value: "email",
      },
    });

    fireEvent.submit(screen.getByLabelText("signupBtn"));
    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect((screen.getByLabelText("id") as HTMLInputElement).value).toBe("test12312");
    expect((screen.getByLabelText("password") as HTMLInputElement).value).toBe("password1");

    expect((screen.getByLabelText("passwordConfirmation") as HTMLInputElement).value).toBe(
      "password"
    );

    expect((screen.getByLabelText("nickname") as HTMLInputElement).value).toBe("");

    expect((screen.getByLabelText("emailPartOne") as HTMLInputElement).value).toBe("email");
  });

  it("이메일을 입력안했을 때", async () => {
    fireEvent.input(screen.getByLabelText("id"), {
      target: {
        value: "test12312",
      },
    });

    fireEvent.input(screen.getByLabelText("password"), {
      target: {
        value: "password1",
      },
    });

    fireEvent.input(screen.getByLabelText("passwordConfirmation"), {
      target: {
        value: "password",
      },
    });

    fireEvent.input(screen.getByLabelText("nickname"), {
      target: {
        value: "nickname",
      },
    });

    fireEvent.input(screen.getByLabelText("emailPartOne"), {
      target: {
        value: "",
      },
    });

    fireEvent.submit(screen.getByLabelText("signupBtn"));
    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect((screen.getByLabelText("id") as HTMLInputElement).value).toBe("test12312");
    expect((screen.getByLabelText("password") as HTMLInputElement).value).toBe("password1");

    expect((screen.getByLabelText("passwordConfirmation") as HTMLInputElement).value).toBe(
      "password"
    );

    expect((screen.getByLabelText("nickname") as HTMLInputElement).value).toBe("nickname");

    expect((screen.getByLabelText("emailPartOne") as HTMLInputElement).value).toBe("");
  });

  it("인증번호를 입력안했을 때", async () => {
    fireEvent.input(screen.getByLabelText("id"), {
      target: {
        value: "test12312",
      },
    });

    fireEvent.input(screen.getByLabelText("password"), {
      target: {
        value: "password1",
      },
    });

    fireEvent.input(screen.getByLabelText("passwordConfirmation"), {
      target: {
        value: "password",
      },
    });

    fireEvent.input(screen.getByLabelText("nickname"), {
      target: {
        value: "nickname",
      },
    });

    fireEvent.input(screen.getByLabelText("emailPartOne"), {
      target: {
        value: "email",
      },
    });

    fireEvent.submit(screen.getByLabelText("signupBtn"));
    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect((screen.getByLabelText("id") as HTMLInputElement).value).toBe("test12312");
    expect((screen.getByLabelText("password") as HTMLInputElement).value).toBe("password1");

    expect((screen.getByLabelText("passwordConfirmation") as HTMLInputElement).value).toBe(
      "password"
    );

    expect((screen.getByLabelText("nickname") as HTMLInputElement).value).toBe("nickname");

    expect((screen.getByLabelText("emailPartOne") as HTMLInputElement).value).toBe("email");
  });

  it("모두 유효할 때", async () => {
    expect(await screen.findByLabelText("signupBtn")).toBeDisabled();
    fireEvent.input(screen.getByLabelText("id"), {
      target: {
        value: "test12312",
      },
    });

    fireEvent.input(screen.getByLabelText("password"), {
      target: {
        value: "password",
      },
    });

    fireEvent.input(screen.getByLabelText("passwordConfirmation"), {
      target: {
        value: "password",
      },
    });

    fireEvent.input(screen.getByLabelText("nickname"), {
      target: {
        value: "nickname",
      },
    });

    fireEvent.input(screen.getByLabelText("emailPartOne"), {
      target: {
        value: "email",
      },
    });

    expect(await screen.findByLabelText("signupBtn")).toBeEnabled();
    fireEvent.submit(screen.getByLabelText("signupBtn"));
    await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));
    expect((screen.getByLabelText("id") as HTMLInputElement).value).toBe("test12312");
    expect((screen.getByLabelText("password") as HTMLInputElement).value).toBe("password");

    expect((screen.getByLabelText("passwordConfirmation") as HTMLInputElement).value).toBe(
      "password"
    );

    expect((screen.getByLabelText("nickname") as HTMLInputElement).value).toBe("nickname");

    expect((screen.getByLabelText("emailPartOne") as HTMLInputElement).value).toBe("email");

    // const res = {
    //   message: "ok",
    //   statusCode: 0,
    // } as resType;

    axios.post = jest.fn().mockResolvedValue({
      message: "ok",
      statusCode: 0,
    });
    const result = await apiSignup("start12@naver.com", "sdfsdfds", "sdfsdsd", "Sdfdsfsd");
    expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/user/signup`, {
      userEmail: "start12@naver.com",
      userId: "sdfsdfds",
      userNickname: "sdfsdsd",
      userPw: "Sdfdsfsd",
    });
    expect(axios.post).toBeCalledTimes(1);
    // expect(result).toEqual(res);

    useRouter.mockImplementation(() => ({
      route: "/login",
      pathname: "/login",
      query: "",
      asPath: "",
    }));
  });
  afterEach(cleanup);
});
