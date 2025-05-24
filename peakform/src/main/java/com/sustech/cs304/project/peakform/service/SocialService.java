package com.sustech.cs304.project.peakform.service;

import com.sustech.cs304.project.peakform.domain.Social;
import com.sustech.cs304.project.peakform.dto.BasicUserDetailResponse;
import com.sustech.cs304.project.peakform.repository.SocialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SocialService {

    private final SocialRepository socialRepository;
    private final FirebaseStorageService firebaseStorageService;

    @Cacheable(value = "social", key = "#userUuid + '-followers'")
    public List<BasicUserDetailResponse> getFollowers(UUID userUuid) {
        List<Social> socialList = socialRepository.findByFollowing_UserUuid(userUuid);

        return socialList.stream()
                .map(Social::getFollower)
                .map(user -> {
                    String profilePictureUrl = firebaseStorageService
                            .getFileUrl("user-profile/" + user.getUserUuid() + ".jpg")
                            .getBody();

                    return new BasicUserDetailResponse(
                            user.getRealUsername(),
                            user.getEmail(),
                            profilePictureUrl
                    );
                })
                .collect(Collectors.toList());
    }
}
