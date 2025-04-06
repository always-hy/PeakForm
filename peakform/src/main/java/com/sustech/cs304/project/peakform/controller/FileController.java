package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.service.FirebaseStorageService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Transactional
@RequiredArgsConstructor
@RestController
@RequestMapping("/files")
public class FileController {
    private final FirebaseStorageService firebaseStorageService;

    /**
     * AI-generated-content
     * tool: DeepSeek
     * version: latest
     * usage: I asked the tool to guide me on how to implement a get and post method for user profile picture.
     * I learned from it and completed the get and post methods for gym photo and exercise video.
     */
    @PostMapping("/upload/user-profile")
    public ResponseEntity<String> uploadUserProfilePicture(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") String userId) {
        return firebaseStorageService.uploadFile(file, "user-profile/" + userId + ".jpg");
    }

    @PostMapping("/upload/gym-photo")
    public ResponseEntity<String> uploadGymPhoto(
            @RequestParam("file") MultipartFile file,
            @RequestParam("gymId") String gymId,
            @RequestParam("photoId") String photoId) {
        return firebaseStorageService.uploadFile(file, "gym-photo/" + gymId + "/" + photoId + ".jpg");
    }

    @PostMapping("/upload/exercise-video")
    public ResponseEntity<String> uploadExerciseVideo(
            @RequestParam("file") MultipartFile file,
            @RequestParam("exerciseId") String exerciseId) {
        return firebaseStorageService.uploadFile(file, "exercise-video/" + exerciseId + ".mp4");
    }

    @GetMapping("/user-profile")
    public ResponseEntity<String> getUserProfilePictureUrl(@RequestParam("userId") String userId) {
        return firebaseStorageService.getFileUrl("user-profile/" + userId + ".jpg");
    }

    @GetMapping("/gym-photo")
    public ResponseEntity<String> getGymPhotoUrl(
            @RequestParam("gymId") String gymId,
            @RequestParam("photoId") String photoId) {
        return firebaseStorageService.getFileUrl("gym-photo/" + gymId + "/" + photoId + ".jpg");
    }

    @GetMapping("/exercise-video")
    public ResponseEntity<String> getExerciseVideoUrl(@RequestParam("exerciseId") String exerciseId) {
        return firebaseStorageService.getFileUrl("exercise-video/" + exerciseId + ".mp4");
    }
}