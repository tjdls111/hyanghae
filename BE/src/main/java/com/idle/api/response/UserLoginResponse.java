/**
*
* UserLoginResponse
* 로그인 response 생성
*
* @author Alice
* @version 1.0.0
* 생성일 2022-03-11
* 마지막 수정일 2022-03-11
**/
package com.idle.api.response;

import com.idle.db.entity.User;
import lombok.Data;

@Data
public class UserLoginResponse {
    String token;
    User user;
}
