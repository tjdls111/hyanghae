//package com.idle.config;
//
///**
//*
//* WebSecurityConfig
//* SpringSecurity와 JWT 추가
//*
//* @author Alice
//* @version 1.0.0
//* 생성일 2022-03-08
//* 마지막 수정일 2022-03-10
//**/
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.factory.PasswordEncoderFactories;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.web.cors.CorsUtils;
//
//@Configuration
//@EnableWebSecurity
//public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
//
//    @Autowired
//    private JwtTokenProvider jwtTokenProvider;
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
//    }
//
//    @Bean
//    @Override
//    public AuthenticationManager authenticationManagerBean() throws Exception {
//        return super.authenticationManagerBean();
//    }
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http.httpBasic().disable()  // rest api 이므로 기본설정 사용안해서 disable 적용. -> enable시 사용지 비 인증시 로그인 vue 폼 페이지가 뜬다.
//                .cors().and()
//                .csrf().disable()   // rest api에서 csrf 보안이 필요 없으므로 disable처리
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰 기반 인증이므로 세션 사용 하지않음
//                .and()
//                //HTTP 요청에 JWT 토큰 인증 필터를 거치도록 필터를 추가 해야함
//                .authorizeRequests()    // 아래 Matchers에 해당되는 사용권한 체크 -> 여기서도 권한이 없으면 vue form 로그인 페이지로 이어진다
//                .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
//                .antMatchers("/user/**").permitAll()    // 회원관리에 대한 주소는 누구나 접근 가능
//                .antMatchers(HttpMethod.OPTIONS,"/**").permitAll()
//                .antMatchers(HttpMethod.POST,"/**").permitAll()
//                .antMatchers(HttpMethod.DELETE,"/**").permitAll()
//                .antMatchers(HttpMethod.GET,"/**").permitAll()
//                .antMatchers(HttpMethod.PUT,"/**").permitAll()
//                .and()
//                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
//                        UsernamePasswordAuthenticationFilter.class);;
//    }
//}
