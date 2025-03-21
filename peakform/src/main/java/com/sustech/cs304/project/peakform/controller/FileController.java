package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.service.FirebaseStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/files")
public class FileController {
    private final FirebaseStorageService firebaseStorageService;

    @PostMapping("/upload/user-profile")
    public String uploadUserProfilePicture(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") String userId) throws IOException {
        return firebaseStorageService.uploadFile(file, "user-profile/" + userId + "/profile.jpg");
        // Profile name hardcoded as profile.jpg to ensure consistency, same logic applies to gym photo and exercise video
    }

    @PostMapping("/upload/gym-photo")
    public String uploadGymPhoto(
            @RequestParam("file") MultipartFile file,
            @RequestParam("gymId") String gymId) throws IOException {
        return firebaseStorageService.uploadFile(file, "gym-photo/" + gymId + "/photo.jpg");
    }

    @PostMapping("/upload/exercise-video")
    public String uploadExerciseVideo(
            @RequestParam("file") MultipartFile file,
            @RequestParam("exerciseId") String exerciseId) throws IOException {
        return firebaseStorageService.uploadFile(file, "exercise-video/" + exerciseId + "/video.mp4");
    }

    @GetMapping("/user-profile")
    public String getUserProfilePictureUrl(@RequestParam("userId") String userId) {
        return firebaseStorageService.getFileUrl("user-profile/" + userId + "/profile.jpg");
    }

    @GetMapping("/gym-photo")
    public String getGymPhotoUrl(@RequestParam("gymId") String gymId) {
        return firebaseStorageService.getFileUrl("gym-photo/" + gymId + "/photo.jpg");
    }

    @GetMapping("/exercise-video")
    public String getExerciseVideoUrl(@RequestParam("exerciseId") String exerciseId) {
        return firebaseStorageService.getFileUrl("exercise-video/" + exerciseId + "/video.mp4");
    }
}