package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.dto.UserStatRequest;
import com.sustech.cs304.project.peakform.dto.UserStatResponse;
import com.sustech.cs304.project.peakform.service.UserStatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.UUID;

@RestController
@RequestMapping("/user-stats")
@RequiredArgsConstructor
public class UserStatController {

    private final UserStatService userStatService;

    @PutMapping("/{userUuid}")
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    public ResponseEntity<String> updateUserStat(
            @PathVariable UUID userUuid,
            @RequestBody UserStatRequest request) {
        return userStatService.updateUserStat(userUuid, request);
    }

    @GetMapping("/{userUuid}")
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    public UserStatResponse getUserStat(@PathVariable UUID userUuid) {
        return userStatService.getUserStat(userUuid);
    }

    @DeleteMapping("/{userUuid}")
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    public ResponseEntity<String> deleteUserStat(@PathVariable UUID userUuid) {
        return userStatService.deleteUserStat(userUuid);
    }
}
