package com.idle.api.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class Survey3InsertRequest {
    private MultipartFile imgFile;
    private String surveyTitle;
    private String clothesUrl;

}
