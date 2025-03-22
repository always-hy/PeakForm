package com.sustech.cs304.project.peakform.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Achievement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "achievement_id", updatable = false, nullable = false)
    private Long achievementId;

    @Column(name = "name", nullable = false)
    private String achievementName;

    @OneToMany(mappedBy = "achievement", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserAchievement> userAchievements;
}
