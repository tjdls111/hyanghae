package com.idle.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegisterPostReq {

    String userId;
    String userNickname;
    String userPw;
    String userEmail;

}
