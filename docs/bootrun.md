# How to Run the Project Backend

## Prerequisites

- Docker must be installed on your system.

## Running via CLI

### Start

- Open a terminal at the backend root directory.

- Run the following command:

  ```bash
  ./gradlew bootRun
  ```

### Stop

- Press `Ctrl + C` in the terminal to stop the server.

## Running via IntelliJ IDEA GUI

### Start

1. Click **Edit Configurations...**

   ![Step 1: Edit Configurations](/Users/layhenghok/Desktop/SUSTech/Year3Semester2/CS304-Software-Engineering/Project/Codebase/team-project-25spring-86/docs/assets/img/gui1.png)

2. Add a new Gradle configuration.

   ![Step 2: Add New Gradle Config](/Users/layhenghok/Desktop/SUSTech/Year3Semester2/CS304-Software-Engineering/Project/Codebase/team-project-25spring-86/docs/assets/img/gui2.png)

3. Fill in the required fields as shown, then click **Apply**.

   ![Step 3: Configuration Details](/Users/layhenghok/Desktop/SUSTech/Year3Semester2/CS304-Software-Engineering/Project/Codebase/team-project-25spring-86/docs/assets/img/gui3.png)

4. Click the **Run** button to start the backend.

### Stop

- Click the **Stop** button in IntelliJ IDEA.

## Docker Cleanup (Manual for Now)

To clean up Docker containers after stopping the backend (temporary manual step):

- Open a terminal at the backend root directory.
- Run the following command:

  ```bash
  docker compose down
  ```

---

_Last updated: 13 April, 17:45 by Hok Layheng_