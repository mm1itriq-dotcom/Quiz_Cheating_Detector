export default function AlertCard({ alert }) {
    return (
      <div className={`p-4 rounded-xl border shadow-lg ${alert.rule_triggered === 'COLLUSION' ? 'bg-rose-950 border-rose-500/50 shadow-rose-900/20' : 'bg-amber-950 border-amber-500/50 shadow-amber-900/20'}`}>
        <div className="flex justify-between items-start mb-2">
          <span className={`px-2 py-1 rounded text-xs font-bold ${alert.rule_triggered === 'COLLUSION' ? 'bg-rose-900 text-rose-300' : 'bg-amber-900 text-amber-300'}`}>
            {alert.rule_triggered}
          </span>
          <span className="text-xs text-slate-500 font-mono">Score: {alert.severity_score}</span>
        </div>
        <p className="text-sm text-slate-300 mb-2">{alert.description}</p>
        <p className="text-xs text-slate-500 font-mono">Student: {alert.student_name} | Quiz: {alert.quiz_title}</p>
      </div>
    );
}
