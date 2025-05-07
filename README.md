# PDF-to-MCQ Generator - PDGQG 

## Table of Contents
1. [Introduction](#introduction)
2. [Database Design](#database-design)
3. [API Specification](#api-specification)

## Introduction

The MCQ Generator is a web application that converts PDF documents into multiple-choice questions using AI. Users can upload documents and provide prompts or text input, take quizzes generated from those documents, and receive immediate feedback on their answers.

### Project Objectives
- Enable quick revision of study materials
- Automatically generate relevant MCQs from PDF documents or text input
- Provide an interactive quiz-taking experience
- Score user responses and show correct answers with explanations

### Tech Stack
- **Backend**: Node.js with Express.js and TypeScript
- **Database**: PostgreSQL
- **AI Integration**: External AI API (e.g., OpenAI, Claude)
- **PDF Processing**: pdf-parse or similar library
- **Authentication**: JWT-based authentication
- **File Storage**: Local

### Process Flow

1. User uploads PDF document or inputs text directly
2. System processes content (extracts text from PDF or uses direct text input)
3. AI analyzes content and generates MCQs
4. System stores questions and answers
5. User takes quiz (questions displayed without answers)
6. User submits completed quiz
7. System scores responses and displays results with explanations


## Database Design

### ER Diagram (PostgreSQL)

```
Users
├── id (PK)
├── username
├── email
├── password_hash
├── created_at
└── updated_at

Documents
├── id (PK)
├── user_id (FK -> Users.id)
├── title
├── file_path
├── file_size
├── content_text
├── status
├── created_at
└── updated_at

Quizzes
├── id (PK)
├── document_id (FK -> Documents.id)
├── title
├── description
├── question_count
├── difficulty_level
├── created_at
└── updated_at

Questions
├── id (PK)
├── quiz_id (FK -> Quizzes.id)
├── content
├── explanation
├── created_at
└── updated_at

Options
├── id (PK)
├── question_id (FK -> Questions.id)
├── content
├── is_correct
├── created_at
└── updated_at

QuizAttempts
├── id (PK)
├── user_id (FK -> Users.id)
├── quiz_id (FK -> Quizzes.id)
├── score
├── start_time
├── end_time
├── status
├── created_at
└── updated_at

UserAnswers
├── id (PK)
├── quiz_attempt_id (FK -> QuizAttempts.id)
├── question_id (FK -> Questions.id)
├── selected_option_id (FK -> Options.id)
├── is_correct
├── created_at
└── updated_at
```

## API Specification

### Base URL
```
https://api.pdfqg.com/v1
```

### Authentication Endpoints

#### Register User
```
POST /auth/register

Request:
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 201 Created
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "johndoe",
  "email": "john@example.com",
  "created_at": "2023-05-07T10:25:43.511Z"
}

Error Responses:
400 Bad Request - Invalid input
409 Conflict - Email already exists
```

#### Login
```
POST /auth/login

Request:
{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "johndoe",
    "email": "john@example.com"
  }
}

Error Responses:
400 Bad Request - Missing credentials
401 Unauthorized - Invalid credentials
```

#### Get Current User
```
GET /auth/me
Authorization: Bearer {token}

Response: 200 OK
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "johndoe",
  "email": "john@example.com",
  "created_at": "2023-05-07T10:25:43.511Z"
}

Error Responses:
401 Unauthorized - Missing or invalid token
```

#### Logout
```
POST /auth/logout
Authorization: Bearer {token}

Response: 200 OK
{
  "message": "Successfully logged out"
}
```

### Document Endpoints

#### Upload Document
```
POST /documents
Authorization: Bearer {token}
Content-Type: multipart/form-data

Form Data:
- title: "Biology Chapter 3"
- source_type: "pdf" (required, either "pdf" or "text_input")
- file: [PDF file] (required if source_type is "pdf")

Response: 201 Created
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "title": "Biology Chapter 3",
  "source_type": "pdf",
  "file_size": 2048576,
  "status": "pending",
  "created_at": "2023-05-07T10:30:43.511Z"
}

Error Responses:
400 Bad Request - Invalid file type or missing required fields
401 Unauthorized - Missing or invalid token
413 Payload Too Large - File exceeds size limit
```

#### Add Text Content
```
POST /documents/text
Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  "title": "Cell Biology Notes",
  "content_text": "The cell is the basic structural, functional, and biological unit of all known living organisms. Cells are the smallest unit of life that can replicate independently, and are often called the 'building blocks of life'..."
}

Response: 201 Created
{
  "id": "550e8400-e29b-41d4-a716-446655440002",
  "title": "Cell Biology Notes",
  "source_type": "text_input",
  "status": "completed",
  "created_at": "2023-05-07T11:15:22.511Z"
}

Error Responses:
400 Bad Request - Missing required fields or invalid content
401 Unauthorized - Missing or invalid token
413 Payload Too Large - Content exceeds size limit
```

#### List Documents
```
GET /documents
Authorization: Bearer {token}

Query Parameters:
- page: 1 (default)
- limit: 10 (default)
- status: "completed" (optional)

Response: 200 OK
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "title": "Biology Chapter 3",
      "status": "completed",
      "created_at": "2023-05-07T10:30:43.511Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "title": "Physics Notes",
      "status": "processing",
      "created_at": "2023-05-07T11:15:22.511Z"
    }
  ],
  "pagination": {
    "total": 2,
    "page": 1,
    "limit": 10,
    "pages": 1
  }
}

Error Responses:
401 Unauthorized - Missing or invalid token
```

#### Get Document
```
GET /documents/{id}
Authorization: Bearer {token}

Response: 200 OK
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "title": "Biology Chapter 3",
  "file_path": "documents/550e8400-e29b-41d4-a716-446655440001.pdf",
  "file_size": 2048576,
  "status": "completed",
  "created_at": "2023-05-07T10:30:43.511Z",
  "updated_at": "2023-05-07T10:32:15.511Z"
}

Error Responses:
401 Unauthorized - Missing or invalid token
403 Forbidden - Not authorized to access this document
404 Not Found - Document not found
```

#### Delete Document
```
DELETE /documents/{id}
Authorization: Bearer {token}

Response: 204 No Content

Error Responses:
401 Unauthorized - Missing or invalid token
403 Forbidden - Not authorized to delete this document
404 Not Found - Document not found
```

### Quiz Endpoints

#### Generate Quiz
```
POST /documents/{id}/generate-quiz
Authorization: Bearer {token}

Request:
{
  "title": "Biology Chapter 3 Quiz",
  "description": "Test your knowledge of cell biology",
  "question_count": 10,
  "difficulty_level": "medium"
}

Response: 202 Accepted
{
  "id": "550e8400-e29b-41d4-a716-446655440003",
  "title": "Biology Chapter 3 Quiz",
  "description": "Test your knowledge of cell biology",
  "question_count": 10,
  "difficulty_level": "medium",
  "status": "processing",
  "created_at": "2023-05-07T10:35:43.511Z"
}

Error Responses:
400 Bad Request - Invalid input
401 Unauthorized - Missing or invalid token
403 Forbidden - Not authorized to access this document
404 Not Found - Document not found
409 Conflict - Quiz generation already in progress
```

#### List Quizzes
```
GET /quizzes
Authorization: Bearer {token}

Query Parameters:
- page: 1 (default)
- limit: 10 (default)
- document_id: UUID (optional)

Response: 200 OK
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440003",
      "title": "Biology Chapter 3 Quiz",
      "document_id": "550e8400-e29b-41d4-a716-446655440001",
      "document_title": "Biology Chapter 3",
      "question_count": 10,
      "created_at": "2023-05-07T10:35:43.511Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440004",
      "title": "Physics Fundamentals",
      "document_id": "550e8400-e29b-41d4-a716-446655440002",
      "document_title": "Physics Notes",
      "question_count": 15,
      "created_at": "2023-05-07T11:20:43.511Z"
    }
  ],
  "pagination": {
    "total": 2,
    "page": 1,
    "limit": 10,
    "pages": 1
  }
}

Error Responses:
401 Unauthorized - Missing or invalid token
```

#### Get Quiz
```
GET /quizzes/{id}
Authorization: Bearer {token}

Response: 200 OK
{
  "id": "550e8400-e29b-41d4-a716-446655440003",
  "title": "Biology Chapter 3 Quiz",
  "description": "Test your knowledge of cell biology",
  "document_id": "550e8400-e29b-41d4-a716-446655440001",
  "document_title": "Biology Chapter 3",
  "question_count": 10,
  "difficulty_level": "medium",
  "created_at": "2023-05-07T10:35:43.511Z",
  "updated_at": "2023-05-07T10:38:22.511Z"
}

Error Responses:
401 Unauthorized - Missing or invalid token
403 Forbidden - Not authorized to access this quiz
404 Not Found - Quiz not found
```

#### Delete Quiz
```
DELETE /quizzes/{id}
Authorization: Bearer {token}

Response: 204 No Content

Error Responses:
401 Unauthorized - Missing or invalid token
403 Forbidden - Not authorized to delete this quiz
404 Not Found - Quiz not found
```

### Quiz Taking Endpoints

#### Start Quiz Attempt
```
POST /quizzes/{id}/start
Authorization: Bearer {token}

Response: 201 Created
{
  "attempt_id": "550e8400-e29b-41d4-a716-446655440005",
  "quiz_id": "550e8400-e29b-41d4-a716-446655440003",
  "start_time": "2023-05-07T10:40:43.511Z",
  "status": "in_progress"
}

Error Responses:
401 Unauthorized - Missing or invalid token
403 Forbidden - Not authorized to access this quiz
404 Not Found - Quiz not found
409 Conflict - Another attempt already in progress
```

#### Get Quiz Questions
```
GET /quiz-attempts/{id}/questions
Authorization: Bearer {token}

Response: 200 OK
{
  "quiz_title": "Biology Chapter 3 Quiz",
  "questions": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440006",
      "content": "Which organelle is responsible for protein synthesis?",
      "options": [
        {
          "id": "550e8400-e29b-41d4-a716-446655440010",
          "content": "Ribosome"
        },
        {
          "id": "550e8400-e29b-41d4-a716-446655440011",
          "content": "Mitochondria"
        },
        {
          "id": "550e8400-e29b-41d4-a716-446655440012",
          "content": "Golgi Apparatus"
        },
        {
          "id": "550e8400-e29b-41d4-a716-446655440013",
          "content": "Lysosome"
        }
      ]
    },
    // More questions...
  ]
}

Error Responses:
401 Unauthorized - Missing or invalid token
403 Forbidden - Not authorized to access this attempt
404 Not Found - Quiz attempt not found
```

#### Submit Quiz Answers
```
POST /quiz-attempts/{id}/submit
Authorization: Bearer {token}

Request:
{
  "answers": [
    {
      "question_id": "550e8400-e29b-41d4-a716-446655440006",
      "selected_option_id": "550e8400-e29b-41d4-a716-446655440010"
    },
    // More answers...
  ]
}

Response: 200 OK
{
  "message": "Quiz submitted successfully",
  "attempt_id": "550e8400-e29b-41d4-a716-446655440005",
  "end_time": "2023-05-07T10:50:43.511Z",
  "status": "completed"
}

Error Responses:
400 Bad Request - Invalid answer format
401 Unauthorized - Missing or invalid token
403 Forbidden - Not authorized to access this attempt
404 Not Found - Quiz attempt not found
409 Conflict - Quiz already submitted
```

#### Get Quiz Results
```
GET /quiz-attempts/{id}/results
Authorization: Bearer {token}

Response: 200 OK
{
  "quiz_title": "Biology Chapter 3 Quiz",
  "score": 80.0,
  "total_questions": 10,
  "correct_answers": 8,
  "start_time": "2023-05-07T10:40:43.511Z",
  "end_time": "2023-05-07T10:50:43.511Z",
  "questions": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440006",
      "content": "Which organelle is responsible for protein synthesis?",
      "selected_option_id": "550e8400-e29b-41d4-a716-446655440010",
      "is_correct": true,
      "options": [
        {
          "id": "550e8400-e29b-41d4-a716-446655440010",
          "content": "Ribosome",
          "is_correct": true
        },
        {
          "id": "550e8400-e29b-41d4-a716-446655440011",
          "content": "Mitochondria",
          "is_correct": false
        },
        {
          "id": "550e8400-e29b-41d4-a716-446655440012",
          "content": "Golgi Apparatus",
          "is_correct": false
        },
        {
          "id": "550e8400-e29b-41d4-a716-446655440013",
          "content": "Lysosome",
          "is_correct": false
        }
      ],
      "explanation": "Ribosomes are the cellular structures responsible for protein synthesis. They can be found floating in the cytoplasm or attached to the endoplasmic reticulum."
    },
    // More questions with answers and explanations...
  ]
}

Error Responses:
401 Unauthorized - Missing or invalid token
403 Forbidden - Not authorized to access this attempt
404 Not Found - Quiz attempt not found or not completed
```

### User Statistics Endpoints

#### Get User Stats
```
GET /users/stats
Authorization: Bearer {token}

Response: 200 OK
{
  "total_documents": 5,
  "total_quizzes": 8,
  "total_quiz_attempts": 12,
  "average_score": 78.5,
  "quizzes_completed_last_30_days": 6
}

Error Responses:
401 Unauthorized - Missing or invalid token
```

#### Get Quiz History
```
GET /users/quiz-history
Authorization: Bearer {token}

Query Parameters:
- page: 1 (default)
- limit: 10 (default)

Response: 200 OK
{
  "data": [
    {
      "attempt_id": "550e8400-e29b-41d4-a716-446655440005",
      "quiz_id": "550e8400-e29b-41d4-a716-446655440003",
      "quiz_title": "Biology Chapter 3 Quiz",
      "score": 80.0,
      "date": "2023-05-07T10:50:43.511Z",
      "status": "completed"
    },
    // More history items...
  ],
  "pagination": {
    "total": 12,
    "page": 1,
    "limit": 10,
    "pages": 2
  }
}

Error Responses:
401 Unauthorized - Missing or invalid token
```