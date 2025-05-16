# API Gateway Flights - API Documentation

##### This API Gateway serves as the user management interface for the Flights application. It provides endpoints for user registration, login, role assignment, and user data retrieval. Authentication is handled via JWT tokens to secure the endpoints. Only authorized users with proper roles (like admin) can perform certain sensitive operations such as assigning roles.

## Base URL

```
http://localhost:3001/api/v1
```

---

## Authentication

- **JWT-based authentication** is used.
- Pass the JWT token in the `x-access-token` header as:  
  ```
  x-access-token: Bearer <token>
  ```

---

## Endpoints

### 1. User Signup

**POST** `/user/signup`

Create a new user account.

#### Request

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

#### Response (201 Created)

```json
{
  "success": true,
  "message": "Successfully created the User",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "updatedAt": "2024-06-28T12:34:56.789Z",
    "createdAt": "2024-06-28T12:34:56.789Z"
  },
  "error": {}
}
```

#### Error Response (400 Bad Request)

```json
{
  "success": false,
  "message": "Something went wrong while creating User",
  "data": {},
  "error": {
    "statusCode": 400,
    "details": ["Validation error message(s)"]
  }
}
```

---

### 2. User Signin

**POST** `/user/signin`

Authenticate a user and receive a JWT token.

#### Request

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

#### Response (200 OK)

```json
{
  "success": true,
  "message": "Successfully Logged in",
  "data": {
    "jwt": "<token>"
  },
  "error": {}
}
```

#### Error Response (400/404)

```json
{
  "success": false,
  "message": "Log in failed",
  "data": {},
  "error": {
    "statusCode": 400,
    "details": "Username and Password does not match"
  }
}
```

---

### 3. Get User by ID

**GET** `/user/:id`

Fetch user details by user ID.

#### Request Headers

```
x-access-token: Bearer <token>
```

#### Response (200 OK)

```json
{
  "success": true,
  "message": "Successfully fetched the User",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "createdAt": "2024-06-28T12:34:56.789Z",
    "updatedAt": "2024-06-28T12:34:56.789Z"
  },
  "error": {}
}
```

#### Error Response (404 Not Found)

```json
{
  "success": false,
  "message": "Something went wrong while getting the User",
  "data": {},
  "error": {
    "statusCode": 404,
    "details": "User Does not exist"
  }
}
```

---

### 4. Add Role to User

**POST** `/user/role`

Assign a role to a user.  
**Requires admin privileges.**

#### Request Headers

```
x-access-token: Bearer <admin-token>
```

#### Request

```json
{
  "id": 1,
  "role": "admin"
}
```

#### Response (200 OK)

```json
{
  "success": true,
  "message": "Successfully added the Role to User",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "createdAt": "2024-06-28T12:34:56.789Z",
    "updatedAt": "2024-06-28T12:34:56.789Z"
  },
  "error": {}
}
```

#### Error Response (401 Unauthorized)

```json
{
  "success": false,
  "message": "Something went wrong while addding Role to User",
  "data": {},
  "error": {
    "statusCode": 401,
    "details": "User not authorized for adding Role"
  }
}
```

---

### 5. Ping (Health Check)

**GET** `/ping`

Check if the API is live.  
**Requires authentication.**

#### Request Headers

```
x-access-token: Bearer <token>
```

#### Response (200 OK)

```json
{
  "message": "API is live"
}
```

---

## Error Response Format

All error responses follow this structure:

```json
{
  "success": false,
  "message": "<description>",
  "data": {},
  "error": {
    "statusCode": <status>,
    "details": "<error details>"
  }
}
```

---

## Roles

- `customer`
- `admin`
- `flight_company`

---

## Notes

- All endpoints are prefixed with `/api/v1`.
- JWT tokens are required for all endpoints except `/user/signup` and `/user/signin`.
- Only admins can assign roles to users.

---
