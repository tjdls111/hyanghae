package com.idle.api.request;



import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Survey2InsertRequest {
    @NotNull
    String surveyTitle;
    @NotNull
    Long perfumeId;

}
