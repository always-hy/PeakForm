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
        uniqueConstraints = @UniqueConstraint(
                columnNames = {"user_uuid", "gym_schedule_id"}
        )
)
public class UserSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_schedule_id", updatable = false, nullable = false)
    private Long userScheduleId;

    @ManyToOne
    @JoinColumn(name = "user_uuid", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "gym_schedule_id", nullable = false)
    private GymSession gymSession;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, columnDefinition = "ENUM('NOT_AVAILABLE' ,'UNRESERVED', 'BOOKED', 'COMPLETED', 'CANCELLED')")
    private Status status;

    public enum Status {
        NOT_AVAILABLE, UNRESERVED, BOOKED, COMPLETED, CANCELLED
    }
}
