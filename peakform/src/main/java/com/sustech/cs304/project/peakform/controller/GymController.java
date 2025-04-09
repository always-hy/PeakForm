package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.dto.GymDetailResponse;
import com.sustech.cs304.project.peakform.dto.GymListResponse;
import com.sustech.cs304.project.peakform.service.GymService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/gyms")
public class GymController {

    private final GymService gymService;

    @GetMapping("")
    public ResponseEntity<List<GymListResponse>> getGyms() {
        return gymService.getGyms();
    }

    @GetMapping("/{gymId}")
    public ResponseEntity<GymDetailResponse> getGym(@PathVariable("gymId") Long gymId,
                                                    @RequestParam(value = "userUuid", required = false) UUID userUuid) {
        return gymService.getGym(gymId, userUuid);
    }
}
