Secure Student Data Management API
This Express.js-based REST API provides secure student data management. Users can register, log in, and perform CRUD operations on student records. Each user’s data is protected, and token-based authentication ensures secure access.

Features
User Registration and Authentication:
Users register using their email, name, and password.
Upon successful login, a session is created, and session data is stored.
Custom middleware ensures that only authorized users can access protected routes.
Token-Based Authentication:
Token authentication system using JSON Web Tokens (JWT).
When a user logs in, a token is generated and sent to the client.
Subsequent requests include this token for authentication.
Student Data Management:
CRUD operations (Create, Read, Update, Delete) for student data.
Each user can only access their own student records.
Middleware checks session data and token validity.
Access Limits:
Users can access data up to three times using their token.
Installation
Clone this repository:
git clone https://github.com/your-username/secure-student-data-api.git

Install dependencies:
cd secure-student-data-api
npm install

Set up your environment variables (e.g., database connection details, JWT secret).
Start the server:
npm start

API Endpoints
POST /register: User registration
POST /login: User login
GET /students: Get all student records
GET /students/:id: Get a specific student record
POST /students: Add a new student record
PUT /students/:id: Update a student record
DELETE /students/:id: Delete a student record
Usage
Register a user using /register.
Log in using /login to obtain a token.
Include the token in the Authorization header for subsequent requests.
Contributing
Contributions are welcome! Please open an issue or submit a pull request.
