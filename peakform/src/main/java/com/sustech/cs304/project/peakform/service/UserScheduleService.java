package com.sustech.cs304.project.peakform.service;

import com.sustech.cs304.project.peakform.domain.GymSession;
import com.sustech.cs304.project.peakform.domain.User;
import com.sustech.cs304.project.peakform.domain.UserSchedule;
import com.sustech.cs304.project.peakform.repository.GymSessionRepository;
import com.sustech.cs304.project.peakform.repository.UserRepository;
import com.sustech.cs304.project.peakform.repository.UserScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserScheduleService {

    private final UserScheduleRepository userScheduleRepository;
    private final GymSessionRepository gymSessionRepository;
    private final UserRepository userRepository;

    public ResponseEntity<String> bookGymSession(Long gymSessionId, UUID userUuid) {
        Optional<GymSession> gymSessionOptional = gymSessionRepository.findById(gymSessionId);
        if (gymSessionOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Gym session not found.");
        }

        Optional<User> userOptional = userRepository.findById(userUuid);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        GymSession gymSession = gymSessionOptional.get();
        User user = userOptional.get();

        if (userScheduleRepository.findByUser_UserUuidAndGymSession_GymSessionId(userUuid, gymSessionId).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already booked this gym session.");
        }

        UserSchedule userSchedule = UserSchedule.builder()
                .user(user)
                .gymSession(gymSession)
                .status(UserSchedule.Status.BOOKED)
                .build();

        userScheduleRepository.save(userSchedule);

        gymSession.setAvailableSlots(gymSession.getAvailableSlots() - 1);
        gymSessionRepository.save(gymSession);

        return ResponseEntity.status(HttpStatus.OK).body("Gym booked successfully for user: " + userUuid + ".");
    }

    public ResponseEntity<String> cancelGymSession(Long gymSessionId, UUID userUuid) {
        Optional<GymSession> gymSessionOptional = gymSessionRepository.findById(gymSessionId);
        if (gymSessionOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Gym session not found.");
        }

        Optional<User> userOptional = userRepository.findById(userUuid);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        GymSession gymSession = gymSessionOptional.get();

        Optional<UserSchedule> userScheduleOptional = userScheduleRepository.findByUser_UserUuidAndGymSession_GymSessionId(userUuid, gymSessionId);

        if (userScheduleOptional.isEmpty() || userScheduleOptional.get().getStatus() != UserSchedule.Status.BOOKED) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found for this user and session.");
        }

        UserSchedule userSchedule = userScheduleOptional.get();
        userSchedule.setStatus(UserSchedule.Status.CANCELLED);
        userScheduleRepository.save(userSchedule);

        gymSession.setAvailableSlots(gymSession.getAvailableSlots() + 1);
        gymSessionRepository.save(gymSession);

        return ResponseEntity.status(HttpStatus.OK).body("Gym booking canceled successfully for user: " + userUuid + ".");
    }

}
