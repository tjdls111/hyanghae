/**
 *
 * OAuth2SuccessHandler
 * 소셜 로그인 성공시 작업 및 응답 하는 핸들러
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-10
 * 마지막 수정일 2022-03-11
 **/
package com.idle.common.oauth;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.idle.api.service.UserService;

import com.idle.common.jwt.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final UserService userService;
    private ObjectMapper mapper = new ObjectMapper();



    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User)authentication.getPrincipal();
        var attributes = oAuth2User.getAttributes();
        String userId = (String) attributes.get("email");

        response.setContentType("text/html;charset=UTF-8");

        String token = JwtTokenUtil.getToken(userId);

        response.addHeader("Token:", JwtTokenUtil.getToken(userId));
        response.setContentType("application/json;charset=UTF-8");

        // json 형태로 바꾸기
        String result = mapper.writeValueAsString(token);
        response.getWriter().write(result);

        System.out.println(token);

//        response.sendRedirect("/");
        var writer = response.getWriter();

        writer.flush();
    }
}
