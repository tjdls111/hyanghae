package com.idle.api.request;

import com.sun.istack.NotNull;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserCheckPwRequest")
public class UserCheckPwRequest {

    @ApiModelProperty(name = "유저 Password", example = "ssafy!@#") @NotNull
    String userPw;
}
