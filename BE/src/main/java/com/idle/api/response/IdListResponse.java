package com.idle.api.response;


import com.idle.db.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class IdListResponse extends BaseResponseBody{
    List<String> idList;

    public static IdListResponse of(Integer statusCode, String message, List<User> userList) {
        IdListResponse res = new IdListResponse();
        List<String> idList = new ArrayList<>();

        res.setStatusCode(statusCode);
        res.setMessage(message);
        for(int i=0; i<userList.size(); i++){
            idList.add(userList.get(i).getUserId());
        }
        res.setIdList(idList);

        return res;
    }
}
