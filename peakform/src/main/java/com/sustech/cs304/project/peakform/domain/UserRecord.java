package com.sustech.cs304.project.peakform.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_record_id", columnDefinition = "BIGINT UNSIGNED")
    private Long userRecordId;

    @OneToOne
    @JoinColumn(name = "user_uuid", nullable = false, unique = true, columnDefinition = "BINARY(16)", referencedColumnName = "user_uuid")
    private User user;

    @Column(name = "workout_streak", nullable = false, columnDefinition = "INT UNSIGNED DEFAULT 0")
    private Integer workoutStreak;

    @Column(name = "water_intake_streak", nullable = false, columnDefinition = "INT UNSIGNED DEFAULT 0")
    private Integer waterIntakeStreak;

    @Column(name = "bench_press_pr")
    private Float benchPressPr;

    @Column(name = "squat_pr")
    private Float squatPr;

    @Column(name = "deadlift_pr")
    private Float deadliftPr;
}