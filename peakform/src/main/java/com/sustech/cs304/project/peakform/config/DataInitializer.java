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
                            .profileImageUrl("https://storage.googleapis.com/peakform-3d589.firebasestorage.app/user-profile/9fa2fa3e-a194-4187-95a3-5c818c433973.jpg?GoogleAccessId=firebase-adminsdk-fbsvc@peakform-3d589.iam.gserviceaccount.com&Expires=1746539285&Signature=GLYneGF1SDPPXQK7qsp%2BSSSf4ft5GsAam1RALGmrNYd1pUa8DJ%2Bkzdc1%2FDKMaEIUrGdrDEN4qzwD%2Frb5jdYFBKVPX1gHKwBnbJgd8jcNy%2FnVesesXFuyX8FplRxxios0L0MqoLIfFogxIVIoTQhgWdXyAUuSAttYPqAF%2B7IquheHrlYL%2FEg%2FCA8omVq39lsQwO0Sc3cadmaQqtYJcBOrwBv%2BG18IpxNolPH1zKuX74Zqd1nPa99MFiTW7rwdbZ4OsN4NJb%2BUUXWLOvVIz9%2FifET%2FghufeAoP37Y9OufE2fA9OQwcCRbq%2Bp4vToxxRtEYSO%2B9tOusJ225WdHeug%2FA1g%3D%3D")
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
                            .profileImageUrl("https://storage.googleapis.com/peakform-3d589.firebasestorage.app/user-profile/eea34b25-6d9d-4bd4-a2aa-688c9969e0a1.jpg?GoogleAccessId=firebase-adminsdk-fbsvc@peakform-3d589.iam.gserviceaccount.com&Expires=1746540350&Signature=gqsGlJXweJz4qEMiBO7YnfNiKjxrtZjtSWfAo7yEdEI0f5Ob97wNx0mjIbISgQdWu%2BtVdS4HtdrMQrpBTdAw2BWSccsF%2FKHjox4ghnPBCJH4EBf8t%2Fa4kFmdOiGcEWJvfcl9U%2BAH59ZNpIj422jV0mKV3i3N0IVuSBxaq9q%2B0TLYlpG5vATdzY9c%2BLOtDbgG89ayOpSO47Ud0m23yFnrl36%2Flrmoe6ecHY0Z9ahLOMftwiqDx%2FDLrdTRI0ZXmm0XjARFi0mY9R5OKxx%2BfJUmoyEdLWLBJ7otgK9xtU2A3Plb3flAqWYIUzFC7ZeV6XFFws2OSsyzC1A%2BdWxPffI0rQ%3D%3D")
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
                            .profileImageUrl("https://storage.googleapis.com/peakform-3d589.firebasestorage.app/user-profile/aded6999-0e77-4710-8b61-031db5e7d456.jpg?GoogleAccessId=firebase-adminsdk-fbsvc@peakform-3d589.iam.gserviceaccount.com&Expires=1746540348&Signature=gGI0GYKMPwqUEDn2M9ih5ZqrIyo3H6scBoDUbKuDFKKPng7f0ig9tyjzUanccuiaq%2FktLgO9AsHz1UiHWm3g2xC1vXakev%2BwWez2OW0JWCa7xm34ivdACysbmg%2FAATJxe2%2BurqDwYBFlNgmgh7SsSSYsToq9uxKGwcwX581VnvB65x9KVXm%2BUpJ1sVE535vv4Hma8xOvwve%2Frl7aPyyTrfa7KVWJtATUtCSZpxDH3301kv4f5bykDJTwu5riolgj2oxOAiIoRE3%2BtshXYc%2F3yjUyUIynZ3t5aPG97Pig%2FrXMhGfzDapf6MkCErkxZkWT34Ue%2FE6m2t96%2F%2FwQkFjVJw%3D%3D")
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
                            .profileImageUrl("https://storage.googleapis.com/peakform-3d589.firebasestorage.app/user-profile/d137a897-d0c9-4a36-85f3-efbc83e96800.jpg?GoogleAccessId=firebase-adminsdk-fbsvc@peakform-3d589.iam.gserviceaccount.com&Expires=1746540349&Signature=ZrLzG18STz%2BrWHGmW7bWPMX6Y5YzXWHUXO46wPfqjgG%2FhrlxFlQUlEmCBW%2BLp4hawGEVSw0Ff9zMbJCVbkn%2Bww57m1zemErDyrXlXKrJp2V%2Ff5vhKheIF9Js7HDfg35wn%2FievDGnOdjoMoTZ4QeZ0L4EOTtrcjsgrq0%2Bkzx3XjKf84TbGcIVZTZQDNO6Vky0UCi5RndUuDwHjCjeaCc3p0VEMefD40iCCAlyHXpYHPDzQ4hZD6RTJUG%2F4pPhhJRPqzd5%2FMd9XePhy7BAr4RN6%2B2fvj%2BqzH81Bp84oPnmcBA0dMPUGw44WY0X05ccg8aGSOv4nfk5XeLPX9iJB7%2BYZg%3D%3D")
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
                            .profileImageUrl("https://storage.googleapis.com/peakform-3d589.firebasestorage.app/user-profile/2c2134c1-d410-429f-8ea7-da0ba62534d0.jpg?GoogleAccessId=firebase-adminsdk-fbsvc@peakform-3d589.iam.gserviceaccount.com&Expires=1746540342&Signature=Dy%2B4lQFPb1JwCmHURTl9kvazfkyRxbvKLRSuYlJvjWlsG5nvAb%2FkndFa7rMf7INJavuXunjEldfw0G2aYaFkdRPnNa1kMgsO1p0o5dubinrGgxG6M6Msenfcn9qaVTqK%2B8zr2DRTCuWk6fq0pzlmQxwQPYWL2kVGvGRxLzl1iQcjYeQ3J37pQuM1Ja50GpOjhRmqmHxgpXYnXvLIA7Y6Ef7nJBnR0ksrfNVxgQLKLArHtSCvfHKSJtjpWyJWju%2F40Tc0V75vL6rOJ4AcUuHqXZu%2BmcJu1NH%2BEiK1gRyGwevHVVQS%2F8ar4tnYlq%2FL48S9EFIUnjpcC43gczZGv%2BE8vw%3D%3D")
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
                            .profileImageUrl("https://storage.googleapis.com/peakform-3d589.firebasestorage.app/user-profile/54f843ef-665c-4f9e-b4c7-414dd5495662.jpg?GoogleAccessId=firebase-adminsdk-fbsvc@peakform-3d589.iam.gserviceaccount.com&Expires=1746540343&Signature=ZPk%2F5ZoobvF2GY1WgBG2XEcUsRmcJ87y7Z3PgRrW3rkfEZw5CfTmkssUyY19k6%2BGWcirNLKCSCzzdc6NuqTrtnjDnVThg7JInTeqYUZVN1pxMg0O1ws%2BqTvWoUL%2F9rChHQ2CBA8DyMKHp5dJXOOY8kL2ku1Ev48dpr1bHkCw4sTT2l8YsvuzqcmD8BiRfL%2FiBaCVSR28hs%2BHldKvD7OqeQOZhfRobDSqVJyW5n9QiORugdvvki%2FhEVEmUCNUVCbe926woVZN4poFtamMrwwWE%2BW7DfrhLJuOWCdE4nVZZFPReX1z8YSWZNk77OCJ5GUhiSKqeJB1QM%2Fmvp6HxPdhbA%3D%3D")
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
                            .profileImageUrl("https://storage.googleapis.com/peakform-3d589.firebasestorage.app/user-profile/5d2a7b34-3c9d-4f5a-9e2b-1f9a2d7e3c4f.jpg?GoogleAccessId=firebase-adminsdk-fbsvc@peakform-3d589.iam.gserviceaccount.com&Expires=1746540344&Signature=TldPRMY3hfI%2F4bZYLlwHqHmc6SM%2F6GqzqUg2VqU9Lv1A8bKu47QCdGQAhpZdytxXNqvQzApRBvpu6G6jTTlTZA5uDZnp9T9XxSrkgVqO%2F%2BHXfCwMcD0VvQ5rZku%2BtmUs%2BXjIQUgt90x7y%2FcznuZAQVP%2Fk9kaNdHjYNQm%2Bpl3Acsn0YPB3j7UvtXgAxpfIL0fdeG%2BYoLDSNKDzyICKqrQSzFDaMmKO6jRklYF2yxL48fzZj2qM7aDg97y%2BRe0UCyUxZCRRFEF3HnRF2dAoX5v0VqwSxt0ZCoUlhFnIqCkbgscByiO0hl2024EBdFKvzee3dK9H%2FwUg9%2Fz46DWofUxaw%3D%3D")
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
                            .profileImageUrl("https://storage.googleapis.com/peakform-3d589.firebasestorage.app/user-profile/7e1f3a9d-2b4c-5d7e-8f3a-1c9d4e2b5a7f.jpg?GoogleAccessId=firebase-adminsdk-fbsvc@peakform-3d589.iam.gserviceaccount.com&Expires=1746540345&Signature=XrQdHRk4vc3WPq91CVnbVR34wiPafUnsXn6uLuNmRnHWHgYdibOIhkzQ%2Fi5Z%2B8kIZAbg8Jijme%2B%2BduRU9EYgrgIe5Fhm7Z9njvRr%2F3enJDSoJX5mBQVjNWUe7bX8qBkXnTXVhJW8lm2GRXq6MFNfE%2FPtNDa%2Bnc3P406X%2FL75sAYS2CEOMZzOsMxjG2fIHLD5I31E5uD9QCCboi1pEB91zlyeU34d6X6inIWJXv23MhOsw9NU7Pm9w83qforbvfojm6NOsR4REEndud3qCLml1a8qtNJDQuOy0j8Ir2HysCdVA7NWKKaP%2BIoC6VrYe%2BBTPv3roXvQaUtkvwprNZba%2BA%3D%3D")
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
