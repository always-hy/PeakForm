package com.sustech.cs304.project.peakform.repository;

import com.sustech.cs304.project.peakform.domain.Social;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface SocialRepository extends JpaRepository<Social, Long> {
    List<Social> findByFollower_UserUuid(UUID userUuid);

    List<Social> findByFollowing_UserUuid(UUID userUuid);
}
