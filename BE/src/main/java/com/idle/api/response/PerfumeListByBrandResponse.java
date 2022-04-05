package com.idle.api.response;

import com.idle.db.entity.LikePerfume;
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
public class PerfumeListByBrandResponse extends BaseResponseBody{

    Long totalElements;
    int totalPages;
    int pageNumber;
    boolean first;
    boolean last;
    List<Map<String, Object>> perfumeList;

    public static PerfumeListByBrandResponse of(Integer statusCode, String message,  Page<Perfume> perfumes) {
        PerfumeListByBrandResponse res = new PerfumeListByBrandResponse();
        List<Map<String, Object>> perfumeList = new ArrayList<>();

        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setTotalElements(perfumes.getTotalElements());
        res.setTotalPages(perfumes.getTotalPages());
        res.setPageNumber(perfumes.getPageable().getPageNumber());
        res.setFirst(perfumes.isFirst());
        res.setLast(perfumes.isLast());

        for(int i=0; i<perfumes.getContent().size(); i++){
            Map<String, Object> perfumeInfo = new HashMap<>();
            perfumeInfo.put("perfumeId",perfumes.getContent().get(i).getPerfumeId());
            perfumeInfo.put("perfumeName",perfumes.getContent().get(i).getPerfumeName());
            perfumeInfo.put("imgUrl",perfumes.getContent().get(i).getImgUrl());

            perfumeList.add(perfumeInfo);
        }
        res.setPerfumeList(perfumeList);

        return res;
    }
}
