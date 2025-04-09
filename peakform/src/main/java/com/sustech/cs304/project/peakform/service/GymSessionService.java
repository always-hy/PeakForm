package com.sustech.cs304.project.peakform.service;

import com.sustech.cs304.project.peakform.domain.Gym;
import com.sustech.cs304.project.peakform.domain.GymSession;
import com.sustech.cs304.project.peakform.repository.GymRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GymSessionService {

    private final GymRepository gymRepository;

    public List<GymSession> generateGymSessions(Long gymId, LocalDate date) {
        Optional<Gym> gymOptional = gymRepository.findById(gymId);
        if (gymOptional.isEmpty()) {
            throw new IllegalArgumentException("Gym with ID " + gymId + " not found");
        }

        Gym gym = gymOptional.get();
        LocalTime currentStartTime = gym.getStartTime();
        LocalTime endTime = gym.getEndTime();
        int intervalMinutes = (int) (gym.getSessionInterval() * 60);

        List<GymSession> gymSessions = new ArrayList<>();

        while (currentStartTime.isBefore(endTime)) {
            LocalTime sessionEndTime = currentStartTime.plusMinutes(intervalMinutes);
            if (sessionEndTime.isAfter(endTime)) {
                sessionEndTime = endTime;
            }

            GymSession gymSession = GymSession.builder()
                    .gym(gym)
                    .date(date)
                    .sessionStart(currentStartTime)
                    .sessionEnd(sessionEndTime)
                    .availableSlots(gym.getSessionMaxCapacity())
                    .build();

            gymSessions.add(gymSession);
            currentStartTime = sessionEndTime;
        }

        return gymSessions;
    }
}
