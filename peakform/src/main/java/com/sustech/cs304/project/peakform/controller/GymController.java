package com.sustech.cs304.project.peakform.controller;

import com.sustech.cs304.project.peakform.dto.GymListDetailResponse;
import com.sustech.cs304.project.peakform.service.GymService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/gyms")
public class GymController {
    private final GymService gymService;

    @GetMapping("")
    public ResponseEntity<List<GymListDetailResponse>> getGyms() {
        return gymService.getGyms();
    }
}
