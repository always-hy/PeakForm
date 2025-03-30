package com.sustech.cs304.project.peakform.service;

import com.sustech.cs304.project.peakform.domain.Gym;
import com.sustech.cs304.project.peakform.domain.GymSchedule;
import com.sustech.cs304.project.peakform.domain.User;
import com.sustech.cs304.project.peakform.domain.UserSchedule;
import com.sustech.cs304.project.peakform.dto.GymDetailResponse;
import com.sustech.cs304.project.peakform.dto.GymListResponse;
import com.sustech.cs304.project.peakform.dto.GymScheduleResponse;
import com.sustech.cs304.project.peakform.repository.GymRepository;
import com.sustech.cs304.project.peakform.repository.GymScheduleRepository;
import com.sustech.cs304.project.peakform.repository.UserRepository;
import com.sustech.cs304.project.peakform.repository.UserScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GymService {
    private final GymRepository gymRepository;

    private final GymScheduleService gymScheduleService;
    private final FirebaseStorageService firebaseStorageService;
    private final GymScheduleRepository gymScheduleRepository;
    private final UserRepository userRepository;
    private final UserScheduleRepository userScheduleRepository;

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

    public ResponseEntity<GymDetailResponse> getGym(Long gymId, UUID userUuid) {
        Optional<User> userOptional = Optional.empty();
        if (userUuid != null) {
            userOptional = userRepository.findById(userUuid);
            if (userOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        }

        Optional<Gym> gymOptional = gymRepository.findById(gymId);
        if (gymOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Gym gym = gymOptional.get();
        ResponseEntity<List<String>> gymPhotos = firebaseStorageService.getFiles("gym-photo/" + gymId + "/");
        List<GymSchedule> gymSchedules = gymScheduleRepository.findByGym_GymId(gymId);
        List<GymScheduleResponse> gymScheduleResponses = new ArrayList<>();

        for (GymSchedule schedule : gymSchedules) {
            UserSchedule.Status appointmentStatus = UserSchedule.Status.NOT_AVAILABLE;

            if (userOptional.isPresent()) {
                User user = userOptional.get();
                Optional<UserSchedule> userSchedule = userScheduleRepository.findByUser_UserUuidAndGymSchedule_GymScheduleId(user.getUserUuid(), schedule.getGymScheduleId());
                if (userSchedule.isEmpty()) {
                    appointmentStatus = UserSchedule.Status.UNRESERVED;
                } else {
                    appointmentStatus = userSchedule.get().getStatus();
                }
            }

            GymScheduleResponse gymScheduleResponse = new GymScheduleResponse(
                    schedule.getDate(),
                    schedule.getSessionStart(),
                    schedule.getSessionEnd(),
                    schedule.getAvailableSlots(),
                    appointmentStatus
            );
            gymScheduleResponses.add(gymScheduleResponse);
        }

        GymDetailResponse gymDetailResponse = new GymDetailResponse(
                gym.getGymName(),
                gym.getStartTime(),
                gym.getEndTime(),
                gym.getLocation(),
                gym.getDescription(),
                gym.getContact(),
                gymPhotos.getBody(),
                gymScheduleResponses
        );

        return ResponseEntity.status(HttpStatus.OK).body(gymDetailResponse);
    }
}
