# ✅ Winonah's Task Manager

## Student Information
- **Student Name:** Winonah
- **Module:** INFS 202 – Web Development
- **Project:** Midterm React Project
- **Option Chosen:** Option 1 – Task Manager

---

## Description

This is a personal task manager web application built with React. It allows you to:

- View all your tasks on one page
- Add new tasks with a title, description, priority, and due date
- Mark tasks as complete or undo them
- View full task details and edit them
- Delete tasks you no longer need
- Search and filter tasks by status (All, Pending, Completed)

The app is personalised with my name and uses a warm orange colour theme. It is fully responsive and works on desktop, tablet, and mobile screens.

---

## Technologies Used

- **React** (v18) – Component-based UI
- **React Router DOM** (v6) – Page navigation / routing
- **Vite** – Development and build tool
- **CSS** – Custom styling (no Bootstrap used, plain CSS only)
- **Google Fonts** – Nunito and Pacifico fonts

---

## Project Structure

```
winonah-task-manager/
│
├── index.html
├── package.json
├── vite.config.js
│
└── src/
    ├── App.jsx          ← Main app with routing and state
    ├── App.css          ← All styles
    ├── main.jsx         ← Entry point
    │
    ├── components/
    │   ├── Navbar.jsx   ← Navigation bar
    │   └── TaskCard.jsx ← Individual task card
    │
    └── pages/
        ├── Home.jsx     ← Home page with stats
        ├── List.jsx     ← Task list with search & filter
        ├── Details.jsx  ← Task details & edit page
        └── AddItem.jsx  ← Add new task form
```

---

## How to Run the Project

### Step 1 – Install Node.js
Make sure you have Node.js installed on your computer.  
Download it from: https://nodejs.org

### Step 2 – Install dependencies
Open your terminal inside the project folder and run:

```bash
npm install
```

### Step 3 – Start the development server

```bash
npm run dev
```

### Step 4 – Open in browser
Go to: **http://localhost:5173**

---

## Routes

| Route | Page |
|-------|------|
| `/home` | Home page |
| `/list` | Task list |
| `/details/:id` | Task detail & edit |
| `/add` | Add new task |

---

## Features

- ✅ Multiple React components (Navbar, TaskCard, Home, List, Details, AddItem)
- ✅ React Router with 4 routes
- ✅ Add task form with input validation
- ✅ Edit task inline on details page
- ✅ Delete with confirmation
- ✅ Toggle task complete/incomplete
- ✅ Search tasks by name
- ✅ Filter by All / Pending / Completed
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Personalised with my name and colour theme

---

*INFS 202 Midterm Project – Winonah*
