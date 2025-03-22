package com.sustech.cs304.project.peakform.repository;

import com.sustech.cs304.project.peakform.domain.UserRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRecordRepository extends JpaRepository<UserRecord, Long> {
}
