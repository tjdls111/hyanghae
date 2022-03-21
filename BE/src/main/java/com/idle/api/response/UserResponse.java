package com.idle.api.response;

import com.idle.db.entity.User;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserResponse")
public class UserResponse {

    String userId;
    String userNickName;
    String userEmail;

    public static UserResponse of(User user){

        UserResponse res = new UserResponse();
        res.setUserId(user.getUserId());
        res.setUserNickName(user.getUserNickname());
        res.setUserEmail(user.getUserEmail());

        return res;
    }
}
