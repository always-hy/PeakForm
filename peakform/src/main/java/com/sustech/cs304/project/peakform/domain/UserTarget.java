package com.sustech.cs304.project.peakform.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_target")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserTarget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_target_id", columnDefinition = "INT UNSIGNED")
    private Long userTargetId;

    @OneToOne
    @JoinColumn(name = "user_uuid", nullable = false, unique = true, columnDefinition = "BINARY(16)", referencedColumnName = "user_uuid")
    private User user;

    @Column(name = "target_weight")
    private Float targetWeight;

    @Column(name = "target_water_intake")
    private Float targetWaterIntake;

    @Column(name = "target_calories_burned", columnDefinition = "INT UNSIGNED")
    private Integer targetCaloriesBurned;

    @Column(name = "target_workout_duration", columnDefinition = "INT UNSIGNED")
    private Integer targetWorkoutDuration;
}