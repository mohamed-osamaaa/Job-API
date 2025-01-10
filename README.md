https://github.com/user-attachments/assets/23b6f9cc-160a-437c-9565-de4b116f50b4

# Job-API

Job-API is a RESTful API built with Node.js and Express, designed to manage users and job postings. This API allows you to perform CRUD (Create, Read, Update, Delete) operations on both users and jobs, providing a robust backend solution for job management applications.

## Features

- **User Management**
  - Create, read, update, and delete user profiles.
  - Secure user authentication and authorization.

- **Job Management**
  - Create, read, update, and delete job postings.
  - Assign jobs to specific users.

- **Error Handling**
  - Centralized error handling for cleaner and more maintainable code.

- **Scalability**
  - Built with modern practices to ensure the API scales with application needs.

## Technologies Used

- Node.js
- Express.js
- MongoDB (or your preferred database)
- Mongoose (for MongoDB schema and query handling)
- JSON Web Tokens (JWT) for authentication

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mohamed-osamaaa/Job-API.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Job-API
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. The API will be accessible at `http://localhost:3000`.

## API Endpoints

### Users
- **POST** `/api/users` - Create a new user
- **GET** `/api/users` - Retrieve all users
- **GET** `/api/users/:id` - Retrieve a single user by ID
- **PUT** `/api/users/:id` - Update user details
- **DELETE** `/api/users/:id` - Delete a user

### Jobs
- **POST** `/api/jobs` - Create a new job
- **GET** `/api/jobs` - Retrieve all jobs
- **GET** `/api/jobs/:id` - Retrieve a single job by ID
- **PUT** `/api/jobs/:id` - Update job details
- **DELETE** `/api/jobs/:id` - Delete a job


