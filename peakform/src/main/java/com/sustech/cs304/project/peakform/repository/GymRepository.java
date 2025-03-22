package com.sustech.cs304.project.peakform.repository;

import com.sustech.cs304.project.peakform.domain.Gym;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GymRepository extends JpaRepository<Gym, Long> {
}
