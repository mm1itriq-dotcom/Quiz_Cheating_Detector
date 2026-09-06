import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Admin from './Admin';
import Sidebar from './components/Sidebar';

export default function App() {
  const [submissions, setSubmissions] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [wsStatus, setWsStatus] = useState('Connecting...');
  const [wsIcon, setWsIcon] = useState('sync');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/stream');
    
    ws.onopen = () => { setWsStatus('Live'); setWsIcon('wifi'); };
    ws.onclose = () => { setWsStatus('Disconnected'); setWsIcon('wifi_off'); };
    ws.onerror = () => { setWsStatus('Error'); setWsIcon('error'); };
    
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
    <Router>
      <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
        <Sidebar />
        <main className="flex-1 overflow-y-auto relative">
          <Routes>
            <Route path="/" element={<Dashboard submissions={submissions} alerts={alerts} wsStatus={wsStatus} wsIcon={wsIcon} />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
