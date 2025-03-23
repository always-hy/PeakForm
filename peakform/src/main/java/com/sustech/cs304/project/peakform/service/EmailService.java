package com.sustech.cs304.project.peakform.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

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
}