package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.service.FirebaseStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/files")
public class FileController {
    private final FirebaseStorageService firebaseStorageService;

    @PostMapping("/upload/user-profile")
    public ResponseEntity<String> uploadUserProfilePicture(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") String userId) {
        return firebaseStorageService.uploadFile(file, "user-profile/" + userId + "/profile.jpg");
    }

    @PostMapping("/upload/gym-photo")
    public ResponseEntity<String> uploadGymPhoto(
            @RequestParam("file") MultipartFile file,
            @RequestParam("gymId") String gymId) {
        return firebaseStorageService.uploadFile(file, "gym-photo/" + gymId + "/photo.jpg");
    }

    @PostMapping("/upload/exercise-video")
    public ResponseEntity<String> uploadExerciseVideo(
            @RequestParam("file") MultipartFile file,
            @RequestParam("exerciseId") String exerciseId) {
        return firebaseStorageService.uploadFile(file, "exercise-video/" + exerciseId + "/video.mp4");
    }

    @GetMapping("/user-profile")
    public ResponseEntity<String> getUserProfilePictureUrl(@RequestParam("userId") String userId) {
        return firebaseStorageService.getFileUrl("user-profile/" + userId + "/profile.jpg");
    }

    @GetMapping("/gym-photo")
    public ResponseEntity<String> getGymPhotoUrl(@RequestParam("gymId") String gymId) {
        return firebaseStorageService.getFileUrl("gym-photo/" + gymId + "/photo.jpg");
    }

    @GetMapping("/exercise-video")
    public ResponseEntity<String> getExerciseVideoUrl(@RequestParam("exerciseId") String exerciseId) {
        return firebaseStorageService.getFileUrl("exercise-video/" + exerciseId + "/video.mp4");
    }
}