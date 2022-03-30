package com.idle;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;




@SpringBootApplication(exclude = SecurityAutoConfiguration.class)    // Security 자동으로 넘어가기
@EnableJpaAuditing    // BaseTimeEntity 에서 사용하는 JPA Auditing을 사용할 수 있게 함
public class IdleApplication {

    public static void main(String[] args) {

		SpringApplication.run(IdleApplication.class, args);


    }

}
