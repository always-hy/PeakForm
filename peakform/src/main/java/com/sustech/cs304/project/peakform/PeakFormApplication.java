package com.sustech.cs304.project.peakform;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PeakFormApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load();
		System.setProperty("spring.datasource.username", dotenv.get("DB_USERNAME"));
		System.setProperty("spring.datasource.password", dotenv.get("DB_PASSWORD"));
		System.setProperty("spring.mail.username", dotenv.get("MAIL_USERNAME"));
		System.setProperty("spring.mail.password", dotenv.get("MAIL_PASSWORD"));
		System.setProperty("spring.security.oauth2.client.registration.google.client-id", dotenv.get("GOOGLE_CLIENT_ID"));
		System.setProperty("spring.security.oauth2.client.registration.google.client-secret", dotenv.get("GOOGLE_CLIENT_SECRET"));
		SpringApplication.run(PeakFormApplication.class, args);
	}
}
