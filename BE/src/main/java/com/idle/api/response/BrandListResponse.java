package com.idle.api.response;

import com.idle.db.entity.Brand;
import lombok.Getter;
import lombok.Setter;


import java.util.List;

@Getter
@Setter
public class BrandListResponse extends BaseResponseBody{
    List<Brand> brandList;

    public static BrandListResponse of(Integer statusCode, String message,  List<Brand> brandList) {
        BrandListResponse res = new BrandListResponse();

        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setBrandList(brandList);

        return res;
    }

}
