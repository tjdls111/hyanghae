/**
 *
 * PerfumeListResponse
 * 향수 목록 조회 response 생성
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-16
 * 마지막 수정일 2022-03-28
 **/

package com.idle.api.response;

import com.idle.db.entity.Perfume;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class PerfumeListResponse extends BaseResponseBody{

    Long totalElements;
    int totalPages;
    int pageNumber;
    boolean first;
    boolean last;
    List<Map<String, Object>> perfumeList;

    public static PerfumeListResponse of(Integer statusCode, String message,  Page<Perfume> perfumes) {
        PerfumeListResponse res = new PerfumeListResponse();
        List<Map<String, Object>> perfumeList = new ArrayList<>();

        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setTotalElements(perfumes.getTotalElements());
        res.setTotalPages(perfumes.getTotalPages());
        res.setPageNumber(perfumes.getPageable().getPageNumber());
        res.setFirst(perfumes.isFirst());
        res.setLast(perfumes.isLast());

        for(Perfume perfume : perfumes.getContent()){
            Map<String, Object> perfumeInfo = new HashMap<>();
            perfumeInfo.put("perfumeId",perfume.getPerfumeId());
            perfumeInfo.put("perfumeName",perfume.getPerfumeName());
            perfumeInfo.put("imgUrl",perfume.getImgUrl());
            perfumeInfo.put("perfumeBrand",perfume.getPerfumeBrand());
            perfumeInfo.put("note1",perfume.getNote1());
            perfumeInfo.put("note2",perfume.getNote2());
            perfumeInfo.put("note3",perfume.getNote3());
            perfumeInfo.put("perfumeScore",perfume.getPerfumeScore());
            perfumeList.add(perfumeInfo);
        }

        res.setPerfumeList(perfumeList);

        return res;

    }
}
