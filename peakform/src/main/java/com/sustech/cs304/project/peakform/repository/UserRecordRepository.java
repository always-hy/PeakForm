package com.sustech.cs304.project.peakform.repository;

import com.sustech.cs304.project.peakform.domain.UserRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRecordRepository extends JpaRepository<UserRecord, Long> {

    Optional<UserRecord> findByUser_UserUuid(UUID userUuid);
}
