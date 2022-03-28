/**
 *
 * LikePerfumeListResponse
 * 좋아요 향수 리스트 response
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-24
 * 마지막 수정일 2022-03-28
 **/
package com.idle.api.response;

import com.idle.db.entity.LikePerfume;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class LikePerfumeListResponse extends BaseResponseBody{

    Long totalElements;
    int totalPages;
    int pageNumber;
    boolean first;
    boolean last;
    List<Map<String, Object>> perfumeList;

    public static LikePerfumeListResponse of(Integer statusCode, String message,  Page<LikePerfume> likePerfumes) {
        LikePerfumeListResponse res = new LikePerfumeListResponse();
        List<Map<String, Object>> perfumeList = new ArrayList<>();

        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setTotalElements(likePerfumes.getTotalElements());
        res.setTotalPages(likePerfumes.getTotalPages());
        res.setPageNumber(likePerfumes.getPageable().getPageNumber());
        res.setFirst(likePerfumes.isFirst());
        res.setLast(likePerfumes.isLast());

        for(int i=0; i<likePerfumes.getContent().size(); i++){
            Map<String, Object> perfumeInfo = new HashMap<>();
            perfumeInfo.put("perfumeId",likePerfumes.getContent().get(i).getPerfume().getPerfumeId());
            perfumeInfo.put("perfumeName",likePerfumes.getContent().get(i).getPerfume().getPerfumeName());
            perfumeInfo.put("perfumeBrand",likePerfumes.getContent().get(i).getPerfume().getPerfumeBrand());
            perfumeInfo.put("perfumeScore",likePerfumes.getContent().get(i).getPerfume().getPerfumeScore());
            perfumeList.add(perfumeInfo);
        }
        res.setPerfumeList(perfumeList);

        return res;
    }
}
