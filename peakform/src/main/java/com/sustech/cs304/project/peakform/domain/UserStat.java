package com.sustech.cs304.project.peakform.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "user_stat")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserStat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_stat_id", columnDefinition = "INT UNSIGNED")
    private Long userStatId;

    @ManyToOne
    @JoinColumn(name = "user_uuid", nullable = false, columnDefinition = "BINARY(16)", referencedColumnName = "user_uuid")
    private User user;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "weight")
    private Float weight;

    @Column(name = "height")
    private Float height;

    @Column(name = "water_intake")
    private Float waterIntake;

    @Column(name = "calories_burned", columnDefinition = "INT UNSIGNED")
    private Integer caloriesBurned;
    
    @Column(name = "workout_duration", columnDefinition = "INT UNSIGNED")
    private Integer workoutDuration;
}
