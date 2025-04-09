package com.sustech.cs304.project.peakform.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GymSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gym_session_id", updatable = false, nullable = false)
    private Long gymSessionId;

    @ManyToOne
    @JoinColumn(name = "gym_id", nullable = false)
    private Gym gym;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "session_start", nullable = false)
    private LocalTime sessionStart;

    @Column(name = "session_end", nullable = false)
    private LocalTime sessionEnd;

    @Column(name = "available_slots", nullable = false, columnDefinition = "INT UNSIGNED")
    private Integer availableSlots;

    @OneToMany(mappedBy = "gymSession", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserSchedule> userSchedules;
}
