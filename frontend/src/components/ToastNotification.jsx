export default function ToastNotification({ notification }) {
    if (!notification) return null;
    
    return (
      <div className={`fixed top-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-2xl font-semibold flex items-center gap-3 transition-all z-[100] animate-bounce ${notification.type === 'error' ? 'bg-rose-950 text-rose-300 border border-rose-500' : 'bg-emerald-950 text-emerald-300 border border-emerald-500'}`}>
        <span className="material-symbols-outlined">
          {notification.type === 'error' ? 'error' : 'check_circle'}
        </span>
        {notification.message}
      </div>
    );
}
