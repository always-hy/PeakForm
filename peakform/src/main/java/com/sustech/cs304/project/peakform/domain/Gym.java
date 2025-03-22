package com.sustech.cs304.project.peakform.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Gym {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gym_id", updatable = false, nullable = false)
    private Long gymId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "location", nullable = false, columnDefinition = "TEXT")
    private String location;

    @Column(name = "contact", length = 3, nullable = false)
    private String contact;


    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Column(name = "max_capacity", columnDefinition = "INT UNSIGNED")
    private Integer maxCapacity;

    @Column(name = "session_interval", columnDefinition = "FLOAT UNSIGNED")
    private Float sessionInterval;

    @OneToMany(mappedBy = "gym", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Schedule> schedules;
}
