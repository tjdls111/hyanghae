import axios from "axios";

export const apiSignup = (
  userEmail: string,
  userId: string,
  userNickname: string,
  password: string
) =>
  axios({
    method: "post",
    url: "http://localhost:8181/user/signup",
    data: {
      userEmail,
      userId,
      userNickname,
      userPw: password,
    },
  });
