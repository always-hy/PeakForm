package com.sustech.cs304.project.peakform.service;

import com.sustech.cs304.project.peakform.domain.Gym;
import com.sustech.cs304.project.peakform.domain.GymSession;
import com.sustech.cs304.project.peakform.domain.User;
import com.sustech.cs304.project.peakform.domain.UserSchedule;
import com.sustech.cs304.project.peakform.dto.GymDetailResponse;
import com.sustech.cs304.project.peakform.dto.GymListResponse;
import com.sustech.cs304.project.peakform.dto.GymScheduleResponse;
import com.sustech.cs304.project.peakform.repository.GymRepository;
import com.sustech.cs304.project.peakform.repository.GymSessionRepository;
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
    private final GymSessionRepository gymSessionRepository;
    private final UserRepository userRepository;
    private final UserScheduleRepository userScheduleRepository;

    private final GymSessionService gymSessionService;
    private final FirebaseStorageService firebaseStorageService;

    public ResponseEntity<List<GymListResponse>> getGyms() {
        List<Gym> gyms = gymRepository.findAll();
        List<GymListResponse> gymResponses = gyms.stream()
                .map(gym -> new GymListResponse(
                        gym.getGymId(),
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
        List<GymSession> gymSessions = gymSessionRepository.findByGym_GymId(gymId);
        List<GymScheduleResponse> gymScheduleResponses = new ArrayList<>();

        for (GymSession schedule : gymSessions) {
            UserSchedule.Status appointmentStatus = UserSchedule.Status.NOT_AVAILABLE;

            if (userOptional.isPresent()) {
                User user = userOptional.get();
                Optional<UserSchedule> userSchedule = userScheduleRepository.findByUser_UserUuidAndGymSession_GymSessionId(user.getUserUuid(), schedule.getGymSessionId());
                if (userSchedule.isEmpty()) {
                    appointmentStatus = UserSchedule.Status.UNRESERVED;
                } else {
                    appointmentStatus = userSchedule.get().getStatus();
                }
            }

            GymScheduleResponse gymScheduleResponse = new GymScheduleResponse(
                    schedule.getGymSessionId(),
                    schedule.getDate(),
                    schedule.getSessionStart(),
                    schedule.getSessionEnd(),
                    schedule.getAvailableSlots(),
                    appointmentStatus
            );
            gymScheduleResponses.add(gymScheduleResponse);
        }

        GymDetailResponse gymDetailResponse = new GymDetailResponse(
                gym.getGymId(),
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
