/**
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
import com.idle.api.response.BaseResponseBody;
import com.idle.api.service.UserService;
import com.idle.db.entity.User;
import com.idle.db.repository.UserRepository;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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
    public ResponseEntity<String> signUp(@RequestBody UserSignUpRequest userSignUpRequest) {
        String user = userService.insertUser(userSignUpRequest);
        if (user.equals("fail")) {
            return new ResponseEntity<>("회원가입 실패", HttpStatus.OK);
        }
        return new ResponseEntity<>("회원가입 성공", HttpStatus.OK);
    }

    /* Alice */
    @ApiOperation("아이디 중복 검사")
    @GetMapping("/checkuid/{userId}")
    public ResponseEntity<String> checkUserId(@PathVariable("userId") String userId) {
        String result = userService.checkUserId(userId);
        if (result.equals("fail")) {
            return new ResponseEntity<>("아이디 중복", HttpStatus.OK);
        }
        return new ResponseEntity<>("아이디 사용 가능", HttpStatus.OK);
    }

    /* Alice */
    @ApiOperation("닉네임 중복 검사")
    @GetMapping("/checkunickname/{userNickname}")
    public ResponseEntity<String> checkUserNickname(@PathVariable("userNickname") String userNickname) {
        String result = userService.checkUserNickname(userNickname);
        if (result.equals("fail")) {
            return new ResponseEntity<>("닉네임 중복", HttpStatus.OK);
        }
        return new ResponseEntity<>("닉네임 사용 가능", HttpStatus.OK);
    }

    /* Woody */
    @ApiOperation("마이페이지 비밀번호 검사")
    @PostMapping("/checkpw")
    public ResponseEntity<String> checkUserPw(@RequestParam("userPw") String userPw) {
        String result = userService.checkUserPw(userPw);
        if (result.equals("fail")) {
            return new ResponseEntity<>("비밀번호가 맞지 않습니다!", HttpStatus.OK);
        }
        return new ResponseEntity<>("비밀번호 인증 성공", HttpStatus.OK);
    }

}
