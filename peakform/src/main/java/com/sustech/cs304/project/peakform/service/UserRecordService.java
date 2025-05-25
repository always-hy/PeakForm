package com.sustech.cs304.project.peakform.service;

import com.sustech.cs304.project.peakform.domain.UserRecord;
import com.sustech.cs304.project.peakform.dto.UserRecordResponse;
import com.sustech.cs304.project.peakform.repository.UserRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserRecordService {

    private final UserRecordRepository userRecordRepository;

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
}