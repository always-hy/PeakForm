package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.dto.UserStatRequest;
import com.sustech.cs304.project.peakform.dto.UserStatResponse;
import com.sustech.cs304.project.peakform.service.UserStatService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/user-stats")
@RequiredArgsConstructor
public class UserStatController {

    private final UserStatService userStatService;

    @PutMapping("/update")
    @Transactional
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    public ResponseEntity<String> updateUserStat(
            @RequestParam("userUuid") UUID userUuid,
            @RequestBody UserStatRequest request) {
        return userStatService.updateUserStat(userUuid, request);
    }

    @GetMapping
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    public UserStatResponse getUserStat(@RequestParam("userUuid") UUID userUuid) {
        return userStatService.getUserStat(userUuid);
    }

    @PutMapping("/reset")
    @Transactional
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    public ResponseEntity<String> resetUserStat(@RequestParam("userUuid") UUID userUuid) {
        return userStatService.resetUserStat(userUuid);
    }

    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    @GetMapping("/history")
    public List<UserStatResponse> getUserStatHistory(@RequestParam UUID userUuid) {
        return userStatService.getUserStatHistory(userUuid);
    }
}
