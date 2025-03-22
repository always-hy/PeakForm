package com.sustech.cs304.project.peakform.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(
        name = "workout_exercise",
        uniqueConstraints = @UniqueConstraint(
                columnNames = {"workout_id", "exercise_id", "day"}
        )
)
public class WorkoutExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "workout_exercise_id", updatable = false, nullable = false)
    private Long workoutExerciseId;

    @ManyToOne
    @JoinColumn(name = "workout_id", nullable = false)
    private Workout workout;

    @ManyToOne
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @Enumerated(EnumType.STRING)
    @Column(name = "day")
    private Day day;

    @Column(name = "sets")
    private Integer sets;

    @Column(name = "reps")
    private String reps;

    public enum Day {
        MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
    }
}
