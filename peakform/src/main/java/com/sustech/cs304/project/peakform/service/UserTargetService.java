package com.sustech.cs304.project.peakform.service;

import com.sustech.cs304.project.peakform.domain.UserTarget;
import com.sustech.cs304.project.peakform.dto.UserStatRequest;
import com.sustech.cs304.project.peakform.dto.UserTargetRequest;
import com.sustech.cs304.project.peakform.dto.UserTargetResponse;
import com.sustech.cs304.project.peakform.repository.UserRepository;
import com.sustech.cs304.project.peakform.repository.UserTargetRepository;
import com.sustech.cs304.project.peakform.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserTargetService {

    private final UserTargetRepository userTargetRepository;
    private final UserRepository userRepository;

    public ResponseEntity<UserTargetResponse> createUserTarget(UUID userUuid, UserTargetRequest userTargetRequest) {
        Optional<User> userOptional = userRepository.findById(userUuid);

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        User user = userOptional.get();

        UserTarget userTarget = UserTarget.builder()
                .user(user)
                .targetWeight(userTargetRequest.targetWeight())
                .targetWaterIntake(userTargetRequest.targetWaterIntake())
                .targetCaloriesBurned(userTargetRequest.targetCaloriesBurned())
                .targetWorkoutDuration(userTargetRequest.targetWorkoutDuration())
                .build();

        UserTarget savedUserTarget = userTargetRepository.save(userTarget);

        return ResponseEntity.ok(mapToResponse(savedUserTarget));
    }

    public ResponseEntity<UserTargetResponse> getUserTarget(UUID userUuid) {
        Optional<UserTarget> userTargetOptional = userTargetRepository.findByUser_UserUuid(userUuid);

        if (userTargetOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        UserTarget userTarget = userTargetOptional.get();

        return ResponseEntity.ok(mapToResponse(userTarget));
    }

    public ResponseEntity<UserTargetResponse> updateUserTarget(Long userTargetId, UserTargetRequest userTargetRequest) {
        Optional<UserTarget> userTargetOptional = userTargetRepository.findById(userTargetId);

        if (userTargetOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        UserTarget userTarget = userTargetOptional.get();

        userTarget.setTargetWeight(userTargetRequest.targetWeight());
        userTarget.setTargetWaterIntake(userTargetRequest.targetWaterIntake());
        userTarget.setTargetCaloriesBurned(userTargetRequest.targetCaloriesBurned());
        userTarget.setTargetWorkoutDuration(userTargetRequest.targetWorkoutDuration());

        UserTarget updatedUserTarget = userTargetRepository.save(userTarget);

        return ResponseEntity.ok(mapToResponse(updatedUserTarget));
    }

    public void deleteUserTarget(Long userTargetId) {
        userTargetRepository.deleteById(userTargetId);
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
