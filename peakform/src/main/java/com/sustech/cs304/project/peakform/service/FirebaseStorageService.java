package com.sustech.cs304.project.peakform.service;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.StorageException;
import com.google.firebase.cloud.StorageClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Paths;

@Service
public class FirebaseStorageService {

    public ResponseEntity<String> uploadFile(MultipartFile file, String filePath) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.status(400).body("File is empty.");
            }
            String fileName = Paths.get(filePath, file.getOriginalFilename()).toString();
            Bucket bucket = StorageClient.getInstance().bucket();
            Blob blob = bucket.create(fileName, file.getBytes(), file.getContentType());
            return ResponseEntity.status(200).body(blob.getMediaLink());
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload file: " + e.getMessage());
        } catch (StorageException e) {
            return ResponseEntity.status(500).body("Firebase Storage error: " + e.getMessage());
        }
    }

    public ResponseEntity<String> getFileUrl(String filePath) {
        try {
            Bucket bucket = StorageClient.getInstance().bucket();
            Blob blob = bucket.get(filePath);
            if (blob == null) {
                return ResponseEntity.status(404).body("File not found.");
            }
            return ResponseEntity.status(200).body(blob.getMediaLink());
        } catch (StorageException e) {
            return ResponseEntity.status(500).body("Firebase Storage error: " + e.getMessage());
        }
    }
}