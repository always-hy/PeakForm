package com.sustech.cs304.project.peakform.service;

import com.google.api.gax.paging.Page;
import com.google.cloud.storage.*;
import com.google.firebase.cloud.StorageClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.TimeUnit;

@RequiredArgsConstructor
@Service
public class FirebaseStorageService {
    public ResponseEntity<String> uploadFile(MultipartFile file, String filePath) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File is empty.");
            }

            String fileName = filePath.endsWith("/") ? filePath + file.getOriginalFilename() : filePath + "/" + file.getOriginalFilename();

            Bucket bucket = StorageClient.getInstance().bucket();
            Blob blob = bucket.create(fileName, file.getBytes(), file.getContentType());

            blob.createAcl(Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER));

            return ResponseEntity.status(HttpStatus.OK).body(blob.getMediaLink());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to upload file: " + e.getMessage());
        } catch (StorageException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Firebase Storage error: " + e.getMessage());
        }
    }

    public ResponseEntity<String> getFileUrl(String filePath) {
        try {
            Bucket bucket = StorageClient.getInstance().bucket();
            Blob blob = bucket.get(filePath);

            if (blob == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("File not found.");
            }

            String signedUrl = blob.signUrl(7, TimeUnit.DAYS).toString();

            return ResponseEntity.status(HttpStatus.OK).body(signedUrl);
        } catch (StorageException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Firebase Storage error: " + e.getMessage());
        }
    }

    public ResponseEntity<List<String>> listFiles(String folderPath) {
        try {
            Bucket bucket = StorageClient.getInstance().bucket();
            Page<Blob> blobs = bucket.list(Storage.BlobListOption.prefix(folderPath));

            List<String> fileUrls = new ArrayList<>();
            boolean isFirst = true;

            for (Blob blob : blobs.iterateAll()) {
                if (isFirst) {
                    isFirst = false;
                    continue;
                }
                String signedUrl = blob.signUrl(7, TimeUnit.DAYS).toString();
                fileUrls.add(signedUrl);
            }
            
            return ResponseEntity.status(HttpStatus.OK).body(fileUrls);
        } catch (StorageException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonList("Firebase Storage error: " + e.getMessage()));
        }
    }
}