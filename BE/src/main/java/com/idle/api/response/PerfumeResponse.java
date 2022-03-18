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

import com.idle.db.entity.Perfume;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("PerfumeResponse")
public class PerfumeResponse {

    Long perfumeId;
    String perfumeName;
    float perfumeScore;
    int perfumeCost;
    String perfumeBrand;
    String perfumeUrl;
    LocalDateTime perfumeDate;
    int gender;
    boolean dayNight;
    int season;
    int tpo;
    int mood;

    public static PerfumeResponse of(Perfume perfume) {
        PerfumeResponse res = new PerfumeResponse();
        res.setPerfumeId(perfume.getPerfumeId());
        res.setPerfumeName(perfume.getPerfumeName());
        res.setPerfumeScore(perfume.getPerfumeScore());
        res.setPerfumeCost(perfume.getPerfumeCost());
        res.setPerfumeBrand(perfume.getPerfumeBrand());
        res.setPerfumeUrl(perfume.getPerfumeUrl());
        res.setPerfumeDate(perfume.getPerfumeDate());
        res.setGender(perfume.getGender());
        res.setDayNight(perfume.isDaynight());
        res.setSeason(perfume.getSeason());
        res.setTpo(perfume.getTpo());
        res.setMood(perfume.getMood());

        return res;
    }
}
