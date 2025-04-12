package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.dto.UserTargetRequest;
import com.sustech.cs304.project.peakform.dto.UserTargetResponse;
import com.sustech.cs304.project.peakform.service.UserTargetService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user-target")
public class UserTargetController {

    private final UserTargetService userTargetService;

   /* @PostMapping("/{userUuid}")
    public ResponseEntity<UserTargetResponse> createUserTarget(@PathVariable UUID userUuid,
                                                               @RequestBody UserTargetRequest userTargetRequest) {
        return userTargetService.createUserTarget(userUuid, userTargetRequest);
    }*/

    @GetMapping
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    public ResponseEntity<UserTargetResponse> getUserTarget(@RequestParam("userUuid") UUID userUuid) {
        return userTargetService.getUserTarget(userUuid);
    }

    @PutMapping("/update")
    @Transactional
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    public ResponseEntity<String> updateUserTarget(@RequestParam("userUuid") UUID userUuid, @RequestBody UserTargetRequest userTargetRequest) {
        return userTargetService.updateUserTarget(userUuid, userTargetRequest);
    }

    /*@DeleteMapping("/{userTargetId}")
    public ResponseEntity<Void> deleteUserTarget(@PathVariable Long userTargetId) {
        userTargetService.deleteUserTarget(userTargetId);
        return ResponseEntity.noContent().build();
    }*/
}