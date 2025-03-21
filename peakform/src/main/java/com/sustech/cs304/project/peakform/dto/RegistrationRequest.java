package com.sustech.cs304.project.peakform.dto;

import com.sustech.cs304.project.peakform.domain.User;
import lombok.Data;

@Data
public class RegistrationRequest {
    private String username;
    private String email;
    private String password;
    private Integer age;
    private User.Gender gender;
}