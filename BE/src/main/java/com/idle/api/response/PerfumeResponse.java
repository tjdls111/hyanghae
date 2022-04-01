/**
* PerfumeResponse
*
*
* @author Woody
* @version 1.0.0
* 생성일 2022/03/18
* 마지막 수정일 2022/03/18
**/
package com.idle.api.response;

import com.idle.db.entity.Brand;
import com.idle.db.entity.Perfume;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;



@Getter
@Setter
@ApiModel("PerfumeResponse")
public class PerfumeResponse {

    Long perfumeId;
    String perfumeName;
    String perfumeBrand;
    float perfumeScore;
    String group;
    String note1;
    String note2;
    String note3;
    int time;
    int gender;
    int season;
    int tpo;
    int mood;
    String imgUrl;

    public static PerfumeResponse of(Perfume perfume) {
        PerfumeResponse res = new PerfumeResponse();
        res.setPerfumeId(perfume.getPerfumeId());
        res.setPerfumeName(perfume.getPerfumeName());
        res.setPerfumeBrand(perfume.getPerfumeBrand().getBrandName());
        res.setPerfumeScore(perfume.getPerfumeScore());
        res.setGroup(perfume.getGroup());
        res.setNote1(perfume.getNote1());
        res.setNote2(perfume.getNote2());
        res.setNote3(perfume.getNote3());
        res.setTime(perfume.getTime());
        res.setGender(perfume.getGender());
        res.setSeason(perfume.getSeason());
        res.setTpo(perfume.getTpo());
        res.setMood(perfume.getMood());
        res.setImgUrl(perfume.getImgUrl());

        return res;
    }
}
