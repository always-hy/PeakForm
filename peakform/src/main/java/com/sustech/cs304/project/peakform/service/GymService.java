package com.sustech.cs304.project.peakform.service;

import com.sustech.cs304.project.peakform.domain.Gym;
import com.sustech.cs304.project.peakform.dto.GymListDetailResponse;
import com.sustech.cs304.project.peakform.repository.GymRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GymService {
    private final GymRepository gymRepository;

    public ResponseEntity<List<GymListDetailResponse>> getGyms() {
        List<Gym> gyms = gymRepository.findAll();
        List<GymListDetailResponse> gymResponses = gyms.stream()
                .map(gym -> new GymListDetailResponse(
                        gym.getGymName(),
                        gym.getStartTime(),
                        gym.getEndTime(),
                        gym.getLocation(),
                        gym.getDescription(),
                        gym.getContact()
                ))
                .toList();
        return ResponseEntity.status(HttpStatus.OK).body(gymResponses);
    }
}
