/**
 *
 * PerfumeListResponse
 * 향수 목록 조회 response 생성
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-16
 * 마지막 수정일 2022-03-16
 **/

package com.idle.api.response;

import com.idle.db.entity.Perfume;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

@Getter
@Setter
public class PerfumeListResponse extends BaseResponseBody{

    Page<Perfume> perfumes;

    public static PerfumeListResponse of(Integer statusCode, String message,  Page<Perfume> perfumes) {
        PerfumeListResponse res = new PerfumeListResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setPerfumes(perfumes);

        return res;
    }
}
