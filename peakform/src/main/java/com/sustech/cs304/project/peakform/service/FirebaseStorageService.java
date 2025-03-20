package com.sustech.cs304.project.peakform.service;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.logging.Logger;

@Service
public class FirebaseStorageService {


    private static final Logger logger = Logger.getLogger(FirebaseStorageService.class.getName());

    public String uploadFile(MultipartFile file) throws IOException {
        try {
            Bucket bucket = StorageClient.getInstance().bucket();
            logger.info("Firebase bucket initialized: " + bucket.getName());

            Blob blob = bucket.create(file.getOriginalFilename(), file.getBytes(), file.getContentType());
            logger.info("File uploaded successfully: " + blob.getMediaLink());

            return blob.getMediaLink();
        } catch (Exception e) {
            logger.severe("Error uploading file: " + e.getMessage());
            throw e;
        }
    }
}