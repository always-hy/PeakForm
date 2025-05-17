package com.sustech.cs304.project.peakform;

import com.sustech.cs304.project.peakform.config.AbstractTestContainerConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ActiveProfiles("test")
@SpringBootTest
@Testcontainers
class PeakFormApplicationTests extends AbstractTestContainerConfig {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    void contextLoads() {
    }

    @Test
    void verifyTables() {
        Set<String> expectedTables = new HashSet<>(Arrays.asList(
                "achievement",
                "exercise",
                "gym",
                "gym_session",
                "notification",
                "social",
                "user",
                "user_achievement",
                "user_record",
                "user_schedule",
                "user_stat",
                "user_target",
                "workout",
                "workout_exercise"
        ));

        List<String> actualTables = jdbcTemplate.queryForList(
                "SHOW TABLES FROM peakform_test", String.class);

        assertEquals(14, actualTables.size(), "Expected exactly 13 tables");
        assertTrue(new HashSet<>(actualTables).containsAll(expectedTables),
                "All expected tables should be present: " + expectedTables);
    }
}