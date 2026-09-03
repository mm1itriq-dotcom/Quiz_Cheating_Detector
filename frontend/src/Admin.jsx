import { useState, useEffect } from 'react';

export default function Admin() {
  const [students, setStudents] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '' });

  useEffect(() => {
    fetch('http://localhost:8000/students/')
      .then(r => r.json())
      .then(data => setStudents(data))
      .catch(err => console.error("Failed to fetch students", err));
      
    fetch('http://localhost:8000/quizzes/')
      .then(r => r.json())
      .then(data => setQuizzes(data))
      .catch(err => console.error("Failed to fetch quizzes", err));
  }, []);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/students/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        const newStudent = await res.json();
        setStudents([...students, newStudent]);
        setIsModalOpen(false);
        setFormData({ first_name: '', last_name: '', email: '' });
      } else {
        const err = await res.json();
        alert("Failed to add student: " + (err.detail || "Check email format"));
      }
    } catch (error) {
      alert("Network Error: Make sure your FastAPI backend is running on port 8000!");
    }
  };

  return (
    <div className="p-8 h-full">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Registered Students</h2>
          <p className="text-base text-slate-400 mt-1">{students.length} total students</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          + Add Student
        </button>
      </header>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-slate-950 text-slate-300 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold">Email</th>
              <th className="px-6 py-4 font-semibold">Student ID (UUID)</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id} className="border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 text-slate-200">{s.first_name} {s.last_name}</td>
                <td className="px-6 py-4">{s.email}</td>
                <td className="px-6 py-4 font-mono text-xs">{s.id}</td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr><td colSpan="3" className="px-6 py-8 text-center text-slate-500">No students registered yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Add New Student</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">&times;</button>
            </div>
            <form onSubmit={handleAddStudent} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">First Name</label>
                <input required type="text" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                  value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Last Name</label>
                <input required type="text" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                  value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Email Address</label>
                <input required type="email" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="pt-4 flex gap-4">
                <button type="submit" className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-2 rounded-lg font-semibold">Submit</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-lg font-semibold">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
