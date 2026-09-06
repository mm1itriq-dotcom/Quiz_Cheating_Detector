# QuizGuard: Real-Time Academic Integrity System ⚡

**QuizGuard** is an advanced, event-driven web architecture designed to monitor, detect, and flag academic dishonesty during online examinations in real-time. Built as a comprehensive graduation project, it leverages highly concurrent WebSockets to stream live student submission data through a custom-built Rule Engine, rendering results instantly on a responsive React dashboard.

---

## 🏗️ Architecture & Tech Stack

This project was engineered with a strict separation of concerns, utilizing a modern, decoupled micro-architecture:

### Backend (Python / FastAPI)
- **FastAPI:** High-performance REST API and WebSocket handling.
- **SQLAlchemy 2.0 (Core):** Direct, highly optimized SQL statement execution and schema generation.
- **PostgreSQL:** Persistent, relational data storage handling complex cross-references between students, quizzes, and flagged offenses.
- **Pydantic v2:** Strict data validation models utilizing RegEx for data sanitization (e.g., email formatting).

### Frontend (React / Vite)
- **React 18:** Component-driven architecture utilizing global state lifting (`App.jsx`) for persistent WebSocket connections.
- **Tailwind CSS v4:** Utility-first framework used to construct a modern, dark-mode cyber aesthetic.
- **Vite:** Next-generation frontend tooling for instantaneous Hot Module Replacement (HMR) and optimized build outputs.
- **Google Material Symbols:** Integrated professional iconography for a polished user experience.

---

## 🧠 Algorithmic Rule Engine

The core of QuizGuard is the `rule_engine.py`, which intercepts incoming quiz submissions asynchronously and evaluates them against academic integrity heuristics:

1. **The "Too Fast" Heuristic:** 
   Calculates the absolute time delta of a submission. If a student answers a question in under 2 seconds, it triggers a `FAST_ANSWER` flag (Severity: 80), as human cognitive read-and-response times generally exceed this threshold.
   
2. **The Collusion Heuristic:**
   *(Architecture Ready)* Compares live submissions against identical incorrect answers submitted by other students in the same temporal window to detect unauthorized group collaboration.

3. **Speed Anomaly Detection:**
   *(Architecture Ready)* Analyzes a student's rolling average answer speed. Massive statistical deviations trigger a system flag for manual review.

---

## 🚀 Running the System Locally

To demonstrate the full capabilities of QuizGuard, you must initialize both the API and the Client Interface, followed by the Simulation Script.

### Prerequisites
- Python 3.10+
- Node.js & npm
- PostgreSQL database running locally (Credentials: `postgres` / `123456`, Database: `quiz_detector`)

### 1. Initialize the FastAPI Backend
Open a terminal in the root directory and execute the ASGI server:
```bash
.\venv\Scripts\uvicorn.exe app.main:app --reload
```
*(The backend runs on `http://127.0.0.1:8000`. API Documentation is auto-generated at `/docs`)*

### 2. Initialize the React Dashboard
Open a **second** terminal, navigate into the frontend environment, and spin up the Vite development server:
```bash
cd frontend
npm run dev
```
*(The React application will automatically bind to `http://localhost:5173`)*

---

## 🧪 Simulation & Demonstration Guide

To present the project to a review board or professor, follow these steps to simulate a live classroom environment:

1. **System Provisioning:** Open the React Dashboard and navigate to the **⚙️ Admin Setup** panel. Register at least one Student and one Quiz.
2. **Dashboard Monitoring:** Navigate to the **📊 Dashboard (Live)** panel and ensure the system displays the `Live` connection status.
3. **Execute the Simulator:** Open a **third** terminal in the root folder and run the data generator:
```bash
.\venv\Scripts\python.exe simulator.py
```
> **What Happens Next?** 
> The simulator will dynamically query the database for a random registered student and quiz. It will emit a standard WebSocket payload (15.5s response time) which renders cleanly on the dashboard. Three seconds later, it will forcefully emit an anomalous payload (1.2s response time), instantly triggering the Rule Engine and broadcasting a critical red alert to the UI.


