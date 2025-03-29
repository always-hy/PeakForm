package com.sustech.cs304.project.peakform.config;

import com.sustech.cs304.project.peakform.domain.Achievement;
import com.sustech.cs304.project.peakform.domain.Exercise;
import com.sustech.cs304.project.peakform.domain.Gym;
import com.sustech.cs304.project.peakform.domain.User;
import com.sustech.cs304.project.peakform.repository.*;
import com.sustech.cs304.project.peakform.service.GymScheduleService;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final ExerciseRepository exerciseRepository;
    private final GymRepository gymRepository;
    private final GymScheduleRepository gymScheduleRepository;
    private final AchievementRepository achievementRepository;

    private final GymScheduleService gymScheduleService;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    @PostConstruct
    public void init() {
        clearData();
        initUserData();
        initExerciseData();
        initGymData();
        initGymScheduleData();
        initAchievementData();
    }

    private void clearData() {
        userRepository.deleteAll();
        exerciseRepository.deleteAll();
        gymRepository.deleteAll();
        gymScheduleRepository.deleteAll();
        achievementRepository.deleteAll();
    }

    private void initUserData() {
        if (userRepository.count() == 0) {
            List<User> users = List.of(
                    User.builder()
                            .username("Toji Fushiguro")
                            .email("fbringer99@gmail.com")
                            .password(bCryptPasswordEncoder.encode("1"))
                            .age(23)
                            .gender(User.Gender.MALE)
                            .bio("The Sorcerer Killer")
                            .emailVerified(true)
                            .verificationToken(null)
                            .build(),
                    User.builder()
                            .username("Escanor")
                            .email("prakbunlong53@gmail.com")
                            .password(bCryptPasswordEncoder.encode("1"))
                            .age(53)
                            .gender(User.Gender.FEMALE)
                            .bio("The Lion's Sin of Pride")
                            .emailVerified(true)
                            .verificationToken(null)
                            .build(),
                    User.builder()
                            .username("Guts")
                            .email("sussycourses@gmail.com")
                            .password(bCryptPasswordEncoder.encode("1"))
                            .age(20)
                            .gender(User.Gender.OTHER)
                            .bio("The Black Swordsman")
                            .emailVerified(true)
                            .verificationToken(null)
                            .build()
            );
            userRepository.saveAll(users);
        }
    }

    private void initExerciseData() {
        if (exerciseRepository.count() == 0) {
            List<Exercise> exercises = List.of(
                    Exercise.builder()
                            .exerciseName("Push-Up")
                            .description("A basic bodyweight exercise to strengthen the chest, shoulders, and triceps.")
                            .targetMuscleGroup("Chest, Shoulders, Triceps")
                            .build(),
                    Exercise.builder()
                            .exerciseName("Squat")
                            .description("A lower-body exercise that primarily targets the quadriceps, hamstrings, and glutes.")
                            .targetMuscleGroup("Legs, Glutes")
                            .build(),
                    Exercise.builder()
                            .exerciseName("Deadlift")
                            .description("A compound exercise that targets the back, hamstrings, and glutes.")
                            .targetMuscleGroup("Back, Hamstrings, Glutes")
                            .build(),
                    Exercise.builder()
                            .exerciseName("Bench Press")
                            .description("A popular upper-body exercise to develop strength in the chest and triceps.")
                            .targetMuscleGroup("Chest, Triceps")
                            .build()
            );
            exerciseRepository.saveAll(exercises);
        }
    }

    private void initGymData() {
        if (gymRepository.count() == 0) {
            List<Gym> gyms = List.of(
                    Gym.builder()
                            .gymName("FitPower Gym")
                            .location("123 Fitness St, City Center")
                            .contact("123-456-7890")
                            .startTime(LocalTime.of(9, 0))
                            .endTime(LocalTime.of(21, 0))
                            .sessionMaxCapacity(15)
                            .sessionInterval(1.5f)
                            .description("A high-end gym with the best equipment and trainers.")
                            .build(),
                    Gym.builder()
                            .gymName("StrengthHub Gym")
                            .location("456 Muscle Rd, Downtown")
                            .contact("987-654-3210")
                            .startTime(LocalTime.of(2, 0))
                            .endTime(LocalTime.of(20, 0))
                            .sessionMaxCapacity(10)
                            .sessionInterval(1.0f)
                            .description("A gym focused on weightlifting and strength training.")
                            .build(),
                    Gym.builder()
                            .gymName("FlexZone Gym")
                            .location("789 Fit Blvd, Uptown")
                            .contact("555-888-2222")
                            .startTime(LocalTime.of(10, 0))
                            .endTime(LocalTime.of(22, 0))
                            .sessionMaxCapacity(20)
                            .sessionInterval(2.0f)
                            .description("A modern gym with various workout zones.")
                            .build()
            );
            gymRepository.saveAll(gyms);
        }
    }

    private void initGymScheduleData() {
        List<Gym> gyms = gymRepository.findAll();
        for (Gym gym : gyms) {
            gymScheduleRepository.saveAll(gymScheduleService.generateGymSchedules(gym.getGymId()));
        }
    }

    private void initAchievementData() {
        if (achievementRepository.count() == 0) {
            List<Achievement> achievements = List.of(
                    Achievement.builder().achievementName("10 Workout Streak").build(),
                    Achievement.builder().achievementName("50 Workout Streak").build(),
                    Achievement.builder().achievementName("100 Workout Streak").build(),
                    Achievement.builder().achievementName("10 Water Intake Streak").build(),
                    Achievement.builder().achievementName("50 Water Intake Streak").build(),
                    Achievement.builder().achievementName("100 Water Intake Streak").build(),
                    Achievement.builder().achievementName("Target Weight Reached").build()
            );
            achievementRepository.saveAll(achievements);
        }
    }

}
