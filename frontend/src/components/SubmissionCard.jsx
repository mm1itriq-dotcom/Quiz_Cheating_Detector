export default function SubmissionCard({ sub }) {
    return (
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center transition-all">
        <div>
          <p className="text-sm text-slate-400">Quiz: <span className="text-slate-200">{sub.quiz_title} (Q: {sub.question_id})</span></p>
          <p className="text-sm text-slate-400">Student: <span className="text-slate-200 font-medium">{sub.student_name}</span></p>
        </div>
        <div className="text-right">
          <span className="text-xl font-mono text-cyan-400">{sub.time_taken_seconds.toFixed(1)}s</span>
          <p className={`text-xs font-bold uppercase tracking-wider ${sub.is_correct ? 'text-emerald-500' : 'text-rose-500'}`}>
            {sub.is_correct ? 'Correct' : 'Incorrect'}
          </p>
        </div>
      </div>
    );
}
