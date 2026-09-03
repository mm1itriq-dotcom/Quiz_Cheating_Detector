import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import Admin from './Admin';

function Sidebar() {
  const location = useLocation();
  const linkClass = (path) => `block w-full text-left px-4 py-2 rounded-lg mb-2 transition-colors ${location.pathname === path ? 'bg-slate-700 text-cyan-400 font-bold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`;

  return (
    <div className="w-64 h-screen bg-slate-900 border-r border-slate-800 p-6 flex flex-col">
      <h1 className="text-2xl font-black text-white mb-8 tracking-tight flex items-center">
        <span className="text-cyan-500 mr-2">?</span> QuizGuard
      </h1>
      <nav className="flex-1">
        <Link to="/" className={linkClass('/')}>
          ?? Dashboard (Live)
        </Link>
        <Link to="/admin" className={linkClass('/admin')}>
          ?? Admin Setup
        </Link>
      </nav>
      <div className="mt-auto pt-4 border-t border-slate-800 text-sm text-slate-500">
        Admin: Logged In
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
        <Sidebar />
        <main className="flex-1 overflow-y-auto relative">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
export default App;
