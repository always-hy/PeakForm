package com.sustech.cs304.project.peakform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableCaching
public class PeakFormApplication {

    public static void main(String[] args) {
        SpringApplication.run(PeakFormApplication.class, args);
    }
}
