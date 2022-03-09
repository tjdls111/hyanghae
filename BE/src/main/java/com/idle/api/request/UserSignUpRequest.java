/**
*
* UserSignUpRequest
* 회원가입 request 생성
*
* @author Alice
* @version 1.0.0
* 생성일 2022-03-08
* 마지막 수정일 2022-03-08
**/
package com.idle.api.request;

import com.idle.db.entity.User;
import com.sun.istack.NotNull;
import lombok.Getter;

@Getter
public class UserSignUpRequest {

    @NotNull
    String userId;
    @NotNull
    String userNickname;
    @NotNull
    String userPw;
    @NotNull
    String userEmail;

    public User toEntity(){
        return User.builder()
                .userId(userId)
                .userNickname(userNickname)
                .userPw(userPw)
                .userEmail(userEmail)
                .build();
    }

}
