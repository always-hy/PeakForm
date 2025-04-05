package com.sustech.cs304.project.peakform.repository;

import com.sustech.cs304.project.peakform.domain.UserTarget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserTargetRepository extends JpaRepository<UserTarget, Long> {
    Optional<UserTarget> findByUser_UserUuid(UUID userUuid);
}
