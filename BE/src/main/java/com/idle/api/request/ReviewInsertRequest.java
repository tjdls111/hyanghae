/**
 *
 * ReviewInsertRequest
 *
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-21
 * 마지막 수정일 2022-03-21
 **/
package com.idle.api.request;


import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewInsertRequest {
    @NotNull
    Long perfumeId;
    @NotNull
    String reviewTitle;
    @NotNull
    String reviewContent;
    @NotNull
    float reviewScore;

}
