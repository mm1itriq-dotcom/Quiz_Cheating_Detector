export default function QuizModal({ isOpen, onClose, onSubmit, quizForm, setQuizForm }) {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">Add New Quiz</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
          </div>
          <form onSubmit={onSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Quiz Title</label>
              <input required type="text" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                value={quizForm.title} onChange={e => setQuizForm({...quizForm, title: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Course Name</label>
              <input required type="text" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                value={quizForm.course_name} onChange={e => setQuizForm({...quizForm, course_name: e.target.value})} />
            </div>
            <div className="pt-4 flex gap-4">
              <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg font-semibold">Submit</button>
              <button type="button" onClick={onClose} className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-lg font-semibold">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
}
