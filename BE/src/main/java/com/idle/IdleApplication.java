package com.idle;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)	// Security 자동으로 넘어가기
public class IdleApplication {

	public static void main(String[] args) {
		SpringApplication.run(IdleApplication.class, args);
	}

}
