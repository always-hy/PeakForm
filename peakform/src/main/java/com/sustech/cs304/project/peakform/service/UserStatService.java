package com.sustech.cs304.project.peakform.service;

import com.sustech.cs304.project.peakform.domain.UserStat;
import com.sustech.cs304.project.peakform.repository.UserStatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserStatService {

    @Autowired
    private UserStatRepository userStatRepository;

    // Meth  od to save user stat
    public UserStat createUserStat(UserStat userStat) {
        return userStatRepository.save(userStat);  // Save the user stat to the database
    }

    // Other methods for updating and retrieving user stats can be added here
}
