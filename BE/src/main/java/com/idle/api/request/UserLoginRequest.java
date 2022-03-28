/**
*
* UserLoginRequest
* 로그인 request 생성
*
* @author Alice
* @version 1.0.0
* 생성일 2022-03-11
* 마지막 수정일 2022-03-11
**/
package com.idle.api.request;

import com.idle.db.entity.User;
import com.sun.istack.NotNull;
import lombok.Getter;

@Getter
public class UserLoginRequest {

    @NotNull
    String userId;
    @NotNull
    String userPw;

    public User toEntity() {
        return User.builder()
                .userId(userId)
                .userPw(userPw)
                .build();
    }
}
