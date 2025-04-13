# How to Run Integration Test

## Test Prerequisites

- Make sure you have **Docker** installed.
- Pull the **latest code** from the repository.

## Run the Tests

From the backend root directory, run:

```bash
./gradlew clean test
```

## Check Test Details

- **Test Report:**  
  Open the following file in your browser:  
  `peakform/build/reports/tests/test/index.html`

- **Test Coverage:**  
  Open the following file in your browser:  
  `peakform/build/reports/jacoco/test/html/index.html`

## Good Practice

- Always run tests **after making changes** and **before committing** your code.

## APIs with Automated Tests

### GymController

- **Get all gyms:**  
  `GET http://<ip>:<port>/gyms`

- **Get a specific gym:**  
  `GET http://<ip>:<port>/gyms/{gymId}?userUuid={userUuid}`

---

_Last updated: 7 April, 22:21 by Hok Layheng_