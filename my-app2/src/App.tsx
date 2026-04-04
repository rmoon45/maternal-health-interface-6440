import { useState } from 'react';
import Dashboard from './screens/Dashboard';
import CheckInForm from './screens/CheckinForm';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'checkin'>('dashboard');

  return (
    <div className="min-h-screen text-slate-900 font-sans bg-white">
      <header className="p-6 border-b-2 border-slate-800 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold">Maternal Health Interface</h1>
        <nav className="mt-6 flex gap-4">
          <button 
            className={`px-6 py-2 border-2 border-slate-800 transition-colors ${
              activeTab === 'dashboard' ? 'bg-slate-800 text-white' : 'bg-transparent hover:bg-slate-100'
            }`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`px-6 py-2 border-2 border-slate-800 transition-colors ${
              activeTab === 'checkin' ? 'bg-slate-800 text-white' : 'bg-transparent hover:bg-slate-100'
            }`}
            onClick={() => setActiveTab('checkin')}
          >
            Check-in Form
          </button>
        </nav>
      </header>

      <main className="py-6">
        {activeTab === 'dashboard' ? <Dashboard /> : <CheckInForm />}
      </main>
    </div>
  );
}