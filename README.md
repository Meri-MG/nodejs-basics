# User Management API

This is a simple RESTful API built with Node.js that allows you to manage users in memory. It supports creating, retrieving, and deleting users, and is ideal for practice or testing environments where persistence is not required.

## Features

- ✅ Create a user with `username`, `age`, and `hobbies`
- ✅ Retrieve all users
- ✅ Retrieve a user by UUID
- ✅ Delete a user by UUID
- ✅ Input validation and meaningful HTTP status codes
- ✅ In-memory data storage (no database setup required)

---

## Tech Stack

- Node.js
- JavaScript (ES Modules)
- UUID for unique user IDs
- Jest (or similar) for testing

---

## Getting Started

### 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/nodejs-basics.git
   cd nodejs-basics
   git checkout crud-api

2. Install dependencies:
  ```
  npm install
  ```

3. Start the server
  ```
  npm start:dev
  ```

  or 

  ```
  npm start:prod
  ```

  or

  ```
    npm start:multi
  ```
  which allows to run distributed requests across multiple instances listening on port 4000

4. 📋 API Endpoints

## 🔹 Create User
**POST** `/api/users`

### Request Body:
```json
{
  "username": "alice",
  "age": 28,
  "hobbies": ["reading", "hiking"]
}
````

### Response:

**201 Created**

```json
{
  "username": "alice",
  "age": 28,
  "hobbies": ["reading", "hiking"],
  "id": "002cf6ee-6161-4d27-a156-c22bed33646f"
}
```

## 🔹 Get All Users

**GET** `/api/users`

### Response:

**200 OK**

Returns an array of all user objects.

## 🔹 Get User by ID

**GET** `/api/users/{id}`

### Response:

* **200 OK** with user object if found
* **400 Bad Request** for invalid UUID
* **404 Not Found** if user doesn’t exist

## 🔹 Delete User

**DELETE** `/api/users/{id}`

### Response:

* **204 OK** deleted user object
* **400 Bad Request** for invalid UUID
* **404 Not Found** if user doesn’t exist

## 🧪 Running Tests

5. You can run your tests using:

```bash
npm run test
```



