package com.sustech.cs304.project.peakform.config;

import com.sustech.cs304.project.peakform.domain.*;
import com.sustech.cs304.project.peakform.repository.*;
import com.sustech.cs304.project.peakform.service.GymScheduleService;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
    private final UserScheduleRepository userScheduleRepository;

    @Transactional
    @PostConstruct
    public void init() {
        clearData();
        initUserData();
        initExerciseData();
        initGymData();
        initGymScheduleData();
        initUserScheduleData();
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
                            .build(),
                    User.builder()
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
                            .username("Kenpachi Zaraki")
                            .email("esok@paragoniu.edu.kh")
                            .password(bCryptPasswordEncoder.encode("1"))
                            .age(35)
                            .gender(User.Gender.MALE)
                            .bio("The Berserker of Soul Society")
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
                            .startTime(LocalTime.of(2, 0))
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

    private void initGymScheduleData() {
        List<Gym> gyms = gymRepository.findAll();
        for (Gym gym : gyms) {
            gymScheduleRepository.saveAll(gymScheduleService.generateGymSchedules(gym.getGymId()));
        }
    }

//    private void initUserScheduleData() {
//        if (userScheduleRepository.count() == 0) {
//            List<UserSchedule> userSchedules = List.of(
//                    UserSchedule.builder()
//                            .user(userRepository.findByEmail("prakbunlong53@gmail.com").get())
//                            .gymSchedule(gymScheduleRepository.findById(2L).get())
//                            .build(),
//                    UserSchedule.builder()
//                            .user(userRepository.findByEmail("shor1@paragoniu.edu.kh").get())
//                            .gymSchedule(gymScheduleRepository.findById(6L).get())
//                            .build(),
//                    UserSchedule.builder()
//                            .user(userRepository.findByEmail("esok@paragoniu.edu.kh").get())
//                            .gymSchedule(gymScheduleRepository.findById(6L).get())
//                            .build(),
//                    UserSchedule.builder()
//                            .user(userRepository.findByEmail("bzhou@paragoniu.edu.kh").get())
//                            .gymSchedule(gymScheduleRepository.findById(10L).get())
//                            .build(),
//                    UserSchedule.builder()
//                            .user(userRepository.findByEmail("sussycourses@gmail.com").get())
//                            .gymSchedule(gymScheduleRepository.findById(28L).get())
//                            .build()
//            );
//            userScheduleRepository.saveAll(userSchedules);
//
////            for (UserSchedule userSchedule : userSchedules) {
////                GymSchedule gymSchedule = userSchedule.getGymSchedule();
////                System.out.println("GymScheduleId: " + gymSchedule.getGymScheduleId());
////                System.out.println("PreAvailableSlots: " + gymSchedule.getAvailableSlots());
////                gymSchedule.setAvailableSlots(gymSchedule.getAvailableSlots() - 1);
////                if (gymSchedule.getAvailableSlots() == 0) {
////                    gymSchedule.setStatus(GymSchedule.Status.FULL);
////                }
////                gymScheduleRepository.save(gymSchedule);
////                System.out.println("PostAvailableSlots: " + gymSchedule.getAvailableSlots());
////            }
//
//            Map<GymSchedule, Long> scheduleCounts = userSchedules.stream()
//                    .collect(Collectors.groupingBy(UserSchedule::getGymSchedule, Collectors.counting()));
//
//            for (Map.Entry<GymSchedule, Long> entry : scheduleCounts.entrySet()) {
//                GymSchedule gymSchedule = entry.getKey();
//                long count = entry.getValue();
//
//                System.out.println("GymScheduleId: " + gymSchedule.getGymScheduleId());
//                System.out.println("PreAvailableSlots: " + gymSchedule.getAvailableSlots());
//
//                gymSchedule.setAvailableSlots(gymSchedule.getAvailableSlots() - (int) count);
//
//                if (gymSchedule.getAvailableSlots() <= 0) {
//                    gymSchedule.setAvailableSlots(0);
//                    gymSchedule.setStatus(GymSchedule.Status.FULL);
//                }
//
//                gymScheduleRepository.save(gymSchedule);
//                System.out.println("PostAvailableSlots: " + gymSchedule.getAvailableSlots());
//            }
//        }
//    }

    /**
     * AI-generated-content
     * tool: ChatGPT
     * version: 4o
     * usage: I had a persistent bug that I could not update the available slots correctly when I had to update the same
     * available slots twice. I copied and pasted my original code and asked ChatGPT to fix it. I copied and pasted the
     * code from ChatGPT, then made some modifications. I learned from it that I should fetch all GymSchedule instances
     * in one query and caches them in Map to avoid fetching the same schedule multiple times, so that it holds the same
     * reference.
     */
    private void initUserScheduleData() {
        if (userScheduleRepository.count() == 0) {
            // Fetch all required GymSchedules in one batch
            List<Long> gymScheduleIds = List.of(2L, 6L, 10L, 28L);
            Map<Long, GymSchedule> gymScheduleMap = gymScheduleRepository.findAllById(gymScheduleIds)
                    .stream()
                    .collect(Collectors.toMap(GymSchedule::getGymScheduleId, schedule -> schedule));

            // Create user schedules with shared GymSchedule references
            List<UserSchedule> userSchedules = List.of(
                    UserSchedule.builder()
                            .user(userRepository.findByEmail("prakbunlong53@gmail.com").get())
                            .gymSchedule(gymScheduleMap.get(2L))
                            .build(),
                    UserSchedule.builder()
                            .user(userRepository.findByEmail("shor1@paragoniu.edu.kh").get())
                            .gymSchedule(gymScheduleMap.get(6L))
                            .build(),
                    UserSchedule.builder()
                            .user(userRepository.findByEmail("esok@paragoniu.edu.kh").get())
                            .gymSchedule(gymScheduleMap.get(6L))
                            .build(),
                    UserSchedule.builder()
                            .user(userRepository.findByEmail("bzhou@paragoniu.edu.kh").get())
                            .gymSchedule(gymScheduleMap.get(10L))
                            .build(),
                    UserSchedule.builder()
                            .user(userRepository.findByEmail("sussycourses@gmail.com").get())
                            .gymSchedule(gymScheduleMap.get(28L))
                            .build()
            );

            userScheduleRepository.saveAll(userSchedules);

            // Update available slots
            for (GymSchedule gymSchedule : gymScheduleMap.values()) {
                long count = userSchedules.stream()
                        .filter(userSchedule -> userSchedule.getGymSchedule().equals(gymSchedule))
                        .count();

                gymSchedule.setAvailableSlots(gymSchedule.getAvailableSlots() - (int) count);

                if (gymSchedule.getAvailableSlots() <= 0) {
                    gymSchedule.setAvailableSlots(0);
                    gymSchedule.setStatus(GymSchedule.Status.FULL);
                }

                gymScheduleRepository.save(gymSchedule);
            }
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
