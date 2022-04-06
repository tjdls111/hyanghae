package com.idle.api.response;

import com.idle.db.entity.Perfume;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class PerfumeListBySeasonResponse extends BaseResponseBody{

    List<Map<String, Object>> perfumeList;

    public static PerfumeListBySeasonResponse of(Integer statusCode, String message,  List<Perfume> perfumes) {
        PerfumeListBySeasonResponse res = new PerfumeListBySeasonResponse();
        List<Map<String, Object>> perfumeList = new ArrayList<>();

        res.setStatusCode(statusCode);
        res.setMessage(message);


        for(Perfume perfume : perfumes){
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
