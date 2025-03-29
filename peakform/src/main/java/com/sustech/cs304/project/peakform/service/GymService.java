package com.sustech.cs304.project.peakform.service;

import com.sustech.cs304.project.peakform.domain.Gym;
import com.sustech.cs304.project.peakform.domain.GymSchedule;
import com.sustech.cs304.project.peakform.dto.GymDetailResponse;
import com.sustech.cs304.project.peakform.dto.GymListResponse;
import com.sustech.cs304.project.peakform.dto.GymScheduleResponse;
import com.sustech.cs304.project.peakform.repository.GymRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GymService {
    private final GymRepository gymRepository;

    private final GymScheduleService gymScheduleService;
    private final FirebaseStorageService firebaseStorageService;

    public ResponseEntity<List<GymListResponse>> getGyms() {
        List<Gym> gyms = gymRepository.findAll();
        List<GymListResponse> gymResponses = gyms.stream()
                .map(gym -> new GymListResponse(
                        gym.getGymName(),
                        gym.getStartTime(),
                        gym.getEndTime(),
                        gym.getLocation(),
                        gym.getDescription(),
                        gym.getContact(),
                        firebaseStorageService.getFiles("gym-photo/" + gym.getGymId() + "/").getBody().get(0)
                ))
                .toList();
        return ResponseEntity.status(HttpStatus.OK).body(gymResponses);
    }

    public ResponseEntity<GymDetailResponse> getGym(Long gymId) {
        Optional<Gym> gymOptional = gymRepository.findById(gymId);
        if (gymOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Gym gym = gymOptional.get();


        ResponseEntity<List<String>> gymPhotos = firebaseStorageService.getFiles("gym-photo/" + gymId + "/");

        List<GymSchedule> gymSchedules = gymScheduleService.generateGymSchedules(gymId);
        List<GymScheduleResponse> gymScheduleResponses = gymSchedules.stream()
                .map(schedule -> new GymScheduleResponse(
                        schedule.getDate(),
                        schedule.getSessionStart(),
                        schedule.getSessionEnd(),
                        schedule.getAvailableSlots(),
                        schedule.getStatus()
                ))
                .toList();

        GymDetailResponse response = new GymDetailResponse(
                gym.getGymName(),
                gym.getStartTime(),
                gym.getEndTime(),
                gym.getLocation(),
                gym.getDescription(),
                gym.getContact(),
                gymPhotos.getBody(),
                gymScheduleResponses
        );

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
