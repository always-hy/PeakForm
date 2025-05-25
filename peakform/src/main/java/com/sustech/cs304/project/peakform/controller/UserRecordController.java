package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.domain.User;
import com.sustech.cs304.project.peakform.domain.UserRecord;
import com.sustech.cs304.project.peakform.dto.TopRecordResponse;
import com.sustech.cs304.project.peakform.dto.UserRecordResponse;
import com.sustech.cs304.project.peakform.repository.UserRecordRepository;
import com.sustech.cs304.project.peakform.repository.UserRepository;
import com.sustech.cs304.project.peakform.service.UserRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/records")
public class UserRecordController {

    private final UserRepository userRepository;
    private final UserRecordRepository userRecordRepository;

    private final UserRecordService userRecordService;

    @GetMapping()
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    public ResponseEntity<UserRecordResponse> getUserRecord(@RequestParam("userUuid") UUID userUuid) {
        Optional<User> userOptional = userRepository.findByUserUuid(userUuid);
        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Optional<UserRecord> userRecordOptional = userRecordRepository.findByUser_UserUuid(userUuid);
        if (userRecordOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(userRecordService.getUserRecord(userUuid));
    }

    @GetMapping("/top")
    public ResponseEntity<TopRecordResponse> getTopRecords() {
        return ResponseEntity.ok(userRecordService.getTopRecords(5));
    }
}
