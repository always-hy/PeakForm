package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.service.FirebaseStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/files")
public class FileController {

    @Autowired
    private FirebaseStorageService firebaseStorageService;

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        return firebaseStorageService.uploadFile(file);
    }
}