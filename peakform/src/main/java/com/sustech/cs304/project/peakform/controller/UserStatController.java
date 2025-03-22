package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.domain.UserStat;
import com.sustech.cs304.project.peakform.service.UserStatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user-stats")
public class UserStatController {

    @Autowired
    private UserStatService userStatService;  // Inject the service that will handle saving data

    // POST - Add new user stat (for daily metrics like weight, calories, etc.)
    @PostMapping
    public ResponseEntity<UserStat> createUserStat(@RequestBody UserStat userStat) {
        // Save the user stats using the service
        UserStat savedStat = userStatService.createUserStat(userStat);

        // Return the saved stat as a response with a 201 Created status
        return ResponseEntity.status(HttpStatus.CREATED).body(savedStat);
    }
}
