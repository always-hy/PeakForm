package com.sustech.cs304.project.peakform.config;

import com.sustech.cs304.project.peakform.domain.Achievement;
import com.sustech.cs304.project.peakform.domain.Exercise;
import com.sustech.cs304.project.peakform.domain.Gym;
import com.sustech.cs304.project.peakform.domain.User;
import com.sustech.cs304.project.peakform.repository.AchievementRepository;
import com.sustech.cs304.project.peakform.repository.ExerciseRepository;
import com.sustech.cs304.project.peakform.repository.GymRepository;
import com.sustech.cs304.project.peakform.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final ExerciseRepository exerciseRepository;
    private final GymRepository gymRepository;
    private final AchievementRepository achievementRepository;

    @PostConstruct
    public void init() {
        initUserData();
        initExerciseData();
        initGymData();
        initAchievementData();
    }

    private void initUserData() {
        if (userRepository.count() == 0) {
            List<User> users = List.of(
                    User.builder()
                            .username("bong layheng")
                            .email("layhenghok@gmail.com")
                            .password("1")
                            .age(18)
                            .gender(User.Gender.OTHER)
                            .bio("hello")
                            .emailVerified(true)
                            .verificationToken(null)
                            .build(),
                    User.builder()
                            .username("oun jouwy")
                            .email("jouwy@gmail.com")
                            .password("1")
                            .age(18)
                            .gender(User.Gender.OTHER)
                            .bio("hello")
                            .emailVerified(true)
                            .verificationToken(null)
                            .build(),
                    User.builder()
                            .username("deadlift")
                            .email("peakform.noreply@gmail.com")
                            .password("1")
                            .age(18)
                            .gender(User.Gender.OTHER)
                            .bio("hello")
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
                            .name("FitPower Gym")
                            .location("123 Fitness St, City Center")
                            .contact("123-456-7890")
                            .startTime(LocalTime.of(6, 0))
                            .endTime(LocalTime.of(22, 0))
                            .sessionMaxCapacity(10)
                            .sessionInterval(1.5f)
                            .description("A high-end gym with the best equipment and trainers.")
                            .build(),
                    Gym.builder()
                            .name("StrengthHub Gym")
                            .location("456 Muscle Rd, Downtown")
                            .contact("987-654-3210")
                            .startTime(LocalTime.of(7, 0))
                            .endTime(LocalTime.of(21, 0))
                            .sessionMaxCapacity(15)
                            .sessionInterval(1.0f)
                            .description("A gym focused on weightlifting and strength training.")
                            .build(),
                    Gym.builder()
                            .name("FlexZone Gym")
                            .location("789 Fit Blvd, Uptown")
                            .contact("555-888-2222")
                            .startTime(LocalTime.of(5, 0))
                            .endTime(LocalTime.of(23, 0))
                            .sessionMaxCapacity(20)
                            .sessionInterval(2.0f)
                            .description("A modern gym with various workout zones.")
                            .build()
            );
            gymRepository.saveAll(gyms);
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
