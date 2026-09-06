import { useState, useEffect } from 'react';
import ToastNotification from './components/ToastNotification';
import StudentModal from './components/StudentModal';
import QuizModal from './components/QuizModal';

export default function Admin() {
  const [students, setStudents] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [studentForm, setStudentForm] = useState({ first_name: '', last_name: '', email: '' });
  const [quizForm, setQuizForm] = useState({ title: '', course_name: '' });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/students/')
      .then(r => r.json())
      .then(data => setStudents(data))
      .catch(err => console.error(err));
      
    fetch('http://localhost:8000/quizzes/')
      .then(r => r.json())
      .then(data => setQuizzes(data))
      .catch(err => console.error(err));
  }, []);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/students/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentForm)
      });
      if (res.ok) {
        const newStudent = await res.json();
        setStudents([...students, newStudent]);
        setIsStudentModalOpen(false);
        setStudentForm({ first_name: '', last_name: '', email: '' });
        showNotification('success', 'Student successfully added!');
      } else {
        const err = await res.json();
        showNotification('error', "Failed to add student: " + (err.detail || "Check email format"));
      }
    } catch (error) {
      showNotification('error', "Network Error: Make sure your FastAPI backend is running!");
    }
  };

  const handleAddQuiz = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/quizzes/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizForm)
      });
      if (res.ok) {
        const newQuiz = await res.json();
        setQuizzes([...quizzes, newQuiz]);
        setIsQuizModalOpen(false);
        setQuizForm({ title: '', course_name: '' });
        showNotification('success', 'Quiz successfully added!');
      } else {
        showNotification('error', "Failed to add quiz.");
      }
    } catch (error) {
      showNotification('error', "Network Error: Make sure your FastAPI backend is running!");
    }
  };

  return (
    <div className="p-8 h-full relative overflow-y-auto">
      <ToastNotification notification={notification} />

      {/* Students Section */}
      <header className="mb-4 flex justify-between items-center mt-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Registered Students</h2>
          <p className="text-base text-slate-400 mt-1">{students.length} total students</p>
        </div>
        <button onClick={() => setIsStudentModalOpen(true)} className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
          + Add Student
        </button>
      </header>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-12">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-slate-950 text-slate-300 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold">Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id} className="border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 text-slate-200">{s.first_name} {s.last_name}</td>
                <td className="px-6 py-4">{s.email}</td>
              </tr>
            ))}
            {students.length === 0 && <tr><td colSpan="2" className="px-6 py-8 text-center text-slate-500">No students registered yet.</td></tr>}
          </tbody>
        </table>
      </div>

      {/* Quizzes Section */}
      <header className="mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Active Quizzes</h2>
          <p className="text-base text-slate-400 mt-1">{quizzes.length} total quizzes</p>
        </div>
        <button onClick={() => setIsQuizModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
          + Add Quiz
        </button>
      </header>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-12">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-slate-950 text-slate-300 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4 font-semibold">Quiz Title</th>
              <th className="px-6 py-4 font-semibold">Course Name</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map(q => (
              <tr key={q.id} className="border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 text-slate-200">{q.title}</td>
                <td className="px-6 py-4">{q.course_name}</td>
              </tr>
            ))}
            {quizzes.length === 0 && <tr><td colSpan="2" className="px-6 py-8 text-center text-slate-500">No quizzes created yet.</td></tr>}
          </tbody>
        </table>
      </div>

      <StudentModal 
        isOpen={isStudentModalOpen} 
        onClose={() => setIsStudentModalOpen(false)} 
        onSubmit={handleAddStudent} 
        formData={studentForm} 
        setFormData={setStudentForm} 
      />
      <QuizModal 
        isOpen={isQuizModalOpen} 
        onClose={() => setIsQuizModalOpen(false)} 
        onSubmit={handleAddQuiz} 
        quizForm={quizForm} 
        setQuizForm={setQuizForm} 
      />
    </div>
  );
}
