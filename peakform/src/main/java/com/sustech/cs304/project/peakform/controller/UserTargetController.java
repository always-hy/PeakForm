package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.dto.UserTargetRequest;
import com.sustech.cs304.project.peakform.dto.UserTargetResponse;
import com.sustech.cs304.project.peakform.service.UserTargetService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user-target")
public class UserTargetController {

    private final UserTargetService userTargetService;

    @GetMapping
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    public ResponseEntity<UserTargetResponse> getUserTarget(@RequestParam("userUuid") UUID userUuid) {
        Optional<UserTargetResponse> userTargetResponse = userTargetService.getUserTarget(userUuid);
        return userTargetResponse
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @PutMapping("/update")
    @Transactional
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    public ResponseEntity<String> updateUserTarget(@RequestParam("userUuid") UUID userUuid, @RequestBody UserTargetRequest userTargetRequest) {
        return userTargetService.updateUserTarget(userUuid, userTargetRequest);
    }
}