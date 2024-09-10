Endpoint Documentation

1. Test the List of Subjects
Endpoint: GET /api/subjects
Steps:
1. Open Postman and create a new request.
2. Set the request method to GET.
3. Enter the URL for your local or deployed API (e.g., http://localhost:4000/api/subjects).
4. Click on "Send" to execute the request.
5. Verify the response:
    * Check that you get a 200 OK status.
    * Verify that the response body contains a list of subjects.
Response with 200 status code:

{
  "message": "Success",
  "data": {
    "subjects": [
      {
        "id": 1,
        "title": "Introduction to Programming",
        "createdAt": "2024-09-10T00:03:05.963Z",
        "updatedAt": "2024-09-10T00:03:05.963Z"
      },
      {
        "id": 2,
        "title": "Advanced Database Systems",
        "createdAt": "2024-09-10T00:03:05.963Z",
        "updatedAt": "2024-09-10T00:03:05.963Z"
      }
    ]
  }
}

2. Test the List of Topics by Subject
Endpoint: GET /api/topics/subject/:subjectId
Steps:
1. Open Postman and create a new request.
2. Set the request method to GET.
3. Enter the URL with a valid subjectId (e.g., http://localhost:4000/api/topics/subject/1).
4. Click on "Send" to execute the request.
5. Verify the response:
    * Check that you get a 200 OK status.
    * Verify that the response body contains a list of topics for the specified subject.
Response with 200 status code:

{
  "message": "Success",
  "data": {
    "topics": [
      {
        "id": 1,
        "title": "Variables and Data Types",
        "video": "http://example.com/video1.mp4",
        "description": "An introduction to variables and data types in programming.",
        "createdAt": "2024-09-10T00:03:06.279Z",
        "updatedAt": "2024-09-10T00:03:06.279Z"
      },
      {
        "id": 2,
        "title": "Control Structures",
        "video": "http://example.com/video2.mp4",
        "description": "Learn about different control structures in programming.",
        "createdAt": "2024-09-10T00:03:06.279Z",
        "updatedAt": "2024-09-10T00:03:06.279Z"
      }
    ]
  }
}

3. Test the Topic Information
Endpoint: GET /api/topics/:topicId
Steps:
1. Open Postman and create a new request.
2. Set the request method to GET.
3. Enter the URL with a valid topicId (e.g., http://localhost:4000/api/topics/1).
4. Click on "Send" to execute the request.
5. Verify the response:
    * Check that you get a 200 OK status.
    * Verify that the response body contains the topic details, including title, video, and description.
Response with 200 status code:

{
  "message": "Success",
  "data": {
    "topic": {
      "id": 1,
      "title": "Variables and Data Types",
      "video": "http://example.com/video1.mp4",
      "description": "An introduction to variables and data types in programming.",
      "createdAt": "2024-09-10T00:03:06.279Z",
      "updatedAt": "2024-09-10T00:03:06.279Z"
    }
  }
}

4. Test Tracking Topic Completion
Endpoint: POST /api/completions/complete-topic
Request Body:

{
  "userId": 1,
  "topicId": 2,
  "subjectId": 2
}
Steps:
1. Open Postman and create a new request.
2. Set the request method to POST.
3. Enter the URL for your local or deployed API (e.g., http://localhost:4000/api/completions/complete-topic).
4. Go to the "Body" tab and select raw and JSON format.
5. Enter the JSON data in the request body.
6. Click on "Send" to execute the request.
7. Verify the response:
    * Check that you get a 200 OK status.
    * Verify the response body to ensure it confirms the completion was tracked.
Response with 400 status code:

{
  "message": "Topic already completed by this user",
  "error": "Topic already completed by this user"
}

5. Test Tracking Subject Completion
Endpoint: POST /api/completions/complete-subject
Request Body:

{
  "userId": 1,
  "subjectId": 1
}
Steps:
1. Open Postman and create a new request.
2. Set the request method to POST.
3. Enter the URL for your local or deployed API (e.g., http://localhost:4000/api/completions/complete-subject).
4. Go to the "Body" tab and select raw and JSON format.
5. Enter the JSON data in the request body.
6. Click on "Send" to execute the request.
7. Verify the response:
    * Check that you get a 200 OK status.
    * Verify the response body to ensure it confirms the subject completion was tracked.
Response with 200 status code:

{
  "message": "Subject marked as completed"
}

6. Test Ranking Learners by Subject
Endpoint: GET /api/rankings/:subjectId
Steps:
1. Open Postman and create a new request.
2. Set the request method to GET.
3. Enter the URL with a valid subjectId (e.g., http://localhost:4000/api/rankings/1).
4. Click on "Send" to execute the request.
5. Verify the response:
    * Check that you get a 200 OK status.
    * Verify that the response body contains rankings of learners based on their completion rate.
Response with 200 status code:

{
  "message": "Rankings fetched successfully",
  "data": {
    "rankings": [
      {
        "userId": 1,
        "completionRate": 100
      }
    ]
  }
}

7. Test User Subject Completion Status
Endpoint: GET /api/completions/status/:userId/:subjectId
Steps:
1. Open Postman and create a new request.
2. Set the Request Type to GET.
3. Enter the URL with actual userId and subjectId values (e.g., http://localhost:4000/api/completions/status/1/1).
4. Click on the "Send" button in Postman.
5. Verify the response:
    * You should see a response with the completion status of the user for the subject.
Response with 200 status code:

{
  "message": "User subject completion status retrieved successfully",
  "data": {
    "userId": 1,
    "subjectId": 1,
    "allTopicsCompleted": true
  }
}

8. Authentication Endpoints
8.1 Register Endpoint
Endpoint: POST /api/auth/register
Description: Registers a new user.
Request Body:

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword"
}
Response:

{
  "message": "User registered successfully",
  "data": {
    "userId": 1,
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}

8.2 Login Endpoint
Endpoint: POST /api/auth/login
Description: Authenticates a user and returns a JWT token.
Request Body:

{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
Response:

{
  "message": "Login successful",
  "data": {
    "token": "jwt-token-here"
  }
}
