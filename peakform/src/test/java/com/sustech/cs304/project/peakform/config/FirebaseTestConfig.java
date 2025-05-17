package com.sustech.cs304.project.peakform.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

@Profile("test")
@Configuration
public class FirebaseTestConfig {

    @Bean
    public FirebaseApp firebaseApp() throws IOException {
        List<FirebaseApp> firebaseApps = FirebaseApp.getApps();
        if (firebaseApps.stream().noneMatch(app -> app.getName().equals(FirebaseApp.DEFAULT_APP_NAME))) {
            FileInputStream serviceAccount = new FileInputStream("serviceAccountKey.json");

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setStorageBucket("peakform-3d589.firebasestorage.app")
                    .build();

            return FirebaseApp.initializeApp(options);
        }
        return FirebaseApp.getInstance(FirebaseApp.DEFAULT_APP_NAME);
    }
}