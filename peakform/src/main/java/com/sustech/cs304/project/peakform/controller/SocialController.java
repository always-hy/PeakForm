package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.dto.BasicUserDetailResponse;
import com.sustech.cs304.project.peakform.repository.UserRepository;
import com.sustech.cs304.project.peakform.service.SocialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/social")
public class SocialController {

    private final SocialService socialService;
    private final UserRepository userRepository;

    @GetMapping("/followers")
    public ResponseEntity<List<BasicUserDetailResponse>> getFollowers(@RequestParam UUID userUuid) {
        if (!userRepository.existsById(userUuid)) {
            return ResponseEntity.notFound().build();
        }

        List<BasicUserDetailResponse> followers = socialService.getFollowers(userUuid);
        return ResponseEntity.ok(followers);
    }

    @GetMapping("/followings")
    public ResponseEntity<List<BasicUserDetailResponse>> getFollowings(@RequestParam UUID userUuid) {
        if (!userRepository.existsById(userUuid)) {
            return ResponseEntity.notFound().build();
        }

        List<BasicUserDetailResponse> followings = socialService.getFollowings(userUuid);
        return ResponseEntity.ok(followings);
    }
}
