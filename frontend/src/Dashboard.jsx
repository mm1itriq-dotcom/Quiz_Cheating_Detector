import SubmissionCard from './components/SubmissionCard';
import AlertCard from './components/AlertCard';

export default function Dashboard({ submissions, alerts, wsStatus, wsIcon }) {
  return (
    <div className="p-8 h-full flex flex-col">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white leading-tight">Live Monitoring</h2>
          <p className="text-base text-slate-400 mt-1">Real-time cheat detection feed</p>
        </div>
        <div className={`px-4 py-2 rounded-full text-sm font-bold flex items-center ${wsStatus === 'Live' ? 'bg-emerald-900 text-emerald-400 border border-emerald-700' : 'bg-rose-900 text-rose-400'}`}>
          <span className="material-symbols-outlined mr-2 text-base">{wsIcon}</span> {wsStatus}
        </div>
      </header>
      
      <div className="flex flex-1 gap-8 min-h-0">
        {/* Left Side: Submissions */}
        <div className="flex-1 flex flex-col bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-slate-200 mb-4 border-b border-slate-800 pb-3 flex items-center">
            <span className="material-symbols-outlined mr-2">feed</span> Live Submissions feed
          </h3>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {submissions.map((sub, i) => (
              <SubmissionCard key={i} sub={sub} />
            ))}
            {submissions.length === 0 && <p className="text-slate-500 text-center mt-8 text-base">Waiting for submissions...</p>}
          </div>
        </div>

        {/* Right Side: Alerts */}
        <div className="w-96 flex flex-col bg-slate-900 border border-slate-800 rounded-2xl p-6">
           <h3 className="text-xl font-semibold text-rose-400 mb-4 border-b border-slate-800 pb-3 flex items-center">
             <span className="material-symbols-outlined mr-2 animate-pulse text-2xl">warning</span> Active Cheating Alerts
           </h3>
           <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {alerts.map((alert, i) => (
              <AlertCard key={i} alert={alert} />
            ))}
            {alerts.length === 0 && <p className="text-slate-500 text-center mt-8 text-base">No alerts yet. System clear.</p>}
           </div>
        </div>
      </div>
    </div>
  );
}
