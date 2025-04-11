package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.dto.UserTargetRequest;
import com.sustech.cs304.project.peakform.dto.UserTargetResponse;
import com.sustech.cs304.project.peakform.service.UserTargetService;
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

    @GetMapping("/{userUuid}")
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    public ResponseEntity<UserTargetResponse> getUserTarget(@PathVariable UUID userUuid) {
        return userTargetService.getUserTarget(userUuid);
    }

    @PutMapping("/{userTargetId}")
    public ResponseEntity<String> updateUserTarget(@PathVariable Long userTargetId, @RequestBody UserTargetRequest userTargetRequest) {
        return userTargetService.updateUserTarget(userTargetId, userTargetRequest);
    }

    /*@DeleteMapping("/{userTargetId}")
    public ResponseEntity<Void> deleteUserTarget(@PathVariable Long userTargetId) {
        userTargetService.deleteUserTarget(userTargetId);
        return ResponseEntity.noContent().build();
    }*/
}