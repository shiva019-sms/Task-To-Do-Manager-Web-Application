# API Documentation

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### POST /api/auth/register
Register a new user and optionally create a team.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "team_name": "My Team" // optional
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "team_id": 1,
    "role": "admin"
  }
}
```

#### POST /api/auth/login
Authenticate user and return JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "team_id": 1,
    "role": "admin",
    "team_name": "My Team"
  }
}
```

### Tasks

#### GET /api/tasks
Get all tasks for the user's team.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Complete project setup",
    "description": "Set up the initial project structure",
    "status": "pending",
    "priority": "high",
    "due_date": "2024-01-15T10:00:00Z",
    "assigned_to": 2,
    "assigned_to_name": "Jane Smith",
    "created_by": 1,
    "created_by_name": "John Doe",
    "team_id": 1,
    "reminder_sent": false,
    "created_at": "2024-01-10T09:00:00Z",
    "updated_at": "2024-01-10T09:00:00Z"
  }
]
```

#### POST /api/tasks
Create a new task.

**Request Body:**
```json
{
  "title": "Complete project setup",
  "description": "Set up the initial project structure",
  "assigned_to": 2,
  "due_date": "2024-01-15T10:00:00Z",
  "priority": "high"
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Complete project setup",
  "description": "Set up the initial project structure",
  "status": "pending",
  "priority": "high",
  "due_date": "2024-01-15T10:00:00Z",
  "assigned_to": 2,
  "created_by": 1,
  "team_id": 1,
  "reminder_sent": false,
  "created_at": "2024-01-10T09:00:00Z",
  "updated_at": "2024-01-10T09:00:00Z"
}
```

#### PATCH /api/tasks/:id/status
Update task status.

**Request Body:**
```json
{
  "status": "completed"
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Complete project setup",
  "status": "completed",
  "updated_at": "2024-01-10T15:30:00Z"
}
```

### Users

#### GET /api/users/team
Get all team members.

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "member"
  }
]
```

#### GET /api/users/profile
Get current user profile.

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "admin",
  "team_name": "My Team"
}
```

## Error Responses

All endpoints may return these error responses:

### 400 Bad Request
```json
{
  "error": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "error": "Access denied. No token provided."
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error message"
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error