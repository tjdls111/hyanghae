/**
*
* UserController
* 회원가입 API 구현
*
* @author Alice
* @version 1.0.0
* 생성일 2022-03-08
* 마지막 수정일 2022-03-08
**/
package com.idle.api.controller;

import com.idle.api.request.UserSignUpRequest;
import com.idle.api.service.UserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    /* Alice */
    @ApiOperation("회원가입")
    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody UserSignUpRequest userSignUpRequest){
        String user = userService.insertUser(userSignUpRequest);
        if(user.equals("fail")){
            return new ResponseEntity<>("회원가입 실패", HttpStatus.OK);
        }
        return new ResponseEntity<>("회원가입 성공", HttpStatus.OK);
    }

}
