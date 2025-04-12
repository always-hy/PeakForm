package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.dto.AppointmentStatsResponse;
import com.sustech.cs304.project.peakform.service.UserScheduleService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user-schedules")
public class UserScheduleController {

    private final UserScheduleService userScheduleService;

    @Transactional
    @PostMapping("/book")
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    public ResponseEntity<String> bookGymSession(@RequestParam(value = "gymSessionId") Long gymSessionId,
                                                 @RequestParam(value = "userUuid") UUID userUuid) {
        return userScheduleService.bookGymSession(gymSessionId, userUuid);
    }

    @Transactional
    @PutMapping("/cancel")
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    public ResponseEntity<String> cancelGymSession(@RequestParam(value = "gymSessionId") Long gymSessionId,
                                                   @RequestParam(value = "userUuid") UUID userUuid) {
        return userScheduleService.cancelGymSession(gymSessionId, userUuid);
    }

    @Transactional
    @PutMapping("/complete")
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    public ResponseEntity<String> markGymSessionCompleted(@RequestParam(value = "gymSessionId") Long gymSessionId,
                                                          @RequestParam(value = "userUuid") UUID userUuid) {
        return userScheduleService.markGymSessionCompleted(gymSessionId, userUuid);
    }

    @Transactional
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    @PutMapping("/miss")
    public ResponseEntity<String> markGymSessionMissed(@RequestParam(value = "gymSessionId") Long gymSessionId,
                                                       @RequestParam(value = "userUuid") UUID userUuid) {
        return userScheduleService.markGymSessionMissed(gymSessionId, userUuid);
    }

    @GetMapping("/records")
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    public ResponseEntity<AppointmentStatsResponse> getAppointmentStats(@RequestParam(value = "userUuid") UUID userUuid) {
        return userScheduleService.getAppointmentStats(userUuid);
    }
}
