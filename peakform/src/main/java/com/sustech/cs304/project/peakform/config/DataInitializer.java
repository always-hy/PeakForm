package com.sustech.cs304.project.peakform.config;

import com.sustech.cs304.project.peakform.domain.*;
import com.sustech.cs304.project.peakform.repository.*;
import com.sustech.cs304.project.peakform.service.GymSessionService;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final ExerciseRepository exerciseRepository;
    private final GymRepository gymRepository;
    private final GymSessionRepository gymSessionRepository;
    private final AchievementRepository achievementRepository;
    private final UserScheduleRepository userScheduleRepository;
    private final UserTargetRepository userTargetRepository;
    private final UserStatRepository userStatRepository;

    private final GymSessionService gymSessionService;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;


    @Transactional
    @PostConstruct
    public void init() {
        initUserData();
        initUserTargetData();
        initUserStatData();
        initExerciseData();
        initGymData();
        initGymSessionData();
        initUserScheduleData();
        initNotificationData();
        initAchievementData();
    }

    private void initUserData() {
        if (userRepository.count() == 0) {
            List<User> users = List.of(
                    User.builder()
                            .userUuid(UUID.fromString("9fa2fa3e-a194-4187-95a3-5c818c433973"))
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
                            .userUuid(UUID.fromString("eea34b25-6d9d-4bd4-a2aa-688c9969e0a1"))
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
                            .userUuid(UUID.fromString("aded6999-0e77-4710-8b61-031db5e7d456"))
                            .username("Guts")
                            .email("sussycourses@gmail.com")
                            .password(bCryptPasswordEncoder.encode("1"))
                            .age(20)
                            .gender(User.Gender.OTHER)
                            .bio("The Black Swordsman")
                            .emailVerified(true)
                            .verificationToken(null)
                            .build(),
                    User.builder()
                            .userUuid(UUID.fromString("d137a897-d0c9-4a36-85f3-efbc83e96800"))
                            .username("Yujiro Hanma")
                            .email("bzhou@paragoniu.edu.kh")
                            .password(bCryptPasswordEncoder.encode("1"))
                            .age(45)
                            .gender(User.Gender.MALE)
                            .bio("The Strongest Creature on Earth")
                            .emailVerified(true)
                            .verificationToken(null)
                            .build(),
                    User.builder()
                            .userUuid(UUID.fromString("2c2134c1-d410-429f-8ea7-da0ba62534d0"))
                            .username("Broly")
                            .email("shor1@paragoniu.edu.kh")
                            .password(bCryptPasswordEncoder.encode("1"))
                            .age(30)
                            .gender(User.Gender.MALE)
                            .bio("The Legendary Super Saiyan")
                            .emailVerified(true)
                            .verificationToken(null)
                            .build(),
                    User.builder()
                            .userUuid(UUID.fromString("54f843ef-665c-4f9e-b4c7-414dd5495662"))
                            .username("Kenpachi Zaraki")
                            .email("esok@paragoniu.edu.kh")
                            .password(bCryptPasswordEncoder.encode("1"))
                            .age(35)
                            .gender(User.Gender.MALE)
                            .bio("The Berserker of Soul Society")
                            .emailVerified(true)
                            .verificationToken(null)
                            .build(),
                    User.builder()
                            .userUuid(UUID.fromString("5d2a7b34-3c9d-4f5a-9e2b-1f9a2d7e3c4f"))
                            .username("Doom Slayer")
                            .email("bprak@paragoniu.edu.kh")
                            .password(bCryptPasswordEncoder.encode("1"))
                            .age(30)
                            .gender(User.Gender.MALE)
                            .bio("The Slayer of Hell, Rip and Tear")
                            .emailVerified(true)
                            .verificationToken(null)
                            .build(),
                    User.builder()
                            .userUuid(UUID.fromString("7e1f3a9d-2b4c-5d7e-8f3a-1c9d4e2b5a7f"))
                            .username("Kratos")
                            .email("pvann2@paragoniu.edu.kh")
                            .password(bCryptPasswordEncoder.encode("1"))
                            .age(90)
                            .gender(User.Gender.MALE)
                            .bio("The God of War, Ghost of Sparta")
                            .emailVerified(true)
                            .verificationToken(null)
                            .build()
            );
            userRepository.saveAll(users);
        }
    }

    private void initUserTargetData() {
        if (userTargetRepository.count() == 0) {
            List<User> users = userRepository.findAll();
            List<UserTarget> userTargets = List.of(
                    UserTarget.builder()
                            .user(users.get(0))
                            .targetWeight(75f)
                            .targetWaterIntake(3.5f)
                            .targetCaloriesBurned(500)
                            .targetWorkoutDuration(60)
                            .build(),
                    UserTarget.builder()
                            .user(users.get(1))
                            .targetWeight(85f)
                            .targetWaterIntake(4.0f)
                            .targetCaloriesBurned(600)
                            .targetWorkoutDuration(90)
                            .build(),
                    UserTarget.builder()
                            .user(users.get(2))
                            .targetWeight(95f)
                            .targetWaterIntake(4.5f)
                            .targetCaloriesBurned(700)
                            .targetWorkoutDuration(120)
                            .build(),
                    UserTarget.builder()
                            .user(users.get(3))
                            .targetWeight(110f)
                            .targetWaterIntake(5.0f)
                            .targetCaloriesBurned(800)
                            .targetWorkoutDuration(150)
                            .build(),
                    UserTarget.builder()
                            .user(users.get(4))
                            .targetWeight(120f)
                            .targetWaterIntake(6.0f)
                            .targetCaloriesBurned(1000)
                            .targetWorkoutDuration(180)
                            .build(),
                    UserTarget.builder()
                            .user(users.get(5))
                            .targetWeight(110f)
                            .targetWaterIntake(4.0f)
                            .targetCaloriesBurned(600)
                            .targetWorkoutDuration(90)
                            .build(),
                    UserTarget.builder()
                            .user(users.get(6))
                            .targetWeight(120f)
                            .targetWaterIntake(4.2f)
                            .targetCaloriesBurned(750)
                            .targetWorkoutDuration(100)
                            .build(),
                    UserTarget.builder()
                            .user(users.get(7))
                            .targetWeight(150f)
                            .targetWaterIntake(5.5f)
                            .targetCaloriesBurned(950)
                            .targetWorkoutDuration(130)
                            .build()
            );
            userTargetRepository.saveAll(userTargets);
        }
    }

    /**
     * AI-generated-content
     * tool: ChatGPT
     * version: 4o
     * usage: I needed to initialize mock UserStat data for testing purposes. The requirement was to generate
     * randomized but realistic data (e.g., weight, height, water intake, calories burned, and workout duration)
     * for each user for the past 7 days. I asked ChatGPT to help me design a method that would automatically
     * create this data. I copied the suggested logic and made slight adjustments to ensure that float values
     * were rounded to one decimal place for consistency.
     */

    private void initUserStatData() {
        if (userStatRepository.count() == 0) {
            List<User> users = userRepository.findAll();
            LocalDate today = LocalDate.now();
            Random random = new Random();

            List<UserStat> userStats = new ArrayList<>();

            for (User user : users) {
                // base values, formatted to 1 decimal place
                float baseWeight = 70f + (random.nextFloat() * 30);
                baseWeight = Math.round(baseWeight * 10.0f) / 10.0f;  // round to one decimal place

                float baseHeight = 165f + (random.nextFloat() * 15);
                baseHeight = Math.round(baseHeight * 10.0f) / 10.0f;  // round to one decimal place

                for (int i = 0; i < 7; i++) {
                    LocalDate date = today.minusDays(i);

                    // variations, also formatted to 1 decimal place
                    float weightVariation = (random.nextFloat() - 0.5f) * 2f;
                    weightVariation = Math.round(weightVariation * 10.0f) / 10.0f;  // round to one decimal place

                    float waterIntakeVariation = (random.nextFloat() - 0.5f) * 0.2f;
                    waterIntakeVariation = Math.round(waterIntakeVariation * 10.0f) / 10.0f;  // round to one decimal place

                    int caloriesVariation = random.nextInt(51) - 25; // no rounding needed for integers
                    int workoutDurationVariation = random.nextInt(11) - 5; // no rounding needed for integers

                    userStats.add(UserStat.builder()
                            .user(user)
                            .date(date)
                            .weight(baseWeight + weightVariation)
                            .height(baseHeight)
                            .waterIntake(2.5f + waterIntakeVariation)
                            .caloriesBurned(400 + caloriesVariation)
                            .workoutDuration(60 + workoutDurationVariation)
                            .build()
                    );
                }
            }

            userStatRepository.saveAll(userStats);
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
                            .gymName("AlphaLand")
                            .location("123 Fitness St, City Center")
                            .contact("123-456-7890")
                            .startTime(LocalTime.of(9, 0))
                            .endTime(LocalTime.of(21, 0))
                            .sessionMaxCapacity(15)
                            .sessionInterval(1.5f)
                            .description("A gym focused on weightlifting and strength training.")
                            .build(),
                    Gym.builder()
                            .gymName("EQUINOX")
                            .location("456 Old Rd, Downtown")
                            .contact("987-654-3210")
                            .startTime(LocalTime.of(14, 0))
                            .endTime(LocalTime.of(20, 0))
                            .sessionMaxCapacity(10)
                            .sessionInterval(1.0f)
                            .description("A high-end gym with the best equipment and trainers.")
                            .build(),
                    Gym.builder()
                            .gymName("DP - DogPound")
                            .location("789 Boudeox Blvd, Uptown")
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

    private void initGymSessionData() {
        if (gymSessionRepository.count() == 0) {
            List<Gym> gyms = gymRepository.findAll();
            for (Gym gym : gyms) {
                gymSessionRepository.saveAll(gymSessionService.generateGymSessions(gym.getGymId(), LocalDate.now().plusDays(-1)));
                gymSessionRepository.saveAll(gymSessionService.generateGymSessions(gym.getGymId(), LocalDate.now()));
                gymSessionRepository.saveAll(gymSessionService.generateGymSessions(gym.getGymId(), LocalDate.now().plusDays(1)));
            }
        }
    }

    /**
     * AI-generated-content
     * tool: ChatGPT
     * version: 4o
     * usage: I had a persistent bug that I could not update the available slots correctly when I had to update the same
     * available slots twice. I copied and pasted my original code and asked ChatGPT to fix it. I copied and pasted the
     * code from ChatGPT, then made some modifications. I learned from it that I should fetch all GymSession instances
     * in one query and caches them in Map to avoid fetching the same session multiple times, so that it holds the same
     * reference.
     */
    private void initUserScheduleData() {
        if (userScheduleRepository.count() == 0) {
            // Fetch all required GymSessions in one batch
            List<Long> gymSessionIds = List.of(2L, 18L);
            Map<Long, GymSession> gymSessionMap = gymSessionRepository.findAllById(gymSessionIds)
                    .stream()
                    .collect(Collectors.toMap(GymSession::getGymSessionId, schedule -> schedule));

            // Create user schedules with shared GymSession references
            List<UserSchedule> userSchedules = List.of(
                    UserSchedule.builder()
                            .user(userRepository.findById(UUID.fromString("9fa2fa3e-a194-4187-95a3-5c818c433973")).get())
                            .gymSession(gymSessionMap.get(2L))
                            .appointmentStatus(UserSchedule.AppointmentStatus.BOOKED)
                            .build(),
                    UserSchedule.builder()
                            .user(userRepository.findById(UUID.fromString("9fa2fa3e-a194-4187-95a3-5c818c433973")).get())
                            .gymSession(gymSessionMap.get(18L))
                            .appointmentStatus(UserSchedule.AppointmentStatus.BOOKED)
                            .build()
            );

            userScheduleRepository.saveAll(userSchedules);

            // Update available slots
            for (GymSession gymSession : gymSessionMap.values()) {
                long count = userSchedules.stream()
                        .filter(userSchedule -> userSchedule.getGymSession().equals(gymSession))
                        .count();

                gymSession.setAvailableSlots(gymSession.getAvailableSlots() - (int) count);

                if (gymSession.getAvailableSlots() <= 0) {
                    gymSession.setAvailableSlots(0);
                }

                gymSessionRepository.save(gymSession);
            }
        }
    }

    private void initNotificationData() {
    }

    private void initAchievementData() {
        if (achievementRepository.count() == 0) {
            List<Achievement> achievements = List.of(
                    Achievement.builder().achievementName("10 Workout Completed").build(),
                    Achievement.builder().achievementName("50 Workout Completed").build(),
                    Achievement.builder().achievementName("100 Workout Completed").build(),
                    Achievement.builder().achievementName("10 Water Intake Streak").build(),
                    Achievement.builder().achievementName("50 Water Intake Streak").build(),
                    Achievement.builder().achievementName("100 Water Intake Streak").build(),
                    Achievement.builder().achievementName("Target Weight Reached").build()
            );
            achievementRepository.saveAll(achievements);
        }
    }
}
