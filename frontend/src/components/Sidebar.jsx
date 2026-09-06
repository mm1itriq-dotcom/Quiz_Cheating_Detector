import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const linkClass = (path) => `flex items-center w-full text-left px-4 py-2 rounded-lg mb-2 transition-colors ${location.pathname === path ? 'bg-slate-700 text-cyan-400 font-bold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`;

  return (
    <div className="w-64 h-screen bg-slate-900 border-r border-slate-800 p-6 flex flex-col z-10">
      <h1 className="text-2xl font-black text-white mb-8 tracking-tight flex items-center">
        <span className="material-symbols-outlined text-cyan-500 mr-2 text-3xl">bolt</span> QuizGuard
      </h1>
      <nav className="flex-1">
        <Link to="/" className={linkClass('/')}>
          <span className="material-symbols-outlined mr-2">dashboard</span> Dashboard (Live)
        </Link>
        <Link to="/admin" className={linkClass('/admin')}>
          <span className="material-symbols-outlined mr-2">settings</span> Admin Setup
        </Link>
      </nav>
      <div className="mt-auto pt-4 border-t border-slate-800 text-sm text-slate-500 flex items-center">
        <span className="material-symbols-outlined mr-2 text-lg">person</span> Admin: Logged In
      </div>
    </div>
  );
}
