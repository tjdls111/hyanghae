/**
 *
 * LikePerfumeListResponse
 * 좋아요 향수 리스트 response
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-24
 * 마지막 수정일 2022-03-24
 **/
package com.idle.api.response;

import com.idle.db.entity.LikePerfume;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

@Getter
@Setter
public class LikePerfumeListResponse extends BaseResponseBody{
    Page<LikePerfume> likePerfumes;

    public static LikePerfumeListResponse of(Integer statusCode, String message,  Page<LikePerfume> likePerfumes) {
        LikePerfumeListResponse res = new LikePerfumeListResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setLikePerfumes(likePerfumes);

        return res;
    }
}
