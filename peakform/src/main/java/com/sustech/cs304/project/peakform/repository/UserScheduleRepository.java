package com.sustech.cs304.project.peakform.repository;

import com.sustech.cs304.project.peakform.domain.UserSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserScheduleRepository extends JpaRepository<UserSchedule, Long> {
    Optional<UserSchedule> findByUser_UserUuidAndGymSession_GymSessionId(UUID user_userUuid, Long gymSession_gymSessionId);

    Long countByUser_UserUuid(UUID userUuid);

    Long countByUser_UserUuidAndAppointmentStatus(UUID userUuid, UserSchedule.AppointmentStatus appointmentStatus);
}

