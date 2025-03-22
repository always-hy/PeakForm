package com.sustech.cs304.project.peakform.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Social {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "social_id", updatable = false, nullable = false)
    private Long socialId;

    @ManyToOne
    @JoinColumn(name = "following_uuid", nullable = false)
    private User following;

    @ManyToOne
    @JoinColumn(name = "follower_uuid", nullable = false)
    private User follower;

    @Column(name = "created_at", nullable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime createdAt;
}
