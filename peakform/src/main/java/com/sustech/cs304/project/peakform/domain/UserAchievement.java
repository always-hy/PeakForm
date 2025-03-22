package com.sustech.cs304.project.peakform.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAchievement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_achievement_id", updatable = false, nullable = false)
    private Long userAchievementId;

    @ManyToOne
    @JoinColumn(name = "user_uuid", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "achievement_id", nullable = false)
    private Achievement achievement;

    @Column(name = "achieved_at", nullable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime achievedAt;
}
