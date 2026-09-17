<div align="center">
  <h1>🛡️ QuizGuard</h1>
  <p><b>Real-Time, Event-Driven Academic Integrity & Anti-Cheating System</b></p>
</div>

---

## 📖 About The Project

**QuizGuard** is an advanced, event-driven web architecture designed to monitor, detect, and flag academic dishonesty during online examinations in **real-time**. Built as a robust full-stack application, it leverages highly concurrent WebSockets to stream live student submission data through a custom-built Rule Engine, rendering results instantly on a responsive React dashboard.

### ✨ Key Features

*   ⚡ **Real-Time WebSockets:** Establishes persistent, bi-directional communication to stream exam events and alerts instantaneously without HTTP polling overhead.
*   🧠 **Algorithmic Rule Engine:** Intercepts incoming quiz submissions asynchronously and evaluates them against academic integrity heuristics (e.g., detecting impossible response times).
*   🚨 **Instant Visual Alerts:** Automatically broadcasts critical alerts (Red Alerts) directly to the proctor/admin dashboard the millisecond anomalous behavior is detected.
*   📊 **Live Dashboard:** A sleek, modern React interface for administrators to monitor active sessions, view flagged students, and manage quiz parameters.
*   🏗️ **Micro-Architecture Design:** Strict separation of concerns between the FastAPI backend, the Rule Engine, and the Vite/React frontend.

---

## ⚙️ The Heuristics (Rule Engine)

The core of QuizGuard is the `rule_engine.py`, which evaluates incoming data dynamically:
1. **The "Too Fast" Heuristic:** Calculates the absolute time delta of a submission. If a student answers a complex question in under a plausible cognitive threshold (e.g., 1.5 seconds), it triggers a high-severity `FAST_ANSWER` flag.
2. **Speed Anomaly Detection:** Analyzes a student's rolling average answer speed to detect statistical deviations.

---

## 🛠️ Architecture & Tech Stack

### Backend (REST & WebSockets)
*   **Framework:** FastAPI (High-performance async Python framework)
*   **Database Engine:** PostgreSQL
*   **ORM:** SQLAlchemy 2.0 (Core)
*   **Data Validation:** Pydantic v2 (Strict schema validation)
*   **Security:** `python-dotenv` for environment variable protection

### Frontend (Client Interface)
*   **Framework:** React 18
*   **Build Tool:** Vite (for Lightning-Fast HMR)
*   **Styling:** Tailwind CSS v4 (Modern, utility-first UI)
*   **Icons:** Google Material Symbols

---

## 🚀 Getting Started (Local Development)

To demonstrate the full capabilities of QuizGuard, you must initialize the API, the Client Interface, and the Simulation Script.

### Prerequisites
*   [Node.js](https://nodejs.org/) (v16+) & npm
*   [Python](https://www.python.org/) (3.10+)
*   [PostgreSQL](https://www.postgresql.org/) (Ensure a database named `quiz_detector` is created locally)

### 1. Backend Setup (FastAPI)

Open a terminal in the root directory:

```bash
# 1. Activate the virtual environment
.\venv\Scripts\activate

# 2. Install dependencies (make sure dotenv and websockets are included)
pip install fastapi uvicorn sqlalchemy psycopg2 pydantic websockets python-dotenv

# 3. Configure the Database
# Ensure your `.env` file exists in the root directory:
# DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/quiz_detector"

# 4. Start the FastAPI ASGI server
uvicorn app.main:app --reload
```
*(The backend runs on `http://127.0.0.1:8000`. API Documentation is auto-generated at `http://127.0.0.1:8000/docs`)*

### 2. Frontend Setup (React/Vite)

Open a **second** terminal window, navigate into the frontend environment:

```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Start the Vite development server
npm run dev
```
*(The React application will bind to `http://localhost:5173`)*

---

## 🧪 Simulation & Demonstration Guide

To present the project and see the real-time cheating detection in action:

1. **System Provisioning:** Open the React Dashboard (`localhost:5173`) and navigate to the Admin Setup panel. Register at least one Student and one Quiz.
2. **Dashboard Monitoring:** Navigate to the Live Dashboard panel and ensure the system displays the `Live` connection status.
3. **Execute the Simulator:** Open a **third** terminal in the root folder (activate your venv) and run the data generator:
```bash
python simulator.py
```
> **What Happens Next?** 
> The simulator queries the database for a registered student. It emits a normal WebSocket payload first. Three seconds later, it forcefully emits an **anomalous payload** (answering in 1.2s), instantly triggering the Rule Engine and broadcasting a critical red alert to your React UI!

---

*Designed and Developed by Mohammed Yousef Itriq.*
