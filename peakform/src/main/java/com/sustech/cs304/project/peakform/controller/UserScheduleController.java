package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.domain.User;
import com.sustech.cs304.project.peakform.dto.AppointmentStatsResponse;
import com.sustech.cs304.project.peakform.repository.UserRepository;
import com.sustech.cs304.project.peakform.service.UserScheduleService;
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
@RequestMapping("/user-schedules")
public class UserScheduleController {

    private final UserRepository userRepository;
    private final UserScheduleService userScheduleService;

    @Transactional
    @PostMapping("/book")
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    public ResponseEntity<String> bookGymSession(@RequestParam(value = "gymId") Long gymId,
                                                 @RequestParam(value = "gymSessionId") Long gymSessionId,
                                                 @RequestParam(value = "userUuid") UUID userUuid) {
        return userScheduleService.bookGymSession(gymId, gymSessionId, userUuid);
    }

    @Transactional
    @PutMapping("/cancel")
    @PreAuthorize("#userUuid.toString() == authentication.principal.userUuid.toString()")
    public ResponseEntity<String> cancelGymSession(@RequestParam(value = "gymId") Long gymId,
                                                   @RequestParam(value = "gymSessionId") Long gymSessionId,
                                                   @RequestParam(value = "userUuid") UUID userUuid) {
        return userScheduleService.cancelGymSession(gymId, gymSessionId, userUuid);
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
        Optional<User> userOptional = userRepository.findById(userUuid);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(userScheduleService.getAppointmentStats(userUuid));
    }
}
