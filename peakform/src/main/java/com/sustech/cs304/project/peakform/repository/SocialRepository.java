package com.sustech.cs304.project.peakform.repository;

import com.sustech.cs304.project.peakform.domain.Social;
import com.sustech.cs304.project.peakform.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface SocialRepository extends JpaRepository<Social, Long> {

    List<Social> findByFollower_UserUuid(UUID userUuid);

    List<Social> findByFollowing_UserUuid(UUID userUuid);

    Integer countByFollowing_UserUuid(UUID userUuid);

    Integer countByFollower_UserUuid(UUID userUuid);

    Boolean existsByFollowerAndFollowing(User follower, User following);

    void deleteByFollowerAndFollowing(User follower, User following);
}
