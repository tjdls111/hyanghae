package com.idle.api.response;

import com.idle.db.entity.Perfume;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class Survey1ResultResponse extends BaseResponseBody{

    List<Perfume> recommendPerfumeList;

    public static Survey1ResultResponse of(Integer statusCode, String message, List<Perfume> recommendList) {
        Survey1ResultResponse res = new Survey1ResultResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setRecommendPerfumeList(recommendList);

        return res;
    }
}
