package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.config.AbstractTestContainerConfig;
import com.sustech.cs304.project.peakform.utils.LoginUtils;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.UUID;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@ActiveProfiles("test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class GymControllerTest extends AbstractTestContainerConfig {

    @LocalServerPort
    private Integer port;

    @BeforeEach
    void setUp() {
        RestAssured.baseURI = "http://localhost:" + port;
    }

    @Test
    void getGymsTest() {
        given()
                .contentType(ContentType.JSON)
                .when()
                .get("/gyms")
                .then()
                .statusCode(200)
                .body(".", hasSize(3))
                .body("[0].gymId", equalTo(1))
                .body("[0].gymName", equalTo("AlphaLand"))
                .body("[0].startTime", equalTo("09:00:00"))
                .body("[0].endTime", equalTo("21:00:00"))
                .body("[0].location", equalTo("123 Fitness St, City Center"))
                .body("[0].description", equalTo("A gym focused on weightlifting and strength training."))
                .body("[0].contact", equalTo("123-456-7890"))
                .body("[0].gymCoverPhoto", matchesRegex("https://storage.googleapis.com/peakform-3d589.firebasestorage.app/gym-photo/1/1-1.webp\\?.*"));

        given()
                .contentType(ContentType.JSON)
                .when()
                .get("/gyms")
                .then()
                .statusCode(200)
                .body(".", hasSize(3))
                .body("[0].gymId", equalTo(1))
                .body("[0].gymName", equalTo("AlphaLand"))
                .body("[0].startTime", equalTo("09:00:00"))
                .body("[0].endTime", equalTo("21:00:00"))
                .body("[0].location", equalTo("123 Fitness St, City Center"))
                .body("[0].description", equalTo("A gym focused on weightlifting and strength training."))
                .body("[0].contact", equalTo("123-456-7890"))
                .body("[0].gymCoverPhoto", matchesRegex("https://storage.googleapis.com/peakform-3d589.firebasestorage.app/gym-photo/1/1-1.webp\\?.*"));
    }

    @Test
    void getGymSuccessTest() {
        List<String> loginResponse = LoginUtils.login("prakbunlong53@gmail.com", "1");

        given()
                .contentType(ContentType.JSON)
                .sessionId(loginResponse.get(1))
                .queryParam("userUuid", loginResponse.get(0))
                .when()
                .get("/gyms/1")
                .then()
                .statusCode(200)
                .body("gymId", equalTo(1))
                .body("gymName", equalTo("AlphaLand"))
                .body("startTime", equalTo("09:00:00"))
                .body("endTime", equalTo("21:00:00"))
                .body("location", equalTo("123 Fitness St, City Center"))
                .body("description", equalTo("A gym focused on weightlifting and strength training."))
                .body("contact", equalTo("123-456-7890"))
                .body("gymPhotos", hasSize(6))
                .body("gymPhotos[0]", matchesRegex("https://storage.googleapis.com/peakform-3d589.firebasestorage.app/gym-photo/1/1-1.webp\\?.*"));

        given()
                .contentType(ContentType.JSON)
                .sessionId(loginResponse.get(1))
                .queryParam("userUuid", loginResponse.get(0))
                .when()
                .get("/gyms/1")
                .then()
                .statusCode(200)
                .body("gymId", equalTo(1))
                .body("gymName", equalTo("AlphaLand"))
                .body("startTime", equalTo("09:00:00"))
                .body("endTime", equalTo("21:00:00"))
                .body("location", equalTo("123 Fitness St, City Center"))
                .body("description", equalTo("A gym focused on weightlifting and strength training."))
                .body("contact", equalTo("123-456-7890"))
                .body("gymPhotos", hasSize(6))
                .body("gymPhotos[0]", matchesRegex("https://storage.googleapis.com/peakform-3d589.firebasestorage.app/gym-photo/1/1-1.webp\\?.*"));
    }

    @Test
    void getGymUnauthorizedTest() {
        given()
                .contentType(ContentType.JSON)
                .when()
                .get("/gyms/1?userUuid=9fa2fa3e-a194-4187-95a3-5c818c433973")
                .then()
                .statusCode(401)
                .body("message", equalTo("Unauthorized"));
    }

    @Test
    void getGymNotFoundTest() {
        List<String> loginResponse = LoginUtils.login("prakbunlong53@gmail.com", "1");

        // Valid gymId but invalid userUuid
        given()
                .contentType(ContentType.JSON)
                .sessionId(loginResponse.get(1))
                .queryParam("userUuid", UUID.randomUUID().toString())
                .when()
                .get("/gyms/1")
                .then()
                .statusCode(403);

        // Valid userUuid but invalid gymId
        given()
                .contentType(ContentType.JSON)
                .sessionId(loginResponse.get(1))
                .queryParam("userUuid", loginResponse.get(0))
                .when()
                .get("/gyms/1000")
                .then()
                .statusCode(404);
    }
}
