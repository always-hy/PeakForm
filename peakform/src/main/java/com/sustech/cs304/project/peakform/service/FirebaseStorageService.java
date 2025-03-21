package com.sustech.cs304.project.peakform.service;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class FirebaseStorageService {

    public String uploadFile(MultipartFile file, String filePath) throws IOException {
        Bucket bucket = StorageClient.getInstance().bucket();
        String fileName = filePath + file.getOriginalFilename();
        Blob blob = bucket.create(fileName, file.getBytes(), file.getContentType());
        return blob.getMediaLink(); // Returns the public URL of the uploaded file
    }

    public String getFileUrl(String filePath) {
        Bucket bucket = StorageClient.getInstance().bucket();
        Blob blob = bucket.get(filePath);
        return blob.getMediaLink(); // Returns the public URL of the file
    }
}