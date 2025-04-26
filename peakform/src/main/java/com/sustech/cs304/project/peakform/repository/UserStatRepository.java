package com.sustech.cs304.project.peakform.repository;

import com.sustech.cs304.project.peakform.domain.User;
import com.sustech.cs304.project.peakform.domain.UserStat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserStatRepository extends JpaRepository<UserStat, Long> {
    Optional<UserStat> findByUserAndDate(User user, LocalDate date);

    List<UserStat> findAllByDate(LocalDate date);

    List<UserStat> findAllByUser_UserUuidOrderByDateAsc(UUID userUuid);
}
