/**
*
* UserEmailNumberResponse
* 이메일 인증번호 response 생성
*
* @author Alice
* @version 1.0.0
* 생성일 2022-03-11
* 마지막 수정일 2022-03-11
**/
package com.idle.api.response;


import lombok.Data;

@Data
public class UserEmailNumberResponse extends BaseResponseBody{
    String number;

    public static UserEmailNumberResponse of(Integer statusCode, String message, String number) {
        UserEmailNumberResponse res = new UserEmailNumberResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setNumber(number);

        return res;
    }
}
