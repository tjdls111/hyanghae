/**
*
* UserPwRequest
* 비밀번호 찾기 request 생성
*
* @author Alice
* @version 1.0.0
* 생성일 2022-03-14
* 마지막 수정일 2022-03-14
**/
package com.idle.api.request;

import com.idle.db.entity.User;
import com.sun.istack.NotNull;
import lombok.Getter;

@Getter
public class UserPwRequest {

    @NotNull
    String userId;
    @NotNull
    String userEmail;

    public User toEntity() {
        return User.builder()
                .userId(userId)
                .userEmail(userEmail)
                .build();
    }
}
