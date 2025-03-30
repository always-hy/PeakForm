package com.sustech.cs304.project.peakform.service;

import com.sustech.cs304.project.peakform.domain.Gym;
import com.sustech.cs304.project.peakform.domain.GymSchedule;
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
public class GymScheduleService {
    private final GymRepository gymRepository;

    public List<GymSchedule> generateGymSchedules(Long gymId) {
        Optional<Gym> gymOptional = gymRepository.findById(gymId);
        if (gymOptional.isEmpty()) {
            throw new IllegalArgumentException("Gym with ID " + gymId + " not found");
        }

        Gym gym = gymOptional.get();
        LocalTime currentStartTime = gym.getStartTime();
        LocalTime endTime = gym.getEndTime();
        int intervalMinutes = (int) (gym.getSessionInterval() * 60);
        LocalDate today = LocalDate.now();

        List<GymSchedule> gymSchedules = new ArrayList<>();

        while (currentStartTime.isBefore(endTime)) {
            LocalTime sessionEndTime = currentStartTime.plusMinutes(intervalMinutes);
            if (sessionEndTime.isAfter(endTime)) {
                sessionEndTime = endTime;
            }

            GymSchedule gymSchedule = GymSchedule.builder()
                    .gym(gym)
                    .date(today)
                    .sessionStart(currentStartTime)
                    .sessionEnd(sessionEndTime)
                    .availableSlots(gym.getSessionMaxCapacity())
                    .build();

            gymSchedules.add(gymSchedule);
            currentStartTime = sessionEndTime;
        }

        return gymSchedules;
    }
}
