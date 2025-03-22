package com.sustech.cs304.project.peakform.repository;

import com.sustech.cs304.project.peakform.domain.UserStat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserStatRepository extends JpaRepository<UserStat, Long> {
    // You can add custom queries here if needed, but this will provide basic CRUD operations
}
