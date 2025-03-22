[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/_7UQvaE8)

### **Setting Up the Database**

1. **Install MySQL**:

   - Download and install MySQL from the [official website](https://dev.mysql.com/downloads/installer/).

2. **Create the Database**:

   - Open MySQL Workbench.
   - Create a new database named `peakform_db`.

3. **Configure the Database Server**:

   - Ensure the MySQL server is running on port `3306`.

4. **Set Up Environment Variables**:
   - Create a `.env` file in the `team-project-25spring-86\peakform` directory.
   - Add the following lines to the `.env` file, replacing `your_username` and `your_pw` with your MySQL username and password:
     ```
     DB_USERNAME=your_username
     DB_PASSWORD=your_pw
     ```

---

### **Running the Backend**

1. **Navigate to the Backend Directory**:

   - Open a terminal and navigate to the `peakform` directory:
     ```
     cd team-project-25spring-86\peakform
     ```

2. **Start the Backend Server**:
   - Run the following command to start the backend server:
     ```
     ./gradlew bootRun
     ```
   - The backend server will run on `localhost:8080`.

---

### **Running the Frontend**

1. **Navigate to the Frontend Directory**:

   - Open a terminal and navigate to the `peakform-frontend` directory:
     ```
     cd team-project-25spring-86\peakform-frontend
     ```

2. **Install Dependencies (Optional)**:

   - If you haven’t already installed the dependencies, run:
     ```
     npm install
     ```

3. **Start the Frontend Server**:
   - Run the following command to start the frontend server:
     ```
     npm run dev
     ```
   - The frontend server will run on `localhost:3000`.

---

### **Notes**

- Ensure the MySQL server is running before starting the backend.
- The `.env` file must be correctly configured for the backend to connect to the database.
- Use separate terminal windows to run the backend and frontend servers simultaneously.
