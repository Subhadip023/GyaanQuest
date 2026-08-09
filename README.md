# 🎓 GyaanQuest

> **Interactive Quiz & Virtual Classroom Platform for Teachers, Tutors, and Educational Organizations.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-gyaanquest.onrender.com-blue?style=for-the-badge&logo=render)](https://gyaanquest.onrender.com)
[![Laravel](https://img.shields.io/badge/Laravel-11.x-FF2D20?style=for-the-badge&logo=laravel)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-2.0-9553E9?style=for-the-badge&logo=inertia)](https://inertiajs.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

---

## 📌 About The Project

**GyaanQuest** is a comprehensive educational helper platform designed to empower tuition teachers, educators, and organizations to manage students, host virtual classrooms, create custom interactive quizzes, and evaluate student performance in real-time.

Whether running offline tuition classes, online academies, or organizational training programs, **GyaanQuest** provides a seamless workflow for creating question banks, assigning timed quizzes to dedicated rooms, tracking leaderboards, and managing student access.

---

## 🚀 Features & Completed Modules ("What Part Done")

### 1. 🏫 Virtual Classrooms & Room Management (`Rooms`)
* **Room Creation & Access Codes**: Teachers can create virtual rooms with auto-generated unique 6-character access codes.
* **Student Enrollment**: Students can join rooms instantly using room access codes or be managed directly by teachers.
* **Quiz Assignment**: Teachers can assign specific quizzes to individual rooms with availability schedules (`available_from`, `available_until`).
* **Member Controls**: View list of enrolled students per room and manage membership (remove members).

### 2. 📝 Quiz Management & Engine (`Quizzes`)
* **Quiz Builder**: Full CRUD operations for creating, editing, publishing, and archiving quizzes.
* **Custom Access Modes**:
  * **Public Quizzes**: Open to all platform users.
  * **Private Quizzes**: Protected by unique access codes or limited to specific rooms.
  * **Room-Scoped Quizzes**: Exclusively accessible to students enrolled in assigned classrooms.
* **Time Limits**: Configurable quiz timers with automatic countdown and forced submission on expiration.
* **Interactive Player (`Play.jsx`)**: Responsive quiz-taking interface with step-by-step navigation, option selection, instant score calculation, and result breakdown.

### 3. ❓ Question Bank & Supported Types (`Questions`)
* **Question Repository**: Rich question management linked to quizzes with custom option sets and scoring weightage.
* **Supported Question Types**:
  * **Single Choice (MCQ)**: Standard single-answer multiple choice.
  * **Multiple Correct**: Questions requiring multiple correct selections.
  * **True / False**: Binary evaluation format.
  * **Fill in the Blanks**: Exact string matching completion questions.
  * **Short Answer**: Direct textual answers for open-ended assessment.

### 4. ✉️ Invitations & Direct Access (`QuizInvitations`)
* **Token-Based Invitations**: Direct email/token invitations generated for students for private quiz access.
* **Access Code Gate**: Input modal allowing students to unlock private quizzes using 6-digit access codes.

### 5. 🏆 Leaderboard & Analytics (`Leaderboard`)
* **Global Leaderboard**: Ranks top-performing students across the platform based on overall cumulative scores.
* **Quiz Leaderboards**: Dedicated leaderboard per quiz displaying student ranks, score percentages, time taken, and completion timestamps.

### 6. 🔐 User Authentication & RBAC (`Auth` & `Admin`)
* **Breeze Authentication**: Registration, login, password reset, and session management.
* **Extended User Profiles**: User avatars, bio, institution/school name, phone number, and customizable skill sets.
* **Role-Based Access Control (RBAC)**: Configured using `spatie/laravel-permission`:
  * **`admin`**: Full system access, user role assignments, role/permission creation, admin dashboard access. (Default seed user: `admin@gyaanquest.com` / `password123`)
  * **`teacher`**: Creation & management of quizzes, question banks, classrooms (rooms), assign quizzes to rooms, play quizzes, view leaderboards.
  * **`student`**: Default role auto-assigned upon registration. Can join rooms via access code, attempt quizzes, view leaderboards.
* **Admin Management Panel**: UI at `/admin` for user role sync, permission assignment, and platform oversight.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Backend Framework** | Laravel 11.31 (PHP 8.2+) |
| **Frontend Adapter** | Inertia.js (Monolithic Single-Page Experience) |
| **Frontend UI** | React 18 with Tailwind CSS |
| **Role Management** | Spatie Laravel Permission (`spatie/laravel-permission`) |
| **API / Auth** | Laravel Sanctum & Breeze |
| **UI Components & Icons** | Headless UI, Heroicons, Framer Motion, React Select, React Toastify |
| **Build Tooling** | Vite 6, PostCSS, Concurrently |
| **Deployment** | Render (`render.yaml` & Dockerfile included) |

---

## 📁 Repository Structure

```
GyaanQuest/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       ├── AnswerController.php        # Answer submissions & validation
│   │       ├── DashBoardController.php     # Main student/teacher dashboard controller
│   │       ├── LeaderboardController.php   # Global & per-quiz leaderboard logic
│   │       ├── QuestionController.php      # Question bank management
│   │       ├── QuizController.php          # Quiz builder, settings & execution
│   │       ├── QuizInvitationController.php# Direct invitations & code access
│   │       ├── RoomController.php          # Virtual classroom management
│   │       ├── RoleController.php          # RBAC Role management
│   │       └── UserController.php          # User administration
│   └── Models/                             # User, Quiz, Room, Question, Answer, Score, QuizInvitation
├── database/
│   └── migrations/                         # DB Schemas (Users, Quizzes, Questions, Answers, Rooms, Invitations)
├── resources/
│   └── js/
│       ├── Pages/
│       │   ├── Admin/                      # Admin Panel & User/Role management UI
│       │   ├── Invitations/                # Invitation accepting screens
│       │   ├── Leaderboard/                # Global & Quiz Leaderboards UI
│       │   ├── Profile/                    # User Profile Settings
│       │   ├── Questions/                  # Question Editor UI
│       │   ├── Quizzes/                    # Quiz Index & Interactive Player (Play.jsx)
│       │   ├── Rooms/                      # Classroom Index & Show details UI
│       │   ├── Dashboard.jsx               # User Dashboard
│       │   └── Welcome.jsx                 # Platform Landing Page
│       └── Components/                     # Reusable React components
└── routes/
    ├── web.php                             # Inertia & Application Web Routes
    └── auth.php                            # Authentication Routes
```

---

## ⚙️ Getting Started (Local Development Setup)

### Prerequisites
* **PHP** >= 8.2
* **Composer** >= 2.x
* **Node.js** >= 18.x & **NPM** (or Bun)
* **SQLite** or **MySQL** Database

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Subhadip023/GyaanQuest.git
   cd GyaanQuest
   ```

2. **Install Backend Dependencies**
   ```bash
   composer install
   ```

3. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

4. **Set Up Environment File**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   *(Configure your database credentials inside `.env` if using MySQL, or keep default SQLite settings)*

5. **Run Database Migrations & Seeders**
   ```bash
   php artisan migrate --seed
   ```

6. **Run Development Server**
   Using composer concurrently script:
   ```bash
   composer run dev
   ```
   Or in separate terminals:
   ```bash
   php artisan serve
   npm run dev
   ```

7. **Access the Application**
   Open your browser at [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 🔮 Roadmap & Upcoming Enhancements

- [ ] **AI-Powered Answer Evaluation**: Automated fuzzy matching and AI grading for open-ended short-answer questions.
- [ ] **Live Multiplayer Quizzes**: Real-time synchronous live quiz sessions powered by WebSockets / Laravel Reverb.
- [ ] **Exportable Student Reports**: PDF and CSV progress reporting for tuition teachers to send to parents.
- [ ] **Batch Import Questions**: Support for CSV/Excel upload of question banks.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
