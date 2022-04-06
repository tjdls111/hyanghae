package com.idle.api.response;

import com.idle.db.entity.Perfume;
import lombok.Getter;
import lombok.Setter;


import java.util.List;
import java.util.Map;

@Getter
@Setter
public class Survey2ResultResponse extends BaseResponseBody{

    List<Perfume> similarPerfumeList;
    List<Perfume> differentPerfumeList;

    public static Survey2ResultResponse of(Integer statusCode, String message, Map<String, List<Perfume>> map) {
        Survey2ResultResponse res = new Survey2ResultResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setSimilarPerfumeList(map.get("similar"));
        res.setDifferentPerfumeList(map.get("different"));

        return res;
    }
}
