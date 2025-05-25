package com.sustech.cs304.project.peakform.service;

import com.sustech.cs304.project.peakform.domain.Social;
import com.sustech.cs304.project.peakform.domain.User;
import com.sustech.cs304.project.peakform.dto.BasicUserDetailResponse;
import com.sustech.cs304.project.peakform.dto.SocialProfileResponse;
import com.sustech.cs304.project.peakform.dto.UserAchievementResponse;
import com.sustech.cs304.project.peakform.dto.UserProfileResponse;
import com.sustech.cs304.project.peakform.repository.SocialRepository;
import com.sustech.cs304.project.peakform.repository.UserAchievementRepository;
import com.sustech.cs304.project.peakform.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SocialService {

    private final SocialRepository socialRepository;
    private final UserRepository userRepository;
    private final UserAchievementRepository userAchievementRepository;

    private final FirebaseStorageService firebaseStorageService;

    private final CacheManager cacheManager;

    @Cacheable(value = "social", key = "#userUuid + '-followers'")
    public List<BasicUserDetailResponse> getFollowers(UUID userUuid) {
        List<Social> followers = socialRepository.findByFollowing_UserUuid(userUuid);

        return followers.stream()
                .map(Social::getFollower)
                .map(user -> new BasicUserDetailResponse(
                        user.getRealUsername(),
                        user.getEmail(),
                        firebaseStorageService.getFileUrl("user-profile/" + user.getUserUuid() + ".jpg").getBody()
                ))
                .collect(Collectors.toList());
    }

    @Cacheable(value = "social", key = "#userUuid + '-followings'")
    public List<BasicUserDetailResponse> getFollowings(UUID userUuid) {
        List<Social> followings = socialRepository.findByFollower_UserUuid(userUuid);

        return followings.stream()
                .map(Social::getFollowing)
                .map(user -> new BasicUserDetailResponse(
                        user.getRealUsername(),
                        user.getEmail(),
                        firebaseStorageService.getFileUrl("user-profile/" + user.getUserUuid() + ".jpg").getBody()
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public ResponseEntity<String> followUser(UUID followerUuid, String followingEmail) {
        Optional<User> followerOptional = userRepository.findByUserUuid(followerUuid);
        Optional<User> followingOptional = userRepository.findByEmail(followingEmail);

        if (followerOptional.isEmpty() || followingOptional.isEmpty()) {
            return ResponseEntity.status(404).body("User not found.");
        }

        User follower = followerOptional.get();
        User following = followingOptional.get();

        if (follower.equals(following)) {
            return ResponseEntity.badRequest().body("You cannot follow yourself.");
        }

        if (socialRepository.existsByFollowerAndFollowing(follower, following)) {
            return ResponseEntity.badRequest().body("You are already following this user.");
        }

        Social follow = Social.builder()
                .follower(follower)
                .following(following)
                .createdAt(LocalDateTime.now())
                .build();

        socialRepository.save(follow);

        String followerKey = follower.getUserUuid() + "-followings";
        String followingKey = following.getUserUuid() + "-followers";

        cacheManager.getCache("social").evict(followerKey);
        cacheManager.getCache("social").evict(followingKey);

        return ResponseEntity.ok("Successfully followed the user.");
    }

    @Transactional
    public ResponseEntity<String> unfollowUser(UUID followerUuid, String followingEmail) {
        Optional<User> followerOptional = userRepository.findById(followerUuid);
        Optional<User> followingOptional = userRepository.findByEmail(followingEmail);

        if (followerOptional.isEmpty() || followingOptional.isEmpty()) {
            return ResponseEntity.status(404).body("User not found.");
        }

        User follower = followerOptional.get();
        User following = followingOptional.get();

        if (!socialRepository.existsByFollowerAndFollowing(follower, following)) {
            return ResponseEntity.badRequest().body("Not following this user.");
        }

        socialRepository.deleteByFollowerAndFollowing(follower, following);

        String followerKey = follower.getUserUuid() + "-followings";
        String followingKey = following.getUserUuid() + "-followers";

        cacheManager.getCache("social").evict(followerKey);
        cacheManager.getCache("social").evict(followingKey);

        return ResponseEntity.ok("Unfollowed successfully.");
    }

    public SocialProfileResponse getSocialProfile(UUID user1Uuid, String user2Email) {
        User user1 = userRepository.findByUserUuid(user1Uuid)
                .orElseThrow(() -> new IllegalArgumentException("Original user not found"));

        User user2 = userRepository.findByEmail(user2Email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        UserProfileResponse userProfileResponse = new UserProfileResponse(
                user2.getRealUsername(),
                user2.getEmail(),
                user2.getGender(),
                user2.getAge(),
                user2.getBio(),
                firebaseStorageService.getFileUrl("user-profile/" + user2.getUserUuid() + ".jpg").getBody(),
                socialRepository.countByFollower_UserUuid(user2.getUserUuid()),
                socialRepository.countByFollowing_UserUuid(user2.getUserUuid()),
                socialRepository.existsByFollowerAndFollowing(user1, user2)
        );

        List<UserAchievementResponse> achievements = userAchievementRepository.findByUser_UserUuid(user2.getUserUuid())
                .stream()
                .map(ua -> new UserAchievementResponse(
                        ua.getAchievement().getAchievementName(),
                        ua.getAchievedAt()
                ))
                .toList();

        return new SocialProfileResponse(userProfileResponse, achievements);
    }
}
