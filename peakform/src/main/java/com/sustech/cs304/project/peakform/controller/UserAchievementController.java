package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.dto.UserAchievementResponse;
import com.sustech.cs304.project.peakform.service.UserAchievementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user-achievements")
public class UserAchievementController {

    private final UserAchievementService userAchievementService;

    @GetMapping
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    public ResponseEntity<List<UserAchievementResponse>> getUserAchievements(@RequestParam UUID userUuid) {
        return userAchievementService.getUserAchievements(userUuid);
    }
}
