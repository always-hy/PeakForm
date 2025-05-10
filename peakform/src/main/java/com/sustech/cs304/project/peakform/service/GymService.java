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
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

    private final FirebaseStorageService firebaseStorageService;

    @Cacheable(value = "gyms", key = "'all'")
    public List<GymListResponse> getGyms() {
        List<Gym> gyms = gymRepository.findAll();
        return gyms.stream()
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
    }

    @Cacheable(value = "gyms", key = "#gymId + '-' + #userUuid")
    public GymDetailResponse getGym(Long gymId, UUID userUuid) {
        Gym gym = gymRepository.findById(gymId).orElseThrow();
        User user = userRepository.findById(userUuid).orElseThrow();

        ResponseEntity<List<String>> gymPhotos = firebaseStorageService.getFiles("gym-photo/" + gymId + "/");
        List<GymSession> gymSessions = gymSessionRepository.findByGym_GymIdAndDateIn(
                gymId,
                List.of(LocalDate.now(), LocalDate.now().plusDays(1))
        );
        List<GymScheduleResponse> gymScheduleResponses = new ArrayList<>();

        for (GymSession schedule : gymSessions) {
            UserSchedule.AppointmentStatus appointmentStatus = null;

            Optional<UserSchedule> userSchedule = userScheduleRepository.findByUser_UserUuidAndGymSession_GymSessionId(user.getUserUuid(), schedule.getGymSessionId());
            if (userSchedule.isEmpty()) {
                appointmentStatus = UserSchedule.AppointmentStatus.UNRESERVED;
            } else {
                appointmentStatus = userSchedule.get().getAppointmentStatus();
            }

            LocalDateTime sessionStartDateTime = LocalDateTime.of(schedule.getDate(), schedule.getSessionStart());

            if (LocalDateTime.now().isBefore(sessionStartDateTime)) {
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
        }

        return new GymDetailResponse(
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
    }
}
