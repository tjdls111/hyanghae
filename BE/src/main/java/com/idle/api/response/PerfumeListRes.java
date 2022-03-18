/**
* PerfumeListRes
* 향수 리스트 Response 생성
*
* @author Woody
* @version 1.0.0
* 생성일 2022/03/16
* 마지막 수정일 2022/03/16
**/
package com.idle.api.response;

import com.idle.db.entity.Perfume;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@ApiModel("PerfumeListResponse")
public class PerfumeListRes extends BaseResponseBody {

    List<Map<String, Object>> perfumeInfos;
    boolean isLast;

    public static PerfumeListRes of(Integer statusCode, String message, List<Perfume> perfumeList, boolean isLast){
        PerfumeListRes res = new PerfumeListRes();
        List<Map<String, Object>> perfumeInfos = new ArrayList<>();

        for (Perfume perfume : perfumeList) {
            Map<String, Object> perfumeInfo = new HashMap<>();
            perfumeInfo.put("perfumeId", perfume.getPerfumeId());
            perfumeInfo.put("perfumeName", perfume.getPerfumeName());
            perfumeInfo.put("perfumeScore", perfume.getPerfumeScore());
            perfumeInfo.put("perfumeCost", perfume.getPerfumeCost());
            perfumeInfo.put("perfumeBrand", perfume.getPerfumeBrand());
            perfumeInfo.put("perfumeUrl", perfume.getPerfumeUrl());
            perfumeInfo.put("perfumeDate", perfume.getPerfumeDate());
            perfumeInfo.put("gender", perfume.getGender());
            //perfumeInfo.put("age", perfume.getAge());
            perfumeInfo.put("season", perfume.getSeason());
            perfumeInfo.put("tpo", perfume.getTpo());
            perfumeInfo.put("mood", perfume.getMood());
            perfumeInfos.add(perfumeInfo);
        }

        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setPerfumeInfos(perfumeInfos);
        res.setLast(isLast);
        return res;
    }

}
