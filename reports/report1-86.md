# CS304: Software Engineering - Project Proposal

**PeakForm: Personal Fitness Assistance Web App**—This project aims to bridge the gap between technology and fitness by creating an intelligent, user-centric platform that enhances workout routines and helps users achieve their fitness goals more effectively. In today’s fast-paced world, staying consistent with fitness routines can be challenging. By offering personalized AI-powered workouts, seamless scheduling, and detailed performance tracking, this application provides an all-in-one solution to make fitness management both easier and more engaging. Additionally, integrating social features and a leaderboard fosters motivation through friendly competition, making the fitness journey more enjoyable and rewarding. This project not only leverages advanced technologies to streamline fitness but also promotes healthier lifestyles, empowering users to stay committed and achieve lasting results.

## **I. Functional Requirements**

### 1. **Training Task Management**

- Users can organize their weekly workout plans by selecting exercises from a predefined list for each workout day.
- Users can establish training goals, such as workout consistency, body weight targets, water intake streaks, and strength progress in compound exercises.
- Users can input, delete, or update their water intake, workout duration, and calories burned daily. These metrics reset at the start of each new day.
- Users receive reminders for their scheduled workout plans.

### **2. Training Statistics Dashboard**

- Users can monitor their current water intake, calories burned, and workout duration for the day.
- Users can track fitness progress through historical records of weights, heights, workout duration, training streaks, water intake, average calories burned, and personal records in compound exercises.
- Users can view a list of their earned achievement badges.

### **3. Gym Appointment System**

- Users can book gym sessions based on available slots.
- Users can cancel appointments if necessary.
- Users can access a list of both their upcoming and past appointments.
- Users receive reminders for upcoming gym appointments.

### **4. Paid AI-Powered Personalized Workouts**

- Users can input personal details such as age, gender, weight, height, and fitness goals (e.g., stay fit, lose weight, build muscle, achieve definition, or improve mental health).
- The AI system generates a personalized workout plan based on user input, including the number of workout days per week and preferred workout duration.
- This is a paid feature for only premium users.

### **5. Social Sharing and Leaderboard**

- Users can follow other users to stay connected and motivated.
- Users can view other users’ basic information and their earned achievement badges.
- A leaderboard ranks users based on various fitness metrics to encourage friendly competition.

## **II. Non-functional Requirements**

### 1. **Seamless and Secure Access**

The platform will implement OAuth2 authentication to provide a streamlined and secure login experience. This ensures that user data remains protected while allowing convenient access from any location.

### 2. **Enhanced Usability**

The web application will prioritize an intuitive user experience through optimized responsive UI/UX design. A user-friendly interface will be developed to facilitate seamless navigation and interaction.

### 3. **Optimized Performance**

To enhance responsiveness, the system will be optimized for fast page-load speeds and efficient API communication with the backend. For each query, users should be able to get results within three seconds. This will ensure a smooth and efficient user experience.

## **III. Data Requirements**

### 1. Required Data

- **User Profile Data:** Name, email, age, weight, height, fitness goals.
- **Workout Data:** Exercise type, duration, sets, reps, weights, and calories burned.
- **Gym Data:** Gym Name, location, membership price, opening hours, and facilities.
- **Booking Data:** Preferred gym, session time, availability status.
- **Performance Tracking Data:** Streaks, personal records, historical progress.
- **Social & Competition Data:** Friends list, leaderboard rankings, achievements.

### 2. How to Get the Data

- **User Input:** Users manually input personal details and workout logs.
- **API Integration:** Fetch data from backend database.
- **AI Analysis:** Predict progress and suggest workouts based on past activity trends.

## **IV. Technical Requirements**

### 1. Operating Environment

The system will be deployed as a web-based application, ensuring accessibility across multiple devices and platforms. It will support:

- **Browsers:** Chrome, Firefox, Edge, Safari (latest stable versions).
- **Devices:** Desktop, Laptop, Tablet, and Mobile (responsive design ensured via Tailwind CSS).
- **Operating Systems:** Windows, macOS, Linux, Android, iOS (via browser access).
- **Hosting Environment:** Cloud-based deployment (AWS, Firebase, or DigitalOcean) with scalable backend support.

### 2. Tech Stack

- **Frontend**  
  - **Core Technologies**  
    - **HTML:** Defines the structure and content of web pages.  
    - **CSS:** Styles the web application.. 
    - **JavaScript:** Adds interactivity, handles data fetching, and powers dynamic content.

  - **Frameworks**  
    - **React:** A component-based JavaScript library for building dynamic, reusable UI elements.  
    - **Tailwind CSS:** A utility-first CSS framework that streamlines styling with pre-defined classes for responsive UI.

- **Backend**  
  - **Frameworks and Tools**  
    - **Spring Boot:** Provides a robust Java framework for building scalable backend services and APIs.  
    - **Gradle:** Manages project builds, dependencies, and automation tasks.  
    - **Postman:** A tool for testing and validating API endpoints to ensure proper functionality.  The tool can also be utitlized for API documentation.
    - **JUnit:** A testing framework to write and run automated tests for backend logic.

  - **Database Management System**  
    - **MySQL:** A relational database system to store structured data like user profiles, workouts, and bookings.
  - **AI Integration**  
    - **OpenAI API:** Generates personalized workout plans using user data and fitness goals.  
    - **TensorFlow.js:** Adds machine learning capabilities for on-device analysis.
  

