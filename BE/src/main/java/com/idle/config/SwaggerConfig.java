/**
*
* SwaggerConfig
*
* @author Alice
* @version 1.0.0
* 생성일 2022-03-08
* 마지막 수정일 2022-03-10
**/
package com.idle.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
public class SwaggerConfig {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.any()) // 현재 RequestMapping으로 할당된 모든 URL 리스트를 추출
//                .paths(PathSelectors.ant("/**"))// 그중 /api/** 인 URL들만 필터링
                .paths(PathSelectors.any())
                .build();
    }
}