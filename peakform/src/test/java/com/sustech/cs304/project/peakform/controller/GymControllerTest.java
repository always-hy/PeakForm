package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.config.AbstractTestContainerConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.List;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
public class GymControllerTest extends AbstractTestContainerConfig {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    void selectAllFromTable() {
        String tableName = "gym";

        List<Map<String, Object>> results = jdbcTemplate.queryForList("SELECT * FROM " + tableName);

        System.out.println("All records from " + tableName + ":");
        if (results.isEmpty()) {
            System.out.println("No records found in " + tableName);
        } else {
            results.forEach(row -> {
                System.out.println("Row: ");
                row.forEach((key, value) -> System.out.println("  " + key + ": " + value));
            });
        }
    }

    @Test
    void testGetGyms_Success() throws Exception {
        mockMvc.perform(get("/gyms")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

//    @Test
//    void testGetGym_Success_WithUserUuid() throws Exception {
//        UUID userUuid = UUID.randomUUID();
//        mockMvc.perform(get("/gyms/1")
//                        .param("userUuid", userUuid.toString())
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk());
//    }
}