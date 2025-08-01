🎓 TeachFlow — MERN stack based web platform where users can:
- Enroll in classes
- Become a teacher
- Submit assignments
- Share feedback
- Get personalized dashboards based on their role (Student, Teacher, Admin)

This repository contains the **frontend** built with **React**, **Tailwind CSS**, **React Router**, and **TanStack Query**.

---

## 🌐 Live Site

**Frontend (Firebase):** [https://teach-flow-project.web.app](https://teach-flow-project.web.app)

---
## 📂 Repositories

- **Frontend GitHub Repo:** []()

---

## 🛠️ Tech Stack

- React
- React Router DOM
- TanStack Query (React Query)
- Axios + JWT Auth
- Firebase Authentication
- Tailwind CSS + DaisyUI
- SweetAlert2
- react-simple-star-rating

---

## 🚀 Features

### 👨‍🎓 Student
- View and enroll in approved classes
- View enrolled class details and assignments
- Submit assignment text
- Give feedback once per class

### 👩‍🏫 Teacher
- Apply to become a teacher
- Add and manage classes
- Create assignments for approved classes
- View assignment submissions

### 🛡️ Admin
- Approve teacher applications
- Approve/reject classes
- View all users and update roles
- View all feedbacks and class reports

---

## 🔒 Authentication

- Firebase Email/Password Login
- Google Login
- JWT token from backend (stored in `localStorage`)
- Protected routes via custom `PrivateRoute`, `AdminRoute`, `TeacherRoute`

---

## 📁 Folder Structure



🔐 Security Practices
All routes protected using Firebase token verification and JWT middleware

Role-based access control (admin, teacher, student)

No sensitive files pushed to GitHub (use .gitignore)

🧪 Testing
Tested on:

Chrome (desktop & mobile)

Firefox

Vercel production deployments

👨‍💻 Author
Built by Fardin Khan
Feel free to open issues or contribute!