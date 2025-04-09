package com.sustech.cs304.project.peakform.utils;

import io.restassured.http.ContentType;
import io.restassured.response.Response;

import java.util.Arrays;
import java.util.List;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class LoginUtils {
    public static List<String> login(String email, String password) {
        Response response = given()
                .contentType(ContentType.URLENC)
                .formParam("username", email)
                .formParam("password", password)
                .when()
                .post("/login")
                .then()
                .statusCode(200)
                .body("message", equalTo("Login successful"))
                .extract().response();
        return Arrays.asList(response.jsonPath().getString("userUuid"), response.getCookie("JSESSIONID"));
    }
}
