# ANMAR25 - Surprise Challenge (Taskly API)

## Description

This project is a Node.js API for managing tasks and notes, developed as part of the AWS Node.js MAR25 surprise challenge. The application allows users to create, read, update, and delete tasks, as well as handle notes associated with each task.

## Technologies

- **Node.js** - Backend framework
- **Express** - Web framework for building the API
- **Prisma** - ORM for database management
- **MySQL** - Database for storing task and note data
- **Zod** - Validation library for input validation
- **TypeScript** - Type-safe JavaScript
- **Docker** - For containerization

## Installation

### Prerequisites
- Node.js (v20.x or later)
- Docker (for running MySQL in a container)
- A MySQL server or Docker for local development

### Steps to Set Up

1. **Clone the repository:**

   ```bash
   git clone https://github.com/thiagosampaiog/ANMAR25_DSUP_TASKLY.git
   cd ANMAR25_DSUP_TASKLY
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file at the root of the project with the following variables:

   ```plaintext
   DATABASE_URL="mysql://root:MySQL1234!@localhost:3306/taskly"
   ```

   Replace `localhost` with your database host if necessary.

4. **Run Prisma migrations:**

   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Build the project:**

   ```bash
   npm run build
   ```

6. **Start the API:**

   ```bash
   npm run start
   ```

   The server will start at `http://localhost:3000`.

## Docker Setup

To run the application with Docker, follow these steps:

1. **Build and run the containers:**

   ```bash
   docker-compose up --build
   ```

2. **Check if everything is running:**

   You should now be able to access the API at `http://localhost:3000`.

## API Routes

### **Tasks**

#### **GET** `/tasks`: Get all tasks  
**Query Params (optional):**  
- `page`: page number (default: `1`)  
- `limit`: number of tasks per page (default: `10`)  
- `status`: filter by task status (e.g., `PENDING`, `IN_PROGRESS`, `DONE`)  
- `priority`: filter by task priority (e.g., `LOW`, `MEDIUM`, `HIGH`)  
- `title`: search for tasks containing this string in the title (case-insensitive)

**Response:**
```json
{
  "data": [...],
  "currentPage": 1,
  "pageSize": 10,
  "totalItems": 42,
  "totalPages": 5
}
```

#### **GET** `/tasks/:id`: Get a specific task by ID  
**Response**: Task object

#### **GET** `/tasks/priority/:priority`: Get tasks by priority  
**Response**: List of tasks

#### **GET** `/tasks/status/:status`: Get tasks by status  
**Response**: List of tasks

#### **POST** `/tasks`: Create a new task  
**Request Body:**
```json
{
  "title": "Task title",
  "description": "Task description",
  "status": "Todo",
  "priority": "Low"
}
```
**Response**: Newly created task

#### **PUT** `/tasks/:id`: Update a task by ID  
**Request Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description"
  "status": "Todo",
  "priority": "Low"
}
```
**Response**: Updated task

#### **DELETE** `/tasks/:id`: Delete a task by ID  
**Response**: Success message

### **Notes**

#### **GET** `/notes/:id`: Get note by ID  
**Response**: Note object

#### **POST** `/tasks/:taskId/notes`: Create a note for a task  
**Request Body:**
```json
{
  "content": "Note content"
}
```
**Response**: Newly created note

#### **GET** `/tasks/:taskId/notes`: Get all notes for a specific task  
**Response**: List of notes

#### **PUT** `/notes/:id`: Update a note by ID  
**Response**: Updated note

#### **DELETE** `/notes/:id`: Delete a note by ID  
**Response**: Success message

## Docker Compose

This project includes a `docker-compose.yml` file to run both the API and MySQL database in containers. The API container depends on the MySQL container to be up and running.

### To start the services:

```bash
docker-compose up --build
```

- The API will be available at `http://localhost:3000`.
- The MySQL database will run on port `3306`.

## File Structure

- `src/`: Source code for the API
- `prisma/`: Prisma schema and migrations
- `docker-compose.yml`: Docker Compose configuration file
- `Dockerfile`: Dockerfile for the API container
- `package.json`: Project dependencies and scripts
- `tsconfig.json`: TypeScript configuration
