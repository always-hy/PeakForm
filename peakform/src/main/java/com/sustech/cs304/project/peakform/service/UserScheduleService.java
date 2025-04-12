package com.sustech.cs304.project.peakform.service;

import com.sustech.cs304.project.peakform.config.RabbitMQConfig;
import com.sustech.cs304.project.peakform.domain.GymSession;
import com.sustech.cs304.project.peakform.domain.User;
import com.sustech.cs304.project.peakform.domain.UserSchedule;
import com.sustech.cs304.project.peakform.dto.AppointmentNotification;
import com.sustech.cs304.project.peakform.dto.AppointmentStatsResponse;
import com.sustech.cs304.project.peakform.dto.BookingRecordResponse;
import com.sustech.cs304.project.peakform.repository.GymSessionRepository;
import com.sustech.cs304.project.peakform.repository.UserRepository;
import com.sustech.cs304.project.peakform.repository.UserScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserScheduleService {

    private final UserScheduleRepository userScheduleRepository;
    private final GymSessionRepository gymSessionRepository;
    private final UserRepository userRepository;

    private final RabbitTemplate rabbitTemplate;

    // Existing methods remain unchanged
    public ResponseEntity<String> bookGymSession(Long gymSessionId, UUID userUuid) {
        Optional<GymSession> gymSessionOptional = gymSessionRepository.findById(gymSessionId);
        if (gymSessionOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Gym session not found.");
        }

        Optional<User> userOptional = userRepository.findById(userUuid);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        GymSession gymSession = gymSessionOptional.get();
        User user = userOptional.get();

        if (userScheduleRepository.findByUser_UserUuidAndGymSession_GymSessionId(userUuid, gymSessionId).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already booked this gym session.");
        }

        UserSchedule userSchedule = UserSchedule.builder()
                .user(user)
                .gymSession(gymSession)
                .appointmentStatus(UserSchedule.AppointmentStatus.BOOKED)
                .build();

        saveSchedule(userSchedule);

        gymSession.setAvailableSlots(gymSession.getAvailableSlots() - 1);
        gymSessionRepository.save(gymSession);

        return ResponseEntity.status(HttpStatus.OK).body("Gym booked successfully for user: " + userUuid + ".");
    }

    public ResponseEntity<String> cancelGymSession(Long gymSessionId, UUID userUuid) {
        Optional<GymSession> gymSessionOptional = gymSessionRepository.findById(gymSessionId);
        if (gymSessionOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Gym session not found.");
        }

        Optional<User> userOptional = userRepository.findById(userUuid);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        GymSession gymSession = gymSessionOptional.get();

        Optional<UserSchedule> userScheduleOptional = userScheduleRepository.findByUser_UserUuidAndGymSession_GymSessionId(userUuid, gymSessionId);

        if (userScheduleOptional.isEmpty() || userScheduleOptional.get().getAppointmentStatus() != UserSchedule.AppointmentStatus.BOOKED) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No active booking found for this user and gym session.");
        }

        UserSchedule userSchedule = userScheduleOptional.get();
        userSchedule.setAppointmentStatus(UserSchedule.AppointmentStatus.CANCELLED);
        userScheduleRepository.save(userSchedule);

        gymSession.setAvailableSlots(gymSession.getAvailableSlots() + 1);
        gymSessionRepository.save(gymSession);

        return ResponseEntity.status(HttpStatus.OK).body("Gym booking canceled successfully for user: " + userUuid + ".");
    }

    public ResponseEntity<String> markGymSessionCompleted(Long gymSessionId, UUID userUuid) {
        Optional<GymSession> gymSessionOptional = gymSessionRepository.findById(gymSessionId);
        if (gymSessionOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Gym session not found.");
        }

        Optional<User> userOptional = userRepository.findById(userUuid);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        Optional<UserSchedule> userScheduleOptional = userScheduleRepository.findByUser_UserUuidAndGymSession_GymSessionId(userUuid, gymSessionId);

        if (userScheduleOptional.isEmpty() || userScheduleOptional.get().getAppointmentStatus() != UserSchedule.AppointmentStatus.BOOKED) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No active booking found for this user and gym session.");
        }

        UserSchedule userSchedule = userScheduleOptional.get();
        LocalDateTime sessionStartDateTime = LocalDateTime.of(userSchedule.getGymSession().getDate(), userSchedule.getGymSession().getSessionStart());

        if (LocalDateTime.now().isBefore(sessionStartDateTime)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cannot mark session as completed before it starts.");
        }

        userSchedule.setAppointmentStatus(UserSchedule.AppointmentStatus.COMPLETED);
        userScheduleRepository.save(userSchedule);

        return ResponseEntity.status(HttpStatus.OK).body("Gym session marked as completed for user: " + userUuid + ".");
    }

    public ResponseEntity<String> markGymSessionMissed(Long gymSessionId, UUID userUuid) {
        Optional<GymSession> gymSessionOptional = gymSessionRepository.findById(gymSessionId);
        if (gymSessionOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Gym session not found.");
        }

        Optional<User> userOptional = userRepository.findById(userUuid);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        Optional<UserSchedule> userScheduleOptional = userScheduleRepository.findByUser_UserUuidAndGymSession_GymSessionId(userUuid, gymSessionId);

        if (userScheduleOptional.isEmpty() || userScheduleOptional.get().getAppointmentStatus() != UserSchedule.AppointmentStatus.BOOKED) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No active booking found for this user and gym session.");
        }

        UserSchedule userSchedule = userScheduleOptional.get();
        userSchedule.setAppointmentStatus(UserSchedule.AppointmentStatus.MISSED);
        userScheduleRepository.save(userSchedule);

        return ResponseEntity.status(HttpStatus.OK).body("Gym session marked as missed for user: " + userUuid + ".");
    }

    public ResponseEntity<AppointmentStatsResponse> getAppointmentStats(UUID userUuid) {
        Optional<User> userOptional = userRepository.findById(userUuid);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Long totalBookings = userScheduleRepository.countByUser_UserUuid(userUuid);
        Long completedBookings = userScheduleRepository.countByUser_UserUuidAndAppointmentStatus(userUuid, UserSchedule.AppointmentStatus.COMPLETED);
        Long cancelledBookings = userScheduleRepository.countByUser_UserUuidAndAppointmentStatus(userUuid, UserSchedule.AppointmentStatus.CANCELLED);
        Long missedBookings = userScheduleRepository.countByUser_UserUuidAndAppointmentStatus(userUuid, UserSchedule.AppointmentStatus.MISSED);
        List<BookingRecordResponse> bookingRecords = userScheduleRepository.findByUser_UserUuid(userUuid)
                .stream()
                .map(booking -> new BookingRecordResponse(
                        booking.getGymSession().getGymSessionId(),
                        booking.getGymSession().getGym().getGymName(),
                        booking.getGymSession().getDate(),
                        booking.getGymSession().getSessionStart(),
                        booking.getGymSession().getSessionEnd(),
                        booking.getAppointmentStatus()
                ))
                .toList();

        AppointmentStatsResponse statsResponse = new AppointmentStatsResponse(
                totalBookings,
                completedBookings,
                cancelledBookings,
                missedBookings,
                bookingRecords
        );

        return ResponseEntity.status(HttpStatus.OK).body(statsResponse);
    }

    private void saveSchedule(UserSchedule userSchedule) {
        UserSchedule savedSchedule = userScheduleRepository.save(userSchedule);
        LocalDateTime sessionStartDateTime = LocalDateTime.of(savedSchedule.getGymSession().getDate(), savedSchedule.getGymSession().getSessionStart());

        LocalDateTime notificationTime = sessionStartDateTime.minusHours(5);
        long delay = ChronoUnit.MILLIS.between(LocalDateTime.now(), notificationTime);

        if (delay > 0) {
            rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.DELAYED_QUEUE_NAME,
                    new AppointmentNotification(savedSchedule.getUser().getEmail(), sessionStartDateTime),
                    message -> {
                        message.getMessageProperties().setExpiration(String.valueOf(delay));
                        return message;
                    });
        } else {
            rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.DEAD_LETTER_ROUTING_KEY,
                    new AppointmentNotification(savedSchedule.getUser().getEmail(), sessionStartDateTime));
        }
    }
}