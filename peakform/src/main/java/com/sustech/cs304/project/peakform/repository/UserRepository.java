package com.sustech.cs304.project.peakform.repository;

import com.sustech.cs304.project.peakform.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByUserUuid(UUID userUuid);

    Optional<User> findByEmail(String email);

    Optional<User> findByVerificationToken(String verificationToken);

    List<User> findByUsernameContainingIgnoreCase(String username);
}