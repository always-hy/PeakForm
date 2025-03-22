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
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_id", updatable = false, nullable = false)
    private Long scheduleId;

    @ManyToOne
    @JoinColumn(name = "gym_id", nullable = false)
    private Gym gym;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "session_start", nullable = false)
    private LocalTime sessionStart;

    @Column(name = "session_end", nullable = false)
    private LocalTime sessionEnd;

    @Column(name = "capacity", nullable = false, columnDefinition = "INT UNSIGNED")
    private Integer capacity;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, columnDefinition = "ENUM('AVAILABLE', 'FULL', 'BOOKED', 'COMPLETED', 'CANCELLED')")
    private Status status;

    @OneToMany(mappedBy = "schedule", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserSchedule> userSchedules;


    public enum Status {
        AVAILABLE, FULL, BOOKED, COMPLETED, CANCELLED
    }
}
