package com.sustech.cs304.project.peakform.service;

import com.sustech.cs304.project.peakform.domain.WorkoutExercise;
import com.sustech.cs304.project.peakform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    private final UserRepository userRepository;

    private final NotificationService notificationService;

    public void sendVerificationEmail(String to, String verificationToken) {
        String subject = "Verify Your Email Address";
        String verificationUrl = "http://localhost:8080/user/verify-email?token=" + verificationToken;
        String text = "Please click the link below to verify your email address:\n" + verificationUrl;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);

        mailSender.send(message);
    }

    public void sendAppointmentReminder(String to, LocalDateTime appointmentTime) {
        String subject = "Appointment Reminder";
        String text = "This is a reminder for your appointment scheduled on " + appointmentTime + ".";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);

        mailSender.send(message);

        notificationService.createNotification(text, userRepository.findByEmail(to).get().getUserUuid());
    }

    public void sendWorkoutReminder(String to, WorkoutExercise.Day workoutDay) {
        String subject = "Workout Reminder";
        String text = "This is a reminder that you have a workout scheduled for " + workoutDay + ".";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);

        mailSender.send(message);

        notificationService.createNotification(text, userRepository.findByEmail(to).get().getUserUuid());
    }
}