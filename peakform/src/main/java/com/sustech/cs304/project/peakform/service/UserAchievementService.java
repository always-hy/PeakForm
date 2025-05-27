package com.sustech.cs304.project.peakform.service;

import com.sustech.cs304.project.peakform.domain.User;
import com.sustech.cs304.project.peakform.domain.UserAchievement;
import com.sustech.cs304.project.peakform.dto.UserAchievementResponse;
import com.sustech.cs304.project.peakform.repository.UserAchievementRepository;
import com.sustech.cs304.project.peakform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserAchievementService {

    private final UserRepository userRepository;
    private final UserAchievementRepository userAchievementRepository;

    public ResponseEntity<List<UserAchievementResponse>> getUserAchievements(UUID userUuid) {
        Optional<User> userOptional = userRepository.findById(userUuid);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        List<UserAchievement> userAchievements = userAchievementRepository.findByUser_UserUuid(userUuid);
        List<UserAchievementResponse> userAchievementResponses = userAchievements.stream()
                .map(ua -> new UserAchievementResponse(
                        ua.getAchievement().getAchievementName(),
                        ua.getAchievedAt()
                ))
                .toList();

        return ResponseEntity.status(HttpStatus.OK).body(userAchievementResponses);
    }
}
