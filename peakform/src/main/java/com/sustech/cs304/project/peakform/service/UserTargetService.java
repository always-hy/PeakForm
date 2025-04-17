package com.sustech.cs304.project.peakform.service;

import com.sustech.cs304.project.peakform.domain.UserTarget;
import com.sustech.cs304.project.peakform.dto.UserTargetRequest;
import com.sustech.cs304.project.peakform.dto.UserTargetResponse;
import com.sustech.cs304.project.peakform.repository.UserTargetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class UserTargetService {

    private final UserTargetRepository userTargetRepository;

    public ResponseEntity<UserTargetResponse> getUserTarget(UUID userUuid) {
        Optional<UserTarget> userTargetOptional = userTargetRepository.findByUser_UserUuid(userUuid);

        if (userTargetOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        UserTarget userTarget = userTargetOptional.get();

        return ResponseEntity.ok(mapToResponse(userTarget));
    }

    public ResponseEntity<String> updateUserTarget(UUID userUuid, UserTargetRequest userTargetRequest) {
        Optional<UserTarget> userTargetOptional = userTargetRepository.findByUser_UserUuid(userUuid);

        if (userTargetOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User target not found.");
        }

        UserTarget userTarget = userTargetOptional.get();

        userTarget.setTargetWeight(userTargetRequest.targetWeight());
        userTarget.setTargetWaterIntake(userTargetRequest.targetWaterIntake());
        userTarget.setTargetCaloriesBurned(userTargetRequest.targetCaloriesBurned());
        userTarget.setTargetWorkoutDuration(userTargetRequest.targetWorkoutDuration());

        userTargetRepository.save(userTarget);

        return ResponseEntity.status(HttpStatus.OK).body("User target updated successfully.");
    }

    private UserTargetResponse mapToResponse(UserTarget userTarget) {
        return new UserTargetResponse(
                userTarget.getUser().getUserUuid(),
                userTarget.getUserTargetId(),
                userTarget.getTargetWeight(),
                userTarget.getTargetWaterIntake(),
                userTarget.getTargetCaloriesBurned(),
                userTarget.getTargetWorkoutDuration()
        );
    }
}
