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

import com.idle.api.request.*;
import com.idle.api.response.BaseResponseBody;
import com.idle.api.response.UserEmailNumberResponse;
import com.idle.api.response.UserLoginResponse;
import com.idle.api.response.UserResponse;
import com.idle.api.service.UserService;
import com.idle.common.jwt.JwtTokenUtil;
import com.idle.common.jwt.dto.IdleUserDetails;
import com.idle.db.entity.User;
import com.idle.db.repository.UserRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.NoSuchElementException;


@CrossOrigin("*")
@Api(value = "유저 API", tags = {"User"})
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
    @ApiOperation("비밀번호 인증")
    @PostMapping("/checkpw")
    public ResponseEntity<BaseResponseBody> checkUserPw(@ApiIgnore Authentication authentication,
                                                        @RequestBody @ApiParam(value = "비밀번호", required = true) UserCheckPwRequest userCheckPwRequest) {
        IdleUserDetails userDetails = (IdleUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        try {
            if(userService.checkUserPw(user, userCheckPwRequest.getUserPw())) {
                return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
            }
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Invalid Password"));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"User Not Found"));
        }
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

    /* David */
    @ApiOperation("아이디 찾기")
    @GetMapping("/finduserid/{email}")
    public ResponseEntity<BaseResponseBody> findUserId(@PathVariable("email") String email) {
        String res = userService.findUserIdByUserEmail(email);

        if (res.equals("fail")) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401,"해당 이메일로 가입된 아이디가 없습니다."));
        }
        return ResponseEntity.ok(BaseResponseBody.of(200,"이메일로 아이디를 전송했습니다."));
    }

    /* Woody */
    @ApiOperation("회원 탈퇴")
    @DeleteMapping("/delete")
    public ResponseEntity<? extends BaseResponseBody> deleteUser(@ApiIgnore Authentication authentication) {

        IdleUserDetails userDetails = (IdleUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        userService.deleteUser(user);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    /* Alice */
    @ApiOperation("비밀번호 찾기")
    @PutMapping("/finduserpw")
    public ResponseEntity<BaseResponseBody> findUserPw(@RequestBody UserPwRequest userPwRequest){
        String result = userService.findUserPw(userPwRequest);
        if (result.equals("fail")) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401,"해당 이메일로 가입된 아이디가 없습니다."));
        }
        return ResponseEntity.ok(BaseResponseBody.of(200,"이메일로 새 비밀번호를 전송했습니다."));
    }

    /* Woody */
    @ApiOperation("회원 정보 조회")
    @GetMapping("/info")
    public ResponseEntity<UserResponse> getUserInfo(@ApiIgnore Authentication authentication) {

        IdleUserDetails userDetails = (IdleUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        return ResponseEntity.status(200).body(UserResponse.of(user));
    }

}