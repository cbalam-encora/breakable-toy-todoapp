
# Breakable Toy I - ToDo Application ☑️

This repository contains the first Breakable Toy of the Encora Spark program, a To Do App built in ReactJS + TS and Java Spring Boot.
![Project ScreenShot](https://i.ibb.co/WpgjcFh/ss-1.png)
## Prerequisites

- Node.js (v16.0.0 or higher) and npm (v7.0.0 or higher) for the frontend.
- Maven (v3.6.3 or higher) and JDK 17 for the backend.

## Getting Started

Clone the repository:
```
git clone https://github.com/RaulUrbina/breakable-toy-todoapp.git
cd breakable-toy-todoapp
```
## Backend (Spring Boot) ☕️

#### Installing Dependencies

Navigate to the backend directory and install the dependencies:
```
cd backend
mvn clean install
```

#### Running the Backend

To start the backend server, run the following command in the backend directory:
```
mvn spring-boot:run
```
The backend will be running at `http://localhost:8080`

#### Running Tests for the Backend

You can run unit tests for the backend using:
```
mvn test
```

### Frontend (React + TS) **⚛️**

#### Installing Dependencies

Navigate to the frontend directory and install the dependencies:
```
cd frontend
npm install
```
#### Running the Frontend

To run the frontend in development mode:
```
npm run dev
```
The frontend will be available at `http://localhost:9090`

#### Running Tests for the Frontend

To run unit tests using Vitest:
```
npm run test
```

