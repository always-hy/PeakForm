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
public class Workout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "workout_id", updatable = false, nullable = false)
    private Long workoutId;

    @ManyToOne
    @JoinColumn(name = "user_uuid", nullable = false)
    private User user;

    @OneToMany(mappedBy = "workout", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WorkoutExercise> workoutExercises;

    @Column(name = "is_active")
    private Boolean isActive;
}
