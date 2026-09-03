import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [wsStatus, setWsStatus] = useState('Connecting...');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/stream');
    
    ws.onopen = () => setWsStatus('Live ??');
    ws.onclose = () => setWsStatus('Disconnected ??');
    ws.onerror = () => setWsStatus('Error ??');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'NEW_SUBMISSION') {
        setSubmissions(prev => [data.submission, ...prev].slice(0, 50)); 
        if (data.flags_generated && data.flags_generated.length > 0) {
           setAlerts(prev => [...data.flags_generated, ...prev].slice(0, 20));
        }
      }
    };
    
    return () => ws.close();
  }, []);

  return (
    <div className="p-8 h-full flex flex-col">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white leading-tight">Live Monitoring</h2>
          <p className="text-base text-slate-400 mt-1">Real-time cheat detection feed</p>
        </div>
        <div className={`px-4 py-2 rounded-full text-sm font-bold ${wsStatus.includes('Live') ? 'bg-emerald-900 text-emerald-400 border border-emerald-700' : 'bg-rose-900 text-rose-400'}`}>
          {wsStatus}
        </div>
      </header>
      
      <div className="flex flex-1 gap-8 min-h-0">
        {/* Left Side: Submissions */}
        <div className="flex-1 flex flex-col bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-slate-200 mb-4 border-b border-slate-800 pb-3">Live Submissions feed</h3>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {submissions.map((sub, i) => (
              <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center transition-all">
                <div>
                  <p className="text-sm text-slate-400">Student: <span className="text-slate-200 font-medium">{sub.student_id.slice(0,8)}</span></p>
                  <p className="text-sm text-slate-400">Question: <span className="text-slate-200">{sub.question_id}</span></p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-mono text-cyan-400">{sub.time_taken_seconds.toFixed(1)}s</span>
                  <p className={`text-xs font-bold uppercase tracking-wider ${sub.is_correct ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {sub.is_correct ? 'Correct' : 'Incorrect'}
                  </p>
                </div>
              </div>
            ))}
            {submissions.length === 0 && <p className="text-slate-500 text-center mt-8 text-base">Waiting for submissions...</p>}
          </div>
        </div>

        {/* Right Side: Alerts */}
        <div className="w-96 flex flex-col bg-slate-900 border border-slate-800 rounded-2xl p-6">
           <h3 className="text-xl font-semibold text-rose-400 mb-4 border-b border-slate-800 pb-3 flex items-center">
             <span className="mr-2 animate-pulse">??</span> Active Cheating Alerts
           </h3>
           <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {alerts.map((alert, i) => (
              <div key={i} className={`p-4 rounded-xl border shadow-lg ${alert.rule_triggered === 'COLLUSION' ? 'bg-rose-950 border-rose-500/50 shadow-rose-900/20' : 'bg-amber-950 border-amber-500/50 shadow-amber-900/20'}`}>
                <div className="flex justify-between items-start mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${alert.rule_triggered === 'COLLUSION' ? 'bg-rose-900 text-rose-300' : 'bg-amber-900 text-amber-300'}`}>
                    {alert.rule_triggered}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">Score: {alert.severity_score}</span>
                </div>
                <p className="text-sm text-slate-300 mb-2">{alert.description}</p>
                <p className="text-xs text-slate-500 font-mono">Student ID: {alert.student_id.slice(0,8)}</p>
              </div>
            ))}
            {alerts.length === 0 && <p className="text-slate-500 text-center mt-8 text-base">No alerts yet. System clear.</p>}
           </div>
        </div>
      </div>
    </div>
  );
}
