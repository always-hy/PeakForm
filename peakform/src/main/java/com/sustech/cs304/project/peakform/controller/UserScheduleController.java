package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.service.UserScheduleService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user-schedules")
public class UserScheduleController {

    private final UserScheduleService userScheduleService;

    @Transactional
    @PostMapping("/book")
    public ResponseEntity<String> bookGymSession(@RequestParam(value = "gymSessionId") Long gymSessionId,
                                                 @RequestParam(value = "userUuid") UUID userUuid) {
        return userScheduleService.bookGymSession(gymSessionId, userUuid);
    }
}
