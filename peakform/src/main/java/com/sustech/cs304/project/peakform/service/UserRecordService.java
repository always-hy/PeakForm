package com.sustech.cs304.project.peakform.service;

import com.sustech.cs304.project.peakform.domain.UserRecord;
import com.sustech.cs304.project.peakform.dto.*;
import com.sustech.cs304.project.peakform.repository.UserRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserRecordService {

    private final UserRecordRepository userRecordRepository;

    private final FirebaseStorageService firebaseStorageService;

    public UserRecordResponse getUserRecord(UUID userUuid) {
        Optional<UserRecord> userRecord = userRecordRepository.findByUser_UserUuid(userUuid);
        return userRecord.map(record -> new UserRecordResponse(
                userUuid.toString(),
                record.getWorkoutStreak(),
                record.getWaterIntakeStreak(),
                record.getBenchPressPr(),
                record.getSquatPr(),
                record.getDeadliftPr()
        )).orElse(null);
    }

    public ResponseEntity<String> updateUserRecord(UUID userUuid, UserRecordUpdateRequest userRecordUpdateRequest) {
        Optional<UserRecord> userRecordOptional = userRecordRepository.findByUser_UserUuid(userUuid);

        if (userRecordOptional.isEmpty()) {
            return ResponseEntity.status(404).body("User record not found for UUID: " + userUuid);
        }

        UserRecord userRecord = userRecordOptional.get();
        
        if (userRecordUpdateRequest.benchPressPr() != null) {
            userRecord.setBenchPressPr(userRecordUpdateRequest.benchPressPr());
        }
        if (userRecordUpdateRequest.squatPr() != null) {
            userRecord.setSquatPr(userRecordUpdateRequest.squatPr());
        }
        if (userRecordUpdateRequest.deadliftPr() != null) {
            userRecord.setDeadliftPr(userRecordUpdateRequest.deadliftPr());
        }

        userRecordRepository.save(userRecord);
        return ResponseEntity.ok("User record updated successfully");
    }

    public TopRecordResponse getTopRecords(int limit) {
        List<UserRecord> userRecords = userRecordRepository.findAll();

        List<TopBenchPressRecordResponse> topBenchPressUsers = userRecords.stream()
                .filter(record -> record.getBenchPressPr() != null && record.getBenchPressPr() > 0)
                .sorted(Comparator.comparing(UserRecord::getBenchPressPr, Comparator.reverseOrder()))
                .limit(limit)
                .map(record -> new TopBenchPressRecordResponse(
                        record.getUser().getUserUuid().toString(),
                        record.getUser().getUsername(),
                        firebaseStorageService.getFileUrl("user-profile/" + record.getUser().getUserUuid() + ".jpg").getBody(),
                        record.getBenchPressPr()
                ))
                .collect(Collectors.toList());

        List<TopSquatRecordResponse> topSquatUsers = userRecords.stream()
                .filter(record -> record.getSquatPr() != null && record.getSquatPr() > 0)
                .sorted(Comparator.comparing(UserRecord::getSquatPr, Comparator.reverseOrder()))
                .limit(limit)
                .map(record -> new TopSquatRecordResponse(
                        record.getUser().getUserUuid().toString(),
                        record.getUser().getUsername(),
                        firebaseStorageService.getFileUrl("user-profile/" + record.getUser().getUserUuid() + ".jpg").getBody(),
                        record.getSquatPr()
                ))
                .collect(Collectors.toList());

        List<TopDeadliftRecordResponse> topDeadliftUsers = userRecords.stream()
                .filter(record -> record.getDeadliftPr() != null && record.getDeadliftPr() > 0)
                .sorted(Comparator.comparing(UserRecord::getDeadliftPr, Comparator.reverseOrder()))
                .limit(limit)
                .map(record -> new TopDeadliftRecordResponse(
                        record.getUser().getUserUuid().toString(),
                        record.getUser().getUsername(),
                        firebaseStorageService.getFileUrl("user-profile/" + record.getUser().getUserUuid() + ".jpg").getBody(),
                        record.getDeadliftPr()
                ))
                .collect(Collectors.toList());

        return new TopRecordResponse(topBenchPressUsers, topSquatUsers, topDeadliftUsers);
    }
}