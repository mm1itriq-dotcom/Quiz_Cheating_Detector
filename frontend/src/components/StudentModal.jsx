export default function StudentModal({ isOpen, onClose, onSubmit, formData, setFormData }) {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">Add New Student</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
          </div>
          <form onSubmit={onSubmit} className="p-6 space-y-4">
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
              <button type="button" onClick={onClose} className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-lg font-semibold">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
}
