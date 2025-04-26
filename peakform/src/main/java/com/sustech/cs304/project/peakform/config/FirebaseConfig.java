package com.sustech.cs304.project.peakform.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.util.List;

@Configuration
public class FirebaseConfig {

    @Bean
    public FirebaseApp firebaseApp() throws IOException {
        List<FirebaseApp> firebaseApps = FirebaseApp.getApps();
        if (firebaseApps.stream().noneMatch(app -> app.getName().equals(FirebaseApp.DEFAULT_APP_NAME))) {
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.getApplicationDefault())
                    .setStorageBucket("peakform-3d589.firebasestorage.app")
                    .build();

            return FirebaseApp.initializeApp(options);
        }
        return FirebaseApp.getInstance(FirebaseApp.DEFAULT_APP_NAME);
    }
}