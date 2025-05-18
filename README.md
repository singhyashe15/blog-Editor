# 📝 Full Stack Blog Editor

A feature-rich full stack Blog Editor that allows users to create, preview, publish, and manage blog posts with support for image uploads, tag management, and user authentication (JWT) and auto save blog as draft after every 30 sec or every 5sec of inactivity.

---

## 🚀 Tech Stack

### 🔧 Frontend
- React.js
- Chakra UI
- React Router
- Axios
- React Icons
- React Query (TanStack)
- Vite

### 🔧 Backend
- Node.js
- Express.js
- PostgreSQL
- pg (node-postgres)
- CORS
- dotenv
- nodemailer
- JWT for authentication
---

## 📁 Project Structure

### ✨ Features
- 🔐 User Authentication
- 📝 Create/Edit Blogs
- 🖼️ Image Upload with Preview
- 🏷️ Tag Management
- 📬 Publish & Draft Modes
- 🔍 Category-Based Search
- Update User Details
- 🗂️ User Dashboard for see published and draft blogs
---

## 🛠️ Setup Instructions


### ✅ Prerequisites

- Node.js & npm
- PostgreSQL installed and running
- Vite (install globally using `npm install -g vite`)

---
### Clone the repository
git clone [https://github.com/singhyashe15/blog-Editor.git](https://github.com/singhyashe15/blog-Editor.git)


### 📦 Backend Setup (`/server`)

1.🌐 Backend Setup (/blog_fronted)
   **Navigate to blog_backend folder**
   
  npm install
  Create a .env file
  FRONTED_URL=http://localhost:5173
  nodemon server

  
2.🌐 Frontend Setup (/blog_backend)
 **Navigate to blog_fronted folder**

Install dependencies

npm install
Create a .env file

VITE_SERVER_URL=http://localhost:3000
Start the React app

npm run dev


###📬 API Endpoints Overview

| Method | Route                                | Description           |
| ------ | --------------------                 | -----------------     |
| GET    | `/api/blogs`                         | Get all blogs         |  
| GET    | `/api/blogs/self/:id`                | Get all self blogs    |
| GET    | `/api/blogs/category/:search`        | Get all self blogs    |
| POST   | `/api/blogs/publish`                 | Create a new blog     |
| DELETE | `/api/blogs/:id`                     | Delete blog           |
| POST   | `/api/auth/register`                 | Register user         |
| POST   | `/api/auth/login`                    | Login user            |
| PUT    | `/api/auth/update-details`           | Update user details   |
