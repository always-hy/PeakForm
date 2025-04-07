package com.sustech.cs304.project.peakform.config;

import org.testcontainers.containers.MySQLContainer;

public class TestContainerConfig {
    @SuppressWarnings("resource")
    public static final MySQLContainer<?> mysqlContainer = new MySQLContainer<>("mysql:9.2.0")
            .withDatabaseName("peakform_test")
            .withUsername("testuser")
            .withPassword("testpass");

    static {
        mysqlContainer.start();
    }
}