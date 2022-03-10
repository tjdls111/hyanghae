import React from "react";
import SignUp from "../pages/signup";
import { configure, shallow, ShallowWrapper } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";

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
    expect(wrapper.find(".logo").length).toEqual(1);
  });

  it("로그인 form이 렌더링", () => {
    expect(wrapper.find("form").length).toEqual(1);
  });

  it("로그인form 안의 input태그 6개가 정상적으로 렌더링", () => {
    expect(wrapper.find("input").length).toEqual(6);
  });

  it("로그인form 안의 select태그 1개가 정상적으로 렌더링", () => {
    expect(wrapper.find("select").length).toEqual(1);
  });

  it("로그인form 안의 버튼 4개가 정상적으로 렌더링", () => {
    expect(wrapper.find("button").length).toEqual(4);
  });
});

describe("react Hook Form", () => {
  beforeEach(() => {
    render(<SignUp />);
  });

  it("전부 유효하지않을때(에러메시지 렌더링)", async () => {
    fireEvent.submit(screen.getByLabelText("signupBtn"));
    expect(await screen.findAllByRole("alert")).toHaveLength(6);
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
    fireEvent.input(screen.getByLabelText("code"), {
      target: {
        value: "code",
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

    expect((screen.getByLabelText("code") as HTMLInputElement).value).toBe("code");
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
    fireEvent.input(screen.getByLabelText("code"), {
      target: {
        value: "code",
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

    expect((screen.getByLabelText("code") as HTMLInputElement).value).toBe("code");
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
    fireEvent.input(screen.getByLabelText("code"), {
      target: {
        value: "code",
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

    expect((screen.getByLabelText("code") as HTMLInputElement).value).toBe("code");
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
    fireEvent.input(screen.getByLabelText("code"), {
      target: {
        value: "code",
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

    expect((screen.getByLabelText("code") as HTMLInputElement).value).toBe("code");
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
    fireEvent.input(screen.getByLabelText("code"), {
      target: {
        value: "code",
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

    expect((screen.getByLabelText("code") as HTMLInputElement).value).toBe("code");
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
    fireEvent.input(screen.getByLabelText("code"), {
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

    expect((screen.getByLabelText("emailPartOne") as HTMLInputElement).value).toBe("email");

    expect((screen.getByLabelText("code") as HTMLInputElement).value).toBe("");
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
    fireEvent.input(screen.getByLabelText("code"), {
      target: {
        value: "code",
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

    expect((screen.getByLabelText("code") as HTMLInputElement).value).toBe("code");
  });
});
