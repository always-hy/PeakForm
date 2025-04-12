package com.sustech.cs304.project.peakform.service;

import com.sustech.cs304.project.peakform.dto.AppointmentNotification;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationConsumer {

    private final EmailService emailService;

    @RabbitListener(queues = "appointmentQueue")
    public void handleAppointmentNotification(AppointmentNotification notification) {
        emailService.sendAppointmentReminder(
                notification.userEmail(),
                notification.appointmentTime()
        );
    }
}