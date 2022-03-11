/**
 * UserController
 * 회원가입, 아이디 중복 검사, 닉네임 중복 검사, 로그인 API 구현
 *
 * @author Alice, David, Woody
 * @version 1.0.0
 * 생성일 2022-03-08
 * 마지막 수정일 2022-03-11
 **/
package com.idle.api.controller;

import com.idle.api.request.UserLoginRequest;
import com.idle.api.request.UserSignUpRequest;
import com.idle.api.request.UserUpdateRequest;
import com.idle.api.response.BaseResponseBody;
import com.idle.api.response.UserEmailNumberResponse;
import com.idle.api.response.UserLoginResponse;
import com.idle.api.service.UserService;
import com.idle.common.jwt.JwtTokenUtil;
import com.idle.common.jwt.dto.IdleUserDetails;
import com.idle.db.entity.User;
import com.idle.db.repository.UserRepository;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /* Alice */
    @ApiOperation("회원가입")
    @PostMapping("/signup")
    public ResponseEntity<BaseResponseBody> signUp(@RequestBody UserSignUpRequest userSignUpRequest) {
        String user = userService.insertUser(userSignUpRequest);

        if (user.equals("fail")) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401,"회원가입 실패"));
        }
        return ResponseEntity.ok(BaseResponseBody.of(200,"회원가입 성공"));
    }

    /* Alice */
    @ApiOperation("아이디 중복 검사")
    @GetMapping("/duplicateid/{userId}")
    public ResponseEntity<BaseResponseBody> checkDuplicateUserId(@PathVariable("userId") String userId) {
        String result = userService.checkDuplicateUserId(userId);
        if (result.equals("fail")) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401,"아이디 중복"));
        }
        return ResponseEntity.ok(BaseResponseBody.of(200,"아이디 사용 가능"));
    }

    /* Alice */
    @ApiOperation("닉네임 중복 검사")
    @GetMapping("/duplicatenickname/{userNickname}")
    public ResponseEntity<BaseResponseBody> checkDuplicateUserNickname(@PathVariable("userNickname") String userNickname) {
        String result = userService.checkDuplicateUserNickname(userNickname);
        if (result.equals("fail")) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401,"닉네임 중복"));
        }
        return ResponseEntity.ok(BaseResponseBody.of(200,"닉네임 사용 가능"));
    }

    /* Alice */
    @ApiOperation("이메일 인증번호 전송")
    @GetMapping(value = "/sendemailnum/{email}")
    public ResponseEntity<UserEmailNumberResponse> sendUserEmailNumber(@PathVariable("email") String email) {
        String res = userService.sendUserEmailNumber(email);

        return ResponseEntity.ok(UserEmailNumberResponse.of(200,"인증번호를 전송했습니다.", res));
    }

    /* Woody */
    @ApiOperation("마이페이지 비밀번호 검사")
    @PostMapping("/checkpw")
    public ResponseEntity<BaseResponseBody> checkUserPw(@RequestParam("userPw") String userPw) {
        String result = userService.checkUserPw(userPw);
        if (result.equals("fail")) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401,"비밀번호가 맞지 않습니다."));
        }
        return ResponseEntity.ok(BaseResponseBody.of(200,"비밀번호 인증 성공"));
    }

    /* Alice, David */
    @ApiOperation("로그인")
    @PostMapping("/login")
    public ResponseEntity<UserLoginResponse> login(@RequestBody UserLoginRequest userLoginRequest) {
        String user = userService.login(userLoginRequest);

        if (user.equals("fail")) {
            return ResponseEntity.status(401).body(UserLoginResponse.of(401,"아이디와 비밀번호를 확인 해 주세요",null));
        }
        return ResponseEntity.ok(UserLoginResponse.of(200,"로그인 완료!", JwtTokenUtil.getToken(userLoginRequest.getUserId())));
    }

    /* Woody */
    @ApiOperation("회원 정보 수정")
    @PutMapping("/update")
    public ResponseEntity<? extends BaseResponseBody> updateUser(@ApiIgnore Authentication authentication,
                                                                 @RequestBody @ApiParam(value = "회원정보 수정", required = true) UserUpdateRequest userUpdateReq) {
        IdleUserDetails userDetail = (IdleUserDetails) authentication.getDetails();
        User user = userDetail.getUser();
        userService.updateUser(userUpdateReq, user);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

}
