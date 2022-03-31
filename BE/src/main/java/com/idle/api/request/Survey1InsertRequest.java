package com.idle.api.request;


import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Survey1InsertRequest {
    @NotNull
    String surveyTitle;
    @NotNull
    int gender;
    @NotNull
    int time;
    @NotNull
    int season;
    @NotNull
    int tpo;
    @NotNull
    int mood;

}
