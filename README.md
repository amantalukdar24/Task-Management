# Task Management Application

A full-stack **Task Management Web Application** that allows users to **create, view, update, and delete tasks** with secure **JWT-based authentication**.

The backend is built using **Node.js and Express.js**, uses **MongoDB Atlas** as the database, and the frontend is built with **React (Vite)**.

## Live Deployed Link
🌐 https://task-management-1-3eou.onrender.com
---

## ✨ Features

- 🔐 User authentication (Register & Login)
- 🧾 Create tasks
- 👀 View all tasks
- ✏️ Update tasks
- ❌ Delete tasks
- 🔒 Protected routes using JWT
- 🔑 Password hashing with bcrypt
- 📦 RESTful API architecture
-  Filter Tasks According to the status of the task
---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (JSON Web Token)
- bcrypt

### Frontend
- React
- Vite
- JavaScript
- TailwindCSS
- React-Hot-Toast
  

---
### 1️⃣ Clone the Repository
git clone https://github.com/amantalukdar24/Task-Management/
cd Task-Management

## ⚙️ Environment Variables (Backend)

Create a `.env` file inside the **backend** directory and add the following:
PORT=3000
MONGO_URL=your_mongodb_atlas_connection_string
JWT_KEY=your_jwt_secret_key

## ⚙️ Environment Variables (Frontend)
Create a `.env` file inside the **frontend** directory and add the following:
VITE_Backend_URL=http://localhost:3000

## Setup & Run Backend
cd backend,
npm install,
npm start

## Setup & Run Frontend
cd frontend,
npm install,
npm run build,
npm run dev

