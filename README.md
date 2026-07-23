# 🔐 Authentication API

A simple and secure Node.js authentication API built with Express and MongoDB. Supports user registration, login, and JWT-protected routes — hashed passwords, no plaintext, no nonsense.

![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![JWT](https://img.shields.io/badge/Auth-JWT-blue)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

## ✨ Features

- 📝 User registration
- 🔑 User login with JWT token generation
- 🛡️ Protected profile route (JWT middleware)
- 🔒 Password hashing with bcrypt
- ⚙️ Clean, modular project structure

---

## 🛠️ Tech Stack

| Layer          | Technology         |
|----------------|---------------------|
| Runtime        | Node.js             |
| Framework      | Express             |
| Database       | MongoDB + Mongoose  |
| Auth           | JSON Web Token (JWT)|
| Hashing        | bcryptjs            |

---

## 📁 Project Structure

```
.
├── server.js                       # App entry point
├── config/
│   └── db.js                       # MongoDB connection
├── controllers/
│   └── authController.js           # Auth logic (register/login/profile)
├── middleware/
│   └── authMiddleware.js           # JWT protection middleware
├── models/
│   └── User.js                     # User schema + password hashing
└── routes/
    └── authRoutes.js                # Auth route definitions
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=....
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

### 3. Start MongoDB

Make sure a local MongoDB instance is running (or point `MONGO_URI` to a remote cluster).

### 4. Run the server

```bash
npm start
```

The API will be available at `http://localhost:5000/api`.

---

## 📡 API Endpoints

Base URL: `http://localhost:5000/api`

### Register User

`POST /register`

**Body:**
```json
{
  "name": "NAME",
  "email": "EMAIL",
  "password": "PASSWORD"
}
```

### Login User

`POST /login`

**Body:**
```json
{
  "email": "EMAIL",
  "password": "PASSWORD"
}
```

**Response:** Returns a JWT token to be used for authenticated requests.

### Get Profile *(Protected)*

`GET /profile`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

---

## 🧪 Testing with Postman

1. `POST http://localhost:5000/api/register` → create a new user
2. `POST http://localhost:5000/api/login` → retrieve a JWT token
3. Copy the `token` value from the login response
4. `GET http://localhost:5000/api/profile` → set **Authorization** to `Bearer Token` and paste the token

---

## 📸 Screenshots

### Register User (`POST /api/register`)

Creates a new user account by providing a name, email, and password.

![Register Response](./Screenshot%202026-07-23%20174449.png)

---

### Login User (`POST /api/login`)

Logs in the registered user and returns a JWT token.

![Login Response](./Screenshot%202026-07-23%20174508.png)

---

### Get User Profile (`GET /api/profile`)

Accesses the protected profile route using the JWT Bearer Token.

![Profile Response](./Screenshot%202026-07-23%20175258.png)

## 📋 Response Codes

| Code  | Meaning                          |
|-------|-----------------------------------|
| `200` | Success                           |
| `201` | Created                           |
| `400` | Bad request                       |
| `401` | Unauthorized                      |
| `404` | Route not found / user not found  |
| `500` | Server error                      |

---

## 📝 Notes

- `JWT_SECRET` (from `.env`) is used to sign and verify tokens.
- Passwords are hashed with bcrypt before being saved to MongoDB — plaintext passwords are never stored.
- The `/profile` route is protected and requires a valid `Authorization: Bearer <token>` header.

---

## 📄 License

This project is licensed under the MIT License.
